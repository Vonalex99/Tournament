import React from 'react';
import MainPageClass from './routes/MainPageClass.js';
import ForgetPassword from './routes/ForgetPassword.js';
import CreateTournamentClass from './routes/CreateTournamentClass.js';
import ViewTournamentClass from './routes/ViewTournamentClass.js';

import {
  BrowserRouter,
  Routes,
  Route
} from "react-router-dom";




function App() {
    return (
      <BrowserRouter>
      <Routes>
        <Route path="/" element={<MainPageClass/>}/>
        <Route path = "ForgetPass" element = {<ForgetPassword/>}/>
        <Route path = "CreateTournament" element = {<CreateTournamentClass/>}/>
        <Route path = "ViewTournament" element = {<ViewTournamentClass/>}>
        <Route path = ":index" element = {<ViewTournamentClass/>}/>
          </Route>
       </Routes>
        </BrowserRouter>

    );
}

export default App;