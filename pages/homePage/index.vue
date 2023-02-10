<template>
		<MenuLayout>
			<div v-if="list.length <= 0" class="empty-style">暂无内容</div>
			<div v-else>
				
			</div>
			<div class="add-btn" @tap="addNewRipple">新建涟漪</div>
		</MenuLayout>
</template>

<script>
	import MenuLayout from '../../components/MenuLayout/index.vue' 
	export default {
		data() {
			return {
				list: this.$store.state.rippleList
			}
		},
		created() {
			console.log(this.$store);
		},
		components: {
			MenuLayout
		},
		methods: {
			addNewRipple() {
				console.log(123456);
				uni.navigateTo({
					url: '/pages/newRipple/index'
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