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

class Update extends Component {
  constructor(props) {
    super(props);

  this.handleChange = this.handleChange.bind(this)
  this.putCity = this.putCity.bind(this)
  this.handleDialogOpen = this.handleDialogOpen.bind(this)
  this.handleDialogClose = this.handleDialogClose.bind(this)

    this.state = {
      newFavoriteCity: "",
      favoriteCity: "",
      open: false
    }
  }
	handleChange (e) {
  const target = e.target;
  const value = target.value;
  const name = target.name;

    this.setState({ [name]: value })
	}
  putCity(e) {
    e.preventDefault()
    console.log("<====== POST ======>")

    axios.put('/api/people',{
      newFavoriteCity: this.state.newFavoriteCity,
      favoriteCity: this.state.favoriteCity
    })
    .then((data) => {
      console.log('data',data)
    })
    .catch((err) => {
      console.log(err)
    })
        this.setState({
          newFavoriteCity:"",
          favoriteCity:""
        })
        // this.handleDialogClose()
  }
  handleDialogOpen () {
    this.setState({open: true});
  }
  handleDialogClose () {
    this.setState({open: false});
  }
  render () {
    const actions = [
      <FlatButton
        label="Cancel"
        primary={true}
        onTouchTap={this.handleDialogClose}
      />
    ];
    return (
    <MuiThemeProvider muiTheme={muiTheme}>
      <div>
        <RaisedButton
          label="UPDATE"
          backgroundColor={styles.backgroundUpdate}
          labelColor={styles.color}
          onTouchTap={this.handleDialogOpen}
          style={styles.button}
        />
        <Dialog
          title="Update Your New Favorite City"
          actions={actions}
          modal={false}
          open={this.state.open}
          contentStyle={styles.contentStyle}
          onRequestClose={this.handleDialogClose}
          style={styles.text}
        >
      <form onSubmit={this.putCity} autoComplete="off">

        <TextField
          name="favoriteCity"
          required={true}
          value={this.state.favoriteCity}
          onChange={this.handleChange}
          floatingLabelText="Enter your OLD Favorite City"
          floatingLabelStyle={styles.floatingLabelStyle}
          floatingLabelFocusStyle={styles.floatingLabelFocusStyle}
        />
        <br />
        <TextField
          name="newFavoriteCity"
          required={true}
          value={this.state.newFavoriteCity}
          onChange={this.handleChange}
          floatingLabelText="Enter your NEW Favorite City"
          floatingLabelStyle={styles.floatingLabelStyle}
          floatingLabelFocusStyle={styles.floatingLabelFocusStyle}
        />
        <br />
        <br />
        <br />
        <div className="login-button-container">
          <div className="login-button">
          <RaisedButton
            label="UPDATE"
            type="submit"
            backgroundColor={styles.backgroundUpdate}
            labelColor={styles.color}
            style={styles.button}
          />
        </div>
        </div>
      </form>
    </Dialog>
    </div>
    </MuiThemeProvider>
    )
  }
};

const styles = {
  floatingLabelStyle: {
    color: "#999999"
  },
  floatingLabelFocusStyle: {
    color: "#73937E"
  },
  backgroundUpdate: "#73937E",
  color: "#FFFFFF",
  button: {
    textAlign: "center",
    fontSize: 18,
    width: 100,
    marginBottom: 6,
    lineHeight: '18px',
    verticalAlign: 'middle'
  },
  contentStyle:{
    width: "30%"
  },
  text: {
    textAlign: "center"
  }
};

export default Update;
