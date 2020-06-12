/*
 * @Description: 用户模块数据持久层
 * @Author: hai-27
 * @Date: 2020-03-14 23:26:24
 * @LastEditors: hai-27
 * @LastEditTime: 2020-03-15 00:15:49
 */
const db = require('../db.js')
// const trans = require('../insertRoomsTransaction')
const trans = require('../transaction')
const trans2 = require('../transaction2')

module.exports = {
  insertBuilding: async (info) => {
    const sql = 'insert into b_buildings SET  ?'
    return await db.query(sql, info)
    // const sql =
    //   'insert into b_buildings set buildingDesc=?,buildingFloor=?,buildingName=?,everyFloorDoors=?'
    // return await db.query(sql, [
    //   buildingDesc,
    //   buildingFloor,
    //   buildingName,
    //   everyFloorDoors,
    // ])
  },
  searchBuildings: async () => {
    const sql = 'select * from b_buildings;'
    return await db.query(sql)
  },
  removeBuilding: async ({ buildingId }) => {
    const sql = 'DELETE FROM `b_buildings` WHERE id=?'
    return await db.query(sql, [buildingId])
  },
  insertRooms: async (bInfo, roomlist) => {
    const transList = [
      { sql: 'insert into b_buildings SET  ?', vals: bInfo },
      { sql: 'insert into b_rooms SET ?', vals: roomlist },
    ]
    return await trans.transaction(transList)
  },
  searchRooms: async (id) => {
    const sql = 'select * from b_rooms where buildingId=?'
    return await db.query(sql, [id])
  },
  addPhase: async ({phaseInfo, chargeList,metersList}) => {
    const transList = [
      { sql: 'insert into p_phases SET  ?', vals: phaseInfo },
      { sql: 'insert into p_billamount SET ?', vals: chargeList },
      { sql: 'insert into p_meters SET ?', vals: metersList },
    ]
    return await trans2.transaction(transList)
  },
}
