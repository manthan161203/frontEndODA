// import { styled, alpha } from '@mui/material/styles';
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
// import InputBase from '@mui/material/InputBase';
import Badge from "@mui/material/Badge";
import MenuItem from "@mui/material/MenuItem";
import Menu from "@mui/material/Menu";
import MenuIcon from "@mui/icons-material/Menu";
// import SearchIcon from '@mui/icons-material/Search';
import Container from "@mui/material/Container";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import Tooltip from "@mui/material/Tooltip";
// import AdbIcon from '@mui/icons-material/Adb';
import { AppContext } from "../App";
import { useState, useContext } from "react";
import NotificationsIcon from "@mui/icons-material/Notifications";

const ResponsiveAppBar = () => {
  let role = null;
  if (localStorage.getItem("role") != undefined) {
    role = localStorage.getItem("role");
    role = role.charAt(0).toUpperCase() + role.slice(1).toLowerCase();
  }

  const pages = [];
  if (role === "Patient") {
    pages.push(
      { name: "Hospitals", path: "/hospitals" },
      { name: "Doctor", path: "/doctors/doctor" },
      { name: "Therapist", path: "/doctors/therapist" },
      { name: "Clinical Doctor", path: "/doctors/clinicaldoctor" }
    );
  } else if (
    role === "Doctor" ||
    role === "Clinical doctor" ||
    role === "Therapist"
  ) {
    pages.push(
      { name: "Home", path: "/doctor" },
      { name: "Review Requests", path: "/doctor/review-appointments" },
      { name: "View History", path: "/doctor/history" }
    );
  }
  const { setIsLoggedIn, setRole, setUserName, isLoggedIn, userName } =
    useContext(AppContext);
  const settings = [
    "User Profile",
    role + " Profile",
    role === "Patient" ? "Your Appointments" : "",
    "Logout",
  ];
  // const { isLoggedIn, userName } = useContext(AppContext);
  const [anchorElNav, setAnchorElNav] = useState(null);
  const [anchorElUser, setAnchorElUser] = useState(null);
  const [anchorElNotifications, setAnchorElNotifications] = useState(null);
  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };

  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleOpenNotifications = (event) => {
    setAnchorElNotifications(event.currentTarget);
  };

  const handleCloseNavMenu = (page) => {
    setAnchorElNav(null);
    const selectedPage = pages.find((p) => p.name === page);
    if (selectedPage) {
      window.location.href = selectedPage.path;
    }
  };

  const handleCloseUserMenu = (setting) => {
    setAnchorElUser(null);

    if (setting === "User Profile") {
      window.location.href = `/profile/${userName}`;
    } else if (setting === `${role} Profile`) {
      window.location.href = `/profile-role/${userName}`;
    } else if (setting === "Logout") {
      localStorage.removeItem("userName");
      localStorage.removeItem("role");
      localStorage.removeItem("isLoggedIn");
      setUserName(null);
      setRole("Patient");
      setIsLoggedIn(false);
      window.location.href = "/login";
    }
  };

  const handleCloseNotifications = () => {
    setAnchorElNotifications(null);
  };

  const handleLogin = () => {
    window.location.href = "/login";
  };

  const handleSignUp = () => {
    window.location.href = "/register";
  };

  return (
    <>
      <AppBar position="fixed">
        <Container maxWidth="xl">
          <Toolbar disableGutters>
            {/* <AdbIcon sx={{ display: { xs: 'none', md: 'flex' }, mr: 1 }} /> */}
            <Typography
              variant="h6"
              noWrap
              component="a"
              href="/"
              sx={{
                mr: { xs: 1, md: 2 },
                display: { xs: "none", md: "flex" },
                fontFamily: "monospace",
                fontWeight: 700,
                color: "inherit",
                textDecoration: "none",
              }}
            >
              EazyHealthCare
            </Typography>

            <Box sx={{ flexGrow: 1, display: { xs: "flex", md: "none" } }}>
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
              <Menu
                id="menu-appbar"
                anchorEl={anchorElNav}
                anchorOrigin={{
                  vertical: "bottom",
                  horizontal: "left",
                }}
                keepMounted
                transformOrigin={{
                  vertical: "top",
                  horizontal: "left",
                }}
                open={Boolean(anchorElNav)}
                onClose={() => handleCloseNavMenu()}
                sx={{
                  display: { xs: "block", md: "none" },
                }}
              >
                {pages.map((page) => (
                  <MenuItem
                    key={page.name}
                    onClick={() => handleCloseNavMenu(page.name)}
                  >
                    <Typography textAlign="center">{page.name}</Typography>
                  </MenuItem>
                ))}
              </Menu>
            </Box>
            {/* <AdbIcon sx={{ display: { xs: 'flex', md: 'none' }, mr: 1 }} /> */}
            <Typography
              variant="h6"
              noWrap
              component="a"
              href="#app-bar-with-responsive-menu"
              sx={{
                mr: { xs: 2, md: 4 },
                display: { xs: "flex", md: "none" },
                flexGrow: 1,
                fontFamily: "monospace",
                fontWeight: 700,
                letterSpacing: ".3rem",
                color: "inherit",
                textDecoration: "none",
              }}
            >
              EazyHealthCare
            </Typography>
            <Box sx={{ flexGrow: 1, display: { xs: "none", md: "flex" } }}>
              {pages.map((page) => (
                <Button
                  key={page.name}
                  onClick={() => handleCloseNavMenu(page.name)}
                  sx={{
                    my: { xs: 1, md: 2 },
                    color: "white",
                    display: "block",
                  }}
                >
                  {page.name}
                </Button>
              ))}
            </Box>

            {isLoggedIn && (
              <Box sx={{ flexGrow: 0 }}>
                <Tooltip title="Open settings">
                  <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                    <Avatar
                      alt="Remy Sharp"
                      src="/static/images/avatar/2.jpg"
                    />
                  </IconButton>
                </Tooltip>
                <Menu
                  sx={{ mt: { xs: 2, md: "45px" } }}
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
                  onClose={() => handleCloseUserMenu()}
                >
                  {settings.map((setting) => (
                    <MenuItem
                      key={setting}
                      onClick={() => handleCloseUserMenu(setting)}
                    >
                      {/* Use a conditional rendering approach based on the selected setting */}
                      {setting === "User Profile" && (
                        <a
                          href={`/profile/${userName}`}
                          style={{ color: "inherit", textDecoration: "none" }}
                        >
                          {setting}
                        </a>
                      )}
                      {setting === `${role} Profile` && (
                        <a
                          href={`/profile-role/${userName}`}
                          style={{ color: "inherit", textDecoration: "none" }}
                        >
                          {setting}
                        </a>
                      )}
                      {setting === "Your Appointments" && (
                        <a
                          href={`/my-appointments/${userName}`}
                          style={{ color: "inherit", textDecoration: "none" }}
                        >
                          {setting}
                        </a>
                      )}
                      {setting === "Logout" && (
                        <a
                          href={`/login`}
                          style={{ color: "inherit", textDecoration: "none" }}
                        >
                          {setting}
                        </a>
                      )}
                    </MenuItem>
                  ))}
                </Menu>
              </Box>
            )}
            {!isLoggedIn && (
              <>
                <Button color="inherit" onClick={handleLogin}>
                  Login
                </Button>
                <Button color="inherit" onClick={handleSignUp}>
                  SignUp
                </Button>
              </>
            )}
          </Toolbar>
        </Container>
      </AppBar>
      <Box sx={{ mb: 10 }} />
    </>
  );
};

export default ResponsiveAppBar;
