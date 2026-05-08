/**
 * TASK 8: Authentication Proxy
 */

class AuthProxy {
    constructor() {
        this.authMethod = 'API_KEY'; // Метод за замовчуванням
        this.credentials = {};
    }

    // Головний метод, заміняє fetch/axios
    async makeRequest(url, options = {}) {
        // Inject Credentials
        const headers = { ...options.headers };

        if (this.authMethod === 'API_KEY') {
            headers['X-API-Key'] = this.credentials.apiKey;
        } else if (this.authMethod === 'JWT') {
            headers['Authorization'] = `Bearer ${this.credentials.token}`;
        }

        // (Logging & Monitoring)
        console.log(`📝 [Лог] Відправка запросу: ${options.method || 'GET'} ${url}`);

        // Симуляція додавання токена до заголовків
        return this._simulateNetworkRequest(url, headers);
    }

    // Симуляція відповіді від сервера (щоб код працював без інтернету)
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