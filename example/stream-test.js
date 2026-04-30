const { createArtSalesStream } = require('../data-stream');

async function runStreamProcessing() {
    console.log("=== ТЕСТ: Обробка великих даних (Async Iterator) ===");
    console.log("Починаємо вигрузку 10,000 записів о продажах...\n");

    // Запрашуємо 10000 записів, отримуючи їх порціями по 2500
    const salesStream = createArtSalesStream(10000, 2500);

    let totalRevenue = 0;
    let chunksProcessed = 0;

    // Старий кусок (batch) автоматично зтирається з пам'яті 
    for await (const batch of salesStream) {
        chunksProcessed++;
        console.log(`[Стрим] Отримана частина #${chunksProcessed}: ${batch.length} записів.`);
        
        // Рахуємо загальну виручку
        for (const sale of batch) {
            totalRevenue += sale.price;
        }
    }

    console.log("\n✅ Обробка успішно завершена!");
    console.log(`Загалом оброблено частин: ${chunksProcessed}`);
    console.log(`Загальна виручка маркетплейса: ${totalRevenue} у.е.`);
}

runStreamProcessing();