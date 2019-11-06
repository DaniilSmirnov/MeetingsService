import axios from 'axios';
import {
    dd,
    // sleep,
    getMessage
} from './helpers';

const API_URL 			= 'https://vargasoff.ru:8000/';
const VK_DATA 			= window.location.search;

axios.defaults.headers.common = {
    Accept: "application/json, text/plain, */*",
    xvk: VK_DATA
}

export default class API {
    
    constructor() {
        dd('API: ', 'init');
    }

    async send(method = 'GET', action, data = {}) {
        if (!navigator.onLine) {
            // TODO: Нужно просто сменить экран на оффлайн страничку
            // error internet connection
            return false;
        }

        const response = await axios({ 
            method,
            url: `${API_URL}${action}`,
            data
        }).catch(error => {
            dd('Error API:', error);
            window.showAlert(getMessage('server_offline'));
        });

        return response ? response.data : [];
    }

    async AddMeet(meet) {
        const response = {
            success: true,
            failed: "test test"
        }

        dd('API: ', 'AddMeet', response);

        // const response = await this.send('POST', 'AddMeet', meet);

        return response;
    }

    /**
     * Получить список митиног
     * @return array
     */
    async GetMeets() {
        const meets = await this.send('GET', 'GetMeets');

        dd('API: ', 'GetMeets', meets);

        return meets;
    }

    async AddMeetMember() {}

    async RemoveMeetMember() {}

    async AuthUser() {}

    async AddComment() {}

    async GetMeetComments() {
        const comments = [
            {
                "id": 1,
                "comment": "Комментарий 1",
                "ownerid": 1,
                "meetingid": 1
            },
            {
                "id": 2,
                "comment": "Комментарий 2",
                "ownerid": 12,
                "meetingid": 1
            },
            {
                "id": 3,
                "comment": "Комментарий 3",
                "ownerid": 13,
                "meetingid": 1
            }
        ];
        
        await this.send();

        dd('API: ', 'GetMeetsComments', comments);
        return comments;
    }

    async RemoveComment() {}

    async ApproveMeet() {}

    async DeApproveMeet() {}

    async GetAllMeets() {}

}
