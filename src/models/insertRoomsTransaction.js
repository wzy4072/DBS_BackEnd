var mysql = require('mysql')
const { dbConfig } = require('../config.js')
var pool = mysql.createPool(dbConfig)
const asyncConnect = function () {
  return new Promise((resolve, reject) => {
    // 取出链接
    pool.getConnection(function (err, connection) {
      resolve(connection)
      if (err) {
        reject(err)
        return
      }
    })
  })
}

const asyncQuery = function (connection, sql, vals) {
  return new Promise((res, rej) => {
    connection.query(sql, vals, (e, result) => {
      if (e) {
        connection.rollback()
        return
      }
      res(result)
    })
  })
}

const transaction = async (transList) => {
  // 创建链接
  let connection = await asyncConnect()
  // 开始事务
  let TransPromise =  new Promise((res, rej) => {
   connection.beginTransaction(async (e) => {
      if (e) return
      let trans1 = transList[0]
      let trans2 = transList[1]
      let result1 = await asyncQuery(connection, trans1.sql, trans1.vals)
      if (!result1.insertId) {
        connection.rollback()
      }

      let promiseList = trans2.vals.map((row) => {
        delete row.key
        row.buildingId = result1.insertId
        return asyncQuery(connection, trans2.sql, row)
      })

      return Promise.all(promiseList)
        .then((result) => {
          console.log(result)

          //提交事务
          connection.commit(function (err) {
            if (err) {
              connection.rollback(function () {
                if (err) {
                  return next(err)
                }
              })
            }
            //关闭连接
            connection.end()
          })
          res({ success: true, buildingId: result1.insertId })
        })
        .catch((error) => {
          console.log(error)
        })
    })
  })

  return TransPromise
}

module.exports = {
  transaction,
}
