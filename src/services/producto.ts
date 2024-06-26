import { Servidor } from "../interfaces/servidor.interface";
import { Lista } from "../interfaces/lista.interface";
import { Products } from "../interfaces/products.interface";
import Servidores from "../models/servidor";
import List from "../models/lista";
import "dotenv/config";


const insertProductList = async (list: Lista) => {
  const responseInsert = await List.create(list);
  return responseInsert;
};

const getProducto = async (SKU: String) => {
  const responseServidor = await Servidores.findOne({ SKU: SKU });
  return responseServidor;
};

const getAllProducts = async () => {
  const responseAll = await List.find({});
  return responseAll;
}

const getJobs = async () => {
  const options = { method: 'GET', headers: { accept: 'application/json' } };
  try {
    const response = await fetch(`https://api.priceapi.com/v2/jobs?page=1&per_page=10&token=${process.env.PRICE_API_KEY}`, options);
    return response.json();
  } catch (error) {
    throw new Error(`Error fetching API: ${error}`);
  }

}

interface Result {
  name: string;
  url: string;
  min_price: {
    price: string;
    currency: string;
  };
  price: {
    price: string;
    currency: string;
  };
}

interface JobResponse {
  job_id: string;
  results: {
    results: Result[];
  };
}
interface DataItem {
  'R-Part Number': string;
  Description: string;
}

const productsComparison = async (json: string): Promise<JobResponse> => {
  interface DataItem {
    'R-Part Number': string;
    Description: string;
  }
  const data: DataItem[] = JSON.parse(JSON.stringify(json));
  const descriptionsString: string = data.map(item => item.Description).join('\n');

  const options = {
    method: 'POST',
    headers: { accept: 'application/json', 'content-type': 'application/json' },
    body: JSON.stringify({
      source: 'google_shopping',
      country: 'us',
      topic: 'search_results',
      key: 'term',
      values: descriptionsString,
      max_pages: '1',
      max_age: '1440',
      timeout: '2'
    })
  };

  try {
    const response = await fetch(`https://api.priceapi.com/v2/jobs?token=${process.env.PRICE_API_KEY}`, options);
    return response.json();
  } catch (error) {
    throw new Error(`Error fetching API: ${error}`);
  }
  
};



export { getProducto, insertProductList, getAllProducts, productsComparison, getJobs };