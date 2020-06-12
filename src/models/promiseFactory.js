
// 取出链接
function asyncGetConnection(pool) {
  return new Promise((resolve) => {
    pool.getConnection(function (e, connection) {
      if (e) {
        resolve({ isError: true, message: 'BeginTransaction fail！' })

        throw e
      }
      resolve(connection)
    })
  })
}

// 开始事务
function asyncBeginTransaction(connection) {
  return new Promise((resolve) => {
    connection.beginTransaction(async (e) => {
      if (e) {
        resolve({ isError: true, message: 'BeginTransaction fail！' })
        throw e
      }
      resolve(connection)
    })
  })
}

// 执行语句
function asyncQuery(connection, sql, vals) {
  return new Promise((resolve) => {
    connection.query(sql, vals, (e, result) => {
      if (e) {
        resolve({ isError: true, message: 'Query fail！' })
        throw e
      }
      resolve(result)
    })
  })
}

//提交事务
function asyncCommit(connection) {
  return new Promise((resolve) => {
    connection.commit(function (e) {
      if (e) {
        resolve({ isError: true, message: 'Commit fail！' })
        throw e
      }
      resolve(true)
    })
  })
}

// 回滚事务
function asyncRollback(connection) {
  return new Promise((resolve) => {
    connection.rollback(function (e) {
      if (e) {
        resolve({ isError: true, message: 'Rollback fail！' })
        throw e
      }
      resolve(true)
    })
  })
}

// 关闭连接

function asyncEnd(connection) {
  return new Promise((resolve) => {
    connection.release(function (e) {
      if (e) {
        resolve({ isError: true, message: 'End fail！' })
        throw e
      }
      resolve(true)
    })
  })
}

module.exports = {
    asyncGetConnection,
    asyncBeginTransaction,
    asyncQuery,
    asyncCommit,
    asyncRollback,
    asyncEnd
}
