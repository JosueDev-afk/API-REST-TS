import { Servidor } from "../interfaces/servidor.interface";
import { Lista } from "../interfaces/lista.interface";
import Servidores from "../models/servidor";
import List from "../models/lista";


const insertProductList = async (list: Lista) => {
  const responseInsert = await List.create(list);
  return responseInsert;
};



  const getProducto = async (SKU: String) => {
    const responseServidor = await Servidores.findOne({SKU:SKU});
    return responseServidor;
  };

export { getProducto, insertProductList };