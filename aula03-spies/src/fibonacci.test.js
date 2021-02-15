const assert = require('assert');
const sinon = require('sinon')
const Fibonacci = require("./fibonacci");

// Fibonnaci: o próximo valor corresponde à soma dos dois anteriores
// Dado 3: 0, 1, 1
// Dado 5: 0, 1, 1, 2, 3
; (async () => {
  {
    const fibonnaci = new Fibonacci()
    const executeSpy = sinon.spy(fibonnaci, fibonnaci.execute.name)
    // generators retornam iterators, .next(), for await e rest/spread
    for await (const i of fibonnaci.execute(3)) {}
    const expectedCallCount = 4 // Nosso algoritmo vai começar do zero!
    assert.deepStrictEqual(executeSpy.callCount, expectedCallCount)
  }

  {
    const fibonnaci = new Fibonacci()
    const executeSpy = sinon.spy(fibonnaci, fibonnaci.execute.name)
    const [...results] = fibonnaci.execute(5)
    // [0] input = 5, current = 0, next = 1
    // [1] input = 4, current = 1, next = 1
    // [2] input = 3, current = 1, next = 2
    // [3] input = 2, current = 2, next = 3
    // [4] input = 1, current = 3, next = 5
    // [5] input = 0 -> PARA
    const { args } = executeSpy.getCall(2)
    const expectedResult = [0, 1, 1, 2, 3]
    const expectedParams = Object.values({ input: 3, current: 1, next: 2 })
    assert.deepStrictEqual(args, expectedParams)
    assert.deepStrictEqual(results, expectedResult)
  }
})()
