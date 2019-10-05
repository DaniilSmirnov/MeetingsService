import React, {Component} from 'react';
import { Panel,PanelHeader } from '@vkontakte/vkui';
import { dd, getMessage } from '../js/helpers';
import MeetList from '../components/MeetList';

import '@vkontakte/vkui/dist/vkui.css';
import './Home.css';

class Favorite extends Component {
    constructor(props) {
        super(props);

        this.state = {
            meets: []
        };

        this.api = this.props.api;
    }

    componentDidMount() {
        this.getMeets();

        dd('Panel: ', 'Home');
    }

    getMeets = async (page, count, search) => {
        const meets = await this.api.GetMeets();

        this.setState({ meets });
    }

    render() {
        const { id, setParentState } = this.props;

        return (
            <Panel id={id}>
                <PanelHeader>{ getMessage('favorite_panel_title') }</PanelHeader>

                <MeetList
                    meets={ this.state.meets }
                    setParentState={ setParentState }
                />
            </Panel>
        );
    }
}

export default Favorite;
