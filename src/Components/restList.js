import React from 'react';
import Drawer from '@material-ui/core/Drawer';
import List from '@material-ui/core/List';
import RestCard from './restCard';
import './restList.css'
import menu from '../Icons/menu.svg';

const localforage = require('localforage');

let restStore = [];

class TemporaryDrawer extends React.Component {
  state = {
    top: false,
    left: false,
    bottom: false,
    right: false,
  };

  toggleDrawer = (side, open) => () => {
    this.setState({
      [side]: open,
    });
  };

  componentDidMount() {
    restStore = [];
    localforage.iterate(function(value, key, iterationNumber) {
    restStore.push(key);
    })
  }

  render() {
    const { deleteRest, loadRest } = this.props;

    return (
      <div>
        <img src={menu} id="directions" className="savedLocations" onClick={this.toggleDrawer('left', true)} />
        <Drawer open={this.state.left} onClose={this.toggleDrawer('left', false)}>
          <div
            tabIndex={0}
            onKeyDown={this.toggleDrawer('left', false)}
            id="drawer"
          >
		<div id="drawer">
			<p id="savedRests">Saved Restaurants</p>
		        <List>
		        	{restStore.map((rest, i) => {
		        		return(
		        			<RestCard deleteRest={deleteRest} key={i} loadRest={loadRest} restinfo={restStore[i]}/>
		        			)
		        	})}
		        </List>       
		</div>	
          </div>
        </Drawer>
      </div>
    );
  }
}

export default TemporaryDrawer;