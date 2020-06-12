const bDAO = require('../models/dao/buildingDAO')

module.exports = {
  /**
   * 新增楼栋
   * @param {Object} ctx
   */
  addBuilding: async (ctx) => {
    let { buildingInfo, roomList } = ctx.request.body
    let result = await bDAO.insertRooms(buildingInfo, roomList)
    if (result.buildingId) {
        ctx.body = {
            code: 20000,
            result:result.buildingId
          }
      return
    }

    ctx.body = {
      code: '500',
      msg: '未知错误',
    }
  },
  getBuildings: async (ctx) => {
    // let { buildingId } = ctx.request.query
    let result = await bDAO.searchBuildings()
    if (result) {
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
  getRoomsByBuildingId: async (ctx) => {
    let buildingId = ctx.params.buildingId
    let result = await bDAO.searchRooms(buildingId)
    if (result) {
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

  addPhase: async (ctx) => {
    let  {phaseInfo,chargeList,metersList} = ctx.request.body
    let result = await bDAO.addPhase( {phaseInfo,chargeList,metersList})
    if (result)
      ctx.body = {
        code: 20000,
        result
      }
  },
}
