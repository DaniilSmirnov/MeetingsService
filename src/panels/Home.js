import React, {Component} from 'react';
import connect from '@vkontakte/vkui-connect';
import PropTypes from 'prop-types';
import { View,Panel,PanelHeader, Group } from '@vkontakte/vkui';
import '@vkontakte/vkui/dist/vkui.css';
import axios from 'axios';
import './Home.css';

class Home extends Component {
    constructor(props) {
        super(props);

        this.state = {
            meets: []
        };

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
                        <div className="Meeting" key={key}>
                            <div className="Meeting__name">{item.name}</div>
                            <div className="Meeting__description">{item.description}</div>
                        </div>
                    ))}
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
