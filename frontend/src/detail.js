import React, { Component } from 'react';
import axios from 'axios';
import {Link} from 'react-router';

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
  backgroundDelete: "#E05C0F",
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

class Detail extends Component{
  constructor(props) {
    super(props);

    this.handleChange = this.handleChange.bind(this);
    this.componentWillMount = this.componentWillMount.bind(this);
    this.deleteRecord = this.deleteRecord.bind(this);
    this.showForm = this.showForm.bind(this);

    this.state = {
      detail: []
    }
  }
  handleChange(e) {
    const value = e.target.value;
    const name = e.target.name;

    this.setState({ [name]: value})
  }
  componentWillMount(){
    axios.get(`/api/people/${this.props.params.id}`)
    .then((data) => {
      console.log('>>>>>DETAIL',data.data.name)
			// let detail = this.state.detail
      this.setState({
				name:data.data.name,
      favoriteCity:data.data.favoriteCity,
      id: data.data.id})
    })
    .catch((err)=> {
      console.log(err)
    })
  }
	deleteRecord(e){
		e.preventDefault()
		axios.delete(`/api/people/${this.props.params.id}`)
		.then((data)=> {
			console.log('>>>>DATA',this.props.params)
			res.send(data)
		})
		.catch((err)=>{
			console.log(err)
		})
	}
  showForm(){
    // let name = this.state.name
      return (
        <MuiThemeProvider muiTheme={muiTheme}>
          <div>
        <h2>ID: {this.state.id}</h2>
				<h2>Name: {this.state.name}</h2>
				<h2>Favorite City: {this.state.favoriteCity}</h2>
				<form  className="formField" autoComplete="off">
					<Link to={`/`}>
					<RaisedButton
					 label="HOME PAGE"
					//  type="submit"
					 backgroundColor={styles.backgroundButton}
					 labelColor={styles.color}
					 style={styles.button}
					 onTouchTap={this.deleteRecord}
				 />
			 </Link>{" "}

					 <RaisedButton
						label="DELETE ENTRY"
						type="submit"
						backgroundColor={styles.backgroundDelete}
						labelColor={styles.color}
						style={styles.button}
						onTouchTap={this.deleteRecord}
					/>

				</form>
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

export default Detail;
