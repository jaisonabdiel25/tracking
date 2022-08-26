import * as React from 'react';
import Box from '@mui/material/Box';
import CssBaseline from '@mui/material/CssBaseline';
import Toolbar from '@mui/material/Toolbar';
import { Header } from '../Design/Header';
import { Sidebar } from '../Design/Sidebar';

const drawerWidth = 300;

export const AppPages = ({ children }) => {
	const [mobileOpen, setMobileOpen] = React.useState(false);
	const handleDrawerToggle = () => {
		setMobileOpen(!mobileOpen);
	};

	return (
		<Box sx={{ display: 'flex' }}>
			<CssBaseline />
			<Header drawerWidth={drawerWidth} handleDrawerToggle={handleDrawerToggle} />
			<Sidebar drawerWidth={drawerWidth} handleDrawerToggle={handleDrawerToggle} mobileOpen={mobileOpen} />
			<Box component='main' sx={{ flexGrow: 1, p: 3, width: { sm: `calc(100% - ${drawerWidth}px)` } }}>
				<Toolbar />
				{children}
			</Box>
		</Box>
	);
};
