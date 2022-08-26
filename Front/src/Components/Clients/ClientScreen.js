import * as React from 'react';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import { getClientAction } from '../../Actions/Thunks/Client';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

export const ClientScreen = () => {
	const navigate = useNavigate();
	const dispatch = useDispatch();
	const [page, setPage] = React.useState(0);
	const [rowsPerPage, setRowsPerPage] = React.useState(10);

	React.useEffect(() => {
		dispatch(getClientAction());
	}, []);

	const clients = useSelector((state) => state.Client.clients);

	const handleChangePage = (event, newPage) => {
		setPage(newPage);
	};

	const handleChangeRowsPerPage = (event) => {
		setRowsPerPage(+event.target.value);
		setPage(0);
	};

	return (
		<Paper sx={{ width: '100%' }}>
			<TableContainer sx={{ maxHeight: 440 }}>
				<Table stickyHeader aria-label='sticky table' align='center'>
					<TableHead>
						<TableRow>
							<TableCell align='left'>Nombre</TableCell>
							<TableCell align='left'>Código</TableCell>
							<TableCell align='left'>Correo</TableCell>
							<TableCell align='left'>Celular</TableCell>
							<TableCell align='left'>Direccíon</TableCell>
						</TableRow>
					</TableHead>
					<TableBody>
						{clients
							? clients.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row) => (
									<TableRow key={row.uid} hover role='checkbox' tabIndex={-1} align='left'>
										<TableCell component='th' scope='row'>
											{row.name}
										</TableCell>
										<TableCell align='left'>{row.code}</TableCell>
										<TableCell align='left'>{row.email}</TableCell>
										<TableCell align='left'>{row.movil}</TableCell>
										<TableCell align='left'>{row.direction}</TableCell>
									</TableRow>
							  ))
							: ''}
					</TableBody>
				</Table>
			</TableContainer>
			<TablePagination
				rowsPerPageOptions={[5, 25, 100]}
				component='div'
				count={clients.length}
				rowsPerPage={rowsPerPage}
				page={page}
				onPageChange={handleChangePage}
				onRowsPerPageChange={handleChangeRowsPerPage}
			/>
		</Paper>
	);
};
