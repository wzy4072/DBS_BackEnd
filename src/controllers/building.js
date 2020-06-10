const bDAO = require('../models/dao/buildingDAO')

module.exports = {
  /**
   * 新增楼栋
   * @param {Object} ctx
   */
  addBuilding: async (ctx) => {
    let { buildingInfo, roomList } = ctx.request.body
    let result = await bDAO.insertBuilding(buildingInfo)
    let result2
    if (result.insertId) {
      roomList = roomList.map((row) => {
        delete row.key
        row.buildingId = result.insertId
        return row
      })
      result2 = await bDAO.insertRooms(roomList)
    }
    if (result2.sucess) {
      ctx.body = {
        code: 200,
        result: {
          buildingId: result.insertId,
        },
      }
    }
    if (result2.sucess) {
    console.log(222)

      return
    }
    console.log(111)

    ctx.body = {
      code: '500',
      msg: '未知错误',
    }
  },
  getBuildings:  async (ctx) => {
    // let { buildingId } = ctx.request.query
    let result = await bDAO.searchBuildings()
    if (result){
        ctx.body = {
            code: 20000,
            result: result,
        }
        return
    }
    ctx.body = {
        code: '500',
        msg: '未知错误',
      }
  },
  getRoomsByBuildingId:  async (ctx) => {
    let { buildingId } = ctx.request.query
    let result = await bDAO.searchRooms(buildingId)
    if (result){
        ctx.body = {
            code: 20000,
            result: result,
        }
        return
    }
    ctx.body = {
        code: '500',
        msg: '未知错误',
      }
  },

  removeBuilding: async (ctx) => {
    let { buildingId } = ctx.request.query
    let result = await bDAO.removeBuilding({ buildingId })
    if (result)
      ctx.body = {
        code: 20000,
        result: '成功删除' + result.affectedRows + '条数据!',
      }
  },
}
