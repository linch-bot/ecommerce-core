/**
 * TASK 9: Logging Decorator
 */

function log(options = {}) {
    const config = {
        level: options.level || 'INFO',
        format: options.format || 'text', // text або json
        formatter: options.formatter || null // своя функція форматування
    };

    return function decorator(fn) {
        return function (...args) {
            const timestamp = new Date().toISOString();
            const name = fn.name || 'anonymousFunction';
            const startTime = Date.now();

            const dispatchLog = (currentLevel, message, data) => {
                if (config.level === 'ERROR' && currentLevel !== 'ERROR') return;

                const execTimeMs = Date.now() - startTime;
                
                // Формуємо структуру лог-запису
                const logEntry = {
                    timestamp,
                    level: currentLevel,
                    executionTime: `${execTimeMs}ms`,
                    function: name,
                    message,
                    data: data !== undefined ? data : null
                };

                // 1. Якщо є Custom Formatter
                if (typeof config.formatter === 'function') {
                    console.log(config.formatter(logEntry));
                    return;
                }

                // 2. Якщо вибрано Structured JSON
                if (config.format === 'json') {
                    console.log(JSON.stringify(logEntry));
                    return;
                }

                // 3. Звичайний текстовий формат
                let textOut = `[${logEntry.timestamp}] [${logEntry.level}] [${logEntry.executionTime}] ${logEntry.function} - ${logEntry.message}`;
                if (logEntry.data) textOut += ` | Дані: ${JSON.stringify(logEntry.data)}`;
                console.log(textOut);
            };

            dispatchLog('INFO', 'Початок виконання', { args });

            try {
                const result = fn(...args);
                
                if (result instanceof Promise) {
                    return result.then(res => {
                        dispatchLog('INFO', 'Успішно (Асинхронно)', { result: res });
                        return res;
                    }).catch(err => {
                        dispatchLog('ERROR', 'Провал (Асинхронно)', { error: err.message });
                        throw err;
                    });
                }

                dispatchLog('INFO', 'Успішно (Синхронно)', { result });
                return result;
            } catch (error) {
                dispatchLog('ERROR', 'Виникла помилка', { error: error.message });
                throw error;
            }
        };
    };
}

module.exports = log;