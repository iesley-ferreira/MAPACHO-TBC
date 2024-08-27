import {
  Description,
  Dialog,
  DialogBackdrop,
  DialogPanel,
  DialogTitle,
} from '@headlessui/react';
import CheckIcon from '@mui/icons-material/Check';
import ClearIcon from '@mui/icons-material/Clear';
import { Button, List, ListItem } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { insufficientStockItems } from '../../../interfaces/payment';
import { IProduct } from '../../../interfaces/Product';
interface InsufficientStockModalProps {
  show: boolean;
  onHide: () => void;
  insufficientStockItems: insufficientStockItems[];
}

const InsufficientStockModal: React.FC<InsufficientStockModalProps> = ({
  show,
  onHide,
  insufficientStockItems,
}) => {
  const [cartItems, setCartItems] = useState<IProduct[]>([]);
  const [insufficientStockItemsNames, setInsufficientStockItemsNames] = useState<
    string[]
  >([]);

  useEffect(() => {
    const storedCartItems = localStorage.getItem('cart');
    if (storedCartItems) {
      setCartItems(JSON.parse(storedCartItems));
    }
  }, []);

  useEffect(() => {
    if (cartItems.length > 0 && insufficientStockItems.length > 0) {
      const names = insufficientStockItems.map((insufficientItem) => {
        const cartItem = cartItems.find(
          (item) => item.id.toString() === insufficientItem.id.toString(),
        );

        if (cartItem) {
          return cartItem.nome;
        }
        return '';
      });

      setInsufficientStockItemsNames(names);
    }
  }, [insufficientStockItems]);

  const handleClick = () => {};

  return (
    <>
      <Dialog open={show} transition onClose={handleClick} className="relative z-50">
        <DialogBackdrop className="fixed inset-0 bg-black/30" />

        <div className="fixed inset-0 flex w-screen items-center justify-center p-4">
          <DialogPanel className="max-w-lg space-y-4 bg-white p-12">
            <DialogTitle
              style={{ fontFamily: 'Cooper Hewitt' }}
              className="font-bold uppercase"
            >
              Produtos com falta de estoque
            </DialogTitle>
            <Description style={{ fontFamily: 'Cooper Hewitt' }}>
              Ajustaremos os produtos em seu carrinho, para que você possa finalizar a
              compra.
            </Description>
            <List>
              {insufficientStockItemsNames.map((name, index) => (
                <ListItem key={index}>
                  <div className="flex flex-row items-center w-2/3">
                    <ClearIcon fontSize="small" sx={{ mr: 1, color: 'red' }} />
                    <Description style={{ fontFamily: 'Cooper Hewitt' }}>
                      {name}
                    </Description>
                  </div>
                  <Description style={{ margin: '5px' }}></Description>
                  <div className="flex flex-row w-1/3">
                    {insufficientStockItems[index].availableQuantity > 0 ? (
                      <CheckIcon fontSize="small" sx={{ mr: 1, color: 'green' }} />
                    ) : (
                      <ClearIcon fontSize="small" sx={{ mr: 1, color: 'red' }} />
                    )}
                    <Description style={{ fontFamily: 'Cooper Hewitt' }}>
                      Qtd: {insufficientStockItems[index].availableQuantity}
                    </Description>
                  </div>
                </ListItem>
              ))}
            </List>

            <div className="flex justify-end">
              <Button onClick={onHide} variant="contained">
                Fechar
              </Button>
            </div>
          </DialogPanel>
        </div>
      </Dialog>
    </>
  );
};

export default InsufficientStockModal;
