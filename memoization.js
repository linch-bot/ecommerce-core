/**
 * TASK 3: Memoization Function
 */

function memoize(fn, options = {}) {
    const cache = new Map(); 
    const maxSize = options.maxSize || Infinity; 
    const maxAge = options.maxAge || 0; 
    return function (...args) {
        const key = JSON.stringify(args);

        // 1. Перевіряємо чи є дані в кэше
        if (cache.has(key)) {
            const cachedData = cache.get(key);
            
            // Перевіряємо чи дані не застаріли
            if (maxAge > 0 && (Date.now() - cachedData.timestamp > maxAge)) {
                cache.delete(key);
            } else {
                // оновлюємо позицію елемента (видаляємо та ставимо в кінець)
                if (maxSize !== Infinity) {
                    cache.delete(key);
                    cache.set(key, cachedData);
                }
                console.log(`[Кэш] Возвращаем сохраненный результат для: ${key}`);
                return cachedData.value;
            }
        }

        // 2. Якщо даних немає, запускаємо реальну функцію
        const result = fn(...args);

        // 3. коли кеш переповнений, видаляємо найстаріший елемент
        if (cache.size >= maxSize) {
            const firstKey = cache.keys().next().value;
            cache.delete(firstKey);
        }

        // 4. Зберігаємо свіжий результат у кэш
        cache.set(key, {
            value: result,
            timestamp: Date.now()
        });

        console.log(`[Вычисление] Считаем с нуля и сохраняем для: ${key}`);
        return result;
    };
}

module.exports = memoize;