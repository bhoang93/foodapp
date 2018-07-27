import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import Divider from '@material-ui/core/Divider';
import RestCard from './restCard';
import './restList.css'

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
    console.log(this.props.restStore)
  };

  render() {
    const { restStore, loadRest } = this.props;

    return (
      <div>
        <button id="directions" className="savedLocations" onClick={this.toggleDrawer('left', true)}>+</button>
        <Drawer open={this.state.left} onClose={this.toggleDrawer('left', false)}>
          <div
            tabIndex={0}
            onClick={this.toggleDrawer('left', false)}
            onKeyDown={this.toggleDrawer('left', false)}
            id="drawer"
          >
		<div id="drawer">
			<p id="savedRests">Saved Restaurants</p>
		        <List>
		        	{restStore.map((rest, i) => {
		        		return(
		        			<RestCard key={i} loadRest={loadRest} restInfo={restStore[i]}/>
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