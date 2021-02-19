const item = {
    name: 'ErickWendel',
    age: 25,

    toString() {
        return `Name: ${this.name}, Age: ${this.age}`
    },

    valueOf() {
        return { hey: 'dude' }
        // return 007
    },

    [Symbol.toPrimitive](coercionType) {
        console.log('tying to convert to', coercionType)
        const types = {
            string: JSON.stringify(this),
            number: '0007'
        }
        return types[coercionType] || types.string
    }
}

console.log('toString', String(item))
console.log('valueOf', Number(item))
