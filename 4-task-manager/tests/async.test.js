const { add } = require('../test/async')

test(
  'Async functions - using <done> keyword to resolve imported promise',
  (done) => {
    add(2, 2).then(
      (sum) => {
        expect(sum).toBe(4)
        done()
      }
    )
  }
)

test(
  'Async functions - using <async/await> keyword to resolve imported promise',
  async () => {
    const sum = await add(2, 2)
    expect(sum).toBe(4)
  }
)