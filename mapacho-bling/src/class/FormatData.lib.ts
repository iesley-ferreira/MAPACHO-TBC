import { ProductType } from "../interfaces/Products.interface";
import { delay } from "../utils/delay.utils";
import RequestBling from "./RequestBling.lib";

export class FormatData {
  private blingRequest = new RequestBling();

  public async initiFormatData() {
    await this.getAndFormatCategories()
  }


  private async addVariationInProducts(products: ProductType[]) {
    const productsData: any[] = [];

    for (const product of products) {
      const productData = await this.blingRequest.getProductsByVariation(product.id);
      productsData.push(productData.data.data);
      await delay(500);
    }

    return productsData;
  }

  private async getAndFormatCategories() {
    const categoriesMap = new Map();
    const allCategoties = await this.blingRequest.getAllCategories();

    allCategoties.forEach((category) => {
      if (category.categoriaPai.id === 0) {
        categoriesMap.set(category.id, {
          id: category.id,
          description: category.descricao,
          subCategories: [],
        });
      }
    })

    for (const category of allCategoties){
      if (category.categoriaPai.id !== 0) {
        const categoryFather = categoriesMap.get(category.categoriaPai.id);
        if (categoryFather) {
          categoryFather.subCategories.push({
            id: category.id,
            categoryFather: category.categoriaPai.id,
            description: category.descricao,
            products: await this.addVariationInProducts(
              await this.blingRequest.getProductsByCategory(
                category.id
              )
            ),
          });

          // delay(500);
        }
      }
    }

    console.log(Array.from(categoriesMap.values()));


  }
}
