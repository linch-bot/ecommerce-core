const { asyncMapCallback, asyncMapPromise } = require('../async-array');

console.log("=== ТЕСТ: Асинхроні варіанти MAP ===\n");

// припустимо, що це ID замовлень, які ми хочемо отримати деталі
const orderIds = [10, 20, 30];

// --- ДЕМО 1: Callback-версія ---
console.log("1. Тест Callback-версії (завантаження...)");
const fetchOrderCallback = (id, cb) => {
    // Имітуємо затримку
    setTimeout(() => cb(null, `Деталі замовлення #${id}`), 500);
};

asyncMapCallback(orderIds, fetchOrderCallback, (err, results) => {
    if (err) console.error("Помилка:", err);
    else console.log("✅ Результат Callbacks:", results);
});
// --- ДЕМО 2 & 3: Promise-версія і Async/Await ---

const fetchOrderPromise = (id, signal) => {
    return new Promise((resolve, reject) => {
        const timeoutId = setTimeout(() => resolve(`Деталі замовлення #${id}`), 1000);
        
        // якщо був сигнал відміни то очищаем таймаут
        if (signal) {
            signal.addEventListener('abort', () => {
                clearTimeout(timeoutId);
                reject(new Error("Перервано користувачем (AbortError)"));
            });
        }
    });
};

async function runAsyncAwaitDemo() {
    console.log("\n2. Тест Async/Await версії (завантаження...)");
    try {
        const results = await asyncMapPromise(orderIds, fetchOrderPromise);
        console.log("✅ Результат Async/Await:", results);
    } catch (error) {
        console.error("Помилка:", error);
    }
}
setTimeout(runAsyncAwaitDemo, 1000); // Запускаемо пізніше щоб не змішати вивід з Callback-версією