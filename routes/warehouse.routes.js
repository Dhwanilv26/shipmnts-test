import { Router } from "express";
import { createLocation } from "../controllers/warehouse.controller.js";
import { addProducts } from "../controllers/warehouse.controller.js";
import { getWareHouses } from "../controllers/warehouse.controller.js";
const wareHouseRouter = Router();
import { deliverProduct } from "../controllers/warehouse.controller.js";
// API 1
wareHouseRouter.post("/create_location", createLocation);
// API 2
wareHouseRouter.get("/warehouse/tree/:warehouse_code", getWareHouses);
// API 3
wareHouseRouter.post("/transaction/receipt", addProducts);

// API 4
wareHouseRouter.post("/transaction/delivery", deliverProduct);

export default wareHouseRouter;
