const assert = require('assert')
const myMap = new Map()

myMap
    .set(1, 'one')
    .set('Erick', { text: 'two' })
    .set(true, () => 'hello')

const myMapWithConstructor = new Map([
    ['1', 'str1'],
    [1, 'num1'],
    [true, 'bool1'],
])

// console.log('myMap', myMap)
// console.log('myMap.get(1)', myMap.get(1))

assert.deepStrictEqual(myMap.get(1), 'one')
assert.deepStrictEqual(myMap.get('Erick'), { text: 'two' })
assert.deepStrictEqual(myMap.get(true)(), 'hello')

// Em Objects a chave só pode ser string ou symbol (number é coergido a string)
const onlyReferenceWorks = { id: 1 }
myMap.set(onlyReferenceWorks, { name: 'ErickWendel' })

// console.log('get', myMap.get(onlyReferenceWorks))

assert.deepStrictEqual(myMap.get({ id: 1 }), undefined)
assert.deepStrictEqual(myMap.get(onlyReferenceWorks), { name: 'ErickWendel' })

// utilitarios
// - No Object seria Object.keys({ a: 1 }).length
assert.deepStrictEqual(myMap.size, 4)

// para verificar se um item existe no objeto
// item.key = se não existe = undefined
// if () = coerção implícia para boolean e retorna false
// o jeito certo em Object é ({ name: 'Erick' }).hasOwnProperty('name')
assert.ok(myMap.has(onlyReferenceWorks))

// para remover um item do objeto
// delete item .id
// imperformático para o Javascript
assert.ok(myMap.delete(onlyReferenceWorks))

// Não dá para iterar em Objects diretamente
// tem que transformar com Object.entries(item)
assert.deepStrictEqual(
    JSON.stringify([...myMap]),
    '[[1,"one"],["Erick",{"text":"two"}],[true,null]]'
)

// for (const [key, value] of myMap) {
//     console.log({ key, value })
// }

// Object é inseguro, pois dependendo do nome da chave, pode substituir algum
// comportamento padrão
// ({ }).toString() => '[object Object]'
// ({ toString: () => 'Hey' }).toString() === 'Hey'

// qualquer chave pode colidir, com as propriedades herdadas do objeto, como
// constructor, toString, valueOf e etc.

const actor = {
    name: 'Xuxa da Silva',
    toString: 'Queen: Xuxa da Silva'
}

myMap.set(actor)
assert.ok(myMap.has(actor))
assert.throws(() => myMap.get(actor).toString, TypeError)

// Não dá para limpar um Obj sem reassiná-lo
myMap.clear()
assert.deepStrictEqual([...myMap.keys()], [])

// tem a maioria dos beneficios do Map
// MAS: não é iterável
// Só chaves de referência e que você já conheça
// mais leve e prevê leak de memória, porque depois que as instâncias saem da
// memória, tudo é limpo

const weakMap = new WeakMap()
const hero = { name: 'Flash' }

// weakMap.delete(hero)
// weakMap.get(hero)
// weakMap.has(hero)
// weakMap.set(hero)
