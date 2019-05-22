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



Route.group(() =>
{
  Route.post('login', 'UserController.login').validator('Login').middleware(['throttle:3,120'])
  Route.get('/', 'UserController.getUserInfo').middleware(['auth'])
}).prefix('api/user').middleware(['api'])

Route.group(() =>
{
  Route.get('/list', 'UserController.getUserList').validator('User/Get')
  Route.get('/list/total', 'UserController.getUserListTotal').validator('User/Get')
  Route.post('/', 'UserController.createUser').validator('User/Create')
  Route.post('/tester', 'UserController.createTester')
  Route.put('/', 'UserController.updateUser').validator('User/Update')
  Route.delete('/', 'UserController.deleteUser').validator('User/Delete')
}).prefix('api/user').middleware(['api', 'auth', 'admin'])

Route.group(() =>
{
  Route.get('option-today-item', 'DataController.getOptionTodayItem')
  Route.get('option-item-informed', 'DataController.getOptionItemInformed')
  Route.get('option-chip-accumulation', 'DataController.getOptionChipAccumulation')
  Route.get('txo', 'DataController.getTXO')
}).prefix('api/data').middleware(['auth', 'api'])

// Route.get('test', 'DataController.test').middleware(['api'])
