async function runFlashSale(generator, timeoutInSeconds) {
    const timeoutMs = timeoutInSeconds * 1000;
    const startTime = Date.now();

    console.log(`[SALE] Starting flash sale! Duration: ${timeoutInSeconds} seconds.\n`);

    let generatedCount = 0;

    for (const code of generator) {
        const currentTime = Date.now();
        
        if (currentTime - startTime >= timeoutMs) {
            console.log(`\n[SALE] Time is up! Flash sale ended.`);
            console.log(`Total codes generated: ${generatedCount}`);
            break;
        }

        console.log(`Generated discount code: ${code}`);
        generatedCount++;

        await new Promise(resolve => setTimeout(resolve, 500));
    }
}

// Експортуємо лише цю функцію
module.exports = runFlashSale;