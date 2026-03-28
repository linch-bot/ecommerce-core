const memoize = require('../memoization');

//розрахунок ціни картини
function calculateArtPrice(basePrice, canvasSize, needsFraming) {
    let total = basePrice;
    
    // Імітую довгий процес
    for(let i = 0; i < 5000000; i++) {} 

    if (canvasSize === 'large') total += 500;
    if (needsFraming) total += 300;
    
    return total;
}


const getPriceMemoized = memoize(calculateArtPrice, { maxSize: 2 });

console.log("=== ТЕСТ МЕМОІЗАЦІЇ (Маркетплейс картин) ===");

console.log("Підсумок 1:", getPriceMemoized(1000, 'large', true)); 
console.log("Підсумок 2:", getPriceMemoized(1000, 'large', true)); 
console.log("Підсумок 3:", getPriceMemoized(800, 'small', false));
console.log("Підсумок 4:", getPriceMemoized(1500, 'large', false)); 
console.log("Підсумок 5:", getPriceMemoized(1000, 'large', true));