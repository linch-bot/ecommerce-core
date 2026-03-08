const core = require('../index.js');

console.log("=== ТЕСТ: Запуск ядра інтернет-магазину ===");

// Викликаємо функції нашої бібліотеки
const codes = core.promoCodeGenerator(5); 
core.runFlashSale(codes, 2); 