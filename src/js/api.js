import axios from 'axios';

const API_URL 			= 'https://127.0.0.1:5000/';
const VK_DATA 			= window.location.search;

axios.defaults.headers.common = {
    Accept: "application/json, text/plain, */*",
    xvk: VK_DATA
}

export default class API {
    
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
    async GetMeets() {}
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