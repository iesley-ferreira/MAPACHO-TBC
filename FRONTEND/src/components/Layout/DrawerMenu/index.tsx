import { ExpandLess, ExpandMore } from '@mui/icons-material'
import {
  Collapse,
  Drawer,
  IconButton,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Typography,
} from '@mui/material'
import React, { useState } from 'react'
interface DrawerMenuProps {
  isOpen: boolean
  onClose: () => void
}

const DrawerMenu: React.FC<DrawerMenuProps> = ({ isOpen, onClose }) => {
  const [open, setOpen] = useState({
    Bongs: false,
    Sedas: false,
    Pipes: false,
    Trituradores: false,
  })

  const handleClick = (item: string) => {
    setOpen((prevState) => ({ ...prevState, [item]: !prevState[item] }))
  }

  return (
    <Drawer
      anchor="left"
      open={isOpen}
      onClose={onClose}
      sx={{ width: 310, '& .MuiDrawer-paper': { width: 310 } }}
    >
      <IconButton
        onClick={onClose}
        sx={{ position: 'absolute', top: 7, right: 9 }}
      >
        <i className="ri-close-fill"></i>
      </IconButton>
      <div style={{ padding: 26 }}>
        <Typography variant="h6" component="div" gutterBottom>
          Categorias
        </Typography>
        <List onClick={onClose} onKeyDown={onClose}>
          {['Bongs', 'Sedas', 'Pipes', 'Trituradores'].map((text, index) => (
            <React.Fragment key={index}>
              <ListItem button onClick={() => handleClick(text)}>
                <ListItemIcon>
                  <i className="ri-play-fill"></i>
                </ListItemIcon>
                <ListItemText primary={text} />
                {open[text] ? <ExpandLess /> : <ExpandMore />}
              </ListItem>
              <Collapse in={open[text]} timeout="auto" unmountOnExit>
                <List component="div" disablePadding>
                  <ListItem button sx={{ pl: 4 }}>
                    <ListItemText primary={`Sub-item de ${text}`} />
                  </ListItem>
                </List>
              </Collapse>
            </React.Fragment>
          ))}
        </List>
      </div>
    </Drawer>
  )
}
export default DrawerMenu
