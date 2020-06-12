var mysql = require('mysql')
const { dbConfig } = require('../config.js')
var pool = mysql.createPool(dbConfig)

var sqlFac = require('./promiseFactory')
const transaction = (transList) => {
  return new Promise(async (resolve, reject) => {
    // 创建链接池
    let connection, asyncRes
    connection = await sqlFac.asyncGetConnection(pool)
    if (connection.isError) {
      return connection
    }
    // 开始事务
    asyncRes = await sqlFac.asyncBeginTransaction(connection)
    if (asyncRes.isError) {
      return asyncRes
    }

    // 插入表1 得到id
    let trans1 = transList[0]
    let result1 = await sqlFac.asyncQuery(connection, trans1.sql, trans1.vals)
    if (asyncRes.isError || !result1.insertId) {
      // 如果错误 回滚 关闭链接
      await sqlFac.asyncRollback(connection)
    } else {
      let trans2 = transList[1]
      for (let index = 0; index < trans2.vals.length; index++) {
        const row = trans2.vals[index]

        delete row.id
        row.phaseId = result1.insertId
        asyncRes = await sqlFac.asyncQuery(connection, trans2.sql, row)
        if (asyncRes.isError) {
          // 如果错误 回滚
          await sqlFac.asyncRollback(connection)
          break
        }
      }

      let trans3 = transList[2]
      for (let index = 0; index < trans3.vals.length; index++) {
        const row = trans3.vals[index]
        row.phaseId = result1.insertId
        asyncRes = await sqlFac.asyncQuery(connection, trans3.sql, row)
        if (asyncRes.isError) {
          // 如果错误 回滚
          await sqlFac.asyncRollback(connection)
          break
        }
      }




    }
    await sqlFac.asyncCommit(connection)

    resolve(asyncRes.isError ? asyncRes : { phaseId: result1.insertId })
    await sqlFac.asyncEnd(connection)
  })
}

module.exports = {
  transaction,
}
