const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const { config } = require("dotenv");
config();

const productRoutes = require("./routes/product.routers");

// Usamos express para los middlewares for JSON data
const app = express();
app.use(bodyParser.json());
//parseador de bodies para URL-encoded data - las nuevas versiones de express ya tienen el body parser incluido <express.urlencoded()> pero aca uso body-parser porque es lo que habia leido //

//Aca conectamos la base de datos:
mongoose.connect(process.env.MONGO_URL, { dbName: process.env.MONGO_DB_NAME });
const db = mongoose.connection;

//middleware
app.use.apply("/products", productRoutes);

const port = process.env.PORT || 3000;

app.listen(port, () => {
  console.log(`Servidor iniciado en el puerto ${port}`);
});
