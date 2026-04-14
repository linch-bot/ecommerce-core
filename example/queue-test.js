const BiDirectionalPriorityQueue = require('../priority-queue');

const ordersQueue = new BiDirectionalPriorityQueue();

console.log("=== ТЕСТ BI-DIRECTIONAL PRIORITY QUEUE ===");

// Додаємо замовлення
// Формат: (назва, пріорітет). наприклад: 10 - VIP, 5 - звичайний, 1 - несрочний
ordersQueue.enqueue("звичайний арт (замовлення 1)", 5);
ordersQueue.enqueue("Дешевий скетч (замовлення 2)", 1);
ordersQueue.enqueue("VIP Портрет (замовлення 3)", 10);
ordersQueue.enqueue("звичайний арт (замовлення 4)", 5);

// 1. Перевірка PEEK
console.log("[PEEK] хто перший по пріорітету?:", ordersQueue.peek('highest'));
console.log("[PEEK] Яке замовлення чекає довше за всіх?:", ordersQueue.peek('oldest'));

// 2. Перевірка  DEQUEUE 
console.log("\n--- Забираєм замовлення в роботу ---");
console.log("беремо найважливіший:", ordersQueue.dequeue('highest')); //  VIP
console.log("беремо найновіший:", ordersQueue.dequeue('newest'));   //  замовлення 4
console.log("беремо найдешевший:", ordersQueue.dequeue('lowest')); //  замовлення 2
console.log("беремо найстаріший:", ordersQueue.dequeue('oldest'));  //  замовлення 1