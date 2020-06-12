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
  addPhase: async ({ phaseInfo, chargeList, metersList }) => {
    const transList = [
      { sql: 'insert into p_phases SET  ?', vals: phaseInfo },
      { sql: 'insert into p_billamount SET ?', vals: chargeList },
      { sql: 'insert into p_meters SET ?', vals: metersList },
    ]
    return await trans2.transaction(transList)
  },
  searchPhase: async () => {
    const sql =
      'SELECT  b.buildingName, p.id, p.buildingId, p.phaseName from b_buildings AS b JOIN p_phases AS p ON b.id=p.buildingId;'
    return await db.query(sql)
  },
  searchAmount: async (info) => {
    // { pahseId, buildingId, billId }
    let sqlStr = ''
    let vals = []
    for (const key in info) {
      if (info.hasOwnProperty(key)) {
        const element = info[key]
        if (element) {
          sqlStr += `${key}=?`
          vals.push(element)
        }
      }
    }
    const sql =
    `select  b.id, b.buildingId, b.roomName, b.phaseId,b.roomId,b.roomFee,b.waterFees,b.electricityFees,b.netFee,b.elseFee, b.cleanFee,b.roomAmount,\n
     p.phaseName, c.buildingName \n
     from p_billamount as b  \n
     JOIN b_buildings c on b.buildingId=c.id \n
     JOIN  p_phases p ON b.phaseId=p.id`+(sqlStr ? 'where  ' + sqlStr : '')
    console.log(sql, vals)
    return await db.query(sql, vals)
  },
}
