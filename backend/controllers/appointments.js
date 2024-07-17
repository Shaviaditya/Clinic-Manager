const { sequelize, models } = require("../models");
const puppeteer = require('puppeteer')
const fs = require('fs-extra')
const hbs = require('handlebars')
const path = require("path");
require('dotenv').config()

const compile = async (templateName,data) => {
    data.diagnosis = data.diagnosis.split(',');
    data.advice = data.advice.split(',');
    data.symptoms = data.symptoms.split(',');
    data.facility = data.facility.split(',');
    const filePath = path.join(process.cwd(),'templates',`${templateName}.hbs`)
    const html = await fs.readFile(filePath,'utf-8')
    return hbs.compile(html)(data)
}

const {
  models: { user,appointment },
} = sequelize;

// get all users
const funcgetAppointments = async (req, res) => {
  await appointment
    .findAll()
    .then((data) => {
      res.status(200).json({ appointments: data });
    })
    .catch((err) => {
      console.log(err);
    });
};

//create user
const funccreateAppointment = async (req, res, next) => {
  const { diagnosis, symptoms, advice, facility, complaints, medicines } = req.body;
  try {
    await appointment.create({
      date: Date.now(),
      symptoms: symptoms,
      diagnosis: diagnosis,
      advice: advice,
      facility: facility,
      complaints: complaints,
      medicines: medicines,
      userId: req.body.id,
    });

    const userData = await user.findOne({ where: { id: req.body.id } });
    const data = { ...userData.dataValues, ...req.body };
    const folderName = `${data.name}_${data.id}`;
    const folderPath = path.join(process.env.FOLDERPATH,folderName);

    // Create the folder if it doesn't exist
    if (!fs.existsSync(folderPath)) {
      fs.mkdirSync(folderPath, { recursive: true });
    }

    const pdfName = `${new Date().toISOString().split('T')[0]}_${data.id}.pdf`;
    const pdfPath = path.join(folderPath, pdfName);
    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    const content = await compile('template', req.body);
    await page.setContent(content);
    await page.emulateMediaType('screen');
    await page.pdf({
      path: pdfPath,
      format: 'A4',
      printBackground: true
    });
    await browser.close();
    res.status(200).json({ success: true, pdfUrl: pdfPath });

  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

module.exports = {
  funccreateAppointment,
  funcgetAppointments,
};
