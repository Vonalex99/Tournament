import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import CssBaseline from '@mui/material/CssBaseline';
import Grid from '@mui/material/Grid';
import Stack from '@mui/material/Stack';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import Link from '@mui/material/Link';
import ButtonGroup from '@mui/material/ButtonGroup';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';

import {
    onAuthStateChanged,
    signOut,
  } from "firebase/auth";
  import { auth } from "../Firebase/firebase-config";


export default function Header(props){

 const [user, setUser] = React.useState({});

  onAuthStateChanged(auth, (currentUser) => {
    setUser(currentUser);
  });

const logout = async () => {
    await signOut(auth);
  };


return(
<>
<CssBaseline />
<AppBar position="relative">
  <Toolbar>
    <ArrowForwardIosIcon sx={{ mr: 2 }} />
    <Typography variant="h6" color="inherit" noWrap>
      Tournament
    </Typography>
    <div style = {{
        position: "absolute",
        right : "15px"
    }}
    >
<Box
  sx={{
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    '& > *': {
      m: 1,
    },
  }}
>
  <ButtonGroup variant="contained"  aria-label="outlined button group">
    {user === null && <Button onClick = {props.handleClickOpenLoginDialog}>Login</Button>}
    {user === null && <Button onClick = {props.handleClickOpenSignDialog}>SignUp</Button>}
    {user !== null && <Button> Hello {user.displayName} !</Button>}
    {user !== null && <Button onClick = {logout}>Logout</Button>}
  </ButtonGroup>
  </Box>          </div>
  </Toolbar>
</AppBar>
</>);
}