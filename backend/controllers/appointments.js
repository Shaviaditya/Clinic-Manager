const { sequelize ,models } = require('../models');

const {
  models: {
      appointment,
      medicine
  }
} = sequelize; 

// get all users
const funcgetAppointments = async (req,res) => {
  await appointment.findAll().then((data) => {
    res.status(200).json({"appointments": data})
  }).catch(err => {
    console.log(err);
  });  
}

//create user
const funccreateAppointment = async (req, res, next) => {
  const date = Date.now();
  const symptoms = req.body.symptoms
  const description = req.body.description
  const medicines = req.body.medicines.split(',')
  const medicineIds = await Promise.all(medicines.map(async item => {
    const data = await medicine.findOne({where: {"id": item}})
    return data.dataValues.name
  }))  
  
  await appointment.create({
    date: date,
    symptoms: symptoms,
    description: description,
    medicines: medicineIds,
    userId: req.body.userId,
  })
    .then(result => {
      console.log('Created Appointment for the user');
      res.status(201).json({"result" : "success"});
    })
    .catch(err => {
      res.status(500).json({"error": err})
    }); 
}

module.exports = {
  funccreateAppointment,funcgetAppointments
}