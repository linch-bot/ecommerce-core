/**
 * TASK 7: Reactive Communication with EventEmitters
 */

class EventEmitter {
    constructor() {
        // Тут зберігаються всі події та їх слухачі
        this.events = {};
    }

    // subscribe
    subscribe(eventName, listener) {
        if (!this.events[eventName]) {
            this.events[eventName] = [];
        }
        this.events[eventName].push(listener);

        // unsubscribe
        return () => this.unsubscribe(eventName, listener);
    }

    unsubscribe(eventName, listenerToRemove) {
        if (!this.events[eventName]) return;
        
        // залишаэмо тільки тих слухачів, які не є listenerToRemove
        this.events[eventName] = this.events[eventName].filter(
            listener => listener !== listenerToRemove
        );
    }

    // emit/publish
    emit(eventName, data) {
        if (!this.events[eventName]) return;
        
        // сповыщаємо всіх слухачів 
        this.events[eventName].forEach(listener => listener(data));
    }
}

module.exports = EventEmitter;