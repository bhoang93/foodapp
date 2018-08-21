import React from 'react';
import ListItem from '@material-ui/core/ListItem';
import Divider from '@material-ui/core/Divider';

const RestCard = ({ deleteRest, loadRest, restinfo }) => {
	const loadSaved = () => loadRest(restinfo);
	return (
		<div>
		<ListItem className="restList" restinfo={restinfo}>
			<label onClick={loadSaved}>{restinfo}</label>
			<span onClick={() => deleteRest(restinfo)} className="deleteButton">&times;</span>
		</ListItem>
		<Divider />
		</div>
	)
}

export default RestCard;