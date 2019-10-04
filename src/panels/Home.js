import React, {Component} from 'react';
import { Panel,PanelHeader, Group, Button, Div } from '@vkontakte/vkui';

import '@vkontakte/vkui/dist/vkui.css';
import './Home.css';

class Home extends Component {
    constructor(props) {
        super(props);

        this.state = {
            meets: []
        };
    }

    render() {
        const { id } = this.props;

        return (
            <Panel id={id}>
                <PanelHeader>Диванные митинги</PanelHeader>

                <Group>
                    <Div>meets</Div>
                    <Div>
                        <Button>test</Button>
                    </Div>
                </Group>
                    {/* {this.state.meets.map((item, key) => (
                        <Group className="Meeting" key={key}>
                            <Div className="Meeting_name">{item.name}</Div>
                            <Button className = "Meeting_info" level ="outline">Участвовать</Button>
                            <Div className="Meeting_info">{item.members_amount} участников</Div>
                        </Group>
                    ))} */}

            </Panel>
        );
    }
}

export default Home;
