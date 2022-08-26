require('dotenv').config();

const express = require('express');
const cors = require('cors');
const app = express();
const { dbConnection } = require('./database/conection');

//CORS
app.use(cors());

//Parseo y lectura del body
app.use(express.json());

//rutas
app.use('/api/mail', require('./routes/mail'));
app.use('/api/users', require('./routes/user'));
app.use('/api/clients', require('./routes/client'));
app.use('/api/auth', require('./routes/auth'));
app.use('/api/ubication', require('./routes/ubication'));
app.use('/api/orders', require('./routes/order'));

app.listen(process.env.PORT, () => {
	dbConnection();
	console.log('Server on port ', process.env.PORT);
});
