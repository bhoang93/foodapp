import React from 'react';
import ListItem from '@material-ui/core/ListItem';
import Divider from '@material-ui/core/Divider';

const RestCard = ({ loadRest, restinfo }) => {
	const loadSaved = () => loadRest(restinfo);
	return (
		<div>
<ListItem className="restList" restinfo={restinfo} onClick={loadSaved}>
			{restinfo}
		</ListItem>
		<Divider />
		</div>
	)
}

export default RestCard;