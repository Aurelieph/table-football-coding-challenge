import styled from '@emotion/styled';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
} from '@mui/material';
import axios from 'axios';
import React, { useEffect } from 'react';

const COLUMNS = [
  { id: 'rang', label: 'Rang', render: (value, index) => index + 1 },
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

const Dashboard = () => {
  const [players, setPlayers] = React.useState([]);
  const fetchPlayers = async () => {
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
    fetchPlayers();
  }, []);

  return (
    <Container>
      <Table>
        <TableHead>
          <TableRow>
            {COLUMNS.map((column) => (
              <HeadRow key={column.id}>{column.label}</HeadRow>
            ))}
          </TableRow>
        </TableHead>
        <TableBody>
          {players.map((player, index) => (
            <TableRow key={`${player.player_id}`}>
              {COLUMNS.map((column) => (
                <Row key={`${player.player_id}-${column.id}`}>
                  {column.render
                    ? column.render(player[column.id], index)
                    : player[column.id]}
                </Row>
              ))}
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </Container>
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
export default Dashboard;
