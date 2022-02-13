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
import { useParams } from "react-router-dom";


import { auth } from "../Firebase/firebase-config";
import { ref, set } from "firebase/database";
import db from '../Firebase/firebase-config'

import Map from './Map';


export default function ViewTournament(props){

  let navigate = useNavigate ();
  let params = useParams();

  const [organizer, setOrganizer] =  React.useState("");
  const [name, setName] =  React.useState("");
  const [disc, setDisc] =  React.useState("");
  const [imageURL, setImageURL] =  React.useState("");
  const [participants, setParticipants] =  React.useState(0);
  const [lat, setLat] =  React.useState(0);
  const [long, setLong] =  React.useState(0);
  const [date, setDate] =  React.useState(new Date())
  const [view, setView] =  React.useState(true);

  React.useEffect(() => {
    if(props.database.length > 0 && view){
      console.log(props.database[params.index].organizer)
      setOrganizer(props.database[params.index].organizer)
     setName(props.database[params.index].name_tour);
     setDisc(props.database[params.index].discipline);
      setImageURL(props.database[params.index].tournamentimage);
     setParticipants(props.database[params.index].max_participants);
      setLat(props.database[params.index].lat)
      setLong(props.database[params.index].long)
      setDate(props.database[params.index].participation_application_deadline)
    }
     
  });


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

  const handleEditClick = () =>{
      if(auth.currentUser !== null){
      console.log(organizer.trimEnd() == auth.currentUser.email.trim())
      if(organizer.trimEnd() == auth.currentUser.email.trim()){
        setView(false);
        }
      else{
        alert("You must be the organizer to edit this Tournament.");
      }
    } else {
      alert("You must be logged in to edit the tournament")
    }
  }

  const toAdd = {
    id: params.index,
    name_tour: name,
    discipline: disc,
    organizer: organizer,  
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
    {props.database && 
    <>
    <Header/>

    <h1>Tournament Details</h1>
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
          defaultValue={organizer} 
          value = {organizer}
          InputProps={{
            readOnly: true,
          }}
        />
        {view && 
        <>
        <TextField
          id="name"
          label="Name"
          value={name}
          onChange={onChangeName}
          InputProps={{
            readOnly: true,
          }}
        />
        <TextField
          id="discipline"
          label="Discipline"
          type="text"
          value={disc}
          onChange={onChangeDisc}
          InputProps={{
            readOnly: true,
          }}
        />
        <TextField
          id="max_part"
          label="Max Participants"
          type = 'number'
          value={participants}
          onChange={onChangeParticipants}
          InputProps={{
            readOnly: true,
          }}
        />
        <TextField
          id="outlined-number"
          label="Latitude"
          type="number"
          value={lat}
          onChange={onChangeLat}
          InputProps={{
            readOnly: true,
          }}
          
        />
          <TextField
          id="outlined-number"
          label="Longitude"
          type="number"
          value={long}
          onChange={onChangeLong}
          InputProps={{
            readOnly: true,
          }}
        />

        <TextField
          id="outlined-number"
          label="Tournament Image URL"
          type="text"
          value={imageURL}
          onChange={onChangeURL}
          InputProps={{
            readOnly: true,
          }}
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
        </>
        }

    {!view && 
        <>
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
        </>
        }
         
      </div>
        

      {view && <Button sx = {{margin: "10px"}}  variant="contained"
              onClick={handleEditClick}>Edit Tournament</Button>}
      {!view && <Button sx = {{margin: "10px"}}  variant="contained"
              onClick={() => {set(ref(db, params.index + "/"), toAdd)
                               navigate("/", { replace: true });}}>Confirm</Button>}
    </Box>
    

    <Map
      lat ={lat}
      long = {long}
    />


    <Copyright/>
    </>
        }
    </>

)




}