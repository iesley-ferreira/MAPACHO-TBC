import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { IFormattedCategory, IFormattedSubcategory } from '../../../interfaces/Category';
import {
  clearFilteredProducts,
  setDisableButtonShowMore,
  setNewCategoryNames,
  setPage,
  setSearchValue,
  setSelectedCategory,
} from '../../../store/ducks/products/actions';
import { RootState } from '../../../store/ducks/rootReducer';

interface CategoryShowcaseProps {
  subcategory: IFormattedSubcategory;
  image: string;
  category: IFormattedCategory;
  // onClick: () => void;
}

const SubCategoryCard: React.FC<CategoryShowcaseProps> = ({
  subcategory,
  image,
  category,
  // onClick,
}) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { formattedCategories } = useSelector((state: RootState) => state.categories);
  const queryParams = new URLSearchParams(location.search);
  const subCategoryId = queryParams.get('idSubCategoria');

  const handleSubCategoryClick = (
    subcategoryId: number,
    categoryId: number,
    categoryName: string,
    subCategoryName: string,
  ) => {
    // onClick();
    navigate(
      `/categoria/${categoryName}?idCategoria=${categoryId}&idSubCategoria=${subcategoryId}`,
    );
    dispatch(setDisableButtonShowMore(false));
    dispatch(setSearchValue(null));
    dispatch(setSelectedCategory(categoryId.toString()));
    dispatch(
      setNewCategoryNames({
        newCategoryName: categoryName,
        newSubCategoryName: subCategoryName,
      }),
    );
    dispatch(clearFilteredProducts());
    dispatch(setPage(1));
  };

  return (
    <div className="w-full md:w-1/2 lg:w-1/3 xl:w-1/4 px-4">
      <div className="relative mb-8 overflow-hidden shadow-[4.0px_8.0px_8.0px_rgba(0,0,0,0.38)]  rounded-3xl">
        <img
          className="w-full h-full max-h-[295px] object-cover transform hover:scale-125 transition duration-1000"
          src={image}
          alt={subcategory.description}
        />
        <div className="absolute bg-[rgba(40,40,40,0.32)] shadow-[0_4px_30px_rgba(0,0,0,0.1)] backdrop-blur-sm flex items-start flex-col bottom-0 left-0 w-full bg-gradient-card px-8 py-3">
          <button
            className="group flex flex-col max-w-sm"
            onClick={() =>
              handleSubCategoryClick(
                Number(subcategory.id),
                Number(subcategory.id),
                category.description,
                subcategory.description,
              )
            }
          >
            <h3 className="mb-1 text-3xl font-medium text-left text-white tracking-3xl hover:underline">
              {subcategory.description}
            </h3>

            <div className="group inline-flex items-center min-h-[2rem]">
              {subcategory.id !== subCategoryId && (
                <>
                  <span className="mr-2 text-white font-medium">Ver mais</span>
                  <i className="ri-arrow-right-up-line text-gray-50 text-2xl text transform group-hover:rotate-90 transition duration-300"></i>
                </>
              )}
            </div>
          </button>
        </div>
      </div>
    </div>
  );
};

export default SubCategoryCard;
