import React from 'react';
import connect from '@vkontakte/vk-connect';
import { View, platform, ANDROID, Alert, Epic, Tabbar, TabbarItem } from '@vkontakte/vkui';

import '@vkontakte/vkui/dist/vkui.css';
import './css/App.css';

import API from './js/api';

import Icon24List from '@vkontakte/icons/dist/24/list';
import Icon24FavoriteOutline from '@vkontakte/icons/dist/24/favorite_outline';

import Home from './panels/Home';
import Favorite from './panels/Favorite';
import Meet from './panels/Meet';


const osname = platform();

class App extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
			activeStory: 'home',
			activePanel: 'meets',
			
			fetchedUser: null,

			cache: null,
			popout: null,
			disable: false,
			loader: null
		};

		this.api = new API();

		this.onStoryChange 	= this.onStoryChange.bind(this);
	}

	componentDidMount() {
		// if (window.location.hash === '#dark') {
		// 	let schemeAttribute = document.createAttribute('scheme');
		// 	schemeAttribute.value = 'client_dark';
		// 	document.body.attributes.setNamedItem(schemeAttribute);
		// }

		if (osname === ANDROID) {
			if (parseInt(navigator.userAgent.match("Android (.*?);")[1]) <= 4) {
				this.setState({ popout:
					<Alert
						actionsLayout="vertical"
						actions={[{
							title: 'Закрыть сервис',
							action: () => { connect.send("VKWebAppClose", { "status": "success" }) },
							style: 'cancel'
						  }]}
						onClose={ () => this.setState({ popout: null }) }
					>
						<h2>Упс...</h2>
						<p>Сервис поддерживает версию Android 5.1 и выше.</p>
					</Alert>
				});
			}
		}

		connect.subscribe((e) => {
			switch (e.detail.type) {
				case 'VKWebAppGetUserInfoResult':
					this.setState({ fetchedUser: e.detail.data });
					break;
				default:
					// code
			}
		});
		connect.send('VKWebAppGetUserInfo', {});
	}

	onStoryChange = (story, panel) => {
		this.setState({ activeStory: story, activePanel: panel });
	}

	render() {
		return (
			<Epic activeStory={ this.state.activeStory } tabbar={
				<Tabbar>
					<TabbarItem
						onClick={ () => this.onStoryChange('home', 'meets') }
						selected={ this.state.activeStory === 'home' }
					><Icon24List /></TabbarItem>
					<TabbarItem
						onClick={ () => this.onStoryChange('favorites', 'list') }
						selected={ this.state.activeStory === 'favorites' }
					><Icon24FavoriteOutline /></TabbarItem>
				</Tabbar>
			}>
				<View id="home" activePanel={ this.state.activePanel }>
					<Home 
						id="meets"
						api={ this.api }
						state={ this.state }
						setParentState={ this.setState.bind(this) }
						fetchedUser={ this.state.fetchedUser }
					/>
					<Meet 
						id="meet"
						api={ this.api }
						state={ this.state }
						setParentState={ this.setState.bind(this) }
						fetchedUser={ this.state.fetchedUser }
					/>
				</View>
				<View id="favorites" activePanel={ this.state.activePanel }>
					<Favorite 
						id="list"
						api={ this.api }
						state={ this.state }
						setParentState={ this.setState.bind(this) }
						fetchedUser={ this.state.fetchedUser }
					/>
					<Meet 
						id="meet"
						api={ this.api }
						state={ this.state }
						setParentState={ this.setState.bind(this) }
						fetchedUser={ this.state.fetchedUser }
					/>
				</View>
			</Epic>
		);
	}
}

export default App;
