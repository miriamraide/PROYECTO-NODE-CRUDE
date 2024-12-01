const express = require("express");
const router = express.Router();
const Product = require("../models/product.model");

//Middleware - homemade
const getProduct = async (req, res, next) => {
  let product;
  const { id } = req.params;

  if (!id.match(/^[0-9a-fA-f]{24}$/)) {
    return res.status(404).json({
      message: "El ID del producto no es un ID valido",
    });
  }
  try {
    product = await Product.findById(id);
    if (!product) {
      return res.status(404).json({
        message: "El producto no fue encontrado",
      });
    }
  } catch (error) {
    return res.status(500).json({
      message: error.message,
    });
  }
  res.product = product;
  next();
};

// obtener todos los productos [GET ALL]

router.get("/", async (req, res) => {
  try {
    const products = await Product.find;
    console.log("GET ALL", products);
    if (products.length === 0) {
      res.status(204).json([]);
    }
    res(products);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
});

// crear un nuevo producto [POST]
router.post("/", async (req, res) => {
  const { name, description, slug, price, stock } = req?.body;
  if (!name || !image || !description || !slug || !price || !stock) {
    return res.status(400).json({
      message:
        "Los campos nombre del producto, imagen, description, nombre-corto, precio y stock son obligatorios",
    });
  }
  const product = new Product({
    name,
    image,
    description,
    slug,
    price,
    stock,
  });
  try {
    const newProduct = await product.save();
    console.log(newProduct);
    res.status(201).json(newProduct);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});
