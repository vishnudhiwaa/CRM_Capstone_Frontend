
import React, { useEffect } from 'react'
import { useState, useRef } from 'react';
import { AppBar, Box, Toolbar, IconButton, Typography, Menu, MenuItem, 
Container, Avatar, Button, Tooltip, Drawer, Badge} from '@mui/material' 
import FlareIcon from '@mui/icons-material/Flare';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import MenuIcon from '@mui/icons-material/Menu';
import DoubleArrowIcon from '@mui/icons-material/DoubleArrow';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import InboxIcon from '@mui/icons-material/MoveToInbox';
import MailIcon from '@mui/icons-material/Mail';
import { useSelector, useDispatch } from 'react-redux'; 
import { useNavigate } from 'react-router-dom';
import { USER_ROLES } from '../../Data/Roles';
import { logoutUser } from '../../Redux/Reducers/UserReducer';
import SidePanel from './sidePanel';

const AppBarComponent = () => {

const user = useSelector( state => state.userInfo.user_data)
const cart = useSelector( state => state.cart.cart_data.cart_items)
const dispatch = useDispatch()

const [isDraw, setIsDraw] = useState(false)
const navigate = useNavigate();


    const [anchorElNav, setAnchorElNav] = React.useState(null);
    const [anchorElUser, setAnchorElUser] = React.useState(null);
  
    const handleOpenNavMenu = (event) => {
      setAnchorElNav(event.currentTarget);
    };
    const handleOpenUserMenu = (event) => {
      setAnchorElUser(event.currentTarget);
    };
  
    const handleCloseNavMenu = () => {
      setAnchorElNav(null);
    };
  
    const handleCloseUserMenu = () => {
      setAnchorElUser(null);
    };

    const handleLogOut = () => {
      localStorage.removeItem('tokenAuth');
      localStorage.removeItem('email');
      localStorage.removeItem('username');
      localStorage.removeItem('role');
      localStorage.removeItem('phone');
      localStorage.removeItem('pic_URL');
      dispatch(logoutUser());
      navigate('/')
    }
 
  return (

    <>
    <AppBar position="fixed" color='success'>
    <Container maxWidth="xl">
      <Toolbar disableGutters> 
      <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="menu"
            sx={{ mr: 2 }}
            onClick={() => setIsDraw(true)}
          >
            <DoubleArrowIcon />
          </IconButton>
        <FlareIcon sx={{ display: { xs: 'none', md: 'flex' }, mr: 1 }} fontSize='large' />
        <Typography
          variant="h6"
          noWrap
          component="a"
          onClick={() => navigate('/')}
          sx={{
            mr: 2,
            display: { xs: 'none', md: 'flex' },
            fontFamily: 'monospace',
            fontWeight: 800,
            cursor: 'pointer',
            color: 'inherit',
            textDecoration: 'none',
          }}
        >
          CleanLife
        </Typography>

        <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
          <IconButton
            size="large"
            aria-label="account of current user"
            aria-controls="menu-appbar"
            aria-haspopup="true"
            onClick={handleOpenNavMenu}
            color="inherit"
          >
            <MenuIcon />
          </IconButton>
          {/* for small screen */}
          <Menu
            id="menu-appbar"
            anchorEl={anchorElNav}
            anchorOrigin={{
              vertical: 'bottom',
              horizontal: 'left',
            }}
            keepMounted
            transformOrigin={{
              vertical: 'top',
              horizontal: 'left',
            }}
            open={Boolean(anchorElNav)}
            onClose={handleCloseNavMenu}
            sx={{
              display: { xs: 'block', md: 'none' },
            }}
          >
            <MenuItem key="ABOUT" 
             onClick={() => navigate('/about')}>
                <Typography textAlign="center">ABOUT US</Typography>
              </MenuItem>

            <MenuItem key="PRODUCTS" 
             onClick={() => navigate('/products')}>
                <Typography textAlign="center">PRODUCTS</Typography>
              </MenuItem>
              
              {
              user.role === USER_ROLES.Admin && 
              <MenuItem
              key="DASHBOARD"
              onClick={() => navigate('/admin-dashboard')}
            >
              <Typography textAlign="center">DASHBOARD</Typography>
            </MenuItem> 
            }
              {
              user.role === USER_ROLES.Sales && 
              <MenuItem
              key="DASHBOARD"
              onClick={() => navigate('/sales-dashboard')}
            >
              <Typography textAlign="center">DASHBOARD</Typography>
            </MenuItem> 
            }
              {
              user.role === USER_ROLES.Marketing && 
              <MenuItem
              key="DASHBOARD"
              onClick={() => navigate('/mkt-dashboard')}
            >
              <Typography textAlign="center">DASHBOARD</Typography>
            </MenuItem> 
            }
            {
              user.role === USER_ROLES.Customer && 
              
              <MenuItem
              key="DASHBOARD"
              onClick={() => navigate('/cust-dashboard')}
            >
              <Typography textAlign="center">DASHBOARD</Typography>

            </MenuItem> 
            }
            {
              user.role === USER_ROLES.Customer && 
              <MenuItem
              key="CART"
              onClick={() => navigate('/cart')}
               >
              <Typography textAlign="center">CART 
              <Badge badgeContent={cart.length} color="primary" sx={{mx:2}}>
                <ShoppingCartIcon color="white" />
              </Badge>
              </Typography>
            </MenuItem> 
            }
            {
              user.role === USER_ROLES.Engineer && 
              
              <MenuItem
              key="DASHBOARD"
              onClick={() => navigate('/engg-dashboard')}
            >
              <Typography textAlign="center">DASHBOARD</Typography>

            </MenuItem> 
            }
          </Menu>
        </Box>
        {/* for Large screen */}
        <FlareIcon sx={{ display: { xs: 'flex', md: 'none' }, mr: 1 }} size='large' ></FlareIcon>
        <Typography
          variant="h5"
          noWrap
          component="a"
          onClick={() => navigate('/')}
          sx={{
            mr: 2,
            display: { xs: 'flex', md: 'none' },
            flexGrow: 1,
            fontFamily: 'monospace',
            fontWeight: 500,
            color: 'inherit',
            textDecoration: 'none',
            cursor: 'pointer'
          }}
        >
          CleanLife
        </Typography>
        <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
             <Button
              key="PRODUCTS"
              onClick={() =>  navigate('/products') }
              sx={{ my: 2, color: 'white', display: 'block' }}
            >
              PRODUCTS
            </Button>
             
             <Button
              key="ABOUT"
              onClick={() => navigate('/about')}
              sx={{ my: 2, color: 'white', display: 'block' }}
            >
              ABOUT US
            </Button> 
            {
              user.role === USER_ROLES.Admin && 
              <Button
              key="DASHBOARD"
              onClick={() => navigate('/admin-dashboard')}
              sx={{ my: 2, color: 'white', display: 'block' }}
            >
              DASHBOARD
            </Button> 
            }
            {
              user.role === USER_ROLES.Customer && 
              <>
              <Button
              key="DASHBOARD"
              onClick={() => navigate('/cust-dashboard')}
              sx={{ my: 2, color: 'white', display: 'block' }}
            >
              DASHBOARD
            </Button> 

              <Button
              key="CART"
              onClick={() => navigate('/cart')}
              sx={{ my: 2, color: 'white', display: 'block' }}
              > 
              CART
              <Badge badgeContent={cart.length} color="primary" sx={{mx:2}}>
                <ShoppingCartIcon color="white" />
              </Badge>

              </Button> 
              </>
            }
            {
              user.role === USER_ROLES.Engineer && 
              <>
              <Button
              key="DASHBOARD"
              onClick={() => navigate('/engg-dashboard')}
              sx={{ my: 2, color: 'white', display: 'block' }}
            >
              DASHBOARD
            </Button> 
              </>
            }
            {
              user.role === USER_ROLES.Marketing && 
              <>
              <Button
              key="DASHBOARD"
              onClick={() => navigate('/mkt-dashboard')}
              sx={{ my: 2, color: 'white', display: 'block' }}
            >
              DASHBOARD
            </Button> 
              </>
            }
            {
              user.role === USER_ROLES.Sales && 
              <>
              <Button
              key="DASHBOARD"
              onClick={() => navigate('/sales-dashboard')}
              sx={{ my: 2, color: 'white', display: 'block' }}
            >
              DASHBOARD
            </Button> 
              </>
            }
          {/* {pages.map((page) => (
            <Button
              key={page}
              onClick={handleCloseNavMenu}
              sx={{ my: 2, color: 'white', display: 'block' }}
            >
              {page}
            </Button>
          ))} */}
        </Box>

        <Box sx={{ flexGrow: 0}}>
          <Tooltip title="Open settings">
            <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}> 
            { user.email ? 
              <Avatar sx={{ bgcolor: '#0E0E0E' }}  alt={user?.username ? user.username : "User"} src= {user?.pic_URL ? user.pic_URL : "na"} />
             : <Avatar  alt={user?.username ? user.username : "User"} src= {user?.pic_URL ? user.pic_URL : "na"} />
            }
              </IconButton>
          </Tooltip> 
          
          <Menu
            sx={{ mt: '45px' }}
            id="menu-appbar"
            anchorEl={anchorElUser}
            anchorOrigin={{
              vertical: 'top',
              horizontal: 'right',
            }}
            keepMounted
            transformOrigin={{
              vertical: 'top',
              horizontal: 'right',
            }}
            open={Boolean(anchorElUser)}
            onClose={handleCloseUserMenu}
          >
            <MenuItem key="Profile" onClick={ () => navigate('/profile')}>
                <Typography textAlign="center">Profile</Typography>
            </MenuItem>
            <MenuItem key="Logout" onClick={handleCloseUserMenu}>
                <Typography textAlign="center" 
                onClick={handleLogOut}>
                Logout</Typography>
            </MenuItem>
          
          </Menu>
        </Box>
       
      </Toolbar>
    </Container>
  </AppBar>

  {/* Default behaviour is to be hidden */}
  <Drawer anchor='left' open={isDraw} onClose={()=> setIsDraw(false)}>
    <SidePanel isDraw={isDraw} setIsDraw={setIsDraw} />
  </Drawer>

</>
  );
}

export default AppBarComponent;
