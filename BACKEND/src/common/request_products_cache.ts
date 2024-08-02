import { CategoriesBlingType } from './../types/Categories.type';
import { writeFileSync } from 'node:fs';
import path from 'node:path';
import bling_request from '../api/bling.request';
import { ProductType } from '../types/Products.type';

interface TypeResponse<T> {
  data: {
    data: T;
  };
}
const pathChacheFile = path.resolve(__dirname, '..', 'cache', 'data', 'products_cache.json');

const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));


const requestAllProductsByCategory = async (token: string, categoryId: number) => {
  const products = await bling_request.getProductsByCategory(token, categoryId);
  return products.data.data;
};

const requestProductsInformations = async (token: string, products: ProductType[]) => {
  const productsData: any[] = [];

  for (const product of products) {
    const productData: TypeResponse<ProductType> = await bling_request.getProductsByVariation(token, product.id);
    productsData.push(productData.data.data);
    await delay(500);
  }

  return productsData;
}

const requestAllCategories = async (token: string) => {
  const { data: { data } }: TypeResponse<CategoriesBlingType[]> = await bling_request.getAllCategories(token);

  const categoriesMap = new Map();

  data.forEach((category) => {
    if (category.categoriaPai.id === 0) {
      categoriesMap.set(category.id, {
        id: category.id,
        description: category.descricao,
        subCategories: [],
      });
    }
  })

  for (const category of data){
    if (category.categoriaPai.id !== 0) {
      const categoryFather = categoriesMap.get(category.categoriaPai.id);
      if (categoryFather) {
        categoryFather.subCategories.push({
          id: category.id,
          categoryFather: category.categoriaPai.id,
          description: category.descricao,
          products: await requestProductsInformations(
            token,
            await requestAllProductsByCategory(
              token,
              category.id
            )
          ),
        });

        delay(500);
      }
    }

  };

  return Array.from(categoriesMap.values());
};

const request_products_cache = async (token: string) => {
  if (!token) {
    console.log('No token found');
    return;
  }

  console.log('Requesting products cache started...');


  try {
    const categories = await requestAllCategories(token);

    writeFileSync(pathChacheFile, JSON.stringify(categories, null, 2));
  } catch (error) {
    console.error('Error in request_products_cache:', error);
    request_products_cache(token);
  }
};

export default request_products_cache;
