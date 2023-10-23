import { useEffect, useState } from 'react';
import axios from 'axios';
import React from 'react';
import {
  Autocomplete,
  Avatar,
  Button,
  Divider,
  Grid,
  TextField,
  Typography,
} from '@mui/material';
import styled from '@emotion/styled';
import SnackbarComponent from '../components/SnackbarComponent';
import { useOutletContext } from 'react-router-dom';

const MatchPage = () => {
  const [team1, setTeam1] = useState({ ids: [], score: 0, is_team: false });
  const [team2, setTeam2] = useState({ ids: [], score: 0, is_team: false });
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');
  const [snackbarSeverity, setSnackbarSeverity] = useState('success');
  const { players } = useOutletContext();

  const isSaveDisabled = () => {
    const haveCommonPlayers = () => {
      for (let i = 0; i < team1.ids.length; i++) {
        if (team2.ids.includes(team1.ids[i])) {
          return true;
        }
      }
      return false;
    };

    if (team1.ids.length === 0 || team2.ids.length === 0) {
      return { result: true, message: '' };
    }
    if (haveCommonPlayers()) {
      return { result: true, message: 'Same player cannot be in both teams' };
    }

    return { result: false, message: '' };
  };

  const openSnackbar = (message, severity) => {
    setSnackbarMessage(message);
    setSnackbarSeverity(severity);
    setSnackbarOpen(true);
  };

  const handleSave = async () => {
    const update = await axios.post(
      '/api/scores',
      { team1, team2 },
      {
        headers: {
          'Content-Type': 'application/json',
        },
      }
    );
    if (update.status === 201) {
      openSnackbar('Matches saved successfully');
      setSnackbarSeverity('success');
      setTeam1({ ids: [], score: 0, is_team: false });
      setTeam2({ ids: [], score: 0, is_team: false });
    }
  };
  const getTeamInitials = (teamId) => {
    if (teamId === 1) {
      if (team1.ids.length > 1) {
        return team1.ids
          .map((id) => players.find((player) => player.id === id).name[0])
          .join('&');
      }
      return team1.ids.length > 0
        ? players.find((player) => player.id === team1.ids[0]).name[0]
        : '';
    } else {
      if (team2.ids.length > 1) {
        return team2.ids
          .map((id) => players.find((player) => player.id === id).name[0])
          .join('&');
      }
      return team2.ids.length > 0
        ? players.find((player) => player.id === team2.ids[0]).name[0]
        : '';
    }
  };

  return (
    <Box>
      <Grid
        sx={{
          display: 'flex',
          justifyContent: 'center',
        }}
      >
        <Title>Current Match</Title>
      </Grid>
      <Container>
        <SubContainer>
          <Section>
            <StyledAutocomplete
              id='player1'
              value={players.filter((player) => team1.ids.includes(player.id))}
              options={
                team1.ids.length > 1
                  ? players.filter((player) => team1.ids.includes(player.id))
                  : players
              }
              getOptionLabel={(player) => player.name}
              onChange={(event, value) => {
                if (value) {
                  if (value.length > 1) {
                    setTeam1({
                      ...team1,
                      ids: value.map((player) => player.id),
                      is_team: true,
                    });
                  } else {
                    setTeam1({
                      ...team1,
                      ids: value[0]?.id ? [value[0].id] : [],
                      is_team: false,
                    });
                  }
                }
              }}
              renderInput={(params) => (
                <TextField
                  {...params}
                  variant='standard'
                  style={{ height: '100px' }}
                  label={team1.ids.length > 1 ? 'Team 1' : 'Player 1'}
                />
              )}
              multiple
            />
            {(team1.ids.length > 0 || team2.ids.length > 0) && (
              <Avatar sx={{ width: '80px', height: '80px' }}>
                {getTeamInitials(1)}
              </Avatar>
            )}
            <Grid sx={{ fontSize: '60px', marginTop: '30px' }}>
              {team1.score}
            </Grid>
            <Grid>
              <StyledButton
                onClick={() => setTeam1({ ...team1, score: team1.score - 1 })}
                variant='outlined'
                disabled={team1.score === 0}
              >
                -
              </StyledButton>
              <StyledButton
                onClick={() => setTeam1({ ...team1, score: team1.score + 1 })}
                variant='contained'
              >
                +
              </StyledButton>
            </Grid>
          </Section>

          <Grid
            sx={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              margin: '0 20px',
            }}
          >
            <Divider
              orientation='vertical'
              style={{
                height: '60px',
              }}
            />
            <Typography
              variant='h5'
              style={{
                fontStyle: 'italic',
                fontWeight: 'bold',
                fontSize: '60px',
              }}
            >
              VS
            </Typography>
            <Divider
              orientation='vertical'
              style={{
                height: '90px',
              }}
            />
          </Grid>

          <Section>
            <StyledAutocomplete
              id='player2'
              value={players.filter((player) => team2.ids.includes(player.id))}
              options={
                team2.ids.length > 1
                  ? players.filter((player) => team2.ids.includes(player.id))
                  : players
              }
              getOptionLabel={(player) => player.name}
              onChange={(event, value) => {
                if (value) {
                  if (value.length > 1) {
                    setTeam2({
                      ...team2,
                      ids: value.map((player) => player.id),
                      is_team: true,
                    });
                  } else {
                    setTeam2({
                      ...team2,
                      ids: value[0]?.id ? [value[0].id] : [],
                      is_team: false,
                    });
                  }
                }
              }}
              renderInput={(params) => (
                <TextField
                  {...params}
                  variant='standard'
                  style={{ height: '100px' }}
                  label={team2.ids.length > 1 ? 'Team 2' : 'Player 2'}
                />
              )}
              multiple
            />
            {(team1.ids.length > 0 || team2.ids.length > 0) && (
              <Avatar sx={{ width: '80px', height: '80px' }}>
                {getTeamInitials(2)}
              </Avatar>
            )}
            <Grid sx={{ fontSize: '60px', marginTop: '30px' }}>
              {team2.score}
            </Grid>
            <Grid>
              <StyledButton
                onClick={() => setTeam2({ ...team2, score: team2.score - 1 })}
                variant='outlined'
                disabled={team2.score === 0}
              >
                -
              </StyledButton>
              <StyledButton
                onClick={() => setTeam2({ ...team2, score: team2.score + 1 })}
                variant='contained'
              >
                +
              </StyledButton>
            </Grid>
          </Section>
        </SubContainer>

        <Grid
          sx={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            margin: '20px 0',
          }}
        >
          <Button
            variant='contained'
            disabled={isSaveDisabled().result}
            onClick={() => {
              handleSave();
            }}
          >
            Save Final Score
          </Button>
          <Typography variant='caption'>{isSaveDisabled().message}</Typography>
        </Grid>
      </Container>
      <SnackbarComponent
        open={snackbarOpen}
        severity={snackbarSeverity}
        message={snackbarMessage}
        onClose={() => setSnackbarOpen(false)}
      />
    </Box>
  );
};

const Box = styled.div`
  width: 80%;
  margin: 0 auto;
  @media (min-width: 800px) {
    width: 60%;
  }
`;
const StyledAutocomplete = styled(Autocomplete)`
  min-width: 100px;
  height: 130px;
  @media (min-width: 800px) {
    width: 220px;
  }
`;
const Container = styled.div`
  background-color: var(--background-color);
  padding: 20px;
  border-radius: 20px;
  box-shadow: 0px 0px 10px 0px rgba(0, 0, 0, 0.25);
  margin-top: 20px;
`;
const SubContainer = styled.div`
  display: flex;
`;
const Section = styled(Grid)`
  width: 50%;
  display: flex;
  flex-direction: column;
  align-items: center;
`;
const StyledButton = styled(Button)`
  margin: 10px;
  font-size: 30px;
`;

const Title = styled.h2`
  font-size: 30px;
  text-align: center;
  margin-bottom: 20px;
  border-bottom: 10px solid var(--secondary-color);
`;

export default MatchPage;
