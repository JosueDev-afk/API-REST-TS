import { Request, Response, Router } from "express";
import {
  getServidor,
  postProductList,
  getProducts,
} from "../controllers/producto";

const router = Router();


router.get("/api/:SKU", getServidor);

router.get("/all", getProducts)

router.post("/api/", postProductList);


export { router };