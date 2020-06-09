/*
 * @Description: 用户模块数据持久层
 * @Author: hai-27
 * @Date: 2020-03-14 23:26:24
 * @LastEditors: hai-27
 * @LastEditTime: 2020-03-15 00:15:49
 */
const db = require('../db.js')

module.exports = {
  insertBuilding: async (info) => {
    const sql = 'insert into b_buildings values(?)'
    return await db.query(sql, info)
  },
  searchBuilding: async () => {
    const sql = 'select * from b_buildings;'
    return await db.query(sql)
  },
  removeBuilding: async ({ buildingId }) => {
    const sql = 'DELETE FROM `b_buildings` WHERE id=?'
    return await db.query(sql, [buildingId])
  },
  searchRooms: async () => {
    const sql = 'select * from b_buildings;'
    return await db.query(sql)
  },
  insertRooms: async (roomlist) => {
    const sql = 'insert into b_rooms values ?'
    return await db.query(sql, roomlist)
  },
}
