import { useEffect, useState } from 'react';
import axios from 'axios';
import React from 'react';
import { Autocomplete, Button, Grid, TextField } from '@mui/material';
import styled from '@emotion/styled';

const MatchPage = () => {
  const [players, setPlayers] = useState([]);
  const [team1, setTeam1] = useState({ ids: [], score: 0, is_team: false });
  const [team2, setTeam2] = useState({ ids: [], score: 0, is_team: false });

  useEffect(() => {
    async function fetchPlayers() {
      try {
        const { data } = await axios.get('/api/players');
        if (data) {
          setPlayers(data);
        } else {
          console.error('Failed to fetch player data');
        }
      } catch (error) {
        console.error('Error fetching player data:', error);
      }
    }

    fetchPlayers();
  }, []);
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
                    setTeam1({ ...team1, ids: [value.id], is_team: false });
                  }
                }
              }}
              renderInput={(params) => (
                <TextField
                  {...params}
                  variant='standard'
                  label={team1.ids.length > 1 ? 'Team 1' : 'Player 1'}
                />
              )}
              multiple
              limitTags={2}
            />
            <Grid sx={{ fontSize: '60px' }}>{team1.score}</Grid>
            <Grid>
              <StyledButton
                onClick={() => setTeam1({ ...team1, score: team1.score - 1 })}
                variant='outlined'
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
          <Section>
            <StyledAutocomplete
              id='player2'
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
                    setTeam2({ ...team2, ids: [value.id], is_team: false });
                  }
                }
              }}
              renderInput={(params) => (
                <TextField
                  {...params}
                  variant='standard'
                  label={team2.ids.length > 1 ? 'Team 2' : 'Player 2'}
                />
              )}
              multiple
            />
            <Grid sx={{ fontSize: '60px' }}>{team2.score}</Grid>
            <Grid>
              <StyledButton
                onClick={() => setTeam2({ ...team2, score: team2.score - 1 })}
                variant='outlined'
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
            justifyContent: 'center',
            margin: '100px 0 20px',
          }}
        >
          <Button
            variant='contained'
            onClick={() => {
              console.log(team1, team2);
            }}
          >
            Save Final Score
          </Button>
        </Grid>
      </Container>
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
  height: 150px;
  @media (min-width: 800px) {
    width: 220px;
  }
`;
const Container = styled.div`
  background-color: var(--background-color);
  padding: 20px;
  border-radius: 20px;
  box-shadow: 0px 0px 10px 0px rgba(0, 0, 0, 0.25);
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
