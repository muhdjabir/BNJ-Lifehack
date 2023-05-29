import { useState } from "react";
import { Link } from "react-router-dom";
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
import LogoutIcon from "@mui/icons-material/Logout";
import LoginIcon from "@mui/icons-material/Login";
import { useAuthContext } from "../hooks/useAuthContext";
import { useLogout } from "../hooks/useLogout";

const pages = [
    { page: "Teams", path: "/teams" },
    { page: "Tasks", path: "/tasks" },
    { page: "Resources", path: "/resources" },
    { page: "Dashboard", path: "/dashboard" },
];

function ResponsiveAppBar() {
    const [anchorElNav, setAnchorElNav] = useState(null);
    const { user } = useAuthContext();
    const { logout } = useLogout();

    const handleOpenNavMenu = (event) => {
        setAnchorElNav(event.currentTarget);
    };

    const handleCloseNavMenu = () => {
        setAnchorElNav(null);
    };

    return (
        <AppBar position="static" sx={{ backgroundColor: "#A6D8D4" }}>
            <Container maxWidth="xl">
                <Toolbar disableGutters>
                    <Typography
                        variant="h5"
                        noWrap
                        component="a"
                        href="/"
                        sx={{
                            mr: 2,
                            display: { xs: "none", md: "flex" },
                            fontFamily: "monospace",
                            fontWeight: 700,
                            letterSpacing: ".3rem",
                            color: "black",
                            textDecoration: "none",
                        }}
                    >
                        WorkBliss
                    </Typography>
                    <Box
                        sx={{
                            flexGrow: 1,
                            display: { xs: "flex", md: "none" },
                        }}
                    >
                        <IconButton
                            size="large"
                            aria-label="account of current user"
                            aria-controls="menu-appbar"
                            aria-haspopup="true"
                            onClick={handleOpenNavMenu}
                            color="black"
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
                            {user &&
                                pages.map((page) => (
                                    <Link
                                        to={page["path"]}
                                        key={page["page"]}
                                        style={{
                                            textDecoration: "none",
                                            padding: 3,
                                        }}
                                    >
                                        <MenuItem
                                            key={page["page"]}
                                            onClick={handleCloseNavMenu}
                                        >
                                            <Typography
                                                textAlign="center"
                                                color={"black"}
                                            >
                                                {page["page"]}
                                            </Typography>
                                        </MenuItem>
                                    </Link>
                                ))}
                            {user && (
                                <Link to="/" style={{ textDecoration: "none" }}>
                                    <MenuItem
                                        key="Logout"
                                        onClick={() => {
                                            handleCloseNavMenu();
                                            logout();
                                        }}
                                    >
                                        <Typography
                                            textAlign="center"
                                            color={"black"}
                                        >
                                            <LogoutIcon />
                                            Logout
                                        </Typography>
                                    </MenuItem>
                                </Link>
                            )}
                            {!user && (
                                <Link
                                    to="/login"
                                    style={{ textDecoration: "none" }}
                                >
                                    <MenuItem key="Login">
                                        <Typography
                                            textAlign="center"
                                            color={"black"}
                                        >
                                            <LoginIcon />
                                            Login
                                        </Typography>
                                    </MenuItem>
                                </Link>
                            )}
                        </Menu>
                    </Box>
                    <Typography
                        variant="h5"
                        noWrap
                        component="a"
                        href=""
                        sx={{
                            mr: 2,
                            display: { xs: "flex", md: "none" },
                            flexGrow: 1,
                            fontFamily: "monospace",
                            fontWeight: 700,
                            letterSpacing: ".3rem",
                            color: "black",
                            textDecoration: "none",
                        }}
                    >
                        WorkBliss
                    </Typography>
                    <Box
                        sx={{
                            flexGrow: 1,
                            display: { xs: "none", md: "flex" },
                        }}
                    >
                        {user &&
                            pages.map((page) => (
                                <Link
                                    to={page["path"]}
                                    key={page["page"]}
                                    style={{ textDecoration: "none" }}
                                >
                                    <Button
                                        key={page["page"]}
                                        onClick={handleCloseNavMenu}
                                        sx={{
                                            my: 2,
                                            color: "black",
                                            display: "block",
                                        }}
                                    >
                                        {page["page"]}
                                    </Button>
                                </Link>
                            ))}
                    </Box>
                    <Box sx={{ flexGrow: 0, display: "flex" }}>
                        {user && (
                            <Link to="/" style={{ textDecoration: "none" }}>
                                <Button
                                    onClick={logout}
                                    variant="outlined"
                                    color="success"
                                    sx={{
                                        backgroundColor: "white",
                                        marginX: 3,
                                        color: "black",
                                        display: { sm: "none", md: "flex" },
                                    }}
                                >
                                    <LogoutIcon />
                                    Log out
                                </Button>
                            </Link>
                        )}
                        {!user && (
                            <>
                                <Link
                                    to="/login"
                                    style={{ textDecoration: "none" }}
                                >
                                    <Button
                                        variant="outlined"
                                        color="success"
                                        sx={{
                                            backgroundColor: "white",
                                            marginX: 3,
                                            color: "black",
                                            display: { sm: "none", md: "flex" },
                                        }}
                                    >
                                        Log in
                                    </Button>
                                </Link>
                                <Link
                                    to="/register"
                                    style={{ textDecoration: "none" }}
                                >
                                    <Button
                                        variant="outlined"
                                        color="success"
                                        sx={{
                                            backgroundColor: "white",
                                            marginX: 3,
                                            color: "black",
                                            display: { sm: "none", md: "flex" },
                                        }}
                                    >
                                        Join Us
                                    </Button>
                                </Link>
                            </>
                        )}
                        {user && (
                            <Tooltip title={user["user"]["email"]}>
                                <Avatar
                                    alt="Remy Sharp"
                                    // src="/static/images/avatar/2.jpg"
                                />
                            </Tooltip>
                        )}
                    </Box>
                </Toolbar>
            </Container>
        </AppBar>
    );
}
export default ResponsiveAppBar;
