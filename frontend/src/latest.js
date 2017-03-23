import React, { Component } from 'react';
import axios from 'axios';

import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import RaisedButton from 'material-ui/RaisedButton';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import injectTapEventPlugin from 'react-tap-event-plugin';
import TextField from 'material-ui/TextField';



const muiTheme = getMuiTheme();

const styles = {
  floatingLabelStyle: {
    color: "#999999"
  },
  floatingLabelFocusStyle: {
    color: "#E05C0F"
  },
  backgroundLatest: "#E05C0F",
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

class Latest extends Component{
  constructor(props) {
    super(props);

    this.handleChange = this.handleChange.bind(this);
    this.getLatest = this.getLatest.bind(this);
    this.showForm = this.showForm.bind(this);

    this.state = {
      latest: ""
    }
  }
  handleChange(e) {
    const value = e.target.value;
    const name = e.target.name;

    this.setState({ [name]: value})
  }
  getLatest(e){
    e.preventDefault()
    axios.get('/api/people')
    .then((data) => {
      console.log('>>>>>PROPS',this.props)
      let name = data.data[0].name;
      let favoriteCity = data.data[0].favoriteCity;
      let id = data.data[0].id;
      // let peopleList = that.state.peopleList
      // peopleList.push(people)
      // console.log('people:',people)
      this.setState({name,favoriteCity,id})
      console.log(name,favoriteCity,id)
    })
    .catch((err)=> {
      console.log(err)
    })
  }
  showForm(){
    let name = this.state.name
      return (
        <MuiThemeProvider muiTheme={muiTheme}>
          <div>
        <form onSubmit={this.getLatest} className="formField" autoComplete="off">
           <RaisedButton
            label="LATEST"
            type="submit"
            backgroundColor={styles.backgroundLatest}
            labelColor={styles.color}
            style={styles.button}
          />
        </form>
        {(!name) ? <div></div> :
        <div>
        <h3>LATEST ENTRY</h3>
        <h4>ID: {this.state.id}, Name: {this.state.name}, Favorite City: {this.state.favoriteCity}</h4>
      </div>
      }
      </div>
    </MuiThemeProvider>
    )
  }
  render() {
    return (
      <div>
        {this.showForm()}
      </div>
    )
  }
};

export default Latest;
