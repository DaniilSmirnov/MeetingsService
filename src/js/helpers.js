import { messages } from "./messages";

export const isDev = (window.location.hash === '#debug') ? true : false;
export const isLocal = (window.location.port === '10888') ? true : false;

export const sleep = async (time) => {
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve();
        }, time);
    });
};

export const initLazyLoad = () => {
    window.onscroll = () => {
        const moreButton = document.getElementById('lazy-more');

        if (moreButton && moreButton.disabled === false) {
            if ((window.innerHeight + window.scrollY) >= (document.body.scrollHeight - 300)) {
                moreButton.click();
            }
        }
    };
};

export const getMessage = (k, d) => {
    if (messages && messages[k]) {
        return messages[k];
    } else {
        return d || '!message';
    }
}

export const showAlert = (status, message) => {
    // code show alert
}

export const showAlertByErrorCode = (code) => {
    console.log('Error: ', getMessage(code));
    // showAlert('error', getMessage(code));
}

export const dd = (...m) => {
    console.log(...m);
}