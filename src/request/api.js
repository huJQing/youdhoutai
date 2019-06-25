/**
 * api接口统一管理
 */
import { post } from './http'

const url = '/api'

/*获取当日数据统计*/
export const getTodayStatistic = () =>
  post(url, { m: 'statistic', a: 'todayStatistic' })

/*获取本月数据统计*/
export const getMonthStatistic = () =>
  post(url, { m: 'statistic', a: 'monthStatistic' })

/*获取所有用户数据 */
export const getAllUserInfo = p => post(url, p)

/*保存修改的用户信息*/
export const updateUserInfo = p => post(url, p)

/*删除用户*/
export const deleteUserInfo = p => post(url, p)

/*获取所有订单信息*/
export const getAllOrderInfo = p => post(url, p)

/*保存修改的订单信息*/
export const updateOrderInfo = p => post(url, p)

/*删除订单*/
export const deleteOrder = p => post(url, p)

/*获取所有支付信息数据 */
export const getTransitionInfo = p => post(url, p)

/*获取所有支付信息数据 */
export const getAllItemInfo = p => post(url, p)

/*保存修改的商品信息*/
export const updateItemInfo = p => post(url, p)

/*删除商品*/
export const deleteItem = p => post(url, p)
