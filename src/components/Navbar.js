import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Grid from '@mui/material/Grid';
import Button from '@mui/material/Button';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem'; 
import { Logout } from '@mui/icons-material';

const Navbar = (props) => {
    const navigate = useNavigate();

    //logout set auth to false
    const logout = () => {
        props.onAuthenticated(false);
        navigate('/');
    };

    const [anchorEl, setAnchorEl] = useState(null);
    const open = Boolean(anchorEl);

    const handleClick = (event) => {
      setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
      setAnchorEl(null);
    };

    return (
        <Grid item xs={12}>
            <div style={{ backgroundColor: "#212121" }}>
            <Button component={Link} to='/'>Home</Button>
            <Button
                id="basic-button"
                aria-controls={open ? 'basic-menu' : undefined}
                aria-haspopup="true"
                aria-expanded={open ? 'true' : undefined}
                onClick={handleClick}
            >
                Restaurants
            </Button>
            <Menu
                id="basic-menu"
                anchorEl={anchorEl}
                open={open}
                onClose={handleClose}
                MenuListProps={{
                'aria-labelledby': 'basic-button',
                }}
            >
                <MenuItem component={Link} to='/restaurants' onClick={handleClose}>All</MenuItem>
                {/* Create menu item only appears when logged in */}
                {(props.authenticated) ? (
                    <MenuItem component={Link} to='/restaurants/create' onClick={handleClose}>Create</MenuItem>
            ) : ""}
            </Menu>

            <div style={{ float: "right" }}>
                {/* logout button is shown when logged in */}
            {(props.authenticated) ? (
                <Button onClick={logout} endIcon={<Logout />}>Logout</Button>
            ) : ""}
            {/* register button is shown when not logged in */}
            {(!props.authenticated) ? (
                <Button component={Link} to='/register'>Register</Button>
            ) : ""}
            </div>
            </div>
        </Grid>
    );
};

export default Navbar;