enum AuthMode {
	PIN = 'pin',
	PASSWORD = 'password',
}

export const environment = {
	production: false,
	api: 'https://ipop-app.com/api/',
	pin: { 'x-auth-mode': AuthMode.PIN },
	password: { 'x-auth-mode': AuthMode.PASSWORD },
}
