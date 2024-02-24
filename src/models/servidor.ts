import { Schema, Types, model, Model } from "mongoose";
import { Servidor } from "../interfaces/servidor.interface";

const ServidorSchema = new Schema<Servidor>(/*{},{strict:false}*/
    {
        SKU: String,
        Description: String,
        Description1: String,
        Description2: String,
        Description3: String,
        Price1: String,
        Link1: String,
        Condition1: String,
        Price2: String,
        Link2: String,
        Condition2: String,
        Price3: String,
        Link3: String,
        Condition3: String
      }
);

const Servidores = model("Servidores", ServidorSchema, "Productos");
export default Servidores;