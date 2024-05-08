import { Request, Response, Router } from "express";
import {
  getServidor,
  postProductList,
  getProducts,
  postProductsToCompare,
  getJobsList,
} from "../controllers/producto";

const router = Router();


router.get("/api/:SKU", getServidor);

router.get("/all", getProducts)

router.post("/api/", postProductList);

router.post("/api/compare", postProductsToCompare);

router.get("/api/jobslist", getJobsList);






export { router };