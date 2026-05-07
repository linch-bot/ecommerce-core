/**
 * TASK 8: Authentication Proxy
 */

class AuthProxy {
    // Головний метод, заміняє fetch/axios
    async makeRequest(url, options = {}) {
        // (Logging & Monitoring)
        console.log(`📝 [Лог] Отправка запроса: ${options.method || 'GET'} ${url}`);

        // Симуляція додавання токена до заголовків
        return this._simulateNetworkRequest(url, options.headers || {});
    }

    // Імітація запиту(щоб працював без реального сервера)
    async _simulateNetworkRequest(url, headers) {
        return new Promise((resolve) => {
            setTimeout(() => {
                resolve({ 
                    status: 200, 
                    message: "Успішно авторизовано!", 
                    injectedHeaders: headers 
                });
            }, 100);
        });
    }
}

module.exports = AuthProxy;