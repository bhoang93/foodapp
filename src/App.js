import React, { Component } from 'react';
import './App.css';
import foodapp from './foodapp.png';
import Loading from './loading.png';
import TemporaryDrawer from './Components/restList';
import cookie from 'react-cookies';
import GoogleLocation from './Components/GoogleLocation';

const initialState = {
      rest: null,
      location: null,
      photo: null,
      type: null,
      cost: null,
      googleMaps: null,
      loadDone: false,
      submit: false,
      stars: null,
      restStore: [],
    }

class App extends Component {
  constructor() {
    super()
    this.state = initialState;
  }

loadRest = (restInfo) => {
  this.setState(restInfo)
  this.forceUpdate();
}

goBack = () => {
  this.setState({submit: false})
}

geoLocation = () => {
  this.setState({ submit: true, loadDone: false })

  const postLocation = (position) => {
    const url = "https://developers.zomato.com/api/v2.1/geocode?lat=" + position.coords.latitude + "&lon=" + position.coords.longitude;
  fetch(url, 
  { headers: 
    { Accept: "application/json", 
      "User-Key": "e5e8785a51ec1468d018d314961c3e43" } 
  }).then(results => {
    return results.json();
  }).then(data => {
    const choice = Math.floor((Math.random() * (data.nearby_restaurants.length - 1)) + 1);
    const restInfo = data.nearby_restaurants[choice].restaurant;
    const stars = restInfo.user_rating.aggregate_rating;
    const type = restInfo.cuisines;
    const cost = restInfo.currency + Math.round(restInfo.average_cost_for_two / 2);
    const location = restInfo.location.address.split(",").map((item, key) => {return <span key={key}>{item}<br/></span>});
    const rest = restInfo.name;
    const photo = restInfo.featured_image;
    const googleMaps = "https://www.google.com/maps/dir//" + restInfo.name.replace(/\ /g, "+") + "+" + restInfo.location.zipcode;
    this.setState({ rest, location, photo, type, cost, googleMaps, stars, loadDone: true });
  })
};

  navigator.geolocation.getCurrentPosition(postLocation);

}

googleSubmit = (lat, long) => {
  this.setState({ submit: true, loadDone: false })
  const url = "https://developers.zomato.com/api/v2.1/geocode?lat=" + lat + "&lon=" + long;
  fetch(url, 
  { headers: 
    { Accept: "application/json", 
      "User-Key": "e5e8785a51ec1468d018d314961c3e43" } 
  }).then(results => {
    console.log(results)
    if (results.status == 404) {this.setState({submit: false, loadDone: false}); alert("Something went wrong, please try again.")}
    else {return results.json();}
  }).then(data => {
    const choice = Math.floor((Math.random() * (data.nearby_restaurants.length - 1)) + 1);
    const restInfo = data.nearby_restaurants[choice].restaurant;
    const stars = restInfo.user_rating.aggregate_rating;
    const type = restInfo.cuisines;
    const cost = restInfo.currency + Math.round(restInfo.average_cost_for_two / 2);
    const location = restInfo.location.address.split(",").map((item, key) => {return <span key={key}>{item}<br/></span>});
    const rest = restInfo.name;
    const photo = restInfo.featured_image;
    const googleMaps = "https://www.google.com/maps/dir//" + restInfo.name.replace(/\ /g, "+") + "+" + restInfo.location.zipcode;
    this.setState({ rest, location, photo, type, cost, googleMaps, stars, loadDone: true });
  })
};

componentDidMount() {
  console.log(cookie.load('saved'))
  // this.state =  { restStore: cookie.load('saved').split() }
}


saveRest = () => {
  const rest = this.state;
  let match = false;

  for (let i = 0; i < this.state.restStore.length; i++) {
    if (rest.rest === this.state.restStore[i].rest) {
      match = true;
    }
  }
  
  if (!match) {
   const addStore = this.state.restStore;
   addStore.push(rest);
   cookie.save('saved', addStore.toString(), { path: '/' })
   this.setState({ restStore: addStore })
  }
}

  render() {
    return (
      <div className="App">
        <div id='titleDiv'><img id="logo" src={foodapp} alt="Logo" width="100px" height="100px"/><span id="title">Food App</span></div>
        <TemporaryDrawer loadRest={this.loadRest} restStore={this.state.restStore}/><br />
        {!this.state.submit ? <div><button onClick={this.geoLocation}>Where should I go eat now?</button><br /><br /><GoogleLocation googleSubmit={this.googleSubmit}/></div> : <div></div>}
        { !this.state.submit ? <p></p> :
          !this.state.loadDone ? <img src={Loading} id="loading" alt="Loading..."/> : 
          <div className="info">
            <p>You should eat at</p>
            <p className="name">{this.state.rest}</p>
            {this.state.photo === "" ? <p></p> : <img id="photo" src={this.state.photo} width="300px" height="150px" alt="food" />}
            <p id="address">{this.state.location}</p>
            <p><strong>User Rating: </strong>{this.state.stars}/5</p>
            <p><strong>Type of food:</strong> {this.state.type}</p>
            <p><strong>Average cost per person:</strong> {this.state.cost}</p>
            <div id="buttonDiv"><a href={this.state.googleMaps} target="_blank"><button id="directions">Directions</button></a> <button onClick={this.geoLocation}>Fancy something else?</button></div>
            <br /><button onClick={this.saveRest}>Save</button> <button className="blueButton" onClick={this.goBack}>Go Back</button>
        </div>
        }
      </div>
    );
  }
}

export default App;
