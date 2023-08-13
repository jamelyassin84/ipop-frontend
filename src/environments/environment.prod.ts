enum AuthMode {
    PIN = 'pin',
    PASSWORD = 'password',
}

export const environment = {
    production: true,
    api: 'https://iloilo-pop.com/api/',
    pin: {'x-auth-mode': AuthMode.PIN},
    password: {'x-auth-mode': AuthMode.PASSWORD},
}
