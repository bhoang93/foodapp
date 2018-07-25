import React from 'react';
import ListItem from '@material-ui/core/ListItem';
import Divider from '@material-ui/core/Divider';

const RestCard = ({ loadRest, restInfo }) => {
	const loadSaved = () => loadRest(restInfo);
	return (
		<div>
<ListItem className="restList" restInfo={restInfo} onClick={loadSaved}>
			{restInfo.rest}
		</ListItem>
		<Divider />
		</div>
	)
}

export default RestCard;