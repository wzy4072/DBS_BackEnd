var mysql = require('mysql')
const { dbConfig } = require('../config.js')
var pool = mysql.createPool(dbConfig)
const connectHandler = function () {
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

const asyncQuery = function (connection,sql, vals){
    return new Promise((res,rej)=>{
        connection.query(sql, vals, (e, result, fields) => {
            e ? rej(e) : res(result)
            }
          )
    })
}
const asyncBeginTransaction = function (connection){
    return new Promise((res,rej)=>{
        connection.beginTransaction((e) => {
            e ? rej(e) : res()
        })
    })
}

const transaction = async (sql,valList) => {
  const connection = await connectHandler() // 得到链接
 await asyncBeginTransaction(connection)
  try {
    valList.map(async (item)=>{
        let {buildingId,cleanFee,electricityPrice,elseFee,netFee,roomFee,roomName,waterPrice} = item
        await asyncQuery(connection, sql, [{buildingId,cleanFee,electricityPrice,elseFee,netFee,roomFee,roomName,waterPrice}])
    })
    return { sucess:true}
      
  } catch (error) {
    return connection.rollback()
  } finally {
    connection.release() // 释放链接
  }
}

module.exports = {
  transaction,
}
