import { Badge, useMediaQuery } from '@mui/material';
import { BadgeProps } from '@mui/material/Badge';
import { styled } from '@mui/material/styles';
import queryString from 'query-string';
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
  const isMobile = useMediaQuery('(max-width: 768px)');
  const navigate = useNavigate();
  const matchHome = useMatch('/home');
  const matchCategory = useMatch('/categoria/:categoryId');
  const matchSubcategory = useMatch('/subcategoria/:subcategoryId');
  const isLoginRoute = useMatch('/login');
  const isSignUpRoute = useMatch('/cadastro');
  const isUserRoute = useMatch('/usuario');
  const isAuthRoute = useMatch('/autenticacao');
  const [animateBadge, setAnimateBadge] = useState(false);
  const [prevScrollPos, setPrevScrollPos] = useState(0);
  const [visible, setVisible] = useState(true);
  const [search, setSearch] = useState('');
  const dispatch = useDispatch();
  const [isSearchFocused, setIsSearchFocused] = useState(false);
  const [overlayVisible, setOverlayVisible] = useState(false);
  const { idProduto } = queryString.parse(location.search);
  const matchCart = useMatch('/carrinho');
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
    if (!showSearch && isMobile) {
      setOverlayVisible(true);
    } else {
      setOverlayVisible(false);
    }
  };

  const handleSearch = () => {
    navigate(`?search=${search}`);
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
    setShowSearch(false);
    setOverlayVisible(false);
  };

  const closeSearch = () => {
    setShowSearch(false);
    setOverlayVisible(false);
  };

  const handleSearchFocus = () => {
    setIsSearchFocused(true);
  };

  const handleSearchBlur = () => {
    setIsSearchFocused(false);
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
          {!matchCart &&
            !isLoginRoute &&
            !isSignUpRoute &&
            !isAuthRoute &&
            !isUserRoute && (
              <button onClick={toggleSearch}>
                <i
                  className={`ri-search-line text-brand-secondary ${showSearch || idProduto ? 'hidden' : ''}`}
                ></i>
              </button>
            )}
          {!matchCart && (
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
          )}
          <Link to="/usuario" className="text-brand-secondary hover:scale-105">
            <i className="ri-user-3-line text-xl hover:scale-105"></i>
          </Link>
        </nav>
      </header>
      {overlayVisible && (
        <div
          className="fixed inset-0 bg-black opacity-50 z-50"
          onClick={closeSearch}
        ></div>
      )}
      {showSearch && visible && (
        <div
          className="relative w-3/5 px-4 py-2"
          style={{
            width: isMobile ? '80%' : '40%',
            maxWidth: '420px',
            position: 'fixed',
            zIndex: 51,
            top: isMobile ? '80px' : '30px',
            left: '50%',
            transform: 'translate(-50%, -50%)',
          }}
        >
          <input
            type="text"
            placeholder="Pesquisar..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className={`w-full p-2 pl-10 pr-10 border border-gray-300 rounded-md shadow focus:outline-none focus:ring-1 focus:ring-brand-secondary focus:border-transparent ${isSearchFocused ? 'ring-2 ring-brand-secondary' : ''}`}
            onFocus={handleSearchFocus}
            onBlur={handleSearchBlur}
          />
          <button
            className="absolute inset-y-0 h-auto right-5 flex items-center px-3 text-gray-500 hover:text-gray-700"
            onClick={handleSearch}
          >
            <i className="ri-search-line"></i>
          </button>
          <button
            className="absolute inset-y-0 left-0 flex items-center px-3 text-gray-500 hover:text-gray-700"
            onClick={closeSearch}
          >
            <i className="ri-close-line px-4"></i>
          </button>
        </div>
      )}
    </>
  );
};

export default Header;
