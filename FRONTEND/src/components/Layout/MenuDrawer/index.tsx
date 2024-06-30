import CloseIcon from '@mui/icons-material/Close';
import { Divider, Drawer, IconButton } from '@mui/material';
import React from 'react';
import Menu from '../../UI/Menu';

interface MenuDrawerProps {
  menuDrawerOpen: boolean;
  setMenuDrawerOpen: (menuDrawerOpen: boolean) => void;
}

const MenuDrawer: React.FC<MenuDrawerProps> = ({ menuDrawerOpen, setMenuDrawerOpen }) => {
  return (
    <Drawer
      open={menuDrawerOpen}
      onClose={() => setMenuDrawerOpen(!menuDrawerOpen)}
      sx={{
        width: 310,
        '& .MuiDrawer-paper': { width: 310 },
      }}
    >
      <div className="flex justify-between items-center p-4">
        <h1 className="font-heading uppercase text-1xl">Categorias</h1>
        <IconButton onClick={() => setMenuDrawerOpen(!menuDrawerOpen)}>
          <CloseIcon />
        </IconButton>
      </div>
      <Divider />
      <div>
        <Menu
          onClose={() => setMenuDrawerOpen(!menuDrawerOpen)}
          shouldCloseOnSubcategoryClick={true}
        />
      </div>
    </Drawer>
  );
};

export default MenuDrawer;
