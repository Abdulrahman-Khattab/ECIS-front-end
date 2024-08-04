import {
  Box,
  Menu,
  MenuItem,
  Tooltip,
  IconButton,
  AppBar,
  Toolbar,
  Container,
  Typography,
  Button,
  Avatar,
} from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import AdbIcon from '@mui/icons-material/Adb';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useGlobalCartContext } from '../cart_Page/cart_context';
import { useGlobalAuthContext } from '../auth/authContext';
import { useNavigate } from 'react-router-dom';
import { useGlobalUserManagment } from '../userManagment/userManagmentContext';
//import logo2 from '../static_resource/logo2.png';
//const pages = ['products', 'Pricing', 'Blog', 'potato'];
//const settings = ['Profile', 'Account', 'Dashboard', 'Logout'];

const NavBar = ({ pages, settings }) => {
  const { currentUserInfo } = useGlobalUserManagment();

  const { role } = currentUserInfo;

  const navigate = useNavigate();
  const { handleOpenCart } = useGlobalCartContext();
  const [anchorElNav, setAnchorElNav] = useState(null);
  const [anchorElUser, setAnchorElUser] = useState(null);
  const [openSideCart, setOpenSideCart] = useState(false);
  const { logoutRequest } = useGlobalAuthContext();

  const manager = [
    'الصفحه الرئيسيه',
    'صنع حساب خاص',
    'المنتجات',
    'عربه التسوق',
    'ادخال منتجات',
    'معلومات المستخدمين',
    'معلوماتي',
    'معلومات المنتجات',
    'معلومات وصولات الشراء',
    'ادخال وصل شراء',
    'معلومات وصولات القبض',
    'ادخال وصل قبض',
    'صفحة المبيعات',
    'تقرير المبيعات',
    'مشترياتي',
    'صفحة الكاشير',
  ];

  const admin = [
    'الصفحه الرئيسيه',
    'المنتجات',
    'عربه التسوق',
    'ادخال منتجات',
    'معلومات المستخدمين',
    'معلوماتي',
    'معلومات المنتجات',
    'معلومات وصولات الشراء',
    'ادخال وصل شراء',
    'معلومات وصولات القبض',
    'ادخال وصل قبض',
    'صفحة المبيعات',
    'تقرير المبيعات',
    'مشترياتي',
    'صفحة الكاشير',
  ];

  const owner = [
    'الصفحه الرئيسيه',
    'المنتجات',
    'عربه التسوق',
    'معلومات المستخدمين',
    'معلوماتي',
    'معلومات المنتجات',
    'معلومات وصولات الشراء',
    'معلومات وصولات القبض',
    'صفحة المبيعات',
    'مشترياتي',
  ];

  const accountant = [
    'الصفحه الرئيسيه',
    'المنتجات',
    'عربه التسوق',
    'معلومات المستخدمين',
    'معلوماتي',
    'معلومات المنتجات',
    'معلومات وصولات الشراء',
    'معلومات وصولات القبض',
    'صفحة المبيعات',
    'مشترياتي',
  ];

  const operator = [
    'الصفحه الرئيسيه',
    'المنتجات',
    'عربه التسوق',
    'معلوماتي',
    'معلومات المنتجات',
    'ادخال منتجات',
    'مشترياتي',
    'صفحة الكاشير',
  ];

  const user = [
    'الصفحه الرئيسيه',
    'المنتجات',
    'عربه التسوق',
    'معلوماتي',
    'مشترياتي',
  ];

  const generalNavBar = ['الصفحة الرئيسيه', 'المنتجات', 'عربه التسوق'];

  const getRolePages = () => {
    switch (role) {
      case 'manager':
        return manager;
      case 'admin':
        return admin;
      case 'owner':
        return owner;
      case 'accountant':
        return accountant;
      case 'operator':
        return operator;
      case 'user':
        return user;
      default:
        return [];
    }
  };

  const rolePages = getRolePages();

  const handleAnchorELNav = (event) => {
    setAnchorElNav(event.currentTarget);
  };

  const handleCloseAnchorELNav = (event) => {
    setAnchorElNav(null);
  };

  const handleAnchorELUser = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseAnchorELUser = (event) => {
    setAnchorElUser(null);
  };

  return (
    <AppBar>
      <Container>
        <Toolbar>
          <Box
            sx={{
              marginRight: '210px',
              paddingBottom: '0.5px',
              display: { xs: 'none', md: 'flex' },
            }}
          >
            <AdbIcon sx={{ display: { xs: 'none', md: 'flex' } }} />
            <Typography
              component='h6'
              letterSpacing={3}
              sx={{ display: { xs: 'none', md: 'flex' } }}
            >
              {' '}
              شعار الشركه{' '}
            </Typography>
          </Box>

          <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
            {generalNavBar.map((page) => {
              return (
                <Button
                  onClick={() => {
                    navigate(`/${page}`);
                  }}
                  sx={{ display: 'block', color: 'white', mr: 1 }}
                >
                  <Link style={{ color: 'white', textDecoration: 'none' }}>
                    {page}
                  </Link>
                </Button>
              );
            })}

            {role ? (
              <Button
                onClick={async () => {
                  await logoutRequest(navigate);
                  navigate('/تسجيل الدخول');
                }}
                sx={{ display: 'block', color: 'white', mr: 1 }}
              >
                <Link style={{ color: 'white', textDecoration: 'none' }}>
                  تسجيل الخروج
                </Link>
              </Button>
            ) : (
              <Button
                onClick={async () => {
                  navigate('/تسجيل الدخول');
                }}
                sx={{ display: 'block', color: 'white', mr: 1 }}
              >
                <Link style={{ color: 'white', textDecoration: 'none' }}>
                  تسجيل الدخول
                </Link>
              </Button>
            )}
          </Box>

          <Box sx={{ display: { xs: 'flex', md: 'none' }, flexGrow: 1 }}>
            <IconButton onClick={handleAnchorELNav}>
              <MenuIcon></MenuIcon>
            </IconButton>
            <Menu
              anchorEl={anchorElNav}
              open={Boolean(anchorElNav)}
              onClose={handleCloseAnchorELNav}
            >
              {generalNavBar.map((item) => {
                return (
                  <MenuItem>
                    <Typography>{item}</Typography>
                  </MenuItem>
                );
              })}
              rolePages
            </Menu>
          </Box>

          <Typography sx={{ display: { xs: 'flex', md: 'none' }, flexGrow: 1 }}>
            <AdbIcon />
            logo
          </Typography>

          {role ? (
            <Box sx={{ flexGrow: 0 }}>
              <Tooltip title='open setting'>
                <IconButton onClick={handleAnchorELUser}>
                  <Avatar />
                </IconButton>
              </Tooltip>
              <Menu
                id='menu-appbar'
                anchorEl={anchorElUser}
                open={Boolean(anchorElUser)}
                onClose={handleCloseAnchorELUser}
              >
                {rolePages.map((setting) => (
                  <MenuItem
                    key={setting}
                    onClick={() => {
                      navigate(`/${setting}`);
                      handleCloseAnchorELUser();
                    }}
                  >
                    <Typography textAlign='center'>{setting}</Typography>
                  </MenuItem>
                ))}

                <MenuItem
                  onClick={async () => {
                    await logoutRequest(navigate);
                    navigate('/تسجيل الدخول');
                  }}
                >
                  <Typography textAlign='center'>تسجيل الخروج</Typography>
                </MenuItem>
              </Menu>
            </Box>
          ) : null}

          <IconButton
            onClick={handleOpenCart}
            sx={{ display: 'flex', marginLeft: '2rem' }}
          >
            <ShoppingCartIcon sx={{ color: 'white' }} />
          </IconButton>
        </Toolbar>
      </Container>
    </AppBar>
  );
};

export default NavBar;
