/**
 * TASK 3: Memoization Function
 */

function memoize(fn, options = {}) {
    const cache = new Map(); 
    const maxSize = options.maxSize || Infinity; 
    const maxAge = options.maxAge || 0; 

    return function (...args) {
        const key = JSON.stringify(args);

        if (cache.has(key)) {
            const cachedData = cache.get(key);
            
            // перевіряємо на старість кешу
            if (maxAge > 0 && (Date.now() - cachedData.timestamp > maxAge)) {
                cache.delete(key);
            } else {
                // Оюновлюємо позицію в кэше для LRU
                if (maxSize !== Infinity) {
                    cache.delete(key);
                    cache.set(key, cachedData);
                }
                console.log(`[Кэш] Повертаємо збережений результат для: ${key}`);
                return cachedData.value;
            }
        }

        const result = fn(...args);

        // Політика очистки
        if (cache.size >= maxSize) {
            if (typeof options.customPolicy === 'function') {
                options.customPolicy(cache);
            } else {
                // Самий старий елемент удаляємо
                const firstKey = cache.keys().next().value;
                cache.delete(firstKey);
            }
        }

        cache.set(key, {
            value: result,
            timestamp: Date.now()
        });

        console.log(`[Обчислення] Рахуємо з нуля і зберігаємо для: ${key}`);
        return result;
    };
}

module.exports = memoize;