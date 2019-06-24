/**   
 * api接口统一管理
 */
import { get, post } from './http'

const url = '/api';

export const getTodayStatistic = p => post(url, p);