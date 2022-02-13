import React, { Component } from "react";

import db from '../Firebase/firebase-config'
import { ref, onValue} from "firebase/database";

import ViewTournament from "../Album/ViewTournament";

class ViewTournamentClass extends Component {
  constructor(props) {
    super(props);
    this.state = {
      database: []
    };
  }
 
  componentDidMount() {
    const starCountRef = ref(db);
    var data = {}
    onValue(starCountRef, (snapshot) => {
      data = snapshot.val();
      console.log(data)
      this.setState({ database: data });
    });
  }
 

  render() {
    return (
      <ViewTournament database={this.state.database} />
    );
  }
}

export default ViewTournamentClass;
