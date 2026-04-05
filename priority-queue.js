/**
 * TASK 4: Priority Queue
 */

class BiDirectionalPriorityQueue {
    constructor() {
        this.items = [];
        this.insertCounter = 0; // Лічильник для (oldest/newest)
    }

    // Вставлямо елемент з пріоритетом
    enqueue(item, priority) {
        this.items.push({
            item: item,
            priority: priority,
            order: this.insertCounter++
        });
    }

    // вспомогальний метод для знаходження індексу елемента
    _findIndex(criteria) {
        if (this.items.length === 0) return -1;

        let targetIndex = 0;
        for (let i = 1; i < this.items.length; i++) {
            const current = this.items[i];
            const target = this.items[targetIndex];

            switch (criteria) {
                case 'highest':
                    if (current.priority > target.priority) targetIndex = i;
                    break;
                case 'lowest':
                    if (current.priority < target.priority) targetIndex = i;
                    break;
                case 'oldest':
                    if (current.order < target.order) targetIndex = i;
                    break;
                case 'newest':
                    if (current.order > target.order) targetIndex = i;
                    break;
                default:
                    throw new Error("Використовуйте: 'highest', 'lowest', 'oldest' або 'newest'");
            }
        }
        return targetIndex;
    }

    //  Видалити елемент за критерієм
    dequeue(criteria = 'highest') {
        const index = this._findIndex(criteria);
        if (index === -1) return null;
        
        // Видаляємо елемент та повертаємо його
        const removedItem = this.items.splice(index, 1)[0];
        return removedItem.item;
    }

    // Повертаємо елемент за критерієм без видалення
    peek(criteria = 'highest') {
        const index = this._findIndex(criteria);
        if (index === -1) return null;
        
        return this.items[index].item;
    }
}

module.exports = BiDirectionalPriorityQueue;