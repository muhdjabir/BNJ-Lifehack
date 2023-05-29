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
import AdbIcon from "@mui/icons-material/Adb";
import LogoutIcon from "@mui/icons-material/Logout";

const pages = [
    { page: "Teams", path: "/teams" },
    { page: "Tasks", path: "/tasks" },
    { page: "Resources", path: "/resources" },
    { page: "Dashboard", path: "/dashboard" },
];

function ResponsiveAppBar() {
    const [anchorElNav, setAnchorElNav] = useState(null);
    const [user, setUser] = useState("");

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
                    <AdbIcon
                        sx={{ display: { xs: "none", md: "flex" }, mr: 1 }}
                    />
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
                            {pages.map((page) => (
                                <Link
                                    to={page["path"]}
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
                            <Link to="/" style={{ textDecoration: "none" }}>
                                <MenuItem
                                    key="Logout"
                                    onClick={handleCloseNavMenu}
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
                        </Menu>
                    </Box>
                    <AdbIcon
                        sx={{ display: { xs: "flex", md: "none" }, mr: 1 }}
                    />
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
                        {pages.map((page) => (
                            <Link
                                to={page["path"]}
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
                        <Link to="/" style={{ textDecoration: "none" }}>
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
                                {" "}
                                <LogoutIcon />
                                Log out
                            </Button>
                        </Link>
                        <Tooltip title="Open settings">
                            <Avatar
                                alt="Remy Sharp"
                                src="/static/images/avatar/2.jpg"
                            />
                        </Tooltip>
                    </Box>
                </Toolbar>
            </Container>
        </AppBar>
    );
}
export default ResponsiveAppBar;
