<template>
	<MenuLayout>
		<div v-if="list.length <= 0" class="empty-style">暂无内容</div>
		<div v-else class="main-content">
			<div v-for="item in list" :key="item._id" class="card-box">
				<span class="left"><i :class="['iconfont', `icon-${item.icon}`]" /></span>
				<div class="middle">
					<span class="title">{{item.name}}</span>
					<span class="desc">{{`已坚持${item.days}天`}}</span>
					<span class="progress-bar"><span class="up-bar"
							:style="{ width: `${handleWidth(item.days, item.startTime, item.endTime)}%` }" /></span>
				</div>
				<div class="right">
					<span v-if="dateStr !== item.checked" class="operation-btn"
						@click="() => handleChecked(item._id)">打卡</span>
					<span v-else class="operation-box">
						<i class="iconfont icon-duigoutianchong-" />
						<!-- <span class="space-btn" @tap="onClickRecordSpace">记录心情</span> -->
					</span>
				</div>
			</div>
		</div>
		<div class="add-btn" @tap="addNewRipple">新建涟漪</div>
	</MenuLayout>
</template>

<script>
	import MenuLayout from '../../components/MenuLayout/index.vue'
	import {
		formatTime
	} from '../../utils/utils.js'
	export default {
		data() {
			return {
				list: [],
				dateStr: formatTime()
			}
		},
		onShow() {
			this.initData()
		},
		components: {
			MenuLayout
		},
		methods: {
			initData() {
				uniCloud.callFunction({
					name: 'rippleList',
					data: {
						type: 'read'
					}
				}).then(({
					result
				}) => {
					if (result.code === 200) {
						this.list = result.data
					}
				})
			},
			handleChecked(id) {
				uniCloud.callFunction({
					name: 'rippleList',
					data: {
						type: 'update',
						id
					}
				}).then(({
					result
				}) => {
					if (result.code === 200) {

						this.initData()
					}
				})
			},
			addNewRipple() {
				uni.navigateTo({
					url: '/pages/newRipple/index'
				})
			},
			handleWidth(days, startTime, endTime) {
				const totalDays = (new Date(endTime).getTime() - new Date(startTime).getTime()) / 1000 / 60 / 60 / 24

				return Math.floor((days / totalDays) * 100)
			},
			onClickRecordSpace() {
				uni.navigateTo({
					url: '/pages/emotionSpace/index'
				})
			}
		}
	}
</script>

<style lang="less" scoped>
	.empty-style {
		display: flex;
		justify-content: center;
		align-items: center;
		height: 100%;
		color: #98ad90;
	}

	.main-content {
		overflow-y: scroll;
		overflow-x: hidden;
		height: 92%;
	}

	.card-box {
		display: flex;
		width: 95%;
		height: 56px;
		margin: 10px auto;
		padding: 10px 14px;
		border-radius: 4px;
		background-color: #fff;

		.left {
			display: flex;
			justify-content: center;
			align-items: center;
			width: 10%;
			margin-right: 18px;

			.iconfont {
				font-size: 40px;
			}
		}

		.middle {
			display: flex;
			flex-direction: column;
			justify-content: space-between;
			width: 65%;
			margin-right: 14px;

			.title {
				font-size: 13px;
				font-weight: bold;
			}

			.desc {
				font-size: 12px;
				color: #A4A4A4;
			}

			.progress-bar {
				display: flex;
				align-items: center;
				width: 100%;
				height: 6px;
				padding: 2px;
				border-radius: 10px;
				background-color: #C3DFCB;

				.up-bar {
					height: 100%;
					border-radius: 10px;
					background-color: #ECD9A9;
				}
			}
		}

		.right {

			.operation-btn {
				display: flex;
				justify-content: center;
				align-items: center;
				width: 62px;
				height: 22px;
				margin-top: 8px;
				font-size: 12px;
				color: #fff;
				border-radius: 14px;
				background-color: #7BAF90;
				cursor: pointer;
			}

			.operation-box {
				display: flex;
				flex-direction: column;
				align-items: center;
				justify-content: space-around;
				width: 62px;
				height: 100%;

				.iconfont {
					font-size: 26px;
					color: #7BAF90;
				}

				.space-btn {
					display: flex;
					justify-content: center;
					align-items: center;
					width: 100%;
					height: 20px;
					font-size: 12px;
					cursor: pointer;
					color: #fff;
					background-color: #C27777;
					border-radius: 14px;
				}
			}
		}
	}

	.add-btn {
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
		background-color: #6AA883;
		box-shadow: 0 4px 5px rgba(0, 0, 0, 0.19);
		cursor: pointer;
		color: #fff;
	}
</style>
