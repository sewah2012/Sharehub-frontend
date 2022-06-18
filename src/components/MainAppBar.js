import './styles/MainAppBar.css'
import react, {useState} from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Menu from "@mui/material/Menu";
import Container from "@mui/material/Container";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import Tooltip from "@mui/material/Tooltip";
import MenuItem from "@mui/material/MenuItem";
import { Search } from "@mui/icons-material";

const settings = ["Profile", "Account", "Dashboard", "Logout"];


const MainAppBar = () => {
  const [anchorElNav, setAnchorElNav] = useState(null);
  const [anchorElUser, setAnchorElUser] = useState(null);

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

  return (
    <AppBar position="static" sx={{ backgroundColor: "#6F7193" }}>
      <Container maxWidth="xl">
        <Toolbar
          disableGutters
          sx={{ display: "flex", justifyContent: "space-between" }}
        >
          {/* <AdbIcon sx={{ display: { xs: 'none', md: 'flex' }, mr: 1 }} /> */}
          <Box
            sx={{
              mr: 2,
              width: { xs: "5rem", md: "10rem" },
              objectFit: "contained",
            }}
          >
            <img
              src="/assets/imgs/logo2.svg"
              alt="share_hub_logo"
              style={{ width: "100%", height: "100%" }}
            />
          </Box>

          <Box>
          <div className="searchWrapper">
            <input className="searchInput" placeholder='Search shared expereiences here...' type="search" />
            <div className="searchBtn">
           <div className='iconWrapper'>
                <Search />
              </div>
            </div>
          </div>
          </Box>

          <Box>
            <Tooltip title="view profile">
              <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                <Avatar alt="Remy Sharp" src="/static/images/avatar/2.jpg" />
              </IconButton>
            </Tooltip>
            <Menu
              sx={{ mt: "45px" }}
              id="menu-appbar"
              anchorEl={anchorElUser}
              anchorOrigin={{
                vertical: "top",
                horizontal: "right",
              }}
              keepMounted
              transformOrigin={{
                vertical: "top",
                horizontal: "right",
              }}
              open={Boolean(anchorElUser)}
              onClose={handleCloseUserMenu}
            >
              {settings.map((setting) => (
                <MenuItem key={setting} onClick={handleCloseUserMenu}>
                  <Typography textAlign="center">{setting}</Typography>
                </MenuItem>
              ))}
            </Menu>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
};
export default MainAppBar;
