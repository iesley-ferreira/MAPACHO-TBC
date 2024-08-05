import KeyboardArrowRightIcon from '@mui/icons-material/KeyboardArrowRight';
import { useSelector } from 'react-redux';
import { RootState } from '../../../store/ducks/rootReducer';

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
          className="text-[#1e293b] font-semibold uppercase text-opacity-70 text-xs sm:text-sm md:text-md"
          href="#"
        >
          Home
        </a>
        <KeyboardArrowRightIcon style={{ color: '#586477' }} />
        {searchValue && (
          <a className="text-[#1e293b] font-semibold uppercase text-opacity-70 text-xs sm:text-sm md:text-md">
            {searchValue}
          </a>
        )}
        {categoryName && (
          <>
            <a className="text-[#1e293b] font-semibold uppercase text-opacity-70 text-xs sm:text-sm md:text-md">
              {categoryName}
            </a>
            <KeyboardArrowRightIcon style={{ color: '#586477' }} />
            <a className="text-[#1e293b] font-semibold uppercase text-opacity-70 text-xs sm:text-sm md:text-md">
              {subCategoryName}
            </a>
          </>
        )}
      </div>
    </section>
  );
};

export default CategoryBreadcrumbs;
