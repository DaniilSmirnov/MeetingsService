import React, {Component} from 'react';
import Div from '@vkontakte/vkui/dist/components/Div/Div';
import Button from '@vkontakte/vkui/dist/components/Button/Button';

import Icon28MoreHorizontal from '@vkontakte/icons/dist/28/more_horizontal';
import Icon28Messages from '@vkontakte/icons/dist/28/messages';

class MeetBox extends Component {

    goMeet = () => {
        const { meet, setParentState } = this.props;

        setParentState({
            meet: meet,
            activePanel: 'meet'
        });
    }

    render() {
        const { meet } = this.props;
        const backgroundImage = `url(https://img3.socratify.net/f1f91f85de60dc6513_600x400.jpg)`;

        return (
            <Div className="MeetBox" style={{ backgroundImage }} onClick={ this.goMeet }>
                <Div className="MeetMore">
                    <Icon28MoreHorizontal />
                </Div>
                <Div className="MeetName">{ meet.name }</Div>
                <Div className="MeetAction">
                    <Button level="commerce">Участвовать</Button>
                    <Div className="MeetMembers">1.3К участников</Div>
                    <Div><Icon28Messages /></Div>
                </Div>
            </Div>
        )
    }
}

export default MeetBox;