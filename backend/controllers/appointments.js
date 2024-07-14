const { sequelize, models } = require("../models");
const PDFDocument = require("pdfkit");
const fs = require("fs");
const path = require("path");

const {
  models: { user,appointment, medicine },
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
  const date = Date.now();
  const symptoms = req.body.symptoms;
  const description = req.body.description;
  const medicines = req.body.medicines.split(",");
  const medicineIds = await Promise.all(
    medicines.map(async (item) => {
      const data = await medicine
        .findOrCreate({ where: { name: item } })
        .then((res, isCreated) => {
          return res[0].dataValues.name;
        });
      return data;
    })
  );
  await appointment
    .create({
      date: date,
      symptoms: symptoms,
      description: description,
      medicines: medicineIds,
      userId: req.body.id,
    })
    .then(async (result) => {
      const userData = await user.findOne({where:{id: req.body.id}})
      const doc = new PDFDocument();
      const filePath = path.join(__dirname, "output.pdf");
      const writeStream = fs.createWriteStream(filePath);
      doc.pipe(writeStream);
      doc.fontSize(20).text("Medical Receipt", { align: "center" });
      doc.moveDown();
      doc.fontSize(14).text(`Name: ${userData.name}`);
      doc.text(`Phone: ${userData.phone}`);
      doc.text(`Address: ${userData.address}`);
      doc.moveDown();
      doc.text(`Symptoms: ${symptoms}`);
      doc.moveDown();
      doc.text(`Medicines: ${medicines}`);

      doc.end();

      // Send the PDF file to the client after it's been written
      writeStream.on("finish", () => {
        res.download(filePath, "medical_receipt.pdf", (err) => {
          if (err) {
            console.error("Error sending PDF:", err);
          }
          // Remove the file after download
          fs.unlinkSync(filePath);
        });
      });
      // res.status(201).json({ result: "success" });
    })
    .catch((err) => {
      res.status(500).json({ error: err });
    });
};

module.exports = {
  funccreateAppointment,
  funcgetAppointments,
};
