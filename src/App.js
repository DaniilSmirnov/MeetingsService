import React from 'react';
import connect from '@vkontakte/vk-connect';
import { View, Epic, Tabbar, TabbarItem, ScreenSpinner, ModalRoot } from '@vkontakte/vkui';

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
import AddMeetModal from './components/modals/AddMeetModal';

class App extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
			activeStory: 'home',
			activePanel: 'meets',
			activeModal: null,
			
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

	// TODO: Нужен history для навигации назад с других экранов и системной кнопки назад на ведре
	onStoryChange = (story, panel) => {
		this.setState({ activeStory: story, activePanel: panel });
	}

	render() {
		const { api, state } = this;
		const { offline, popout, activeStory, activePanel, activeModal, fetchedUser } = this.state;
		const props = { api, state, fetchedUser, setParentState: this.setState.bind(this) };

		const modal = (
            <ModalRoot activeModal={ activeModal }>
				{/* TODO: отказаться от моадлки, лучше отдельный экран, меньше проблем с ресайзом */}
                <AddMeetModal
					id="add-meet-modal"
					{ ...props }
					onClose={ () => this.setState({ activeModal: null }) }
				/>
            </ModalRoot>
		);

		const views = { modal, popout, activePanel };

		return (
			<>
				{
					offline ?
						<View id="offline" popout={ popout } activePanel="offline">
							<Offline id="offline" { ...props } />
						</View>
						:
						<Epic activeStory={ activeStory } tabbar={
							<Tabbar>
								<TabbarItem
									onClick={ () => this.onStoryChange('home', 'meets') }
									selected={ activeStory === 'home' }
								><Icon24List /></TabbarItem>
								<TabbarItem
									onClick={ () => this.onStoryChange('favorites', 'list') }
									selected={ activeStory === 'favorites' }
								><Icon24FavoriteOutline /></TabbarItem>
							</Tabbar>
						}>
							<View id="home" { ...views } >
								<Home id="meets" { ...props } />
								<Meet id="meet" { ...props } />
							</View>
							<View id="favorites" { ...views } >
								<Favorite id="list" { ...props } />
								<Meet id="meet" { ...props }/>
							</View>
						</Epic>
				}
			</>
		);
	}
}

export default App;
