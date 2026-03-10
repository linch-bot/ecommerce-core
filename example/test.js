const core = require('ecommerce-core');

console.log("=== TEST: E-commerce Core Initialization ===");

const codes = core.promoCodeGenerator(5);
core.runFlashSale(codes, 2);