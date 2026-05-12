/**
 * TASK 8: Authentication Proxy
 */

   class AuthProxy {
    constructor() {
        this.authMethod = 'API_KEY'; // Метод за замовчуванням
        this.credentials = {};

        //  Rate Limiting (захист від спаму)
        this.requestCount = 0;
        this.lastResetTime = Date.now();
        this.rateLimit = 5; // Макс 5 запросів в секунду
    }

    // Динамічне змінення стратегії авторизації
    setAuthStrategy(method, credentials) {
        this.authMethod = method;
        this.credentials = credentials;
        console.log(`[Прокси] Стратегія змінена на: ${method}`);
    }

    //  перевірка лімітів (Rate Limiting)
    _checkRateLimit() {
        const now = Date.now();
        if (now - this.lastResetTime > 1000) {
            this.requestCount = 0;
            this.lastResetTime = now;
        }
        if (this.requestCount >= this.rateLimit) {
            throw new Error("Rate Limit Exceeded: Забагато запитів (макс 5/сек)!");
        }
        this.requestCount++;
    }

    // автообновлення токена (Automatic Token Renewal)
    _renewTokenIfNeeded() {
        if (this.authMethod === 'JWT' && this.credentials.expiresAt < Date.now()) {
            console.log("⚠️ [Прокси] Токен минув. Виконую автоматичне оновлення (Renewal)...");
            this.credentials.token = "new_fresh_jwt_token_999";
            this.credentials.expiresAt = Date.now() + 3600000; // продовжуємо на 1 годину
        }
    }

    // Головний метод, заміняє fetch/axios
    async makeRequest(url, options = {}) {
        // 1. перевірка лімітів 
        this._checkRateLimit();

        // 2. Обновляємо токен, якщо потрібно
        this._renewTokenIfNeeded();

        // 3. Inject Credentials
        const headers = { ...options.headers };

        switch (this.authMethod) {
            case 'API_KEY':
                headers['X-API-Key'] = this.credentials.apiKey;
                break;
            case 'JWT':
                headers['Authorization'] = `Bearer ${this.credentials.token}`;
                break;
            case 'OAUTH':
                headers['Authorization'] = `OAuth ${this.credentials.oauthToken}`;
                break;
            default:
                throw new Error("Невідомий метод авторизації");
        }

        // 4. Logging & Monitoring
        console.log(`📝 [Лог] Відправка запросу: ${options.method || 'GET'} ${url}`);

        // 5. Симуляція реального походу в мережу
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