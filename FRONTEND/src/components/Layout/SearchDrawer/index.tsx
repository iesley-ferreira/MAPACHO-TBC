import { Drawer } from '@mui/material';
import React, { useEffect, useRef, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import {
  setDisableButtonShowMore,
  setPage,
  setSearchValue,
  setSelectedCategory,
} from '../../../store/ducks/products/actions';

interface SearchDrawerProps {
  searchDrawerOpen: boolean;
  setSearchDrawerOpen: (searchDrawerOpen: boolean) => void;
}

const SearchDrawer: React.FC<SearchDrawerProps> = ({
  searchDrawerOpen,
  setSearchDrawerOpen,
}) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [search, setSearch] = useState('');
  // const isMobile = useMediaQuery('(max-width: 768px)');
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (searchDrawerOpen) {
      const timer = setTimeout(() => {
        if (inputRef.current) {
          inputRef.current.focus();
        }
      }, 300); // Aguarde 300ms para garantir que o Drawer esteja completamente aberto
      return () => clearTimeout(timer);
    }
  }, [searchDrawerOpen]);

  const handleSearch = () => {
    navigate(`?search=${search}`);
    dispatch(setDisableButtonShowMore(false));
    dispatch(setSelectedCategory(null));
    // dispatch(
    //   setNewCategoryNames({
    //     newCategoryName: null,
    //     newSubCategoryName: null,
    //   }),
    // );
    dispatch(setSearchValue(search));
    dispatch(setPage(1));
    // setShowSearch(false);
    setSearchDrawerOpen(!searchDrawerOpen);
    // setOverlayVisible(false);
  };

  return (
    <Drawer
      anchor="top"
      open={searchDrawerOpen}
      onClose={() => setSearchDrawerOpen(!searchDrawerOpen)}
      sx={{
        '& .MuiDrawer-paper': {
          width: '100%',
          height: 70,
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          boxShadow: '0 4px 10px rgba(0, 0, 0, 0.25)',
        },
      }}
    >
      <div className="absolute flex flex-row justify-center w-full h-full px-4 py-2 md:px-[20%] lg:px-[30%] ">
        <input
          ref={inputRef}
          type="text"
          placeholder="Pesquisar..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full uppercase py-auto rounded-none pl-4 pr-10 focus:outline-none focus:border-gray-500 border-b border-gray-300 text-2xl placeholder:text-2xl"
        />
        <button
          className="relative inset-y-0 h-auto right-[50px] w-0 flex items-center  text-gray-500 hover:text-gray-700"
          onClick={handleSearch}
        >
          <i className="ri-search-line text-2xl"></i>
        </button>
      </div>
    </Drawer>
  );
};

export default SearchDrawer;
