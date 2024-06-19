import { Badge } from '@mui/material';
import { BadgeProps } from '@mui/material/Badge';
import { styled } from '@mui/material/styles';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useMatch, useNavigate } from 'react-router-dom';
import 'remixicon/fonts/remixicon.css';
import {
  setDisableButtonShowMore,
  setNewCategoryNames,
  setPage,
  setSearchValue,
  setSelectedCategory,
} from '../../../store/ducks/products/actions';
import { RootState } from '../../../store/ducks/rootReducer';
import Logo01 from '../../common/Logo/Logo01';

interface HeaderProps {
  showMenu: boolean;
  drawerOpen: boolean;
  setShowMenu: (show: boolean) => void;
  setDrawerOpen: (drawerOpen: boolean) => void;
}

const brandSecondaryColor = 'var(--brand-secondary)';

const StyledBadge = styled(Badge)<BadgeProps>(() => ({
  '& .MuiBadge-badge': {
    right: -2,
    top: 7,
    color: '#f3af16',
    backgroundColor: '#0d5e53',
    fontFamily: 'Arial, sans-serif',
    fontSize: '0.65rem',
    fontWeight: 'bold',
    padding: '0',
    maxWidth: '15px',
    width: '15px',
    minWidth: '15px',
    height: '15px',
  },
}));

const Header: React.FC<HeaderProps> = ({
  showMenu,
  setShowMenu,
  drawerOpen,
  setDrawerOpen,
}) => {
  const { items } = useSelector((state: RootState) => state.cart);
  const [showSearch, setShowSearch] = useState(false);
  // const isMobile = useMediaQuery('(max-width: 768px)');
  const navigate = useNavigate();
  const matchHome = useMatch('/');
  const matchCategory = useMatch('/categoria/:categoryId');
  const matchSubcategory = useMatch('/subcategoria/:subcategoryId');
  const [animateBadge, setAnimateBadge] = useState(false);
  const [prevScrollPos, setPrevScrollPos] = useState(0);
  const [visible, setVisible] = useState(true);
  const [search, setSearch] = useState('');
  const dispatch = useDispatch();
  const totalItems = items.reduce((sum, item) => sum + item.quantidade, 0);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollPos = window.pageYOffset;
      const windowHeight = window.innerHeight;
      const threshold = windowHeight * 0.4;
      const isVisible = prevScrollPos > currentScrollPos || currentScrollPos < threshold;

      setVisible(isVisible);
      setPrevScrollPos(currentScrollPos);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [prevScrollPos]);

  useEffect(() => {
    if (items.length > 0) {
      setAnimateBadge(true);
      setTimeout(() => setAnimateBadge(false), 300);
    }
  }, [items]);

  const toggleMenu = () => {
    setShowMenu(!showMenu);
  };

  const toggleCartDrawer = () => {
    setDrawerOpen(!drawerOpen);
  };

  const toggleSearch = () => {
    setShowSearch(!showSearch);
  };

  const handleSearch = () => {
    console.log('SEARCH:', search);

    setShowSearch(false);
    navigate(`/?search=${search}`);
    dispatch(setDisableButtonShowMore(false));
    dispatch(setSelectedCategory(null));
    dispatch(
      setNewCategoryNames({
        newCategoryName: null,
        newSubCategoryName: null,
      }),
    );
    dispatch(setSearchValue(search));
    dispatch(setPage(1));
  };

  return (
    <>
      <header
        className={`bg-brand-primary flex items-center justify-between px-6 py-2 text-xl shadow-md transition-transform duration-300 ${
          visible ? 'translate-y-0' : '-translate-y-full'
        }`}
        style={{ position: 'fixed', top: 0, width: '100%', zIndex: 10 }}
      >
        {(matchHome || matchCategory || matchSubcategory) && (
          <button onClick={toggleMenu}>
            <i className="ri-menu-fill text-brand-secondary"></i>
          </button>
        )}

        <div>
          <Link to="/">
            <Logo01 color={brandSecondaryColor} strokeWidth={2} />
          </Link>
        </div>
        <nav className="flex items-center gap-4">
          <button onClick={toggleSearch}>
            <i className="ri-search-line text-brand-secondary"></i>
          </button>
          <button
            className="text-brand-secondary hover:scale-105"
            onClick={toggleCartDrawer}
          >
            <StyledBadge
              badgeContent={totalItems}
              color="secondary"
              className={animateBadge ? 'animate-wiggle' : ''}
            >
              <i className="ri-shopping-cart-line text-xl hover:scale-105"></i>
            </StyledBadge>
          </button>
          <Link to="/usuario" className="text-brand-secondary hover:scale-105">
            <i className="ri-user-3-line text-xl hover:scale-105"></i>
          </Link>
        </nav>
      </header>
      {showSearch && visible && (
        <div
          className="relative w-full px-4 py-2"
          style={{
            marginTop: '40px',
            position: 'fixed',
            top: '60px',
            zIndex: 9,
          }}
        >
          <input
            type="text"
            placeholder="Pesquisar..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full p-2 pr-10 border border-gray-300 rounded-md shadow focus:outline-none focus:ring-1 focus:ring-brand-secondary focus:border-transparent"
          />
          <button
            onClick={handleSearch}
            className="absolute inset-y-0 right-0 flex items-center px-3 text-gray-500 hover:text-gray-700"
          >
            <i className="ri-close-line px-4"></i>
          </button>
        </div>
      )}
    </>
  );
};

export default Header;
