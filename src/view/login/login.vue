<style lang="less">
    @import './login.less';
</style>

<template>
    <div class="login">
        <div class="login-con">
            <Card icon="log-in" title="欢迎登录" :bordered="false">
                <div class="form-con">
                    <login-form @on-success-valid="handleSubmit" :load="loading"></login-form>
                    <p class="login-tip">欢迎使用 -- 水果助手</p>
                </div>
            </Card>
        </div>
    </div>
</template>

<script>
    import LoginForm from '_c/login-form'
    import {mapActions} from 'vuex'

    export default {
        components: {
            LoginForm
        },
        data() {
          return {
              loading: false
          }
        },
        methods: {
            ...mapActions([
                'handleLogin'
            ]),
            handleSubmit({userName, password}) {
                const _this = this;

                _this.$Message.loading({
                    content: '登录中...',
                    duration: 60,
                })

                _this.handleLogin({userName, password}).then(res => {
                    setTimeout(() => {
                        _this.loading = false
                        _this.$Message.destroy()
                        _this.$router.push({
                            name: this.$config.homeName
                        })
                    }, 1000)
                }).catch(err => {
                    setTimeout(() => {
                        _this.loading = false
                        _this.$Message.destroy()
                        _this.$Message.error(err.response.data.message)
                    }, 1000)
                })
            }

        }
    }
</script>
<!--this.$router.push({-->
<!--name: this.$config.homeName-->
<!--})-->
<style>

</style>
