import { dateFormatter } from './../../../FRONTEND/src/utils/dateFormatter';
import { CategoriesBlingType, CategoriesFormateType } from './../types/Categories.type';
import { writeFileSync } from 'node:fs';
import path from 'node:path';
import bling_request from '../api/bling.request';
import authBlingModel from '../app/models/authBling.model';
import { ProductType } from '../types/Products.type';

interface TypeResponse<T> {
  data: {
    data: T;
  };
}

const pathRaiz = path.resolve(__dirname);

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
          products: await requestProductsInformations(token, await requestAllProductsByCategory(token, category.id)),
        });

        delay(300);
      }
    }

  };

  return Array.from(categoriesMap.values());
};

const main = async () => {
  const token = await authBlingModel.getAuthBling();

  if (!token?.access_token) {
    console.log('No token found');
    return;
  }

  const categories = await requestAllCategories(token.access_token);

  console.log(categories);


  writeFileSync(`${pathRaiz}/categories.json`, JSON.stringify(categories, null, 2));
};

main();
