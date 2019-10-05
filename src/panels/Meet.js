import React, {Component} from 'react';
import { Panel, PanelHeader, Div } from '@vkontakte/vkui';
import { dd } from '../js/helpers';

import '@vkontakte/vkui/dist/vkui.css';
import './Home.css';

class Meet extends Component {
    constructor(props) {
        super(props);

        this.state = {
            meet: this.props.state.meet
        };

        this.api = this.props.api;
    }

    componentDidMount() {
        dd('Panel: ', 'Meet');
    }

    render() {
        const { id } = this.props;
        const { meet } = this.state;

        return (
            <Panel id={id}>
                <PanelHeader>Митинг</PanelHeader>

                <Div>{meet.id}</Div>
                <Div>{meet.name}</Div>
                <Div>{meet.description}</Div>
                <Div>{meet.ownerid}</Div>
                <Div>{meet.members_amount}</Div>
                <Div>{meet.start}</Div>
                <Div>{meet.finish}</Div>
            </Panel>
        );
    }
}

export default Meet;
