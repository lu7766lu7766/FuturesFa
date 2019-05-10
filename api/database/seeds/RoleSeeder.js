'use strict'

/*
|--------------------------------------------------------------------------
| RoleSeeder
|--------------------------------------------------------------------------
|
| Make use of the Factory instance to seed database with dummy data or
| make use of Lucid models directly.
|
*/

const RoleConstant = use('Constants/Role')

class RoleSeeder {
  async run () {
    // await DB.table('roles').insert([
    //   {
    //     id: RoleConstant.ADMIN_CODE,
    //     name:RoleConstant.ADMIN
    //   },
    //   {
    //     id: RoleConstant.USER_CODE,
    //     name:RoleConstant.USER
    //   },
    //   {
    //     id: RoleConstant.TESTER_CODE,
    //     name:RoleConstant.TESTER
    //   }
    // ])
    await DB.table('roles').insert(RoleConstant.option())
  }
}

module.exports = RoleSeeder
