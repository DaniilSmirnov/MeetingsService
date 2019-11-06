import React, {Component} from 'react';
import { Panel, PanelHeader, Div, Group, Separator, Button } from '@vkontakte/vkui';

// import Icon24Users from '@vkontakte/icons/dist/24/users';
// import Icon24ShareOutline from '@vkontakte/icons/dist/24/share_outline';
// import Icon24BrowserBack from '@vkontakte/icons/dist/24/browser_back';
// import Icon24Done from '@vkontakte/icons/dist/24/done';
// import Icon24Story from '@vkontakte/icons/dist/24/story';

// import Icon20PlaceOutline from '@vkontakte/icons/dist/20/place_outline';
// import Icon20CalendarOutline from '@vkontakte/icons/dist/20/calendar_outline';

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

    componentDidMount() {}

    render() {
        const { id } = this.props;
        const { meet } = this.state;

        return (
            <Panel id={id}>
                <PanelHeader>Митинг</PanelHeader>

                <Group>
                    <Div>{meet.name}</Div>
                    <Div>{meet.description}</Div>
                    <Div>{meet.ownerid}</Div>

                    <Separator style={{ margin: '12px 0' }} />

                    <Div>{meet.members_amount}</Div>
                    <Div>{meet.start}</Div>
                    <Div>{meet.finish}</Div>

                    <Div style={{display: 'flex'}}>
                        <Button size="l" stretched style={{ marginRight: 8 }}>Stretched</Button>
                        <Button size="l" stretched level="secondary">Stretched</Button>
                    </Div>
                </Group>
            </Panel>
        );
    }
}

export default Meet;
