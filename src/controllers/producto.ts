import { Request, Response } from "express";
import dbConnect from "../config/mongo";
import {
  getProducto,
  insertProductList,

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

const postProductList = async ({ body }: Request, res: Response) => {
  try {
    const responseList = await insertProductList(body);
    res.send(responseList);
  } catch (e) {
    handleHttp(res, "ERROR_POST_ITEM", e);
  }
};



export { getServidor, postProductList };