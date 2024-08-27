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
      onClose={() => setMenuDrawerOpen(false)}
      sx={{
        width: 310,
        '& .MuiDrawer-paper': { width: 310 },
      }}
    >
      <div className="flex justify-between items-center p-2">
        <h1 className="font-heading uppercase font-semibold text-2xl py-2 pl-3 mt-2">
          Menu
        </h1>
        <IconButton onClick={() => setMenuDrawerOpen(false)}>
          <CloseIcon style={{ fontSize: '30px' }} />
        </IconButton>
      </div>
      <Divider />
      <div>
        <Menu onClose={() => setMenuDrawerOpen(false)} />
      </div>
    </Drawer>
  );
};

export default MenuDrawer;
