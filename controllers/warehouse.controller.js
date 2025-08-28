import WareHouse from "../models/warehouse.model.js";
import ParentLocation from "../models/parentlocation.model.js";
import Product from "../models/product.model.js";
export const createLocation = async (req, res) => {
  try {
    const { location_code, parent_location_code } = req.body;

    if (!location_code || !parent_location_code) {
      res.status(400).send({ message: "invalid request" });
    }

    const warehouse = WareHouse.find({ location_code, parent_location_code });

    if (warehouse) {
      return res.status(400).send("warehouse already exists");
    }

    const newWareHouse = new WareHouse.create({
      location_code,
      parent_location_code,
    });

    await newWareHouse.save();

    res.send(201).json({
      success: true,
      message: "location created successfully",
      newWareHouse,
    });
  } catch (error) {
    res.status(500).json("internal server error");
  }
};

export const addProducts = async (req, res) => {
  try {
    const { transaction_date, warehouse_code, products } = req.body;

    if (
      !transaction_date ||
      !warehouse_code ||
      !products ||
      products.length === 0
    ) {
      return res.status(400).send("invalid credentials");
    }

    const newProduct = await products.create({
      transaction_date,
      warehouse_code,
      products,
    });

    await newProduct.save();
    res.status(201).json({
      success: true,
      message: "Products added successfully",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Location doesnt belong to a specific warehouse",
    });
  }
};

export const getWareHouses = async (req, res) => {
  try {
    const { warehouse_code } = req.params.id;

    if (!warehouse_code) {
      res.status(400).send({
        message: "bad request for fetching warehouses",
      });
    }

    const warehouses = await WareHouse.find({ location_code });

    res.status(200).json({
      warehouses,
    });
  } catch (error) {
    res.status(500).json({
      message: "Internal server error while fetching warehouses",
    });
  }
};

export const deliverProduct = async (req, res) => {
  try {
    const { transaction_date, warehouse_code, products } = req.body();

    if (
      !transaction_date ||
      !warehouse_code ||
      !products ||
      products.length === 0
    ) {
      return res.status(400).send({
        message: "Bad request for delivering product",
      });
    }

    const requestQty = products.qty;

    const wareHouse = WareHouse.find({ warehouse_code });

    if (!wareHouse) {
      res.status(404).send({
        message: "Warehouse not found",
      });
    }

    const wareHouseProducts = wareHouse.products;
    const wareHouseProductsQuantity = wareHouseProducts.qty;

    if (wareHouseProducts.product_code != products.product_code) {
      res.status(400).send({
        message: "Wrong product code or warehouse code",
      });
    }

    if (products.requestQty > wareHouseProductsQuantity) {
      return res.status(400).send({
        message: "invalid quantity",
      });
    }

    const product = Product.find({ product_code });

    product.qty -= requestQty;

    await product.save();

    res.status(201).send({
      success: true,
      message: "Product delivered successfully",
    });
  } catch (error) {
    res.status(500).send({
      message: "internal server error",
    });
  }
};
