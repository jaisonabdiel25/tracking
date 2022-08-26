import React from 'react';
import AppBar from '@mui/material/AppBar';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import { red } from '@mui/material/colors';

export const Header = ({ drawerWidth, handleDrawerToggle }) => {
	const color = red[500];
	return (
		<AppBar
			position='fixed'
			sx={{
				width: { sm: `calc(100% - ${drawerWidth}px)` },
				ml: { sm: `${drawerWidth}px` },
			}}
			// color={color}
		>
			<Toolbar color={color}>
				<IconButton
					color='inherit'
					aria-label='open drawer'
					edge='start'
					onClick={handleDrawerToggle}
					sx={{ mr: 2, display: { sm: 'none' } }}
				>
					<MenuIcon />
				</IconButton>
				<Typography variant='h6' noWrap component='div'>
					TrackingApp
				</Typography>
			</Toolbar>
		</AppBar>
	);
};
