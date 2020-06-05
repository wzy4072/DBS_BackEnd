/*
 * @Description: 用户模块控制器
 * @Author: hai-27
 * @Date: 2020-03-14 21:16:08
 * @LastEditors: hai-27
 * @LastEditTime: 2020-03-15 00:15:27
 */
module.exports = {
  /**
   * 微信获取openid
   * @param {Object} ctx
   */
  Openid: async ctx => {

    let { code } = ctx.request.body;

    if (code) {
      ctx.body = {
        code: 200,
        openid:'A66B88-A66B88',
        msg: '登录成功'
      }
      return;
    }

    ctx.body = {
      code: '500',
      msg: '未知错误'
    }
  } 
};