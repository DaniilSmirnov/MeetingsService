import React from 'react';
import connect from '@vkontakte/vk-connect';
import { View, Epic, Tabbar, TabbarItem, ScreenSpinner } from '@vkontakte/vkui';

import '@vkontakte/vkui/dist/vkui.css';
import './css/App.css';

import API from './js/api';
import { checkVersionAndroid, showAlert } from './js/helpers';

import Icon24List from '@vkontakte/icons/dist/24/list';
import Icon24FavoriteOutline from '@vkontakte/icons/dist/24/favorite_outline';

import Home from './panels/Home';
import Favorite from './panels/Favorite';
import Meet from './panels/Meet';
import Offline from './panels/Offline';

class App extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
			activeStory: 'home',
			activePanel: 'meets',
			
			fetchedUser: null,

			cache: null,
			popout: <ScreenSpinner />,
			disable: false,
			offline: false
		};

		this.initApp();

		this.onStoryChange 	= this.onStoryChange.bind(this);
	}

	initApp = () => {
		if (window.location.hash === '#dark') {
			let schemeAttribute = document.createAttribute('scheme');
			schemeAttribute.value = 'client_dark';
			document.body.attributes.setNamedItem(schemeAttribute);
		}

		window.showOfflinePage = () => {
            this.setState({ offline: true });
		};
		
		window.showAlert = (message, title, actions) => {
            showAlert(this.setState.bind(this), message, title, actions);
		};

		window.showLoader = (show) => {
            this.setState({ popout: show ? <ScreenSpinner /> : null });
		};

		checkVersionAndroid();

		this.api = new API();
	}

	componentDidMount() {
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
			<>
				{
					this.state.offline ?
						<View id="offline" popout={this.state.popout} activePanel="offline">
							<Offline
								id="offline"
								setParentState={ this.setState.bind(this) }
							/>
						</View>
						:
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
							<View id="home" popout={this.state.popout} activePanel={ this.state.activePanel }>
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
							<View id="favorites" popout={this.state.popout} activePanel={ this.state.activePanel }>
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
				}
			</>
		);
	}
}

export default App;
