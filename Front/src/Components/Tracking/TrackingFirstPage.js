import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import { getTrackingAction } from '../../Actions/Thunks/Tracking';
import { TablePagination } from '@mui/material';

export const TrackingFirstPage = () => {
	const [page, setPage] = useState(0);
	const [rowsPerPage, setRowsPerPage] = useState(10);
	const navigate = useNavigate();
	const dispatch = useDispatch();

	const trackings = useSelector((state) => state.Tracking.trackings);

	useEffect(() => {
		dispatch(getTrackingAction());
	}, []);

	const handleChangePage = (event, newPage) => {
		setPage(newPage);
	};

	const handleChangeRowsPerPage = (event) => {
		setRowsPerPage(+event.target.value);
		setPage(0);
	};

	return (
		<TableContainer component={Paper}>
			<Paper sx={{ width: '100%' }}>
				<TableContainer sx={{ maxHeight: 440 }}>
					<Table stickyHeader aria-label='sticky table' align='center'>
						<TableHead>
							<TableRow>
								<TableCell>Tracking</TableCell>
								<TableCell align='right'>Cliente</TableCell>
								<TableCell align='right'>Ubicación</TableCell>
								<TableCell align='right'>Peso&nbsp;(lb)</TableCell>
								<TableCell align='right'>Costo</TableCell>
							</TableRow>
						</TableHead>
						<TableBody>
							{trackings
								? trackings.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row) => (
										<TableRow key={row.uid} sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
											<TableCell component='th' scope='row'>
												{row.tracking}
											</TableCell>
											<TableCell align='right'>{row.client}</TableCell>
											<TableCell align='right'>{row.ubication.name}</TableCell>
											<TableCell align='right'>{row.weight.toFixed(2)}</TableCell>
											<TableCell align='right'>$ {row.cost.toFixed(2)}</TableCell>
										</TableRow>
								  ))
								: ''}
						</TableBody>
					</Table>
				</TableContainer>
				<TablePagination
					rowsPerPageOptions={[5, 25, 100]}
					component='div'
					count={trackings.length}
					rowsPerPage={rowsPerPage}
					page={page}
					onPageChange={handleChangePage}
					onRowsPerPageChange={handleChangeRowsPerPage}
				/>
			</Paper>
		</TableContainer>
	);
};
