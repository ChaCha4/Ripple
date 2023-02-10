'use strict';
const appid = 'wx51a9793ba310af47'
const secret = 'b67eec464e99e71db67875b3957e5da7'

const db = uniCloud.database();
const user = db.collection('user')
exports.main = async (event, context) => {
	//event为客户端上传的参数
	// console.log('event : ', event)
	const {
		code,
		avatarUrl,
		gender,
		nickName
	} = event

	const URL =
		`https://api.weixin.qq.com/sns/jscode2session?appid=${appid}&secret=${secret}&js_code=${code}&grant_type=authorization_code`
	const requestOptions = {
		method: 'GET',
		dataType: 'json'
	}
	const result = await uniCloud.httpclient.request(URL, requestOptions)
	const {
		data: {
			openid
		}
	} = result

	const userData = {
		nickName,
		gender,
		avatarUrl,
		openid
	}
	const resData = await db.collection('user').add(userData)
	// console.log(countRes, 'countRes');
	// if (countRes.total !== 1) {
	// 	user.add({
			// openid,
			// avatarUrl,
			// gender,
			// nickName
	// 	})
	// }
	//返回数据给客户端
	return {
		code: 200,
		msg: "登录成功",
		data: {
			userInfo: {
				openid,
				avatarUrl,
				gender,
				nickName
			}
		}
	}
};
