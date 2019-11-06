import { messages } from "./messages";
import React from 'react';
import { Alert } from '@vkontakte/vkui';
// import connect from '@vkontakte/vk-connect';

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
        return d || '—';
    }
}

export const checkVersionAndroid = () => {
    if ((navigator.userAgent.indexOf('Android 4.') !== -1) || !Array.prototype.includes) {
        // const actions = [{
        //     title: 'Закрыть сервис',
        //     action: () => { connect.send("VKWebAppClose", { "status": "success" }) },
        //     style: 'cancel'
        // }];

        window.showAlert(false, getMessage('bad_phone'));

        return dd('checkVersionAndroid', 'Bad phone');
    }
    return dd('checkVersionAndroid', 'not bad phone');
}

export const showAlert = (setState, title, message, actions) => {
    actions = actions ? actions : [{
        title: 'Ок',
        autoclose: true,
        style: 'cancel'
    }];

    setState({
        loader: null,
        disable: false,
        popout: <Alert
                    actionsLayout="vertical"
                    actions={actions}
                    onClose={ () => {
                        setState({ popout: null })
                    }}
                >
                    { title ? <h2>{ title }</h2> : <h2>{ getMessage('oops') }</h2> }
                    <p>{ message || getMessage('wtf') }</p>
                </Alert>
    });
}

export const dd = (...m) => {
    if (false) return;

    console.log(...m);
}