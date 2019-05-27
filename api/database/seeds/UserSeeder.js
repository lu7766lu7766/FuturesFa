'use strict'

/*
|--------------------------------------------------------------------------
| UserSeeder
|--------------------------------------------------------------------------
|
| Make use of the Factory instance to seed database with dummy data or
| make use of Lucid models directly.
|
*/

/** @type {import('@adonisjs/lucid/src/Factory')} */
const UserModel = use('Models/User')
const RoleConstant = use('Constants/Role')

class UserSeeder {
  async run () {
    await UserModel.createMany([
      {
        user_name: 'lu7766',
        password: 'lu90354',
        nick_name: 'Jac Wang',
        role_id: RoleConstant.ADMIN_CODE
      },
      {
        user_name: 'root',
        password: 'Ab1234',
        nick_name: 'Admin',
        role_id: RoleConstant.ADMIN_CODE
      },
      {
        user_name: 'geroge30000',
        password: 'a601126',
        nick_name: '期權發財王',
        role_id: RoleConstant.ADMIN_CODE
      },
      {
        user_name: 'marco',
        password: '123456',
        nick_name: 'Marco',
        role_id: RoleConstant.ADMIN_CODE
      },
      {
        user_name: 'k2greentea',
        password: '670224',
        nick_name: 'Eagle',
        role_id: RoleConstant.ADMIN_CODE
      },
      {
        user_name: 'user',
        password: 'user',
        nick_name: 'User',
        expire_time: moment().add(30, 'days').format('YYYY-MM-DD hh:mm:ss'),
        role_id: RoleConstant.USER_CODE
      },
      {
        user_name: 'tester',
        password: 'tester',
        nick_name: 'Tester',
        expire_time: moment().add(5, 'days').format('YYYY-MM-DD hh:mm:ss'),
        role_id: RoleConstant.TESTER_CODE
      },
    ])
  }
}

module.exports = UserSeeder
