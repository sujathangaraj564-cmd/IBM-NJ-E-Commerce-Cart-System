const express = require("express");
const cors = require("cors");
const fs = require("fs");
const app = express();
app.use(cors());
app.use(express.json());

const productsFile = "./products.json";

const readProducts = () => JSON.parse(fs.readFileSync(productsFile, "utf-8"));

// Get all products
app.get("/api/products", (req, res) => {
  const products = readProducts();
  res.json(products);
});

// Add product
app.post("/api/products", (req, res) => {
  const products = readProducts();
  const newProduct = req.body;
  products.push(newProduct);
  fs.writeFileSync(productsFile, JSON.stringify(products, null, 2));
  res.json({ message: "Product added successfully" });
});

// Delete product
app.delete("/api/products/:id", (req, res) => {
  const products = readProducts();
  const updated = products.filter(p => p.id != req.params.id);
  fs.writeFileSync(productsFile, JSON.stringify(updated, null, 2));
  res.json({ message: "Product deleted" });
});

app.listen(5000, () => console.log("✅ Backend running on port 5000"));
