import React, {Component} from 'react';
import connect from '@vkontakte/vkui-connect';
import PropTypes from 'prop-types';
import { View,Panel,PanelHeader, Group } from '@vkontakte/vkui';
import '@vkontakte/vkui/dist/vkui.css';
import axios from 'axios';

class Render extends Component {
    constructor(props){
        super(props);

        this.state = {
            meets: []
        };
    }


}

class Home extends Component {
    constructor(props) {
        super(props);

        this.apiRequest('GetMeets',(result) => {
            this.setState({ meets: result });
        });
    }

    apiRequest = (method, callbackFunction) => {
        axios.get('http://127.0.0.1:5000/'+method)
            .then((result) => {
                callbackFunction(result.data);
            })
            .catch((error) => {
                console.error('API Error', error);
            });
    };

    render() {
        let {id, go, fetchedUser} = this.props;
        return (
            <Panel id={id}>
                <PanelHeader>Example</PanelHeader>

                <Group>
                    {this.state.meets.map((item, key) => (
                        <div key={key}>
                            {item.name}
                        </div>
                    ))}
                </Group>
            </Panel>
        );
    }
}

export default Home;
