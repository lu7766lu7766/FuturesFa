'use strict'

/*
 |--------------------------------------------------------------------------
 | Routes
 |--------------------------------------------------------------------------
 |
 | Http routes are entry points to your web application. You can create
 | routes for different URL's and bind Controller actions to them.
 |
 | A complete guide on routing is available here.
 | http://adonisjs.com/docs/4.1/routing
 |
 */

/** @type {typeof import('@adonisjs/framework/src/Route/Manager')} */
const Route = use('Route')

Route.post('api/user/login', 'UserController.login').validator('Login').middleware(['throttle:3,120'])

Route.group(() =>
{
  Route.get('/', 'UserController.getUserInfo')
  Route.get('/list', 'UserController.getUserList')
  Route.get('/list/total', 'UserController.getUserListTotal')
  Route.post('/', 'UserController.createUser').validator('User/Create')
  Route.post('/tester', 'UserController.createTester')
  Route.put('/', 'UserController.updateUser').validator('User/Update')
  Route.delete('/', 'UserController.deleteUser').validator('User/Delete')
}).prefix('api/user').middleware(['admin'])

// Route.group(() => {
//   Route.post('message', 'TransferController.message')
// }).prefix('transfer')
