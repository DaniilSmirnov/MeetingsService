import React, {Component} from 'react';
import connect from '@vkontakte/vkui-connect';
import PropTypes from 'prop-types';
import { View,Panel,PanelHeader, Group } from '@vkontakte/vkui';
import '@vkontakte/vkui/dist/vkui.css';
import axios from 'axios';

class Render extends Component {
	constructor(props){
		super(props);

		this.state = {};
		//this.RenderMeets = this.RenderMeets().bind(this);
	}


}

class Home extends Component {
	RenderMeets() {
		axios.get('http://127.0.0.1:5000/GetMeets')
			.then(function (response) {
				console.log(response);
				return (response.map(meet => (<div>{meet.name}</div>)))
			})
			.catch(function (error) {
				// handle error
				console.log(error);
			});



	}

	render() {
		let {id, go, fetchedUser} = this.props;
		return (
			<Panel id={id}>
				<PanelHeader>Example</PanelHeader>

				<Group>
					{this.RenderMeets()}
				</Group>

			</Panel>
		);
	}
}

Home.propTypes = {
	id: PropTypes.string.isRequired,
	go: PropTypes.func.isRequired,
	fetchedUser: PropTypes.shape({
		photo_200: PropTypes.string,
		first_name: PropTypes.string,
		last_name: PropTypes.string,
		city: PropTypes.shape({
			title: PropTypes.string,
		}),
	}),
};

export default Home;

