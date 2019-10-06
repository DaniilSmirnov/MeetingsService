import React, {Component} from 'react';
import { Panel, PanelHeader, HeaderButton } from '@vkontakte/vkui';
import { getMessage } from '../js/helpers';
import MeetList from '../components/MeetList';

import Icon24Add from '@vkontakte/icons/dist/24/add';
import '@vkontakte/vkui/dist/vkui.css';
import './Home.css';

class Home extends Component {
    constructor(props) {
        super(props);

        this.state = {
            meets: []
        };

        this.api = this.props.api;
    }

    componentDidMount() {
        this.getMeets();
    }

    getMeets = async (page, count, search) => {
        window.showLoader(true);
        const meets = await this.api.GetMeets();

        this.setState({ meets });
        window.showLoader(false);
    }

    render() {
        const { id, state, setParentState } = this.props;

        return (
            <Panel id={id}>
                <PanelHeader
                    left={<HeaderButton onClick={() => {
                        setParentState({
                            activeModal: "add-meet-modal"
                        });
                    }}>{<Icon24Add />}</HeaderButton>}
                >{ getMessage('home_panel_title') }</PanelHeader>

                {
                    !state.popout && 
                        <MeetList
                            meets={ this.state.meets }
                            setParentState={ setParentState }
                        />
                }
            </Panel>
        );
    }
}

export default Home;
