/**
 * TASK 5: Async Array Function Variants
 * обрана функція: map
 */

// 1. Callback-based asynchronous version
function asyncMapCallback(array, asyncIteratee, finalCallback) {
    let results = [];
    let completed = 0;
    let hasErrored = false;

    if (array.length === 0) return finalCallback(null, results);

    array.forEach((item, index) => {
        // запуск асинхронної функції для кожного елемента
        asyncIteratee(item, (err, result) => {
            if (hasErrored) return; // якщо вже була помилка не обробляю більше результатів
            
            if (err) {
                hasErrored = true;
                return finalCallback(err);
            }
            
            results[index] = result;
            completed++;
            
            // фінальний колбек
            if (completed === array.length) {
                finalCallback(null, results);
            }
        });
    });
}

// 2. Promise-based alternative (з AbortController)
function asyncMapPromise(array, asyncIteratee, options = {}) {
    return new Promise((resolve, reject) => {
        const signal = options.signal;

        // якщо  відмінили до старту
        if (signal && signal.aborted) {
            return reject(new Error("Operation aborted"));
        }

        // шукаємо помилки через сигнал
        const abortHandler = () => reject(new Error("Operation aborted"));
        if (signal) {
            signal.addEventListener("abort", abortHandler);
        }

        // заупск промісів паралельно
        const promises = array.map(item => asyncIteratee(item, signal));

        Promise.all(promises)
            .then(results => {
                if (signal) signal.removeEventListener("abort", abortHandler);
                resolve(results);
            })
            .catch(err => {
                if (signal) signal.removeEventListener("abort", abortHandler);
                reject(err);
            });
    });
}

module.exports = { asyncMapCallback, asyncMapPromise };