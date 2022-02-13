import React, { Component } from "react";

import db from '../Firebase/firebase-config'
import { ref, onValue} from "firebase/database";

import CreateTournament from "../Album/CreateTournament";

class OrganizeTournmentClass extends Component {
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
      <CreateTournament database={this.state.database} />
    );
  }
}

export default OrganizeTournmentClass;
