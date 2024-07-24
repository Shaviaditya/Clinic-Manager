const express = require('express');
const { sequelize } = require('./models');
const app = express();
require('dotenv').config()

var cors = require('cors');
app.use(cors());

app.use(express.json())
app.use(express.urlencoded({ extended: true }));


//test route
app.get('/', (req, res, next) => {
  res.send('Hello World');
});


//CRUD routes
app.use('/', require('./routes/routes'));

//error handling
app.use((error, req, res, next) => {
  console.log(error);
  const status = error.statusCode || 500;
  const message = error.message;
  res.status(status).json({ message: message });
});

//sync database
sequelize.authenticate().then(() => {
  sequelize.sync()
  console.log(`Database Connected`)
  app.listen(process.env.PORT)  
}).catch(err => {
  console.error(err)
}) 
