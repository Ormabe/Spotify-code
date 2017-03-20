import React, { Component } from 'react';
import axios from 'axios';

import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import RaisedButton from 'material-ui/RaisedButton';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import injectTapEventPlugin from 'react-tap-event-plugin';
import TextField from 'material-ui/TextField';

// IMPORT IMAGE Component
import Image from './image';
import Detail from './detail';

const muiTheme = getMuiTheme();

const styles = {
  floatingLabelStyle: {
    color: "#999999"
  },
  floatingLabelFocusStyle: {
    color: "#163D56"
  },
  backgroundButton: "#163d56",
  color: "#FFFFFF",
  button: {
    textAlign: "center",
    fontSize: 18,
    width: 100,
    marginBottom: 6,
    lineHeight: '18px',
    verticalAlign: 'middle'
  }
};

class Form extends Component{
  constructor(props) {
    super(props);

    this.handleChange = this.handleChange.bind(this);
    this.enterForm = this.enterForm.bind(this);
    this.showForm = this.showForm.bind(this);

    this.state = {
      name: "",
      favoriteCity: "",
      peopleList: []
    }
  }
  handleChange(e) {
    const value = e.target.value;
    const name = e.target.name;

    this.setState({ [name]: value})
  }
  enterForm(e){
    e.preventDefault()
    axios.get('/api/people')
    .then((data) => {
      if (user) {
        this.setState({user: data})
      }
    })
  }
  showForm(){
    const output = this.state.user
      return (
        <MuiThemeProvider muiTheme={muiTheme}>
          <div>
        <div>
          <h1 className="title">Rabiya's Spotify Application</h1>
        </div>
        <form onSubmit={this.enterForm} className="formField" autoComplete="off">
          <TextField
            name="name"
            type="text"
            required={true}
            value={this.state.name}
            onChange={this.handleChange}
            floatingLabelText="Enter Name"
            floatingLabelStyle={styles.floatingLabelStyle}
            floatingLabelFocusStyle={styles.floatingLabelFocusStyle}
          />
          <br />
          <TextField
            name="favoriteCity"
            required={true}
            value={this.state.favoriteCity}
            onChange={this.handleChange}
            floatingLabelText="Enter Favorite City"
            floatingLabelStyle={styles.floatingLabelStyle}
            floatingLabelFocusStyle={styles.floatingLabelFocusStyle}
          />
          <br />
           <RaisedButton
            label="Enter"
            type="submit"
            backgroundColor={styles.backgroundButton}
            labelColor={styles.color}
            style={styles.button}
          />
        </form>
        {output < 1 ? <div>
                       </div>
                     :
                     <div>
                       <Detail list={this.state.peopleList} />
                     </div>}
      </div>
    </MuiThemeProvider>
    )
  }
  render() {
    return (
      <div>{this.showForm()}</div>
    )
  }
};

export default Form;
