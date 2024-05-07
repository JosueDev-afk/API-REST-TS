import { Request, Response } from "express";
import dbConnect from "../config/mongo";
import {
  getProducto,
  insertProductList,
  getAllProducts,
  productsComparison,

} from "../services/producto";
import { handleHttp } from "../utils/error.handle";

const getServidor = async ({ params }: Request, res: Response) => {
  try {
    const { SKU } = params;
    const response = await getProducto(SKU);
    const data = response ? response : "NOT_FOUND";
    res.send(data);
  } catch (e) {
    handleHttp(res, "ERROR_GET_ITEM");
  }
};

const getProducts = async (req: Request, res: Response) =>{
  try{
    const response = await getAllProducts();
    res.send(response);
  } catch(e){
    handleHttp(res, "ERROR_GET_PRODUCTS");
  }
}

const postProductList = async ({ body }: Request, res: Response) => {
  try {
    const responseList = await insertProductList(body);
    res.send(responseList);
  } catch (e) {
    handleHttp(res, "ERROR_POST_ITEM", e);
  }
};

const postProductsToCompare = async({ body }: Request, res: Response)=>{
  try {
    const responseJob = await productsComparison(body);
    res.send(responseJob)
  } catch (e) {
    handleHttp(res, "ERROR_POST_JOB", e);
  }

};





export { getServidor, postProductList, getProducts, postProductsToCompare };