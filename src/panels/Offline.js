import React from 'react';

import Panel from '@vkontakte/vkui/dist/components/Panel/Panel';
import Div from '@vkontakte/vkui/dist/components/Div/Div';
import Button from '@vkontakte/vkui/dist/components/Button/Button';
import { getMessage } from '../js/helpers';

export class Offline extends React.Component {

    reload = () => {
        if (navigator.onLine) {
            window.showAlert(false, getMessage('no_internet')); //Получаем сообщение об отсутствии интернета
            return;
        }
        window.location.reload();   //Перерисовываем окно
    };

    render() {
        return (
            <Panel id="offline" theme="white"> //PlaceHolder Оффлайн
                <Div>
                    <Div>offline</Div>
                    
                    <Button 
                        onClick={ this.reload } //Кнопка перезагрузки
                    >reload</Button>
                </Div>
            </Panel>
        )
    }

}

export default Offline;
