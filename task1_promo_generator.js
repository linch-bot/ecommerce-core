/**
 * TASK 1: GENERATORS AND ITERATORS
 * Задача: Генерація унікальних промокодів для акції.
 */

// 1. ГЕНЕРАТОР: функція яка робить різні промокоди.
function* promoCodeGenerator(length = 8) {
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
    
    while (true) {
        let promoCode = 'PROMO-';
        for (let i = 0; i < length; i++) {
            const randomIndex = Math.floor(Math.random() * characters.length);
            promoCode += characters[randomIndex];
        }
        
        yield promoCode;
    }
}

// 2. ІТЕРАТОР З ТАЙМАУТОМ.
async function runFlashSale(generator, timeoutInSeconds) {
    const timeoutMs = timeoutInSeconds * 1000; 
    const startTime = Date.now(); 

    console.log(`[АКЦІЯ] Старт роздачі промокодів! Тривалість: ${timeoutInSeconds} секунд.\n`);

    let generatedCount = 0;

    for (const code of generator) {
        const currentTime = Date.now();
        
        // Якщо поточний час мінус час старту більший за ліміт — зупинити.
        if (currentTime - startTime >= timeoutMs) {
            console.log(`\n[АКЦІЯ] Час вичерпано! Роздачу завершено.`);
            console.log(`Всього згенеровано кодів: ${generatedCount}`);
            break;
        }

        console.log(`Згенерован код на знижку: ${code}`);
        generatedCount++;

        //Робимо паузу в 0.5 секунд перед наступним кодом (щоб зімітувати реальне навантаження)
        await new Promise(resolve => setTimeout(resolve, 500));
    }
}

const discountCodes = promoCodeGenerator(6); 

runFlashSale(discountCodes, 3);