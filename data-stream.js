/**
 * TASK 6: Large Data Processing with Async Iterators
 * Система інкрементальної обробки даних без навантаження пам'яті.
 */

// Асинхронна функція-генератор 
// не повертає всі дані одразу, а віддає їх по запиту.
async function* createArtSalesStream(totalRecords, batchSize) {
    let processed = 0;
    
    while (processed < totalRecords) {
        // імітуємо заторимку при отриманні даних
        await new Promise(resolve => setTimeout(resolve, 150));
        
        const batch = [];
        const limit = Math.min(batchSize, totalRecords - processed);
        
        // генерую поточну порцію даних
        for (let i = 0; i < limit; i++) {
            batch.push({
                id: processed + i + 1,
                artName: `Студенческий арт #${processed + i + 1}`,
                price: Math.floor(Math.random() * 1000) + 100
            });
        }
        
        processed += limit;
        
        // Ключове слово yield - повертає поточну порцію дани та чекає наступний запит
        // доки не знадобляться наступні дані пам'ять не буде перевантажуватись
        yield batch; 
    }
}

module.exports = { createArtSalesStream };