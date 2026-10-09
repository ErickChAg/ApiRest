const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const app = express();
app.use(cors());
app.use(express.json());

mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log('Conectado a MongoDB'))
  .catch((err) => console.error(err));

const itemsRouter = require('./routes/items');
function verificarApiKey(req, res, next) {
  const key = req.header('x-api-key');
  if (key !== process.env.API_KEY) {
    return res.status(401).json({ error: 'No autorizado' });
  }
  next();
}

app.use('/api/items', verificarApiKey, itemsRouter);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Servidor corriendo en el puerto ${PORT}`));