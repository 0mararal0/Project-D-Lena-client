import { useContext, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../../context/auth.context";
import { AddProductContext } from "../../context/addproduct.context";
import "./style-Navbar.css";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Menu from "@mui/material/Menu";
import MenuIcon from "@mui/icons-material/Menu";
import Container from "@mui/material/Container";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import Tooltip from "@mui/material/Tooltip";
import MenuItem from "@mui/material/MenuItem";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import { styled } from "@mui/material/styles";
import Badge from "@mui/material/Badge";
import Logo from "../../assets/images/logo.png";

const StyledBadge = styled(Badge)(({ theme }) => ({
  "& .MuiBadge-badge": {
    right: -3,
    top: 13,
    border: `2px solid ${theme.palette.background.paper}`,
    padding: "0 4px",
  },
}));

export const Navbar = () => {
  const [anchorElNav, setAnchorElNav] = useState(null);
  const [anchorElUser, setAnchorElUser] = useState(null);
  const [bgColorScroll, setBgColorScroll] = useState("transparent");
  const { finalOrder } = useContext(AddProductContext);
  const navigate = useNavigate();
  const { isLoggedIn, authenticateUser, isAdmin, photoProfile, firstName } =
    useContext(AuthContext);

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const handleLogout = async () => {
    try {
      localStorage.removeItem("authToken");
      await authenticateUser();
      navigate("/");
    } catch {
      navigate("/error");
    }
  };

  const handleScroll = () => {
    if (window.scrollY > 70) {
      setBgColorScroll("#1d1d1de4");
    } else {
      setBgColorScroll("transparent");
    }
  };

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
    <>
      <div
        style={{
          backgroundColor: bgColorScroll,
          width: "100dvw",
          height: "115px",
          position: "fixed",
        }}
      >
        <Container sx={{ position: "fixed", top: 20, left: 0, right: 0 }}>
          <AppBar
            position="static"
            style={{
              backgroundColor: "transparent",
              boxShadow: "none",
            }}
          >
            <Container maxWidth="lg">
              <Toolbar disableGutters>
                <Link to={"/"}>
                  <Avatar
                    src={Logo}
                    sx={{ display: { xs: "none", md: "flex" } }}
                    style={{ height: "80px", width: "80px" }}
                  />
                </Link>
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
                    onClose={handleCloseNavMenu}
                    sx={{
                      display: { xs: "block", md: "none" },
                    }}
                  >
                    <MenuItem onClick={handleCloseNavMenu}>
                      {" "}
                      <Typography sx={{ textAlign: "center" }}>
                        {" "}
                        <Link
                          to={"/order"}
                          style={{
                            textDecoration: "none",
                            color: "black",
                            fontFamily: "signika",
                          }}
                        >
                          Haz tu pedido{" "}
                        </Link>
                      </Typography>{" "}
                    </MenuItem>
                    <MenuItem onClick={handleCloseNavMenu}>
                      {" "}
                      <Typography sx={{ textAlign: "center" }}>
                        {" "}
                        <Link
                          to={"/about"}
                          style={{
                            textDecoration: "none",
                            color: "black",
                            fontFamily: "signika",
                          }}
                        >
                          Sobre Nosotros{" "}
                        </Link>
                      </Typography>{" "}
                    </MenuItem>
                    <MenuItem onClick={handleCloseNavMenu}>
                      {" "}
                      <Typography sx={{ textAlign: "center" }}>
                        {" "}
                        <Link
                          to={"/contact"}
                          style={{
                            textDecoration: "none",
                            color: "black",
                            fontFamily: "signika",
                          }}
                        >
                          Contacto{" "}
                        </Link>
                      </Typography>{" "}
                    </MenuItem>
                    {isLoggedIn && isAdmin && (
                      <MenuItem onClick={handleCloseNavMenu}>
                        {" "}
                        <Typography sx={{ textAlign: "center" }}>
                          {" "}
                          <Link
                            to={"/admin/home"}
                            style={{
                              textDecoration: "none",
                              color: "black",
                              fontFamily: "signika",
                            }}
                          >
                            Panel Administrador{" "}
                          </Link>
                        </Typography>{" "}
                      </MenuItem>
                    )}
                  </Menu>
                </Box>
                <Typography
                  variant="h3"
                  noWrap
                  component="a"
                  style={{ fontFamily: "logofont", fontWeight: "lighter" }}
                  sx={{
                    mr: 2,
                    display: { sm: "flex", md: "none", xs: "none" },
                    flexGrow: 1,
                    fontWeight: 700,
                    letterSpacing: ".3rem",
                    color: "inherit",
                    textDecoration: "none",
                  }}
                >
                  {" "}
                  <Link
                    to={"/"}
                    style={{ textDecoration: "none", color: "white" }}
                  >
                    <p>D-Leña</p>
                  </Link>
                </Typography>
                <Typography
                  variant="h5"
                  noWrap
                  component="a"
                  href="#app-bar-with-responsive-menu"
                  style={{ fontFamily: "logofont", fontWeight: "lighter" }}
                  sx={{
                    mr: 2,
                    display: { xs: "flex", sm: "none" },
                    flexGrow: 1,
                    fontWeight: 700,
                    letterSpacing: ".3rem",
                    color: "inherit",
                    textDecoration: "none",
                  }}
                >
                  D-Leña
                </Typography>
                <Box sx={{ flexGrow: 1, display: { xs: "none", md: "flex" } }}>
                  <Button
                    onClick={() => handleCloseNavMenu()}
                    sx={{ my: 2, color: "white", display: "block" }}
                  >
                    <Link
                      to={"/order"}
                      style={{
                        textDecoration: "none",
                        color: "white",
                        fontFamily: "signika",
                      }}
                    >
                      Haz tu pedido
                    </Link>
                  </Button>
                  <Button
                    onClick={() => handleCloseNavMenu()}
                    sx={{ my: 2, color: "white", display: "block" }}
                  >
                    <Link
                      to={"/about"}
                      style={{
                        textDecoration: "none",
                        color: "white",
                        fontFamily: "signika",
                      }}
                    >
                      Sobre Nosotros
                    </Link>
                  </Button>
                  <Button
                    onClick={() => handleCloseNavMenu()}
                    sx={{ my: 2, color: "white", display: "block" }}
                  >
                    <Link
                      to={"/contact"}
                      style={{
                        textDecoration: "none",
                        color: "white",
                        fontFamily: "signika",
                      }}
                    >
                      Contacto
                    </Link>
                  </Button>
                  {isLoggedIn && isAdmin && (
                    <Button
                      onClick={() => handleCloseNavMenu()}
                      sx={{ my: 2, color: "white", display: "block" }}
                    >
                      <Link
                        to={"/admin/home"}
                        style={{
                          textDecoration: "none",
                          color: "white",
                          fontFamily: "signika",
                        }}
                      >
                        Panel Administrador
                      </Link>
                    </Button>
                  )}
                </Box>
                {firstName ? (
                  <div style={{ display: "flex", flexDirection: "column" }}>
                    <p
                      style={{
                        color: "white",
                        fontSize: ".8rem",
                        marginBlock: "3px",
                        fontFamily: "signika",
                      }}
                    >
                      Hola, {firstName}
                    </p>
                    <div style={{ display: "flex" }}>
                      <Box sx={{ flexGrow: 0 }}>
                        <Tooltip title="Open settings">
                          <IconButton
                            onClick={handleOpenUserMenu}
                            sx={{ p: 0, mr: "30px" }}
                          >
                            {photoProfile ? (
                              <Avatar alt="foto perfil" src={photoProfile} />
                            ) : (
                              <Avatar src="/broken-image.jpg" />
                            )}
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
                          {!isLoggedIn && (
                            <MenuItem onClick={handleCloseUserMenu}>
                              <Link
                                style={{
                                  textDecoration: "none",
                                  color: "black",
                                }}
                                to="/login"
                              >
                                <Typography
                                  sx={{
                                    textAlign: "center",
                                    fontFamily: "signika",
                                  }}
                                >
                                  Login
                                </Typography>
                              </Link>
                            </MenuItem>
                          )}
                          {!isLoggedIn && (
                            <MenuItem onClick={handleCloseUserMenu}>
                              <Link
                                style={{
                                  textDecoration: "none",
                                  color: "black",
                                }}
                                to="/signup"
                              >
                                <Typography
                                  sx={{
                                    textAlign: "center",
                                    fontFamily: "signika",
                                  }}
                                >
                                  Registro
                                </Typography>
                              </Link>
                            </MenuItem>
                          )}
                          {isLoggedIn && (
                            <MenuItem onClick={handleCloseUserMenu}>
                              <Link
                                style={{
                                  textDecoration: "none",
                                  color: "black",
                                }}
                                to="/user/profile"
                              >
                                <Typography
                                  sx={{
                                    textAlign: "center",
                                    fontFamily: "signika",
                                  }}
                                >
                                  Perfil
                                </Typography>
                              </Link>
                            </MenuItem>
                          )}
                          {isLoggedIn && (
                            <MenuItem onClick={handleCloseUserMenu}>
                              <Link
                                style={{
                                  textDecoration: "none",
                                  color: "black",
                                }}
                                to="/user/history"
                              >
                                <Typography
                                  sx={{
                                    textAlign: "center",
                                    fontFamily: "signika",
                                  }}
                                >
                                  Historial
                                </Typography>
                              </Link>
                            </MenuItem>
                          )}
                          {isLoggedIn && (
                            <MenuItem onClick={handleCloseUserMenu}>
                              <Link
                                style={{
                                  textDecoration: "none",
                                  color: "black",
                                }}
                                to="/user/sumary"
                              >
                                <Typography
                                  sx={{
                                    textAlign: "center",
                                    fontFamily: "signika",
                                  }}
                                >
                                  Pedido
                                </Typography>
                              </Link>
                            </MenuItem>
                          )}
                          {isLoggedIn && (
                            <MenuItem onClick={handleCloseUserMenu}>
                              <Link
                                style={{
                                  textDecoration: "none",
                                  color: "black",
                                }}
                                onClick={handleLogout}
                              >
                                <Typography
                                  sx={{
                                    textAlign: "center",
                                    fontFamily: "signika",
                                  }}
                                >
                                  LogOut
                                </Typography>
                              </Link>
                            </MenuItem>
                          )}
                        </Menu>
                      </Box>
                      <Link to={"/user/sumary"}>
                        <IconButton aria-label="cart">
                          <StyledBadge
                            badgeContent={finalOrder ? finalOrder.length : "0"}
                            color="secondary"
                          >
                            <ShoppingCartIcon style={{ color: "white" }} />
                          </StyledBadge>
                        </IconButton>
                      </Link>
                    </div>
                  </div>
                ) : (
                  <div style={{ display: "flex" }}>
                    <Box sx={{ flexGrow: 0 }}>
                      <Tooltip title="Open settings">
                        <IconButton
                          onClick={handleOpenUserMenu}
                          sx={{ p: 0, mr: "30px" }}
                        >
                          {photoProfile ? (
                            <Avatar alt="foto perfil" src={photoProfile} />
                          ) : (
                            <Avatar src="/broken-image.jpg" />
                          )}
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
                        {!isLoggedIn && (
                          <MenuItem onClick={handleCloseUserMenu}>
                            <Link
                              style={{ textDecoration: "none", color: "black" }}
                              to="/login"
                            >
                              <Typography sx={{ textAlign: "center" }}>
                                Login
                              </Typography>
                            </Link>
                          </MenuItem>
                        )}
                        {!isLoggedIn && (
                          <MenuItem onClick={handleCloseUserMenu}>
                            <Link
                              style={{ textDecoration: "none", color: "black" }}
                              to="/signup"
                            >
                              <Typography sx={{ textAlign: "center" }}>
                                Registro
                              </Typography>
                            </Link>
                          </MenuItem>
                        )}
                        {isLoggedIn && (
                          <MenuItem onClick={handleCloseUserMenu}>
                            <Link
                              style={{ textDecoration: "none", color: "black" }}
                              to="/user/profile"
                            >
                              <Typography sx={{ textAlign: "center" }}>
                                Perfil
                              </Typography>
                            </Link>
                          </MenuItem>
                        )}
                        {isLoggedIn && (
                          <MenuItem onClick={handleCloseUserMenu}>
                            <Link
                              style={{ textDecoration: "none", color: "black" }}
                              to="/user/history"
                            >
                              <Typography sx={{ textAlign: "center" }}>
                                Historial
                              </Typography>
                            </Link>
                          </MenuItem>
                        )}
                        {isLoggedIn && (
                          <MenuItem onClick={handleCloseUserMenu}>
                            <Link
                              style={{ textDecoration: "none", color: "black" }}
                              to="/user/sumary"
                            >
                              <Typography sx={{ textAlign: "center" }}>
                                Pedido
                              </Typography>
                            </Link>
                          </MenuItem>
                        )}
                        {isLoggedIn && (
                          <MenuItem onClick={handleCloseUserMenu}>
                            <Link
                              style={{ textDecoration: "none", color: "black" }}
                              onClick={handleLogout}
                            >
                              <Typography sx={{ textAlign: "center" }}>
                                LogOut
                              </Typography>
                            </Link>
                          </MenuItem>
                        )}
                      </Menu>
                    </Box>
                    <Link to={"/user/sumary"}>
                      <IconButton aria-label="cart">
                        <StyledBadge
                          badgeContent={finalOrder ? finalOrder.length : "0"}
                          color="secondary"
                        >
                          <ShoppingCartIcon style={{ color: "white" }} />
                        </StyledBadge>
                      </IconButton>
                    </Link>
                  </div>
                )}
              </Toolbar>
            </Container>
          </AppBar>
        </Container>
      </div>
    </>
  );
};
