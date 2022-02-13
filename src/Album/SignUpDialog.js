import React from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';



import {
  signOut,
  createUserWithEmailAndPassword, sendEmailVerification, updateProfile
} from "firebase/auth";
import { auth } from "../Firebase/firebase-config";

export default function FormDialog(props) {

  const [registerEmail, setRegisterEmail] =  React.useState("");
  const [registerPassword, setRegisterPassword] =  React.useState("");
  const [firstName, setFName] =  React.useState("");
  const [lastName, setLName] =  React.useState("");


    const register = async (e) => {
      try {
        const user = await createUserWithEmailAndPassword(
          auth,
          registerEmail,
          registerPassword
        ).then(()=> 
          sendEmailVerification(auth.currentUser)
          .then(() => {
            updateProfile(auth.currentUser,{
              displayName: firstName + " " + lastName,
              photoURL: "https://www.google.com/url?sa=i&url=https%3A%2F%2Fpl.m.wikipedia.org%2Fwiki%2FPlik%3AUser_font_awesome.svg&psig=AOvVaw0f_0Q2rbDsBAQdgcK7DbCC&ust=1643332210895000&source=images&cd=vfe&ved=0CAsQjRxqFwoTCMiDgtff0PUCFQAAAAAdAAAAABAD"
            }).then(()=>{
              //worked
            }).catch(() =>{
              //error
            });
            alert("Success!\nPlease confirm your account by visiting "+ registerEmail + " and validate your account.");
          })
        )
      } catch (error) {
        alert(error.message);
      }

      await signOut(auth);

      //e.preventDefault() might need no inicio

      setRegisterEmail("")
      setRegisterPassword("")
    };

    const onChangeEmail =(e) => {
      setRegisterEmail(e.target.value);
    }

    const onChangePassword =(e) => {
      setRegisterPassword(e.target.value);
    }

    const onChangeFName =(e) => {
      setFName(e.target.value);
    }

    const onChangeLName =(e) => {
      setLName(e.target.value);
    }

  return (
    <div>
      <Dialog open={props.open} onClose={props.handleClose} aria-labelledby="form-dialog-title">
        <DialogTitle id="form-dialog-title">SignUp</DialogTitle>
         <div style={{height: '20px', width: '100%'}}/>

          <TextField
            autoFocus
            margin="dense"
            id="fname"
            label="First Name"
            type="text"
             fullWidth
            value={firstName}
            onChange={onChangeFName}
          />

          <div style={{height: '20px', width: '100%'}}/>

          <TextField
            autoFocus
            margin="dense"
            id="lname"
            label="Last Name"
            type="text"
             fullWidth
            value={lastName}
            onChange={onChangeLName}
          />

          <div style={{height: '20px', width: '100%'}}/>
        <DialogContent>  
          <TextField
            autoFocus
            margin="dense"
            id="signUp"
            label="Email"
            type="text"
            fullWidth
            value={registerEmail}
            onChange={onChangeEmail}
          />

          <div style={{height: '20px', width: '100%'}}/>

          <TextField
            autoFocus
            margin="dense"
            id="password"
            label="Password"
            type="password"
             fullWidth
            value={registerPassword}
            onChange={onChangePassword}
          />
          <div style={{height: '20px', width: '100%'}}/>

        
        </DialogContent>
        <DialogActions>
          <Button onClick={props.handleClose} color="primary">
            Cancel
          </Button>
          <Button onClick={register} color="primary">
            SignUp
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}