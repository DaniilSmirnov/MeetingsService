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