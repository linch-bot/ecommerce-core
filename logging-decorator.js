/**
 * TASK 9: Logging Decorator
 */

function log() {
    return function decorator(fn) {
        return function (...args) {
            const name = fn.name || 'anonymousFunction';
            console.log(`[LOG] Функція ${name} викликана з аргументами:`, args);

            try {
                const result = fn(...args);
                
                // Підтримка асинхронних функцій
                if (result instanceof Promise) {
                    return result.then(res => {
                        console.log(`[LOG] Асинхронна функція ${name} повернула:`, res);
                        return res;
                    }).catch(err => {
                        console.log(`[ERROR] Асинхронна функція ${name} упала з помилкою:`, err.message);
                        throw err;
                    });
                }

                // Підтримка синхронних функцій 
                console.log(`[LOG] Функція ${name} повернула:`, result);
                return result;
            } catch (error) {
                console.log(`[ERROR] Функція ${name} упала з помилкою:`, error.message);
                throw error;
            }
        };
    };
}

module.exports = log;