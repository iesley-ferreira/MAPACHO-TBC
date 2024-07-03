import { Badge, useMediaQuery } from '@mui/material';
import { BadgeProps } from '@mui/material/Badge';
import { styled } from '@mui/material/styles';
import queryString from 'query-string';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useMatch, useNavigate } from 'react-router-dom';
import 'remixicon/fonts/remixicon.css';
import { fetchCategoriesRequest } from '../../../store/ducks/categories/actions';
import { RootState } from '../../../store/ducks/rootReducer';
import Logo01 from '../../common/Logo/Logo01';

interface HeaderProps {
  menuDrawerOpen: boolean;
  cartDrawerOpen: boolean;
  searchDrawerOpen: boolean;
  setMenuDrawerOpen: (menuDrawerOpen: boolean) => void;
  setCartDrawerOpen: (cartDrawerOpen: boolean) => void;
  setSearchDrawerOpen: (searchDrawerOpen: boolean) => void;
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
  menuDrawerOpen,
  cartDrawerOpen,
  searchDrawerOpen,
  setMenuDrawerOpen,
  setCartDrawerOpen,
  setSearchDrawerOpen,
}) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { items } = useSelector((state: RootState) => state.cart);
  const [showSearch, setShowSearch] = useState(false);
  const isMobile = useMediaQuery('(max-width: 768px)');
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
  const { idProduto } = queryString.parse(location.search);
  const matchCart = useMatch('/carrinho');
  const totalItems = items.reduce((sum, item) => sum + item.quantidade, 0);

  useEffect(() => {
    dispatch(fetchCategoriesRequest());
  }, []);

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
    setMenuDrawerOpen(!menuDrawerOpen);
  };

  const toggleCartDrawer = () => {
    setCartDrawerOpen(!cartDrawerOpen);
  };

  return (
    <>
      <header
        className={`bg-brand-primary flex items-center justify-between px-6 py-2 text-xl shadow-md w-full fixed top-0 z-10 transition-transform duration-300 ${
          visible ? 'translate-y-0' : '-translate-y-full'
        }`}
      >
        {(matchHome || matchCategory || matchSubcategory) && (
          <button onClick={toggleMenu} className="lg:hidden">
            <i className="ri-menu-fill text-brand-secondary"></i>
          </button>
        )}

        <div className="lg:px-12">
          <Link to="/">
            <Logo01 color={brandSecondaryColor} strokeWidth={2} />
          </Link>
        </div>
        <nav className="flex items-center gap-4 lg:gap-9 lg:px-8">
          {!matchCart &&
            !isLoginRoute &&
            !isSignUpRoute &&
            !isAuthRoute &&
            !isUserRoute && (
              <button onClick={() => setSearchDrawerOpen(!searchDrawerOpen)}>
                <i
                  className={`ri-search-line text-brand-secondary md:text-2xl lg:text-3xl ${searchDrawerOpen || idProduto ? 'hidden' : ''}`}
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
                <i className="ri-shopping-cart-line text-xl md:text-2xl lg:text-3xl hover:scale-105"></i>
              </StyledBadge>
            </button>
          )}
          <Link to="/usuario" className="text-brand-secondary hover:scale-105">
            <i className="ri-user-3-line text-xl md:text-2xl lg:text-3xl hover:scale-105"></i>
          </Link>
        </nav>
      </header>
    </>
  );
};

export default Header;
