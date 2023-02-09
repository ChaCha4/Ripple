<template>
	<div class="content">
		<div class="main-contain" :style="{height: `calc(100vh - ${getNavH}px)`}">
			<slot></slot>
		</div>
		<div class="tab-contain" :style="{ height: `${getNavH}px` }">
			<span class="tab-item">
				<i class="iconfont icon-liebiaomoshi" />
				<span class="text">列表</span>
			</span>
			<span class="tab-item" @tap="handleMySpace">
				<i class="iconfont icon-wode" />
				<span class="text">我的</span>
			</span>
		</div>
	</div>
</template>

<script>
	export default {
		data() {
			return {
			}
		},
		computed: {
			//  底部导航栏的高度
			getNavH: () => {
				let navH;
				uni.getSystemInfo({
					success(info) {
						const {
							windowHeight,
							screenHeight,
							uniPlatform
						} = info
						console.log(uniPlatform, 'info');
						if (uniPlatform === 'web') {
							navH = screenHeight - windowHeight + 55
							console.log(screenHeight - windowHeight, 'navH');
						} else {
							navH = screenHeight - windowHeight
						}
					}
				})
				return navH
			}
		},
		mounted() {},
		methods: {
			handleMySpace() {
				uni.getUserProfile({
					desc: '获取你的昵称，头像，地区及性比',
					success: res => {
						console.log('所有', res);
						uni.login({
							provider: 'weixin',
							success: function(loginRes) {
								const {
									avatarUrl,
									gender,
									nickName
								} = res.userInfo
								console.log('loginRes.authResult', loginRes);
								// 在这个地方普通开发中就应该去调用后端给的api进行登录操作了
								// 现在这个地方我们需要换成云函数进行相关操作
								uniCloud.callFunction({
									name: 'user',
									data: {
										code: loginRes.code,
										avatarUrl,
										gender,
										nickName
									}
								}).then(result => {
									console.log(result, 'result')
								})
							}
						});
					},
					fail() {

					}
				})
			}
		}
	}
</script>

<style lang="scss" scoped>
	.content {
		width: 100%;
		

		.main-contain {
			background-color: #F7F8F3;
		}

		.tab-contain {
			display: flex;
			justify-content: space-around;
			padding: 10px 0;

			.tab-item {
				display: flex;
				flex-direction: column;
				align-items: center;

				.iconfont {
					font-size: 24px;
				}

				.text {
					font-size: 14px;
				}
			}
		}
	}
</style>
