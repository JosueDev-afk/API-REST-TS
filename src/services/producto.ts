import { Servidor } from "../interfaces/servidor.interface";
import { Lista } from "../interfaces/lista.interface";
import Servidores from "../models/servidor";
import List from "../models/lista";


const insertProductList = async (list: Lista) => {
  const responseInsert = await List.create(list);
  return responseInsert;
};

const getProducto = async (SKU: String) => {
  const responseServidor = await Servidores.findOne({ SKU: SKU });
  return responseServidor;
};

const getAllProducts = async()=>{
  const responseAll = await List.find({});
  return responseAll;
}

export { getProducto, insertProductList, getAllProducts };