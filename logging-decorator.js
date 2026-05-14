/**
 * TASK 9: Logging Decorator
 */

function log(options = {}) {
    const level = options.level || 'INFO'; // за замовчуванням INFO

    return function decorator(fn) {
        return function (...args) {
            const timestamp = new Date().toISOString();
            const name = fn.name || 'anonymousFunction';

            const printLog = (currentLevel, message, data) => {
                // Conditional logging: якщо error, ігноруємо info
                if (level === 'ERROR' && currentLevel !== 'ERROR') return;
                
                console.log(`[${timestamp}] [${currentLevel}] ${name} - ${message}`, data ? data : '');
            };

            printLog('INFO', 'Викликана з аргументами:', args);

            try {
                const result = fn(...args);
                
                if (result instanceof Promise) {
                    return result.then(res => {
                        printLog('INFO', 'Успішно завершилася:', res);
                        return res;
                    }).catch(err => {
                        printLog('ERROR', 'Помилка промісу:', err.message);
                        throw err;
                    });
                }

                printLog('INFO', 'Успішно завершилася:', result);
                return result;
            } catch (error) {
                printLog('ERROR', 'Викинула виняток:', error.message);
                throw error;
            }
        };
    };
}

module.exports = log;