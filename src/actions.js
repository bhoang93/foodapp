import { 
	LOAD_RESTAURANT,
	REQUEST_REST_PENDING,
	REQUEST_REST_SUCCESS,
	REQUEST_REST_FAILED,
	 } from './constants.js'

export const loadRest = (rest) => ({
	type: LOAD_RESTAURANT,
	payload: rest
})

export const requestRest = () => (dispatch) => {
	dispatch({ type: REQUEST_REST_PENDING })
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
	  	dispatch({ type: REQUEST_REST_SUCCESS, payload: data.nearby_restaurants[choice].restaurant })
	  	.catch(error => dispatch({ type: REQUEST_REST_FAILED, payload: error }))
	    // const choice = Math.floor((Math.random() * (data.nearby_restaurants.length - 1)) + 1);
	    // const restInfo = data.nearby_restaurants[choice].restaurant;
	    // const stars = restInfo.user_rating.aggregate_rating;
	    // const type = restInfo.cuisines;
	    // const cost = restInfo.currency + Math.round(restInfo.average_cost_for_two / 2);
	    // const location = restInfo.location.address.split(",").map((item, key) => {return <span key={key}>{item}<br/></span>});
	    // const rest = restInfo.name;
	    // const photo = restInfo.featured_image;
	    // const googleMaps = "https://www.google.com/maps/dir//" + restInfo.name.replace(/\ /g, "+") + "+" + restInfo.location.zipcode;
	    // this.setState({ rest, location, photo, type, cost, googleMaps, stars, loadDone: true });
	  })
};

  navigator.geolocation.getCurrentPosition(postLocation);

}