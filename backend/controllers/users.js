const { Op } = require('sequelize');
const { sequelize ,models } = require('../models');

const {
  models: {
      user,
      appointment
  }
} = sequelize; 


//create user
const funccreateUser = async (req, res) => {
  const {name,phone,address,age,height,weight,bloodPressure} = req.body
  await user.create({    
    name: name,
    phone: phone,
    address: address,
    age: age,
    height: height,
    weight: weight,
    bloodPressure: bloodPressure
  })
    .then(result => {
      res.status(201).json({
        message: 'Customer Added!',
        user: result
      });
    })
    .catch(err => {
      console.log(err);
    }); 
}

// get all users
const funcgetUsers = (req,res) => {
  user.findAll({ where: { name: { [Op.like]: `%${req.query.name}%`}}}).then((data) => {
    res.status(200).json({users: data})
  }).catch(err => {
    console.log(err);
  });  
}

const funcgetUser = async (req,res) => {
  await user.findOne({where: {id: req.params.id}, include: appointment}).then((data) => {
    res.status(200).json({users: data})
  }).catch(err => {
    console.log(err);
  });  
}


//update user
const funcupdateUser = (req, res, next) => {
  const updatedName = req.body.name;
  const updatedPhone = req.body.phone;
  const updatedAddress = req.body.address;
  user.findAll({ where: {phone: req.body.phone}})
    .then(user => {
      if (!user) {
        return res.status(404).json({ message: 'user not found!' });
      }
      user.name = updatedName;
      user.phone = updatedPhone;
      user.address = updatedAddress
      return user.save();
    })
    .then(result => {
      res.status(200).json({message: 'user updated!', user: result});
    })
    .catch(err => console.log(err));
}

//delete user
const funcdeleteUser = (req, res, next) => {
  const userId = req.userId;
  user.findByPk(userId)
    .then(user => {
      if (!user) {
        return res.status(404).json({ message: 'user not found!' });
      }
      return user.destroy({
        where: {
          id: userId
        }
      });
    })
    .then(result => {
      res.status(200).json({ message: 'user deleted!' });
    })
    .catch(err => console.log(err));
}

module.exports = {
  funccreateUser,
  funcdeleteUser, funcupdateUser,
  funcgetUser,funcgetUsers,
}