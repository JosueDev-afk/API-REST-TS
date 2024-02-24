import { Request, Response, Router } from "express";
import {
  getServidor,
  postProductList,
} from "../controllers/producto";

const router = Router();


router.get("/api/:SKU", getServidor);

router.post("/api/", postProductList);


export { router };