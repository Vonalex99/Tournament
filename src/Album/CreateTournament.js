import React from 'react';
import Header from './Header';
import Copyright from './Copyright';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';

import DateTimePicker from '@mui/lab/DateTimePicker';
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import LocalizationProvider from '@mui/lab/LocalizationProvider';

import { useNavigate  } from 'react-router-dom';


import { auth } from "../Firebase/firebase-config";
import { ref, set } from "firebase/database";
import db from '../Firebase/firebase-config'

import Map from './Map';


export default function CreateTournament(props){

  console.log(props.database)
  let navigate = useNavigate ();

  const [name, setName] =  React.useState("");
  const [disc, setDisc] =  React.useState("");
  const [imageURL, setImageURL] =  React.useState("");
  const [participants, setParticipants] =  React.useState(0);
  const [lat, setLat] =  React.useState(0);
  const [long, setLong] =  React.useState(0);
  const [date, setDate] =  React.useState(new Date('2014-08-18T21:11:54'))

  const onChangeName = (e) =>{
    setName(e.target.value);
  }

  const onChangeDisc = (e) =>{
    setDisc(e.target.value);
  }

  const onChangeParticipants = (e) =>{
    setParticipants(e.target.value);
  }
  
  
  const onChangeLat = (e) =>{
    setLat(e.target.value);
  }

  const onChangeLong = (e) =>{
    setLong(e.target.value);
  }

  const onChangeDate = (e) =>{
    console.log(e)
    setDate(e.toString());
  }

  const onChangeURL = (e) =>{
    setImageURL(e.target.value);
  }

  const toAdd = {
    id: props.database.length,
    name_tour: name,
    discipline: disc,
    organizer: auth.currentUser.email, //test, mudar para auth.currentUser.email
    date: date,
    lat: lat,
    long:long,
    max_participants: participants,
    participation_application_deadline: date,
    number_of_ranked_players: 0,
    tournamentimage: imageURL  
  };
return (
    <>
    <Header/>

    <h1>Create a Tournament</h1>
    <Box
      component="form"
      sx={{
        '& .MuiTextField-root': { m: 2, width: '50ch' },
        width : '70%'
      }}
      noValidate
      autoComplete="off"
    >
      <div>
        <TextField
          id="organizer"
          label="Organizer"
          defaultValue={auth.currentUser.email} //test, mudar para auth.currentUser.email
          InputProps={{
            readOnly: true,
          }}
        />
        <TextField
          id="name"
          label="Name"
          value={name}
          onChange={onChangeName}
        />
        <TextField
          id="discipline"
          label="Discipline"
          type="text"
          value={disc}
          onChange={onChangeDisc}
        />
        <TextField
          id="max_part"
          label="Max Participants"
          type = 'number'
          value={participants}
          onChange={onChangeParticipants}
        />
        <TextField
          id="outlined-number"
          label="Latitude"
          type="number"
          value={lat}
          onChange={onChangeLat}
          
        />
          <TextField
          id="outlined-number"
          label="Longitude"
          type="number"
          value={long}
          onChange={onChangeLong}
        />

        <TextField
          id="outlined-number"
          label="Tournament Image URL"
          type="text"
          value={imageURL}
          onChange={onChangeURL}
        />  

        <LocalizationProvider dateAdapter={AdapterDateFns}>
        <DateTimePicker
          label="Date"
          value={date}
          onChange={onChangeDate}
          minDate = {new Date()}
          renderInput={(params) => <TextField {...params} />}
        />
        </LocalizationProvider>
         
      </div>

      <Button sx = {{margin: "10px"}}  variant="contained"
              onClick={() => {
                              set(ref(db, props.database.length + "/"), toAdd);
                              navigate("/", { replace: true });
                               }}>Create Tournament</Button>
    </Box>
    

    <Map
      lat ={lat}
      long = {long}
    />


    <Copyright/>
    </>

)




}