export default class Counter {
    constructor({ counter, input = '.js-counter-input' }) {
        if (!counter) throw new Error('Не передан компонент counter')

        this.counter = counter
        this.input = typeof input === 'string' ? input : this.counter.querySelector(input)
    }

    increase() {
        this.input.value++
    }

    decrease() {
        this.input.value--
    }
}
