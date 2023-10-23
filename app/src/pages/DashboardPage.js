import styled from '@emotion/styled';
import {
  Button,
  Grid,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TablePagination,
  TableRow,
} from '@mui/material';
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import AddMatchModal from './AddMatchModal';
import SnackbarComponent from '../components/SnackbarComponent';

const COLUMNS_STATS = [
  {
    id: 'rank',
    label: 'Rank',
    render: (value, index, page, rowsPerPage) => page * rowsPerPage + index + 1,
  },
  { id: 'name', label: 'Player Name' },
  { id: 'total_matches', label: 'Games Played' },
  { id: 'wins', label: 'Wins' },
  { id: 'losses', label: 'Losses' },
  {
    id: 'win_ratio',
    label: 'Ratio (Games Wins/Played)',
    render: (value) => Number(value).toFixed(2),
  },
  { id: 'total_goals_for', label: 'Goals For' },
  { id: 'total_goals_against', label: 'Goals Against' },
  { id: 'goals_difference', label: 'Goals Difference' },
];

const DashboardPage = () => {
  const [players, setPlayers] = useState([]);
  const [openModal, setOpenModal] = useState(false);
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  const handleOpen = () => setOpenModal(true);
  const handleClose = () => setOpenModal(false);
  const openSnackbar = (message) => {
    setSnackbarMessage(message);
    setSnackbarOpen(true);
  };
  const fetchPlayersStats = async () => {
    try {
      const { data } = await axios.get('/api/players/stats');
      if (data) {
        setPlayers(data);
      }
    } catch (error) {
      console.error('Error fetching player data:', error);
    }
  };

  useEffect(() => {
    fetchPlayersStats();
  }, []);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const paginatedData = players.slice(
    page * rowsPerPage,
    (page + 1) * rowsPerPage
  );

  return (
    <>
      <AddMatchModal
        open={openModal}
        handleClose={handleClose}
        openSnackbar={openSnackbar}
        refreshData={fetchPlayersStats}
      />
      <Grid
        item
        style={{ display: 'flex', justifyContent: 'center', padding: '10px' }}
      >
        <AddButton variant='contained' color='secondary' onClick={handleOpen}>
          Missing a match?
        </AddButton>
      </Grid>

      <Container>
        <Table>
          <TableHead>
            <TableRow>
              {COLUMNS_STATS.map((column) => (
                <HeadRow key={column.id}>{column.label}</HeadRow>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {paginatedData.map((player, index) => (
              <TableRow key={`${player.player_id}`}>
                {COLUMNS_STATS.map((column) => (
                  <Row key={`${player.player_id}-${column.id}`}>
                    {column.render
                      ? column.render(
                          player[column.id],
                          index,
                          page,
                          rowsPerPage
                        )
                      : player[column.id]}
                  </Row>
                ))}
              </TableRow>
            ))}
          </TableBody>
          <TablePagination
            count={players.length}
            page={page}
            onPageChange={handleChangePage}
            rowsPerPage={rowsPerPage}
            onRowsPerPageChange={handleChangeRowsPerPage}
          />
        </Table>
      </Container>
      <SnackbarComponent
        open={snackbarOpen}
        message={snackbarMessage}
        onClose={() => setSnackbarOpen(false)}
      />
    </>
  );
};

const Container = styled.div`
  margin: auto;
  padding: 20px;
  width: 80%;
  @media (min-width: 800px) {
    width: 60%;
  }
`;

const Row = styled(TableCell)`
  text-align: center;
  &:nth-of-type(2) {
    text-align: left;
  }
`;
const HeadRow = styled(TableCell)`
  font-weight: bold;
  text-align: center;
  &:nth-of-type(2) {
    text-align: left;
  }
`;

const AddButton = styled(Button)`
  font-weight: bold;
  color: gray;
`;
export default DashboardPage;
