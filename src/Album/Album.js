import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import Pagination from '@mui/material/Pagination';
import Stack from '@mui/material/Stack';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import Typography from '@mui/material/Typography';
import {
  onAuthStateChanged,
  signOut
} from "firebase/auth";
import * as React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { auth } from "../Firebase/firebase-config";
import Copyright from './Copyright.js';
import Header from './Header.js';
import LoginDialog from './LoginDialog.js';
import SignUpDialog from './SignUpDialog.js';






const theme = createTheme();

const logout = async () => {
  await signOut(auth);
};

export default function Album(props) {


 //TO OPEN DE FORM DIALOG
 const [openLogin, setOpenLogin] = React.useState(false);
 const [openSign, setOpenSign] = React.useState(false);
 const [page, setPage] = React.useState(1);
 const [end, setEnd] = React.useState(9);

 const navigate = useNavigate ();

 const [user, setUser] = React.useState({});

  onAuthStateChanged(auth, (currentUser) => {
    setUser(currentUser);
  });

const handleClickOpenSignDialog = () => {
  setOpenSign(true);
};

const handleCloseSignDialog = () => {
  setOpenSign(false);
};


const handleClickOpenLoginDialog = () => {
  setOpenLogin(true);
};

const handleCloseLoginDialog = () => {
  setOpenLogin(false);
};

const handlePageChange = (event, value) => {
  setPage(value);
  const end2 = (props.database.length > (page-1)*10+10) ? (page-1)*10+10 : props.database.length -1;
  setEnd(end2);
};

const handleCreateBtn = () => {
  if(auth.currentUser === null)
    alert("You must login before registering a tournament.")
  else{
    navigate("/CreateTournament", { replace: true });
  }

}

  return (
    <>
    <ThemeProvider theme={theme}>
     <Header
        handleClickOpenLoginDialog = {handleClickOpenLoginDialog}
        handleClickOpenSignDialog = {handleClickOpenSignDialog}

     />
      <main>
        {/* Hero unit */}
        <Box
          sx={{
            bgcolor: 'background.paper',
            pt: 8,
            pb: 6,
          }}
        >
          <Container maxWidth="sm">
            <Typography
              component="h1"
              variant="h2"
              align="center"
              color="text.primary"
              gutterBottom
            >
              Tournament Page
            </Typography>
            <Stack
              sx={{ pt: 4 }}
              direction="row"
              spacing={2}
              justifyContent="center"
            >
              <Button size = "big" variant="contained" onClick={handleCreateBtn}>Create Tournament</Button>
            </Stack>
            <Typography variant="h5" align="center" color="text.secondary" paragraph>
              Below, you can see the available tournaments that you can enroll!
            </Typography>
            
           
          </Container>
        </Box>
        <Container sx={{ position: 'relative', py: 8}} maxWidth="md">
          {/* End hero unit */}
          <Grid container spacing={4}>
            {props.database !== null && props.database.slice((page-1)*(10-page),end).map((item) => (
              <Grid item key={item.id} xs={12} sm={6} md={4}>
                <Card
                  sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}
                >
                  <CardMedia
                    component="img"
                    sx={{
                      // 16:9
                      pt: '56.25%',
                    }}
                    image={item.tournamentimage}
                    alt="tournamentImage"
                  />
                  <CardContent sx={{ flexGrow: 1 }}>
                    <Typography gutterBottom variant="h5" component="h2">
                      {item.name_tour}
                    </Typography>
                    <Typography>
                     {item.discipline}
                    </Typography>
                  </CardContent>
                 
                    <Link style={{textDecoration: 'none'}}
                         to={'/ViewTournament/' + item.id}
                          >
                      View Details
                    </Link>
                  
                </Card>
              </Grid>
            ))}
          </Grid>

          <Pagination sx = {{position:'absolute',
                             left: '25%'}}
                              count = {10} size='large'
                              onChange={handlePageChange}/>
        </Container>
      </main>
    
      {/* Footer */}
      <Box sx={{ bgcolor: 'background.paper', p: 6 }} component="footer">
        <Typography
          variant="subtitle1"
          align="center"
          color="text.secondary"
          component="p"
        >
         Website Created for Internet Applications Course
        </Typography>
        <Copyright />
      </Box>
      {/* End footer */}
    </ThemeProvider>
    {openLogin && <LoginDialog open={openLogin} handleClickOpen={handleClickOpenLoginDialog} handleClose={handleCloseLoginDialog}></LoginDialog> }
    {openSign &&<SignUpDialog open={openSign} handleClickOpen={handleClickOpenSignDialog} handleClose={handleCloseSignDialog}></SignUpDialog> }
    </>
    
  );
}