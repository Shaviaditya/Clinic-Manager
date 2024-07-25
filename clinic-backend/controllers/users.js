const { Op } = require("sequelize");
const { sequelize, models } = require("../models");
const path = require("path");

const {
  models: { user, appointment },
} = sequelize;

//create user
const funccreateUser = async (req, res) => {
  const { name, phone, address, age, height, weight, bloodPressure } = req.body;
  await user
    .create({
      name: name,
      phone: phone,
      address: address,
      age: age,
      height: height,
      weight: weight,
      bloodPressure: bloodPressure,
    })
    .then((result) => {
      res.status(201).json({
        message: "Customer Added!",
        user: result,
      });
    })
    .catch((err) => {
      console.log(err);
    });
};

// get all users
const funcgetUsers = (req, res) => {
  user
    .findAll({ where: { name: { [Op.like]: `%${req.query.name}%` } } })
    .then((data) => {
      res.status(200).json({ users: data });
    })
    .catch((err) => {
      console.log(err);
    });
};

const funcgetUser = async (req, res) => {
  try {
    let data = await user.findOne({ where: { id: req.params.id }, include: appointment });
    data = data.toJSON();
    if (data) {
      data.appointments.forEach(history => {
        const folderPath = path.join(process.env.FOLDERPATH, `${data.name.replace(/\s+/g, "")}${data.phone}`);
        const pdfName = `${history.date}.pdf`;
        const urlPath = path.join(folderPath, pdfName);
        history.uri = urlPath;
      });

      res.status(200).json({ users: data });
    } else {
      res.status(404).json({ error: "User not found" });
    }
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: "An error occurred while fetching the user" });
  }
};

//update user
const funcupdateUser = (req, res) => {
  user
    .findOne({ where: { id: req.body.id } })
    .then((user) => {
      if (!user) {
        return res.status(404).json({ message: "user not found!" });
      }
      for (const key in req.body) {
        if(key == "id")continue
        user[key] = req.body[key]
      }
      user.save();
    })
    .then((result) => {
      res.status(200).json({ message: "user updated!", user: result });
    })
    .catch((err) => console.log(err));
};

//delete user
const funcdeleteUser = (req, res, next) => {
  const userId = req.userId;
  user
    .findByPk(userId)
    .then((user) => {
      if (!user) {
        return res.status(404).json({ message: "user not found!" });
      }
      return user.destroy({
        where: {
          id: userId,
        },
      });
    })
    .then((result) => {
      res.status(200).json({ message: "user deleted!" });
    })
    .catch((err) => console.log(err));
};

module.exports = {
  funccreateUser,
  funcdeleteUser,
  funcupdateUser,
  funcgetUser,
  funcgetUsers,
};
