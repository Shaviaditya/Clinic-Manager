const userController = require('../controllers/users');
const appController = require('../controllers/appointments')
const medController = require('../controllers/medicines')
const router = require('express').Router();

router.get('/users', userController.funcgetUsers); // /users
router.get('/user/:id', userController.funcgetUser); // /users
router.post('/users', userController.funccreateUser); // /users
router.put('/users/:userId', userController.funcupdateUser); // /users/:userId
router.delete('/users/:userId', userController.funcdeleteUser); // /users/:userId


router.get('/app', appController.funcgetAppointments)
router.post('/app',appController.funccreateAppointment)

router.get("/med",medController.funcgetMedicines)
router.post('/med',medController.funcaddMedicines)
module.exports = router;