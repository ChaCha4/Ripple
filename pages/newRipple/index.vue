<template>
	<div class="content">
		<u-form :model="form" ref="uForm" :rules="rules">
			<u-form-item>
				<span class="icon-box"><i :class="['iconfont', `icon-${form.icon}`]" /></span>
			</u-form-item>
			<u-form-item prop="name">
				<u-input border="surround" shape="circle" v-model="form.name" placeholder="请输入名称"></u-input>
			</u-form-item>
			<div>
				<span class="block-title">请选择图标</span>
				<span class="icon-list-box">
					<span v-for="(item) in iconList" :key="item.icon" class="icon-item"><i
							:class="['iconfont', `icon-${item.icon}`]" @tap="form.icon = item.icon" /></span>
				</span>
			</div>
			<hr style="border-color: rgba(0, 0, 0, 0.1);">
			<u-form-item prop="endTime">
				<div class="time-picker-box">
					<div class="text">设置涟漪结束时间</div>

					<div class="value-box" @tap="show = true">
						<span>{{form.endTime}}</span>
						<i class="iconfont icon-xiangyou1" />
					</div>
				</div>
			</u-form-item>
			<hr style="border-color: rgba(0, 0, 0, 0.1);">
		</u-form>
		<div :class="{ 'save-btn': true, 'diabled-status': !form.name || form.endTime === '请选择' }" @click="submit">保存
		</div>
		<u-calendar :show="show" mode="single" @close="show = false" @confirm="confirm"></u-calendar>
		<u-toast ref="uToast"></u-toast>
	</div>
</template>

<script>
	import {
		iconList
	} from '../../constants/index.js'
	export default {
		data() {
			return {
				form: {
					icon: 'biaoqiankuozhan_yuedu-119',
					name: '',
					endTime: '请选择',
					startTime: this.formatDate(),
					days: 0,
					checked: false,
					space: []

				},
				show: false,
				iconList,
				rules: {
					// 'name': {
					// 	type: 'string',
					// 	required: true,
					// 	message: '请填写名称',
					// 	trigger: ['blur', 'change']
					// },
					// 'endTime': {
					// 	type: 'string',
					// 	required: true,
					// 	message: '请设置时间',
					// 	trigger: ['change']
					// },
				},
			}
		},
		methods: {
			// 时间戳的处理
			formatDate: function() {
				const date = new Date();
				const month = date.getMonth() + 1

				return `${date.getFullYear()}-${month}-${date.getDate()}`
			},
			addNewRipple() {
				uniCloud.callFunction({
					name: 'rippleList',
					data: {
						type: 'add',
						rippleInfo: this.form
					}
				}).then(({
					result
				}) => {
					if (result.code === 200) {

						this.$refs.uToast.show({
							type: 'default',
							message: '新建成功',
							complete() {
								uni.reLaunch({
									url: '/pages/homePage/index'
								})
							}
						})
					}
				})
			},
			submit() {
				if (!this.form.name || this.form.endTime === '请选择') return null

				this.addNewRipple()
			},
			confirm(info) {
				this.form.endTime = info[0]
				this.show = false
			},
		}
	}
</script>

<style lang="scss" scoped>
	.content {
		padding: 0 20px;

		.icon-box {
			display: flex;
			justify-content: center;
			align-items: center;
			margin: 0 auto;
			width: 4rem;
			height: 4rem;
			border-radius: 50%;
			background-color: #D9D9D9;

			.iconfont {
				font-size: 3rem;
				color: #727272;
			}
		}

		.block-title {
			color: #727272;
		}

		.icon-list-box {
			display: flex;
			flex-wrap: wrap;
			margin-top: 10px;
			overflow-x: scroll;
			overflow-y: hidden;


			.icon-item {
				display: flex;
				justify-content: center;
				align-items: center;
				width: 2rem;
				height: 2rem;
				margin: 4px;
				border-radius: 4px;
				cursor: pointer;
				background-color: #D9D9D9;
			}
		}

		.time-picker-box {
			display: flex;
			justify-content: space-between;
			width: 100%;
			margin: 16px 0;
			color: #727272;

			.value-box {
				display: flex;
				justify-content: flex-end;
				align-items: center;
				width: 50%;
				cursor: pointer;
			}
		}

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

		.diabled-status {
			background-color: #d2d2d2;
			cursor: default;
		}
	}
</style>
