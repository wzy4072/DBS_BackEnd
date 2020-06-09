const bDAO = require('../models/dao/buildingDAO')

module.exports = {
  /**
   * 新增楼栋
   * @param {Object} ctx
   */
  addBuilding: async (ctx) => {
    let {
      buildingName,
      buildingDesc,
      buildingFloor,
      everyFloorDoors,
    } = ctx.request.body
    let result = await bDAO.insertBuilding({
      buildingName,
      buildingDesc,
      buildingFloor,
      everyFloorDoors,
    })

    if (result.insertId) {
      ctx.body = {
        code: 200,
        result: {
          buildingId: result.insertId,
        },
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
        code: '200',
        result: '成功删除' + result.affectedRows + '条数据!',
      }
  },
}
