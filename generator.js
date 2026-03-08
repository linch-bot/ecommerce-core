function* promoCodeGenerator(length = 8) {
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
    while (true) {
        let promoCode = 'PROMO-';
        for (let i = 0; i < length; i++) {
            const randomIndex = Math.floor(Math.random() * characters.length);
            promoCode += characters[randomIndex];
        }
        yield promoCode;
    }
}

// Експортуємо лише цю функцію
module.exports = promoCodeGenerator;