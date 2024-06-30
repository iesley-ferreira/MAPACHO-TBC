import { ExpandLess, ExpandMore } from '@mui/icons-material';
import { Collapse, List, ListItem, ListItemText } from '@mui/material';
import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { Category } from '../../../store/ducks/categories/types';
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
  const { categories, subCategories } = useSelector(
    (state: RootState) => state.categories,
  );

  const renderSubcategory = (id: number, categoryName: string) => {
    const subCategoriesByCategory = subCategories.filter(
      (s: Category) => s.categoriaPai.id === id,
    );

    if (subCategoriesByCategory.length === 0) {
      const currentUrlParams = new URLSearchParams();
      currentUrlParams.set('idCategoria', id.toString());
      navigate(`/home?${currentUrlParams.toString()}`);
      dispatch(setDisableButtonShowMore(false));
      dispatch(setSearchValue(null));
      dispatch(setSelectedCategory(id.toString()));
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

    setExpandedItemId(expandedItemId === id ? null : id);
  };

  const handleSubcategoryClick = (
    subcategoryId: number,
    categoryName: string,
    subCategoryName: string,
  ) => {
    const currentUrlParams = new URLSearchParams();
    currentUrlParams.set('idSubCategoria', subcategoryId.toString());
    navigate(`/home?${currentUrlParams.toString()}`);
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
    return subCategories.filter((s: Category) => s.categoriaPai.id === parentId);
  };

  return (
    <List
      sx={{
        pt: 2,
      }}
    >
      {categories
        .filter((c) => c.categoriaPai.id === 0)
        .map((category) => (
          <React.Fragment key={category.id}>
            <ListItem
              button
              onClick={() => renderSubcategory(category.id, category.descricao)}
              sx={{
                px: 2,
                py: 1.2,
                mb: 0,
                gap: 3,
                borderBottom: '1px solid #cccc',
                backgroundColor: expandedItemId === category.id ? '#f5f5f5' : 'inherit',
                fontFamily: 'Montserrat, sans-serif',
              }}
            >
              <ListItemText primary={category.descricao} disableTypography={true} />
              {expandedItemId === category.id ? <ExpandLess /> : <ExpandMore />}
            </ListItem>
            <Collapse in={expandedItemId === category.id} timeout="auto" unmountOnExit>
              <List
                sx={{
                  pl: 0,
                  borderRadius: '8px',
                }}
                component="div"
                disablePadding
              >
                {getSubCategories(category.id).map((subCategory: Category) => (
                  <ListItem
                    button
                    key={subCategory.id}
                    onClick={() =>
                      handleSubcategoryClick(
                        subCategory.id,
                        category.descricao,
                        subCategory.descricao,
                      )
                    }
                    sx={{ borderBottom: '1px solid #eee', paddingLeft: '32px' }}
                  >
                    <i className="ri-fire-line" style={{ marginRight: '8px' }}></i>
                    <ListItemText
                      primary={subCategory.descricao}
                      disableTypography={true}
                    />
                  </ListItem>
                ))}
              </List>
            </Collapse>
          </React.Fragment>
        ))}
    </List>
  );
};

export default Menu;
