<template>
	<div class="content">
		<u--textarea v-model="textVal" placeholder="请输入内容"></u--textarea>
		<u-upload :fileList="fileList" @afterRead="afterRead" @delete="deletePic" multiple :maxCount="9">
		</u-upload>
		<div class="save-btn">完成</div>
	</div>
</template>

<script>
	export default {
		data() {
			return {
				textVal: '',
				fileList: []
			}
		},
		methods: {

			// 新增图片
			async afterRead(event) {
				// 当设置 multiple 为 true 时, file 为数组格式，否则为对象格式
				let lists = [].concat(event.file)
				let fileListLen = this.fileList.length
				lists.map((item) => {
					this.fileList.push({
						...item,
						status: 'uploading',
						message: '上传中'
					})
				})
				for (let i = 0; i < lists.length; i++) {
					const result = await this.uploadFilePromise(lists[i].url)
					let item = this.fileList[fileListLen]
					this.fileList.splice(fileListLen, 1, Object.assign(item, {
						status: 'success',
						message: '',
						url: result
					}))
					fileListLen++
				}
			},
			uploadFilePromise(url) {
				return new Promise((resolve, reject) => {
					let a = uni.uploadFile({
						url: 'http://192.168.2.21:7001/upload', // 仅为示例，非真实的接口地址
						filePath: url,
						name: 'file',
						formData: {
							user: 'test'
						},
						success: (res) => {
							setTimeout(() => {
								resolve(res.data.data)
							}, 1000)
						}
					});
				})
			},
		}
	}
</script>

<style lang="scss" scoped>
	.content {
		.save-btn {
			position: absolute;
			bottom: 12vh;
			left: 50%;
			transform: translate(-50%, 0);
			display: flex;
			justify-content: center;
			align-items: center;
			width: 90px;
			height: 30px;
			font-size: 13px;
			border-radius: 20px;
			background-color: #C6C87F;
			box-shadow: 0 4px 5px rgba(0, 0, 0, 0.19);
			cursor: pointer;
			color: #fff;
		}
	}
</style>
