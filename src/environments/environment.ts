export const environment = {
    production: false,
    origin: 'http://localhost:4300',
    backend: {
        url: 'http://localhost:9099',
        auth: '/auth/login',
        register: '/auth/register',
        refresh: ''
    },
    refreshTokenExpireTime: 3600,
    defaultLang: 'ru',
    mapUrl: 'http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png'
};

