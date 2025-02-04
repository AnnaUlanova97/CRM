window.makeID = (length = 8) => {
    let id = '';
    const possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';

    for (let index = 0; index < length; index++) {
        id += possible.charAt(Math.floor(Math.random() * possible.length));
    }

    return id;
};

window.getCookieValue = (name) => {
    const b = '; ' + document.cookie;
    const c = b.split('; ' + name + '=');

    return c.length - 1 ? c.pop()
        .split(';')
        .shift() : false;
};

window.setCookie = (name, value, expires, path = '/', domain, secure) => {
    const today = new Date();
    const expiresDefault = new Date();

    expiresDefault.setDate(today.getDate() + 999999);

    expires = expires || expiresDefault;
    document.cookie =
        name +
        '=' +
        escape(value) +
        (expires ? '; expires=' + expires : '') +
        (path ? '; path=' + path : '') +
        (domain ? '; domain=' + domain : '') +
        (secure ? '; secure' : '');
};

window.showDevelopers = () => {
    class Developer {
        constructor(name, stack, contact) {
            this.name = name;
            this.stack = stack;
            this.contact = contact;
        }
    }

    const developers = [
        new Developer('German ST.', 'front-end', 'Ger6450@gmail.com'),
    ];

    console.table(developers);
};

window.getRandomHex = () => {
    return `#${Math.floor(Math.random() * 0xffffff)
        .toString(16)
        .padEnd(6, '0')}`;
};

window.isDarkMode = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;

window.copyToClipboard = (text) => navigator.clipboard.writeText(text);

window.valueTypes = {
    isNull(value) {
        return value === null
    },

    isUndefined(value) {
        return value === undefined
    },

    isNil(value) {
        return this.isNull(value) || this.isUndefined(value)
    },

    isString(value) {
        return !this.isNil(value) && (typeof value === 'string' || value instanceof String)
    },

    isNumber(value) {
        return !this.isNil(value) && (typeof value === 'number' || value instanceof Number)
    },

    isBoolean(value) {
        return !this.isNil(value) && (typeof value === 'boolean' || value instanceof Boolean)
    },

    isArray(value) {
        return !this.isNil(value) && Array.isArray(value)
    },

    isObject(value) {
        return {}.toString.call(value) === '[object Object]'
    }
}
