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

Route.post('api/login', 'UserController.login').validator('Login')

Route.group(() =>
{
  Route.post('create', 'UserController.createUser').validator('User/Create')
  Route.post('create/tester', 'UserController.createTester')
}).prefix('api/user').middleware(['admin'])

// Route.group(() => {
//   Route.post('message', 'TransferController.message')
// }).prefix('transfer')
