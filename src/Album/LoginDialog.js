import React from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';


import {signInWithEmailAndPassword, signOut} from "firebase/auth";
import { auth } from "../Firebase/firebase-config";

export default function FormDialog(props) {

  const [email, setEmail] = React.useState("");
  const [password, setPassword] =  React.useState("");


  const login = async () => {
    // e.preventDefault() might need, not sure
    try {
      const user = await signInWithEmailAndPassword(
        auth,
        email,
        password
      )
        if(!auth.currentUser.emailVerified){
          await signOut(auth);
          alert("Please verify your account before login.")
        }


    } catch (error) {
      console.log(error.message);
      alert("Email and/or password wrong");
      await signOut(auth);
    }

    setEmail("");
    setPassword("");

    props.handleClose();
  };

  
    const onChangeEmail =(e) => {
      setEmail(e.target.value);
    }

    const onChangePassword =(e) => {
      setPassword(e.target.value);
    }

  return (
    <div>
      <Dialog open={props.open} onClose={props.handleClose} aria-labelledby="form-dialog-title">
        <DialogTitle id="form-dialog-title">Login</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            id="email"
            label="Email"
            type="text"
            fullWidth
            value={email}
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
            value={password}
            onChange={onChangePassword}
          />


          <div style={{height: '20px', width: '100%'}}/>


        </DialogContent>
        <DialogActions>
          <Button onClick={props.handleClose} color="primary">
            Cancel
          </Button>
          <Button onClick={login} color="primary">
            Login
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}