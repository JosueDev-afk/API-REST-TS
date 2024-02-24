import { Schema, Types, model, Model } from "mongoose";

const listaSchema = new Schema({}, { strict: false });

const lista = model("lista", listaSchema, "Productos");

export default lista;