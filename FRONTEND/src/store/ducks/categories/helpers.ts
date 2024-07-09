import { ICategory } from '../../../interfaces/Category';

export function formatCategories(data: ICategory[]) {
  const categoriesMap = new Map();

  data.forEach((category) => {
    if (category.categoriaPai.id === 0) {
      categoriesMap.set(category.id, {
        id: category.id.toString(),
        description: category.descricao,
        subcategories: [],
      });
    }
  });

  data.forEach((category) => {
    if (category.categoriaPai.id !== 0) {
      const parentCategory = categoriesMap.get(category.categoriaPai.id);
      if (parentCategory) {
        parentCategory.subcategories.push({
          id: category.id.toString(),
          description: category.descricao,
        });
      }
    }
  });

  return {
    categories: Array.from(categoriesMap.values()),
  };
}
