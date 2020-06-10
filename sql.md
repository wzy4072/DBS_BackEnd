connection.query('SELECT * FROM `books` WHERE `author` = "David"', function (error, results, fields) {
  // error will be an Error if one occurred during the query
  // results will contain the results of the query
  // fields will contain information about the returned results fields (if any)
});

第二个.query()形式是 .query(sqlString, values, callback)，带有值的占位符 (查看转义查询值):

connection.query('SELECT * FROM `books` WHERE `author` = ?', ['David'], function (error, results, fields) {
  // error will be an Error if one occurred during the query
  // results will contain the results of the query
  // fields will contain information about the returned results fields (if any)
});

    第三种 .query()形式是 .query(options, callback)，在查询时带有大量的高级可选项，比如 转义查询值(escaping query values)，联结重叠列名(joins with overlapping column names)，超时(timeouts), 和 类型转换(type casting)。

connection.query({
  sql: 'SELECT * FROM `books` WHERE `author` = ?',
  timeout: 40000, // 40s
  values: ['David']
}, function (error, results, fields) {
  // error will be an Error if one occurred during the query
  // results will contain the results of the query
  // fields will contain information about the returned results fields (if any)
});