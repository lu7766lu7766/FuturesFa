'use strict'

const { test } = use('Test/Suite')('Jac')
const dataService = App.make('Service/Data')
// test('make sure 2 + 2 is 4', async ({ assert }) => {
//   assert.equal(2 + 2, 4)
// })

test('has option_last_time', async ({ assert }) => {
  // assert.equal(2 + 2, 4)
  assert.isTrue((await dataService.getOptionLastTime()).length)
  // console.log()
})
