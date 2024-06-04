import { ExpandLess, ExpandMore } from '@mui/icons-material'
import {
  Alert,
  Collapse,
  Drawer,
  IconButton,
  List,
  ListItem,
  ListItemText,
  Typography,
} from '@mui/material'
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { fetchCategories } from '../../../actions/categoryActions'
import { AppDispatch, RootState } from '../../../store'

interface DrawerMenuProps {
  isOpen: boolean
  onClose: () => void
}

const DrawerMenu: React.FC<DrawerMenuProps> = ({ isOpen, onClose }) => {
  const dispatch: AppDispatch = useDispatch()
  const { allCategories, allSubCategories, error } = useSelector(
    (state: RootState) => state.categories
  )
  const [expandedItemId, setExpandedItemId] = useState<number | null>(null)
  const [selectedSubcategoryId, setSelectedSubcategoryId] = useState<
    number | null
  >(null)

  useEffect(() => {
    dispatch(fetchCategories())
  }, [dispatch])

  const renderSubcategory = (id: number) => {
    setExpandedItemId(expandedItemId === id ? null : id)
  }

  const handleSubcategoryClick = (subcategoryId: number) => {
    setSelectedSubcategoryId(subcategoryId)
  }

  const getSubCategories = (parentId: number) => {
    return allSubCategories.filter(
      (subCategory) => subCategory.categoriaPai.id === parentId
    )
  }

  return (
    <Drawer
      open={isOpen}
      onClose={onClose}
      sx={{
        width: 310,
        '& .MuiDrawer-paper': { width: 310 },
      }}
    >
      <IconButton
        onClick={onClose}
        sx={{ position: 'absolute', top: 6, right: 10 }}
      >
        <i className="ri-close-fill"></i>
      </IconButton>
      <div style={{ padding: 26 }}>
        <Typography variant="h6" component="div" gutterBottom>
          <i className="ri-menu-4-line" style={{ marginRight: '10px' }}></i>
          Categorias
        </Typography>
        <List>
          {allCategories.map((category) => (
            <React.Fragment key={category.id}>
              <ListItem
                button
                onClick={() => renderSubcategory(category.id)}
                sx={{
                  pl: 2,
                  mb: 0,
                  borderBottom: '1px solid #ccc',
                  backgroundColor:
                    expandedItemId === category.id ? '#f5f5f5' : 'inherit',
                }}
              >
                <ListItemText primary={category.descricao} />
                {expandedItemId === category.id ? (
                  <ExpandLess />
                ) : (
                  <ExpandMore />
                )}
              </ListItem>
              <Collapse
                in={expandedItemId === category.id}
                timeout="auto"
                unmountOnExit
              >
                <List
                  sx={{
                    pl: 2,
                    backgroundColor: '#f9f9f9',
                    borderRadius: '8px',
                  }}
                  component="div"
                  disablePadding
                >
                  {getSubCategories(category.id).map((subCategory) => (
                    <ListItem
                      button
                      key={subCategory.id}
                      onClick={() => handleSubcategoryClick(subCategory.id)}
                      sx={{ borderBottom: '1px solid #eee' }}
                    >
                      <i
                        className="ri-fire-line"
                        style={{ marginRight: '8px' }}
                      ></i>
                      <ListItemText primary={subCategory.descricao} />
                    </ListItem>
                  ))}
                </List>
              </Collapse>
            </React.Fragment>
          ))}
        </List>
      </div>
      {error && <Alert severity="error">{error}</Alert>}
    </Drawer>
  )
}

export default DrawerMenu
