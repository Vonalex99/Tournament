import React from 'react';
import Header from '../Album/Header';
import LoginDialog from '../Album/LoginDialog'
import SignUpDialog from '../Album/SignUpDialog'
import Copyright from '../Album/Copyright';
import Button from '@mui/material/Button';
import { useNavigate  } from 'react-router-dom';

import { auth } from "../Firebase/firebase-config";

import {
    onAuthStateChanged,
    sendPasswordResetEmail
  } from "firebase/auth";

export default function ForgetPassword(){

    let navigate = useNavigate ();

    //TO OPEN DE FORM DIALOG
 const [openLogin, setOpenLogin] = React.useState(false);
 const [openSign, setOpenSign] = React.useState(false);


 const [user, setUser] = React.useState({});

const recover = () => {

 const userEmail = document.getElementById("email").value

 sendPasswordResetEmail(auth, userEmail)
 .then(() => {
   // Password reset email sent!
   // 
   alert("A link to reset your password was sent to your email")
   navigate("/", { replace: true });

 })
 .catch((error) => {
   alert(error.message)
   // ..
 });
}


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


    return (
        <>
        <Header
        handleClickOpenLoginDialog = {handleClickOpenLoginDialog}
        handleClickOpenSignDialog = {handleClickOpenSignDialog}
        />
        
        <span style = {{fontWeight : "bold",
                        fontSize : "25px"    
                        }}>Enter Email to Recover Password   </span>
        <input type="text" id = 'email' style = {{fontSize : "20px"}}/>
        <Button onClick = {recover}>Recover Password</Button>




        <Copyright/>
        {openLogin && <LoginDialog open={openLogin} handleClickOpen={handleClickOpenLoginDialog} handleClose={handleCloseLoginDialog}></LoginDialog> }
        {openSign &&<SignUpDialog open={openSign} handleClickOpen={handleClickOpenSignDialog} handleClose={handleCloseSignDialog}></SignUpDialog> }
   
        </>

    );
}