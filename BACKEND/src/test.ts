import axios from 'axios';
import { writeFileSync, readFileSync } from 'node:fs';
import path from 'node:path';
import authBlingModel from './app/models/authBling.model';

const productsData = path.resolve(__dirname, 'cache', 'data', 'products.json');
const productsVariationsData = path.resolve(__dirname, '../', 'productsVariations.json');

const getToken = async (): Promise<string> => {
  const tokenData = await authBlingModel.getAuthBling();

  return tokenData?.access_token!;
}

const requestBling = axios.create({
  baseURL: 'https://www.bling.com.br/Api/v3/',
  headers: {
    'Content-Type': 'application/x-www-form-urlencoded',
    Accept: 'application/json',
    Authorization: `Bearer 633bbe50943c3d0c9f9ea1d43e4499e507ec233c`
  },
});

const createJsonData = async () => {
  const productsList: any[] = [];
  let repeat = 1;
  let whiteEnd = false;

  while (!whiteEnd) {
    try {
      const response = await requestBling.get(`produtos?pagina=${repeat}&limite=100`);
      console.log(`Resposta da API para a página ${repeat}:`, response.data);

      const products = response.data.data;

      if (products && products.length > 0) {
        productsList.push(...products);
      }

      if (!products || products.length < 100) {
        whiteEnd = true;
      } else {
        repeat++;
      }

      // Adicionar um atraso de 1 segundo entre as requisições
      await sleep(1000);

      console.log(`Página: ${repeat}`);
      console.log(`Total de Produtos Obtidos: ${productsList.length}`);
    } catch (error) {
      console.error('Erro ao obter produtos:', error);
      whiteEnd = true; // Termina o loop em caso de erro
    }
  }

  const listProducts = await getByVariation(productsList.filter((product: any) => !product.idProdutoPai));

  writeFileSync(productsData, JSON.stringify(listProducts, null, 2));
};

const sleep = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

const getByVariation = async (products: any[]) => {
  try {
    const newProducts: any[] = [];

    for (let i = 0; i < products.length; i += 3) {
      const batch = products.slice(i, i + 3);

      const batchRequests = batch.map(async (product: any) => {
        const productRequest = await requestBling.get(`produtos/${product.id}`);
        console.log(productRequest.data);
        return productRequest.data.data;
      });

      const batchResults = await Promise.all(batchRequests);
      newProducts.push(...batchResults);

      // Espera de 1 segundo entre cada grupo de 3 requisições
      await sleep(1000);
    }

    return newProducts;

  } catch (error) {
    console.error('Erro ao ler produtos:', error);
  }
};





createJsonData();
// getByVariation();
