export const cookie = {

    siteCookies: {
        userCradentials: "userCradentials"
    },

    /**
     * Set a cookie
     * @param {string} cname cookie name
     * @param {*} cvalue cookie value
     * @param {number} exdays expiration days
     */
    setCookie: (cname, cvalue, exdays = 10) => {
        const d = new Date();
        let expires = "";
        if (exdays) {
            d.setTime(d.getTime() + (exdays * 24 * 60 * 60 * 1000));
            expires = `expires=${d.toUTCString()};"`;
        }
        document.cookie = cname + "=" + cvalue + ";" + expires + "path=/";
    },

    /**
     * Gets a cookie value
     * @param {string} cname cookie name
     * @returns cookie value
     */
    getCookie: (cname) => {
        let name = cname + "=";
        let decodedCookie = decodeURIComponent(document.cookie);
        let ca = decodedCookie.split(';');
        for (let i = 0; i < ca.length; i++) {
            let c = ca[i];
            while (c.charAt(0) === ' ') {
                c = c.substring(1);
            }
            if (c.indexOf(name) === 0) {
                return c.substring(name.length, c.length);
            }
        }
        return "";
    },

    /**
     * Delete a cookie
     * @param {string} cname cookie name to delete
     */
    clearCookie: (cname) => {
        const d = new Date(0);
        document.cookie = cname + "=;expires=" + d.toUTCString();
    }
};
