import { ExpandLess, ExpandMore } from '@mui/icons-material';
import {
  Collapse,
  Drawer,
  IconButton,
  List,
  ListItem,
  ListItemText,
} from '@mui/material';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { fetchCategoriesRequest } from '../../../store/ducks/categories/actions';
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

interface DrawerMenuProps {
  isOpen: boolean;
  onClose: () => void;
}

const DrawerMenu: React.FC<DrawerMenuProps> = ({ isOpen, onClose }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { categories, subCategories } = useSelector(
    (state: RootState) => state.categories,
  );
  const [expandedItemId, setExpandedItemId] = useState<number | null>(null);

  useEffect(() => {
    dispatch(fetchCategoriesRequest());
  }, [dispatch]);

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
      onClose();
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
    onClose();
  };

  const getSubCategories = (parentId: number) => {
    return subCategories.filter((s: Category) => s.categoriaPai.id === parentId);
  };

  return (
    <Drawer
      open={isOpen}
      onClose={onClose}
      sx={{
        width: 310,
        '& .MuiDrawer-paper': { width: 310 },
      }}
    >
      <IconButton onClick={onClose} sx={{ position: 'absolute', top: 6, right: 10 }}>
        <i className="ri-close-fill"></i>
      </IconButton>
      <div style={{ padding: 26 }}>
        <h1 className="font-heading uppercase text-1xl">Categorias</h1>
        <List>
          {categories
            .filter((c) => c.categoriaPai.id === 0)
            .map((category) => (
              <React.Fragment key={category.id}>
                <ListItem
                  button
                  onClick={() => renderSubcategory(category.id, category.descricao)}
                  sx={{
                    pl: 2,
                    mb: 0,
                    borderBottom: '1px solid #ccc',
                    backgroundColor:
                      expandedItemId === category.id ? '#a1cebd' : 'inherit',
                  }}
                >
                  <ListItemText primary={category.descricao} />
                  {expandedItemId === category.id ? <ExpandLess /> : <ExpandMore />}
                </ListItem>
                <Collapse
                  in={expandedItemId === category.id}
                  timeout="auto"
                  unmountOnExit
                >
                  <List
                    sx={{
                      pl: 2,
                      // backgroundColor: '#f9f9f9',
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
                        sx={{ borderBottom: '1px solid #eee' }}
                      >
                        <i className="ri-fire-line" style={{ marginRight: '8px' }}></i>
                        <ListItemText primary={subCategory.descricao} />
                      </ListItem>
                    ))}
                  </List>
                </Collapse>
              </React.Fragment>
            ))}
        </List>
      </div>
    </Drawer>
  );
};

export default DrawerMenu;
