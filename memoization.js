/**
 * TASK 3: Memoization Function
 */

function memoize(fn, options = {}) {
    const cache = new Map(); 
    const maxSize = options.maxSize || Infinity; 
    const maxAge = options.maxAge || 0; 
    // Додала вибір політики видалення
    const policy = options.policy || 'lru'; 

    return function (...args) {
        const key = JSON.stringify(args);

        if (cache.has(key)) {
            const cachedData = cache.get(key);
            
            if (maxAge > 0 && (Date.now() - cachedData.timestamp > maxAge)) {
                cache.delete(key);
            } else {
                cachedData.frequency += 1;

                // Обновлюємо позицію в кэше для LRU
                if (policy === 'lru' && maxSize !== Infinity) {
                    cache.delete(key);
                    cache.set(key, cachedData);
                }
                console.log(`[Кэш] Повертаємо збережений результат для: ${key} (Популярність: ${cachedData.frequency})`);
                return cachedData.value;
            }
        }

        const result = fn(...args);

        if (cache.size >= maxSize) {
            if (typeof options.customPolicy === 'function') {
                options.customPolicy(cache);
            } else if (policy === 'lfu') {
                // АЛГОРИТМ LFU
                let minFreqKey = null;
                let minFreq = Infinity;
                for (const [k, v] of cache.entries()) {
                    if (v.frequency < minFreq) {
                        minFreq = v.frequency;
                        minFreqKey = k;
                    }
                }
                if (minFreqKey) cache.delete(minFreqKey);
            } else {
                // АЛГОРИТМ LRU 
                const firstKey = cache.keys().next().value;
                cache.delete(firstKey);
            }
        }

        cache.set(key, {
            value: result,
            timestamp: Date.now(),
            frequency: 1 
        });

        console.log(`[Обчислення] Рахуємо з нуля і зберігаємо для: ${key}`);
        return result;
    };
}

module.exports = memoize;