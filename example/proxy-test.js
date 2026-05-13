const AuthProxy = require('../auth-proxy');

async function runProxyTest() {
    console.log("=== ТЕСТ: Authentication Proxy ===\n");

    const apiProxy = new AuthProxy();

    // Базовий API Key ---
    apiProxy.setAuthStrategy('API_KEY', { apiKey: 'secret_art_key_777' });
    let res1 = await apiProxy.makeRequest('https://api.art-market.com/v1/paintings');
    console.log("✅ Результат 1 (Заголовки):", res1.injectedHeaders);


    //Авто-обновлення JWT токену ---
    console.log("\n--- Зміна стратегії на JWT (з закінченим токеном) ---");
    apiProxy.setAuthStrategy('JWT', {
        token: 'old_expired_token_123',
        expiresAt: Date.now() - 10000 // Навмисно робимо токен простроченим
    });
    
    // Робимо запрос щоб токен обновився
    let res2 = await apiProxy.makeRequest('https://api.art-market.com/v1/profile', { method: 'POST' });
    console.log("✅ Результат 2 (Заголовки):", res2.injectedHeaders);


    //  Rate Limiting (захист від спаму) ---
    console.log("\n--- Тест Rate Limiting (спам запросами) ---");
    apiProxy.setAuthStrategy('OAUTH', { oauthToken: 'oauth_token_xyz' });

    try {
        // Намагаємось зробити 7 запросів (ліміт 5/сек)
        for (let i = 1; i <= 7; i++) {
            await apiProxy.makeRequest(`https://api.art-market.com/v1/bids/${i}`);
            console.log(`✅ Запрос ${i} пройшов успішно`);
        }
    } catch (error) {
        console.log(`🛑 Спрацював захист Проксі: ${error.message}`);
    }
}

runProxyTest();