import axios from 'axios';
import { dd, sleep } from './helpers';

const API_URL 			= 'https://127.0.0.1:5000/';
const VK_DATA 			= window.location.search;

axios.defaults.headers.common = {
    Accept: "application/json, text/plain, */*",
    xvk: VK_DATA
}

export default class API {
    
    constructor() {
        dd('API: ', 'init');
    }

    async send(type = 'GET', action, params = {}) {
        if (!navigator.onLine) {
            // error internet connection
            return false;
        }

        return await axios({
            method: type,
            url: `${API_URL}${action}`,
            data: { params }
        })
            .catch(error => {
                console.log('Error API:', error);
                // window.showAlert('Сервер не отвечает.');
            });
    }

    async AddMeet() {}

    async GetMeets() {
        const meets = [{
            id: 1,
            name: 'Meet name 1',
            description: 'Meet description 1',
            ownerid: 1,
            members_amount: 1,
            start: 123123123,
            finish: 321321321
        },{
            id: 2,
            name: 'Meet name 2',
            description: 'Meet description 2',
            ownerid: 1,
            members_amount: 1,
            start: 123123123,
            finish: 321321321
        },{
            id: 3,
            name: 'Meet name 3',
            description: 'Meet description 3',
            ownerid: 1,
            members_amount: 1,
            start: 123123123,
            finish: 321321321
        }];

        await sleep(1000);

        dd('API: ', 'GetMeets', meets);
        return meets;
    }
    async AddMeetMember() {}
    async RemoveMeetMember() {}
    async AuthUser() {}
    async AddComment() {}
    async GetMeetComments() {}
    async RemoveComment() {}
    async ApproveMeet() {}
    async DeApproveMeet() {}
    async GetAllMeets() {}

}