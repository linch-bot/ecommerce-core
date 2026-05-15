/**
 * TASK 9: Logging Decorator
 */

function log(options = {}) {
    const level = options.level || 'INFO'; 

    return function decorator(fn) {
        return function (...args) {
            const timestamp = new Date().toISOString();
            const name = fn.name || 'anonymousFunction';
            const startTime = Date.now(); // час старту

            const printLog = (currentLevel, message, data) => {
                if (level === 'ERROR' && currentLevel !== 'ERROR') return;
                
                const execTime = Date.now() - startTime; // підрахунок часу виконання
                console.log(`[${timestamp}] [${currentLevel}] [${execTime}ms] ${name} - ${message}`, data ? data : '');
            };

            printLog('INFO', 'Старт функції', args);

            try {
                const result = fn(...args);
                
                if (result instanceof Promise) {
                    return result.then(res => {
                        printLog('INFO', 'Завершено (Promise)', res);
                        return res;
                    }).catch(err => {
                        printLog('ERROR', 'Помилка (Promise)', err.message);
                        throw err;
                    });
                }

                printLog('INFO', 'Завершено (Sync)', result);
                return result;
            } catch (error) {
                printLog('ERROR', 'Помилка (Sync)', error.message);
                throw error;
            }
        };
    };
}

module.exports = log;