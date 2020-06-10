/*
 * @Description: 用户模块路由
 * @Author: hai-27
 * @Date: 2020-03-14 20:58:10
 * @LastEditors: hai-27
 * @LastEditTime: 2020-03-15 00:19:18
 */
const Router = require('koa-router');
// 导入控制层
const usersController = require('../../controllers/usersController');
const miniprogramController = require('../../controllers/miniprogram');
const dbsController = require('../../controllers/building');
let usersRouter = new Router();

usersRouter
  .post('/users/login', usersController.Login)
  .post('/users/findUserName', usersController.FindUserName)
  .get('/users/info', usersController.UserInfo)
  .post('/users/register', usersController.Register)
  .post('/wx/openid', miniprogramController.Openid)
  .post('/building/add', dbsController.addBuilding)
  .get('/building/delete', dbsController.removeBuilding)
  .get('/building/list', dbsController.getBuildings)
  .get('/building/roomList', dbsController.getRoomsByBuildingId)

  
module.exports = usersRouter;