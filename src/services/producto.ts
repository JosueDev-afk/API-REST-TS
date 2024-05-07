import { Servidor } from "../interfaces/servidor.interface";
import { Lista } from "../interfaces/lista.interface";
import { Products } from "../interfaces/products.interface";
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

const getAllProducts = async () => {
  const responseAll = await List.find({});
  return responseAll;
}
type Product = {
  Description: string;
};
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
  console.log(json);




  let parsedJson: string = json.replace(/'/g, '"');

  // Parse the JSON string to a JavaScript object
  let data: DataItem[] = JSON.parse(parsedJson);
  
  // Map the descriptions to a new array and join them with newline characters
  let descriptionsString: string = data.map(item => item.Description).join('\n');

  console.log(descriptionsString);


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

  const response = await fetch(`https://api.priceapi.com/v2/jobs?token=${process.env.PRICE_API_KEY}`, options);
  const jsonResponse = await response.json();
  const jobId = jsonResponse.job_id;
  console.log(jobId);

  const options2 = { method: 'GET', headers: { accept: 'application/json' } };

  const jobResponse = await fetch(`https://api.priceapi.com/v2/jobs/${jobId}?token=${process.env.PRICE_API_KEY}`, options2)
    .then(response => response.json())
    .catch(err => console.error(err));

  const filteredResults = jobResponse.results.results
    .filter((item: Result) => !item.name.toLowerCase().includes('hpe'))
    .map((item: Result) => ({
      name: item.name,
      url: item.url,
      min_price: item.min_price,
      price: item.price
    }));

  return filteredResults;
};



export { getProducto, insertProductList, getAllProducts, productsComparison };