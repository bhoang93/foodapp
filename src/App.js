import React, { Component } from 'react';
import './App.css';
import foodapp from './foodapp.png';
import Loading from './loading.png';
import TemporaryDrawer from './Components/restList';
import GoogleLocation from './Components/GoogleLocation';

import Button from '@material-ui/core/Button';

import BackIcon from './Icons/BackIcon.js';
import DirectionsIcon from './Icons/DirectionsIcon.js';
import RedoIcon from './Icons/RedoIcon.js';
import SaveIcon from './Icons/SaveIcon.js';

import { Tooltip } from 'react-tippy';

const localforage = require('localforage');

const initialState = {
      loadDone: false,
      submit: false,
      stars: null,
      restStore: [],
      key: '',
      updateList: false
    }

let restStore =[];

class App extends Component {
  constructor() {
    super()
    this.state = initialState;
  }

currentRest = {};

loadRest = (restInfo) => { //Load resteraunt information from the array.
  const bind = this;
  localforage.getItem(restInfo).then(function(value) {
  bind.currentRest = value;
  bind.setState({loadDone: true, submit: true});
  })
  .catch(err => console.log(err, restInfo));
}

goBack = () => { // Go back to submit screen.
  this.setState({submit: false})
}

postLocation = (position) => {
  if (navigator.onLine) {
    const url = "https://developers.zomato.com/api/v2.1/geocode?lat=" + position.coords.latitude + "&lon=" + position.coords.longitude; // Create Zomato URL
    fetch(url, 
    { headers: 
      { Accept: "application/json", 
        "User-Key": process.env.REACT_APP_ZOMATO_KEY } 
    }).then(results => {
      if (results.status === 404) {this.setState({submit: false, loadDone: false}); alert("Something went wrong, please try again.")}
      else {return results.json();}
    }).then(data => { // Returns data needed to display
      const choice = Math.floor((Math.random() * (data.nearby_restaurants.length - 1)) + 1);
      const restInfo = data.nearby_restaurants[choice].restaurant;
      const stars = restInfo.user_rating.aggregate_rating;
      const type = restInfo.cuisines;
      const cost = restInfo.currency + Math.round(restInfo.average_cost_for_two / 2);
      const location = restInfo.location.address
      const rest = restInfo.name;
      const photo = restInfo.featured_image;
      const googleMaps = "https://www.google.com/maps/dir//" + restInfo.name.replace(/\ /g, "+") + "+" + restInfo.location.zipcode;
      this.currentRest = { rest, location, photo, type, cost, googleMaps, stars }
      this.setState({ loadDone: true })
    })
  } else {
    this.setState({initialState});
    alert("Please check your internet connection and try again.")
  }
}

geoLocation = () => { // Calculate location
  this.setState({ submit: true, loadDone: false }) // Put up loading screen.
  navigator.geolocation.getCurrentPosition(this.postLocation); // Fetch call with user's locaiton
}

googleSubmit = (lat, long) => { // Same as above but using Google Places rather than Geo Location
  this.setState({ submit: true, loadDone: false })
  let position = {coords: {latitude: lat,longitude: long}}
  console.log(position.coords.latitude)
  this.postLocation(position);
};

saveRest = () => { // Save resteraunt to array

   const bind = this;  
   localforage.setItem(this.currentRest.rest, this.currentRest)
   .then((data) => {
    restStore.push(bind.currentRest.rest);
    this.setState({key: Math.random()})
  }).catch((err) => {
    console.log("error:", err, this.currentRest)
   }); // If it is a new resteraunt it is added to the store
}

deleteRest = (key) => {
  localforage.removeItem(key).catch(err => console.log(err));
  this.setState({key: 'refresh'});
}

  render() {
    return (
      <div className="App">
        <div id='titleDiv'><img id="logo" src={foodapp} alt="Logo" width="100px" height="100px"/><span id="title">Food App</span></div>
        <TemporaryDrawer key={this.state.key} deleteRest={this.deleteRest} loadRest={this.loadRest} restStore={restStore}/><br />
        {!this.state.submit ? <div><Button variant="contained" color="secondary" onClick={this.geoLocation}>Where should I go eat now?</Button><br /><br /><GoogleLocation googleSubmit={this.googleSubmit}/></div> : <div></div>}
        { !this.state.submit ? <p></p> :
          !this.state.loadDone ? <img src={Loading} id="loading" alt="Loading..."/> : 
          <div className="info">
            <p>You should eat at</p>
            <p className="name">{this.currentRest.rest}</p>
            {this.currentRest.photo === "" ? <p></p> : <img id="photo" src={this.currentRest.photo} width="300px" height="150px" alt="food" />}
            <p id="address">{this.currentRest.location}</p>
            <p><strong>User Rating: </strong>{this.currentRest.stars}/5</p>
            <p><strong>Type of food:</strong> {this.currentRest.type}</p>
            <p><strong>Average cost per person:</strong> {this.currentRest.cost}</p>

            <div className="iconDiv">

            <Tooltip
              title="Directions"
              position="bottom"
              trigger="mouseenter focus">

              <a href={this.currentRest.googleMaps}>
                <div><DirectionsIcon /></div>
              </a>

            </Tooltip>

            <Tooltip

              title="Save"
              position="bottom"
              trigger="mouseenter focus">
              <div onClick={this.saveRest}><SaveIcon /></div>

            </Tooltip>

            <Tooltip
              title="Go Back"
              position="bottom"
              trigger="mouseenter focus">
              <div onClick={this.goBack}><BackIcon /></div>
            </Tooltip>
            </div>

        </div>
        }
      </div>
    );
  }
}

export default App;
