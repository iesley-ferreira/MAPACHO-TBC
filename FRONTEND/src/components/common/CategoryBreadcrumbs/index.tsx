import { useSelector } from 'react-redux';
import { RootState } from '../../../store/ducks/rootReducer';
import Separator from './Separator';

type CategoryBreadcrumbsProps = {
  selectedCategoryName?: string | null;
  selectedSubCategoryName?: string | null;
  searchValue?: string | null;
  selectedCategoryId?: string | null;
};

const CategoryBreadcrumbs: React.FC<CategoryBreadcrumbsProps> = ({
  selectedCategoryName,
  selectedSubCategoryName,
  searchValue,
}) => {
  const queryParams = new URLSearchParams(location.search);
  const categoryId = queryParams.get('idCategoria');
  const subCategoryId = queryParams.get('idSubCategoria');

  const { formattedCategories } = useSelector((state: RootState) => state.categories);

  const categoryName = formattedCategories.find(
    (category) => category.id === categoryId,
  )?.description;
  const subCategoryName = formattedCategories
    .find((category) => category.id === categoryId)
    ?.subcategories.find((subcategory) => subcategory.id === subCategoryId)?.description;

  return (
    <section className="overflow-hidden py-2 pl-2 md:py-6">
      <div className="flex items-center gap-4 p-2">
        <a
          className="text-sm md:text-base font-bold text-gray-400 hover:text-gray-500"
          href="/home"
        >
          Home
        </a>
        <Separator />
        {searchValue && (
          <a className="text-sm md:text-base font-bold text-gray-400 hover:text-gray-500">
            {searchValue}
          </a>
        )}
        {categoryName && (
          <>
            <p className="text-sm md:text-base font-bold text-gray-400">{categoryName}</p>
            <Separator />
            <p className="text-sm md:text-base font-bold text-gray-500 hover:text-gray-600">
              {subCategoryName}
            </p>
          </>
        )}
      </div>
    </section>
  );
};

export default CategoryBreadcrumbs;
