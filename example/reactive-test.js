const EventEmitter = require('../event-emitter');

console.log("=== ТЕСТ:  (EventEmitter) ===\n");

// 1: Головний хаб Маркетплейсу (Видавець)
const marketplaceEvents = new EventEmitter();

//  2: Сервис Email-повідомлення (Слухач 1)
const emailService = (art) => {
    console.log(`📧 [Email] Отправляем письмо: Новая картина "${art.title}" за $${art.price}`);
};

//  3: Сервіс Push-повідомлень (Слухач 2)
const pushService = (art) => {
    console.log(`📱 [Push] БЗЗЗ! На телефон: Скорее покупай "${art.title}"!`);
};

//  4: Сервіс Аналітики (Слухач 3)
const analyticsTracker = (art) => {
    console.log(`📊 [Analytics] Логируем новую запись в базу: ID ${art.id}`);
};

// --- Підписуємось на івент 'newArt' ---
//декілька слузачів реагують на одну подію, і кожен по-своєму обробляє її
const unsubscribeEmail = marketplaceEvents.subscribe('newArt', emailService);
marketplaceEvents.subscribe('newArt', pushService); 
const unsubscribeAnalytics = marketplaceEvents.subscribe('newArt', analyticsTracker);


// Симуляція завантаження першої картини
console.log("--- Маркетплейс публикует первую картину ---");
marketplaceEvents.emit('newArt', { id: 101, title: 'Киберпанк Котик', price: 50 });


console.log("\n--- Пользователь отписался от Email, а Аналитика сломалась (Unsubscribe) ---");
// Демонстрація відписки: користувач більше не хоче отримувати Email, а Аналітика тимчасово не працює
unsubscribeEmail(); 
unsubscribeAnalytics();


// Симуляція завантаження другої картини
console.log("\n--- Маркетплейс публикует вторую картину ---");
marketplaceEvents.emit('newArt', { id: 102, title: 'Акварельный Закат', price: 30 });
// Тепер працює тільки Push-повідомлення