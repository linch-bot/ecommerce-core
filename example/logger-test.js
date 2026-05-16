const log = require('../logging-decorator');

console.log("=== ТЕСТ: Logging Decorator ===\n");

// Логування INFO + JSON формат
function calculateArtPrice(base, tax) {
    return base + (base * tax);
}
// пприєднуємо декоратор к функції
const calculateWithLog = log({ level: 'INFO', format: 'json' })(calculateArtPrice);

console.log("--- 1. Тест JSON формата ---");
calculateWithLog(100, 0.2);


// Асинхронна функція з імітацією роботи
async function fetchUserData(userId) {
    await new Promise(resolve => setTimeout(resolve, 300)); // чекаємо 300мс
    return { id: userId, role: 'VIP_CUSTOMER' };
}
// Custom Formatter: вивод лог з емодзі 
const customFormatter = (entry) => `✨ [CUSTOM] Функція ${entry.function} спрацювала за ${entry.executionTime}!`;
const fetchWithLog = log({ level: 'INFO', formatter: customFormatter })(fetchUserData);

console.log("\n--- 2. Тест Асинхронності и Custom Formatter ---");
fetchWithLog(999);


// Conditional Logging (записуємо тільки помилки)
function riskyDatabaseSave(data) {
    throw new Error("База данных недоступна!");
}
// Ставим рівень ERROR, значить логи старта і успіху не будуть засорювати консоль
const saveWithErrorLog = log({ level: 'ERROR' })(riskyDatabaseSave);

console.log("\n--- 3. Тест рівня ERROR (тільки помилки) ---");
try {
    saveWithErrorLog({ artId: 10 });
} catch (e) {
    // помилка буде залогована декоратором, тому тут можна просто обробити її
}