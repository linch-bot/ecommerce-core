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