const { sequelize ,models } = require('../models');

const {
  models: {
      medicine
  }
} = sequelize; 

// get all users
const funcgetMedicines = async (req, res) => {
  await medicine.findAll()
    .then((data) => {
      res.status(200).json({ medicines: data });
    })
    .catch((err) => {
      console.log(err);
    });
};

//add medicines
const funcaddMedicines = async (req, res) => {
  try {
    const list = req.body.medicines  
    list.forEach(async (item) => {
        await medicine.create({ name: item.name });
        })
        res.status(200).send("medicines added!")
    }
    catch(err) {
        res.status(500).json({"err": err})
    }
};

module.exports = {
  funcaddMedicines,funcgetMedicines
}

