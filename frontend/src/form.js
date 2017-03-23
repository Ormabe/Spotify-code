import React, { Component } from 'react';
import { Link } from 'react-router';
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
import Create from './create';
import Update from './update';
import Latest from './latest';

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
      // let target = data.data
      console.log('>>>>>DATA',data)
      let peopleList = this.state.peopleList
      let entry = data.data.slice(0).reverse().map((cv,i) => {
        return {id:cv.id, name:cv.name, favoriteCity:cv.favoriteCity}
      })
      console.log('entry',entry)
      this.setState({peopleList: entry})
    })
    .catch((err)=> {
      console.log(err)
    })
  }
  showForm(){
const output = this.state.peopleList
      return (
        <MuiThemeProvider muiTheme={muiTheme}>
          <div>
        <form onSubmit={this.enterForm} className="formField" autoComplete="off">
           <RaisedButton
            label="LIST ALL"
            type="submit"
            backgroundColor={styles.backgroundButton}
            labelColor={styles.color}
            style={styles.button}
          />

        </form>
        <Create />
        <Latest />
        <Update />
        {(output < 1) ? <div>
                      <h3>PLEASE CREATE AN ENTRY</h3>
                   </div>
                     :
                     <div>
                       <h3>LIST ALL</h3>
                       <ul>
                         {output.map((cv, i) => (
                           <li key={i}><Link to={`/${cv.id}`}><h4>ID: {cv.id}, Name: {cv.name}, Favorite City: {cv.favoriteCity}</h4></Link></li>
                         ))}
                       </ul>
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
