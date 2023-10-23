import React, { useState } from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import { Autocomplete, Button, Divider, Grid, TextField } from '@mui/material';
import styled from '@emotion/styled';
import { useOutletContext } from 'react-router-dom';
import DeleteIcon from '@mui/icons-material/Delete';
import axios from 'axios';

export default function AddMatchModal({
  open,
  handleClose,
  openSnackbar,
  refreshData,
}) {
  const InitialMatch = {
    team1: { ids: [], score: 0, is_team: false },
    team2: { ids: [], score: 0, is_team: false },
    date: new Date().toISOString().split('T')[0],
  };
  const [matches, setMatches] = useState([InitialMatch]);

  const { players } = useOutletContext();

  const handleAddMatch = () => {
    setMatches([...matches, InitialMatch]);
  };

  const handleInputChange = (index, field, value, team) => {
    const updatedMatches = [...matches];
    if (team && field !== 'date') {
      updatedMatches[index][team][field] = value;
    } else {
      updatedMatches[index][field] = value;
    }
    setMatches(updatedMatches);
  };
  const handleDeleteMatch = (index) => {
    const updatedMatches = matches.filter((_, i) => i !== index);
    setMatches(updatedMatches);
  };

  const handleSave = async () => {
    const update = await axios.post(
      '/api/matches',
      { matches },
      {
        headers: {
          'Content-Type': 'application/json',
        },
      }
    );
    if (update.status === 201) {
      openSnackbar('Match saved successfully');
      setMatches([InitialMatch]);
      refreshData();
    }
  };

  return (
    <Modal open={open} onClose={handleClose} style={{ overflow: 'scroll' }}>
      <StyledBox>
        <Typography variant='h5' component='h2'>
          Add match result here
        </Typography>
        <div>
          {matches.map((match, index) => (
            <div key={index}>
              <Grid container spacing={2}>
                <Grid
                  item
                  sx={{
                    display: 'flex',
                    alignItems: 'center',
                    margin: '10px 0 0',
                  }}
                >
                  <Typography
                    variant='h6'
                    style={{ borderBottom: '4px solid var(--secondary-color)' }}
                  >
                    Match {index + 1}
                  </Typography>
                  <Button onClick={() => handleDeleteMatch(index)}>
                    <DeleteIcon fontSize='small' />
                  </Button>
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    type='date'
                    margin='normal'
                    size='small'
                    label='Match Date'
                    value={match.date}
                    onChange={(e) =>
                      handleInputChange(index, 'date', e.target.value)
                    }
                  />
                </Grid>
                <Grid item xs={6}>
                  <Autocomplete
                    id='player1'
                    value={players.filter((player) =>
                      match.team1.ids.includes(player.id)
                    )}
                    size='small'
                    options={
                      match.team1.ids.length > 1
                        ? players.filter((player) =>
                            match.team1.ids.includes(player.id)
                          )
                        : players
                    }
                    getOptionLabel={(player) => player.name}
                    onChange={(event, value) => {
                      if (value) {
                        if (value.length > 1) {
                          handleInputChange(
                            index,
                            'ids',
                            value.map((player) => player.id),
                            'team1'
                          );
                        } else {
                          handleInputChange(
                            index,
                            'ids',
                            value[0]?.id ? [value[0].id] : [],
                            'team1'
                          );
                        }
                      }
                    }}
                    renderInput={(params) => (
                      <TextField
                        {...params}
                        variant='standard'
                        label={
                          match.team1.ids.length > 1 ? 'Team 1' : 'Player 1'
                        }
                      />
                    )}
                    multiple
                  />
                </Grid>
                <Grid item xs={6}>
                  <TextField
                    label='Score 1'
                    size='small'
                    type='number'
                    value={match.team1.score}
                    onChange={(e) =>
                      handleInputChange(index, 'score', e.target.value, 'team1')
                    }
                  />
                </Grid>
                <Grid item xs={6}>
                  <Autocomplete
                    id='player2'
                    value={players.filter((player) =>
                      match.team2.ids.includes(player.id)
                    )}
                    options={
                      match.team2.ids.length > 1
                        ? players.filter((player) =>
                            match.team2.ids.includes(player.id)
                          )
                        : players
                    }
                    size='small'
                    getOptionLabel={(player) => player.name}
                    onChange={(event, value) => {
                      if (value) {
                        if (value.length > 1) {
                          handleInputChange(
                            index,
                            'ids',
                            value.map((player) => player.id),
                            'team2'
                          );
                        } else {
                          handleInputChange(
                            index,
                            'ids',
                            value[0]?.id ? [value[0].id] : [],
                            'team2'
                          );
                        }
                      }
                    }}
                    renderInput={(params) => (
                      <TextField
                        {...params}
                        variant='standard'
                        label={
                          match.team2.ids.length > 1 ? 'Team 2' : 'Player 2'
                        }
                      />
                    )}
                    multiple
                  />
                </Grid>
                <Grid item xs={6}>
                  <TextField
                    label='Score 2'
                    size='small'
                    type='number'
                    value={match.team2.score}
                    onChange={(e) =>
                      handleInputChange(index, 'score', e.target.value, 'team2')
                    }
                  />
                </Grid>
              </Grid>
            </div>
          ))}
          <Button
            onClick={handleAddMatch}
            disabled={matches.length >= 4}
            sx={{ marginTop: '10px' }}
          >
            + Add Match
          </Button>
        </div>
        <ActionSection>
          <Button
            onClick={() => {
              handleSave();
            }}
            variant='contained'
          >
            Save
          </Button>
        </ActionSection>
      </StyledBox>
    </Modal>
  );
}

const StyledBox = styled(Box)`
  width: 80%;
  margin: auto;
  background-color: white;
  padding: 20px;
  border-radius: 10px;
  max-width: 800px;
`;

const ActionSection = styled.div`
  display: flex;
  justify-content: flex-end;
`;