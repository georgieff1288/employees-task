const config = {
    PORT: 3000,
    DB_PORT: 3306,
    DB_NAME: 'employees_task',
    ACCESS_HEADER_PORT: 4200,
    SALT: 10,
    SECRET: 'my-super-secret',
    REFRESH_TOKEN_SECRET: 'refresh-token-super-secret',
    TOKEN_COOKIE_NAME: 'jwt',
    REFRESH_TOKEN_COOKIE_NAME: 'refresh-jwt',
    TOKEN_LIFE: '5000',
    REFRESH_TOKEN_LIFE:'30d'
}

module.exports = config;