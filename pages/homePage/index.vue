<template>
		<MenuLayout>
			<div class="add-btn">新建涟漪</div>
		</MenuLayout>
</template>

<script>
	import MenuLayout from '../../components/MenuLayout/index.vue' 
	export default {
		data() {
			return {
				
			}
		},
		components: {
			MenuLayout
		}
	}
</script>

<style lang="less" scoped>
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