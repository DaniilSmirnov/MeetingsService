import React, {Component} from 'react';
import { Group, Div } from '@vkontakte/vkui';

import MeetBox from './MeetBox';
import { getMessage } from '../js/helpers';

class MeetList extends Component {

    render() {
        const { meets, setParentState } = this.props;

        return (
            <Group className="transparentBody MeetList">
                {
                    (meets && meets.length) ? 
                        <>
                            {
                                meets.map((meet, index) => <MeetBox 
                                    key={index}
                                    meet={meet}
                                    setParentState={setParentState}
                                />)
                            }
                        </>
                        :
                        <Group>
                            <Div>{ getMessage('meet_empty_list') }</Div>
                        </Group>
                }
            </Group>
        )
    }
}

export default MeetList;