/**
 * TASK 4: Priority Queue
 */

class PriorityQueue {
    constructor() {
        this.items = [];
    }

    // Додаємо замовлення в чергу
    // priority: 1 - терміново (VIP), 2 - звичайно, 3 - нетерміново
    enqueue(element, priority) {
        const queueElement = { element, priority };
        let added = false;

        // Шукаємо правильне місце для замовлення 
        for (let i = 0; i < this.items.length; i++) {
            if (queueElement.priority < this.items[i].priority) {
                this.items.splice(i, 0, queueElement);
                added = true;
                break;
            }
        }

        // Якщо приоритет найнижчий то в кінець черги
        if (!added) {
            this.items.push(queueElement);
        }
    }

    dequeue() {
        if (this.isEmpty()) return null;
        return this.items.shift().element;
    }

    // перевірка на те чи пуста черга
    isEmpty() {
        return this.items.length === 0;
    }
}

module.exports = PriorityQueue;