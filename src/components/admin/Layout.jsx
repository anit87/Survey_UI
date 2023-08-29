import React, { useState } from 'react';
import PropTypes from 'prop-types';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Divider from '@mui/material/Divider';
import Drawer from '@mui/material/Drawer';
import IconButton from '@mui/material/IconButton';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import MenuIcon from '@mui/icons-material/Menu';
import Toolbar from '@mui/material/Toolbar';
import { Typography, TextField, MenuItem, Stack, FormControl } from '@mui/material';

import { Dashboard as DashboardIcon } from '@mui/icons-material';
import PersonAddIcon from '@mui/icons-material/PersonAdd';
import { useNavigate } from 'react-router-dom';
import { ageOptions, incomeOptions } from '../../utils/constants';
import { useDrawerData } from '../../utils/DrawerDataContext';
import Navbar from '../Navbar';

const list = [
    { label: "Dashboard", icon: DashboardIcon, url: "/surveys" },
    { label: "All Users", icon: PersonAddIcon, url: "/allusers" },
    { label: "Create Form", icon: PersonAddIcon, url: "/form" },
]
const list1 = [
    {
        id: "birthdayDate",
        label: "Filter By Age",
        value: '',
        selectOptions: [...ageOptions,{label: "All", value: 10 }]
    },
    {
        id: "maritalStatus",
        label: "Filter By Marital Status",
        value: '',
        selectOptions: [{ label: "Single", value: "1" }, { label: "Married", value: "2" }, {label: "All", value: 10 }]
    },
    {
        id: "monthlyHouseholdIncome",
        label: "Filter By Monthly Income",
        value: '',
        selectOptions: incomeOptions
    },
]

const drawerWidth = 240;

function ResponsiveDrawer(props) {
    const { window } = props;
    const navigate = useNavigate()
    const [mobileOpen, setMobileOpen] = React.useState(false);

    const { filterData, setFilterData } = useDrawerData();

    const handleDrawerToggle = () => {
        setMobileOpen(!mobileOpen);
    };
    const changeHandler = (e) => {
        setFilterData({
            ...filterData,
            [e.target.name]: e.target.value
        })
    }


    const drawer = (
        <div>
            <Toolbar />
            <Divider />
            <List>
                {list.map((obj, index) => (
                    <ListItem key={index} disablePadding onClick={() => navigate(obj.url)}  >
                        <ListItemButton>
                            <ListItemIcon>
                                {<obj.icon />}
                            </ListItemIcon>
                            <ListItemText primary={obj.label} />
                        </ListItemButton>
                    </ListItem>
                ))}
            </List>
            <Divider />
            {/* <List>
                <Stack direction="column" className='mb-4' >
                    <Typography variant="h6"
                        style={{ fontSize: "14px", fontWeight: "bold", textAlign: "left" }} gutterBottom
                    >Start Date</Typography>

                    <ListItem disablePadding>
                        <TextField
                            id="startDate"
                            name="startDate"
                            label={""}
                            type="date"
                            // value={startDate}
                            onChange={(e) => changeHandler(e)}
                            InputLabelProps={{
                                shrink: true,
                            }}
                        />
                    </ListItem>
                </Stack>
                <Stack direction="column" className='mb-4' >
                    <Typography variant="h6"
                        style={{ fontSize: "14px", fontWeight: "bold", textAlign: "left" }} gutterBottom
                    >Start Date</Typography>

                    <ListItem disablePadding>
                        <TextField
                            id="endDate"
                            name="endDate"
                            label={""}
                            type="date"
                            // value={endDate}
                            onChange={(e) => changeHandler(e)}
                            InputLabelProps={{
                                shrink: true,
                            }}
                        />
                    </ListItem>
                </Stack>


                {list1.map((obj, index) => (
                    <ListItem key={index} disablePadding>


                        <FormControl fullWidth>
                            <Stack direction="row">
                                <Typography variant="h6"
                                    style={{ fontSize: "14px", fontWeight: "bold", textAlign: "left" }} gutterBottom
                                >{obj.label}</Typography>
                            </Stack>
                            <TextField id="select"
                                fullWidth
                                name={obj.id}
                                label={""}
                                value={obj.value}
                                onChange={(e) => changeHandler(e)}
                                select
                            >
                                {
                                    obj.selectOptions.map((option) => (
                                        <MenuItem key={option.value} value={option.value}>
                                            {option.label}
                                        </MenuItem>
                                    ))
                                }
                            </TextField>
                            
                        </FormControl>


                        
                        <Stack direction="column" className='mb-4' >
                            <Typography variant="h6"
                                style={{ fontSize: "14px", fontWeight: "bold", textAlign: "left" }} gutterBottom
                            >{obj.label}</Typography>

                            <select className="form-select" aria-label="Select Options"
                                onChange={(e) => changeHandler(e)}
                              
                                name={obj.id}
                            >
                                {
                                    obj.selectOptions.map((options) => (
                                        <option key={options.value} value={options.value}>
                                            {options.label}
                                        </option>
                                    ))
                                }
                            </select>
                        </Stack>

                    </ListItem>
                ))}


            </List> */}
        </div>
    );

    const container = window !== undefined ? () => window().document.body : undefined;

    return (
        <Box sx={{ display: 'flex' }}>
            
            
            <AppBar
                // position="fixed"
                color="transparent"
                sx={{
                    width: { sm: `calc(100% - ${drawerWidth}px)` },
                    ml: { sm: `${drawerWidth}px` },
                    mt: 10,
                    boxShadow: 0
                }}
            >
                {/* <Toolbar>
                    <IconButton
                        color="inherit"
                        aria-label="open drawer"
                        edge="start"
                        onClick={handleDrawerToggle}
                        sx={{ mr: 2, display: { sm: 'none' } }}
                    >
                        <MenuIcon />
                    </IconButton>
                </Toolbar> */}
                <Navbar/>
            </AppBar>
            {/* <Navbar/> */}
            <Box
                component="nav"
                sx={{ width: { sm: drawerWidth }, flexShrink: { sm: 0 } }}
                aria-label="mailbox folders"
            >
                {/* The implementation can be swapped with js to avoid SEO duplication of links. */}
                <Navbar/>
                {/* <Drawer
                    container={container}
                    variant="temporary"
                    open={mobileOpen}
                    onClose={handleDrawerToggle}
                    ModalProps={{
                        keepMounted: true, // Better open performance on mobile.
                    }}
                    sx={{
                        display: { xs: 'block', sm: 'none' },
                        '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth },
                    }}
                >
                    {drawer}
                </Drawer> */}
                {/* <Drawer
                    variant="permanent"
                    sx={{
                        display: { xs: 'none', sm: 'block' },
                        '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth },
                    }}
                    open
                >
                    {drawer}
                </Drawer> */}
            </Box>
            <Box
                component="main"
                sx={{ flexGrow: 1, p: 3, width: { sm: `calc(100% - ${drawerWidth}px)` } }}
            >
                <Toolbar />
                {props.children}
            </Box>
        </Box>
    );
}

ResponsiveDrawer.propTypes = {
    /**
     * Injected by the documentation to work in an iframe.
     * You won't need it on your project.
     */
    window: PropTypes.func,
};

export default ResponsiveDrawer;



