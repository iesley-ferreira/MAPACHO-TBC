import { ExpandLess, ExpandMore } from '@mui/icons-material';
import { Collapse, List, ListItem, ListItemText } from '@mui/material';
import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { IFormattedSubcategory } from '../../../interfaces/Category';
import {
  clearFilteredProducts,
  setDisableButtonShowMore,
  setNewCategoryNames,
  setPage,
  setSearchValue,
  setSelectedCategory,
} from '../../../store/ducks/products/actions';
import { RootState } from '../../../store/ducks/rootReducer';

interface MenuProps {
  onClose?: () => void;
  shouldCloseOnSubcategoryClick?: boolean;
}

const Menu: React.FC<MenuProps> = ({ onClose, shouldCloseOnSubcategoryClick = true }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [expandedItemId, setExpandedItemId] = useState<number | null>(null);
  const { formattedCategories } = useSelector((state: RootState) => state.categories);

  const renderSubcategory = (categoryId: number, categoryName: string) => {
    const subCategoriesByCategory = formattedCategories.find(
      (category) => category.id === categoryId.toString(),
    )?.subcategories;

    if (subCategoriesByCategory?.length === 0) {
      navigate(`/categoria/${categoryName}?idCategoria=${categoryId}`);
      dispatch(setDisableButtonShowMore(false));
      dispatch(setSearchValue(null));
      dispatch(setSelectedCategory(categoryId.toString()));
      dispatch(
        setNewCategoryNames({
          newCategoryName: categoryName,
          newSubCategoryName: null,
        }),
      );
      dispatch(clearFilteredProducts());
      dispatch(setPage(1));
      if (shouldCloseOnSubcategoryClick && onClose) {
        onClose();
      }
      return;
    }

    setExpandedItemId(expandedItemId === categoryId ? null : categoryId);
  };

  const handleSubcategoryClick = (
    subcategoryId: number,
    categoryId: number,
    categoryName: string,
    subCategoryName: string,
  ) => {
    navigate(
      `/categoria/${categoryName}?idCategoria=${categoryId}&idSubCategoria=${subcategoryId}`,
    );
    dispatch(setDisableButtonShowMore(false));
    dispatch(setSearchValue(null));
    dispatch(setSelectedCategory(subcategoryId.toString()));
    dispatch(
      setNewCategoryNames({
        newCategoryName: categoryName,
        newSubCategoryName: subCategoryName,
      }),
    );
    dispatch(clearFilteredProducts());

    dispatch(setPage(1));
    if (shouldCloseOnSubcategoryClick && onClose) {
      onClose();
    }
  };

  const getSubCategories = (parentId: number) => {
    return formattedCategories.find((category) => category.id === parentId.toString())
      ?.subcategories;
  };

  return (
    <List
      sx={{
        pt: 2,
      }}
    >
      {formattedCategories.map((category) => (
        <React.Fragment key={category.id}>
          <ListItem
            button
            onClick={() => renderSubcategory(Number(category.id), category.description)}
            sx={{
              px: 2,
              py: 1.2,
              mb: 0,
              gap: 3,
              borderBottom: '1px solid #cccc',
              fontSize: 18,
              fontWeight: 500,
              color: '#000',
              backgroundColor:
                expandedItemId?.toString() === category.id ? '#a1989875' : 'inherit',
              fontFamily: 'Cooper Hewitt',
              textTransform: 'uppercase',
            }}
          >
            <ListItemText primary={category.description} disableTypography={true} />
            {expandedItemId?.toString() === category.id ? <ExpandLess /> : <ExpandMore />}
          </ListItem>
          <Collapse
            in={expandedItemId?.toString() === category.id}
            timeout="auto"
            unmountOnExit
          >
            <List
              sx={{
                pl: 0,
                borderRadius: '8px',
              }}
              component="div"
              disablePadding
            >
              {getSubCategories(Number(category.id))?.map(
                (subCategory: IFormattedSubcategory) => (
                  <ListItem
                    button
                    key={subCategory.id}
                    onClick={() =>
                      handleSubcategoryClick(
                        Number(subCategory.id),
                        Number(category.id),
                        category.description,
                        subCategory.description,
                      )
                    }
                    sx={{
                      borderBottom: '1px solid #eee',
                      paddingLeft: '32px',
                      fontSize: 18,
                      fontWeight: 500,
                      textTransform: 'uppercase',
                    }}
                  >
                    <i className="ri-fire-line" style={{ marginRight: '8px' }}></i>
                    <ListItemText
                      primary={subCategory.description}
                      disableTypography={true}
                    />
                  </ListItem>
                ),
              )}
            </List>
          </Collapse>
        </React.Fragment>
      ))}
    </List>
  );
};

export default Menu;
