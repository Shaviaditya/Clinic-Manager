const { sequelize, models } = require("../models");
const puppeteer = require('puppeteer');
const fs = require('fs-extra');
const hbs = require('handlebars');
const path = require("path");
require('dotenv').config();

const compile = async (templateName, data) => {
    data.diagnosis = data.diagnosis.length > 0 ? data.diagnosis.split(',') : [];
    data.advice = data.advice.length > 0 ? data.advice.split(',') : [];
    data.symptoms = data.symptoms.length > 0 ? data.symptoms.split(',') : [];
    const filePath = path.join(process.cwd(), 'templates', `${templateName}.hbs`);
    const html = await fs.readFile(filePath, 'utf-8');
    return hbs.compile(html)(data);
};

const {
  models: { user, appointment },
} = sequelize;

// Get all appointments
const funcgetAppointments = async (req, res) => {
  try {
    const data = await appointment.findAll();
    res.status(200).json({ appointments: data });
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

// View PDF
const funcViewPdf = async (req, res) => {
  const filename = req.query.path;
  if(!fs.existsSync(filename)){
    res.send(null)
  } else {
    fs.readFile(filename, (err, data) => {
      if (err) {
        res.status(404).send('File not found');
        return;
      }
      res.setHeader('Content-Type', 'application/pdf');
      res.setHeader('Content-Disposition', 'inline; filename=' + path.basename(filename));
      res.send(data);
    });
  }
};

// Create or update appointment and generate PDF
const funccreateAppointment = async (req, res, next) => {
  const { diagnosis, symptom, advice, complaints, medicines } = req.body;
  const medicalData = {
    diagnosis: diagnosis ? diagnosis.map(item => item.diagnosis).toString() : "",
    symptoms: symptom ? symptom.map(item => item.symptom).toString() : "",
    advice: advice ? advice.map(item => item.advice).toString() : "",
    complaints: complaints,
    medicines: medicines,
    id: req.body.id
  };

  try {
    const currentDate = new Date().toISOString().split('T')[0];
    let prev = await appointment.findOne({ where: { date: currentDate, userId: medicalData.id } });

    if (prev) {
      prev.date = currentDate;
      prev.symptoms = medicalData.symptoms;
      prev.diagnosis = medicalData.diagnosis;
      prev.advice = medicalData.advice;
      prev.complaints = medicalData.complaints;
      prev.medicines = medicalData.medicines;
      prev.save();
    } else {
      prev = await appointment.create({
        date: currentDate,
        symptoms: medicalData.symptoms,
        diagnosis: medicalData.diagnosis,
        advice: medicalData.advice,
        complaints: medicalData.complaints,
        medicines: medicalData.medicines,
        userId: medicalData.id,
      });
    }

    const userData = await user.findOne({ where: { id: req.body.id } });
    if (!userData) {
      return res.status(404).json({ error: "User not found" });
    }

    const data = { ...userData.dataValues, ...medicalData, date: currentDate };
    const folderName = `${data.name.replace(/\s+/g, "")}${data.phone}`;
    const folderPath = path.join(process.env.FOLDERPATH, folderName);

    // Log the folder path
    console.log('Constructed folder path:', folderPath);

    if (!fs.existsSync(folderPath)) {
      fs.mkdirSync(folderPath, { recursive: true });
      console.log(`Directory created at ${folderPath}`);
    }

    const pdfName = `${currentDate}.pdf`;
    const pdfPath = path.join(folderPath, pdfName);

    // Log the PDF path
    console.log('PDF path:', pdfPath);

    const browser = await puppeteer.launch({headless: true, args: ['--no-sandbox'], timeout:0});
    const page = await browser.newPage();
    const content = await compile('template', data);
    await page.setContent(content);
    await page.emulateMediaType('screen');
    await page.pdf({
      path: pdfPath,
      format: 'A4',
      printBackground: true
    });
    await browser.close();

    const pdfBuffer = fs.readFileSync(pdfPath);
    res.setHeader('Content-Type', 'application/pdf');
    res.setHeader('Content-Disposition', 'attachment; filename=' + pdfName);
    res.status(200).send(pdfBuffer);
  } catch (err) {
    console.error("Error creating appointment:", err);
    res.status(500).send(null)
  }
};

module.exports = {
  funccreateAppointment,
  funcgetAppointments,
  funcViewPdf
};
