/**
 * @constant 身份证
 */
export const regIDCard = /(^\d{15}$)|(^\d{18}$)|(^\d{17}(\d|X|x)$)/;

/**
 * @constant 邮箱
 */
export const regEmail = /^[A-Za-z0-9\u4e00-\u9fa5]+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+$/;

/**
 * @constant 手机
 */
export const regPhoneNumber = /^1\d{10}$/;

/**
 * @constant 电话
 */
export const regTelNumber = /^1\d{10}$|^(0\d{2,3}-?|0\d2,3)?[1-9]\d{4,7}(-\d{1,8})?$/;

/**
 * @constant 数字
 */
export const regNumber = /^\d+$/

export const regFileName = /(.*\/)*([^.]+).*/gi
