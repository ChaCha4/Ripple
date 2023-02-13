'use strict';
const appid = 'wx51a9793ba310af47'
const secret = 'b67eec464e99e71db67875b3957e5da7'

const db = uniCloud.database();
const dbCmd = db.command
const rippleList = db.collection('rippleList')
exports.main = async (event, context) => {
	//event为客户端上传的参数

	const {
		type,
		id,
		rippleInfo
	} = event

	switch (type) {
		case 'add':

			await rippleList.add(rippleInfo)
			//返回数据给客户端
			return {
				code: 200,
				msg: "请求成功",
				data: "涟漪新建成功！"
			};
		case 'read':

			const res = await rippleList.get()

			return {
				code: 200,
				msg: "请求成功",
				data: res.data
			};
		case 'update':
	const date = new Date();
	const month = date.getMonth() + 1
			const result = await rippleList.doc(id).update({
				checked: `${date.getFullYear()}-${month}-${date.getDate()}`,
				days: dbCmd.inc(1)
			})

			return {
				code: 200,
				msg: "请求成功",
				data: "打卡成功！"
			};
	}
};
