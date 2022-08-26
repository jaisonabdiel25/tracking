import React from 'react';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Toolbar from '@mui/material/Toolbar';
import AddIcon from '@mui/icons-material/Add';
import { useNavigate } from 'react-router-dom';
import AllInboxSharpIcon from '@mui/icons-material/AllInboxSharp';
import LogoutSharpIcon from '@mui/icons-material/LogoutSharp';
import AssignmentReturnedIcon from '@mui/icons-material/AssignmentReturned';
import PermIdentityIcon from '@mui/icons-material/PermIdentity';
import ExpandLess from '@mui/icons-material/ExpandLess';
import ExpandMore from '@mui/icons-material/ExpandMore';
import GroupOutlinedIcon from '@mui/icons-material/GroupOutlined';
import PersonAddIcon from '@mui/icons-material/PersonAdd';
import { useDispatch } from 'react-redux';
import { LogoutAction } from '../../Actions/Thunks/Auth';
import { Divider, Grid, Typography } from '@mui/material';
import Collapse from '@mui/material/Collapse';
import StarBorder from '@mui/icons-material/StarBorder';

export const Sidebar = ({ drawerWidth, handleDrawerToggle, mobileOpen }) => {
	const [open, setOpen] = React.useState(true);
	const navigate = useNavigate();
	const dispatch = useDispatch();
	const { userDB } = JSON.parse(localStorage.getItem('userStorage'));

	const newTracking = () => {
		navigate('/tracking/newTracking', { replace: true });
	};

	const receiveTracking = () => {
		navigate('/tracking/recesive', { replace: true });
	};

	const trackings = () => {
		navigate('/tracking/', { replace: true });
	};

	const clients = () => {
		navigate('/clients', { replace: true });
	};

	const newClient = () => {
		navigate('/clients/newClient', { replace: true });
	};

	const logout = () => {
		dispatch(LogoutAction());
		navigate('/', { replace: true });
	};

	const handleClick = () => {
		setOpen(!open);
	};

	const drawer = (
		<div>
			<Toolbar>
				<Grid>
					{userDB ? (
						<Typography variant='h6' noWrap component='div'>
							¡Hola {userDB.name}!
						</Typography>
					) : (
						''
					)}
				</Grid>
			</Toolbar>
			<Divider />

			<List>
				<ListItem disablePadding>
					<ListItemButton onClick={newTracking}>
						<ListItemIcon>
							<AddIcon />
						</ListItemIcon>
						<ListItemText>Nuevo</ListItemText>
					</ListItemButton>
				</ListItem>
				<ListItem disablePadding>
					<ListItemButton onClick={receiveTracking}>
						<ListItemIcon>
							<AssignmentReturnedIcon />
						</ListItemIcon>
						<ListItemText>Recibir</ListItemText>
					</ListItemButton>
				</ListItem>
				<ListItem disablePadding>
					<ListItemButton onClick={trackings}>
						<ListItemIcon>
							<AllInboxSharpIcon />
						</ListItemIcon>
						<ListItemText>Trackings</ListItemText>
					</ListItemButton>
				</ListItem>
				<ListItemButton onClick={handleClick}>
					<ListItemIcon>
						<PermIdentityIcon />
					</ListItemIcon>
					<ListItemText>Clientes</ListItemText>
					{open ? <ExpandLess /> : <ExpandMore />}
				</ListItemButton>
				<Collapse in={open} timeout='auto' unmountOnExit>
					<List component='div' disablePadding>
						<ListItemButton sx={{ pl: 4 }} onClick={clients}>
							<ListItemIcon>
								<GroupOutlinedIcon />
							</ListItemIcon>
							<ListItemText>Clientes</ListItemText>
						</ListItemButton>
						<ListItemButton sx={{ pl: 4 }} onClick={newClient}>
							<ListItemIcon>
								<PersonAddIcon />
							</ListItemIcon>
							<ListItemText>Nuevo Cliente</ListItemText>
						</ListItemButton>
					</List>
				</Collapse>
				<ListItem disablePadding>
					<ListItemButton onClick={logout}>
						<ListItemIcon>
							<LogoutSharpIcon color='error' />
						</ListItemIcon>
						<ListItemText>Logout</ListItemText>
					</ListItemButton>
				</ListItem>
			</List>
		</div>
	);
	return (
		<Box component='nav' sx={{ width: { sm: drawerWidth }, flexShrink: { sm: 0 } }} aria-label='mailbox folders'>
			{/* The implementation can be swapped with js to avoid SEO duplication of links. */}
			<Drawer
				variant='temporary'
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
			</Drawer>
			<Drawer
				variant='permanent'
				sx={{
					display: { xs: 'none', sm: 'block' },
					'& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth },
				}}
				open
			>
				{drawer}
			</Drawer>
		</Box>
	);
};
