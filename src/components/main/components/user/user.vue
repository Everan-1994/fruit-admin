<template>
    <div class="user-avator-dropdown">
        <Dropdown @on-click="handleClick">
            <Badge :dot="!!messageUnreadCount">
                <Avatar :src="userAvator"/>
            </Badge>
            <Icon :size="18" type="md-arrow-dropdown"></Icon>
            <DropdownMenu slot="list">
                <DropdownItem name="message">
                    <Icon type="ios-ionitron-outline"/>
                    消息中心
                    <Badge style="margin-left: 10px" :count="messageUnreadCount"></Badge>
                </DropdownItem>
                <DropdownItem name="logout">
                    <Icon type="md-log-out" />
                    退出登录
                </DropdownItem>
            </DropdownMenu>
        </Dropdown>
        <Modal v-model="logoutm" width="360">
            <p slot="header" style="color:#f60;text-align:center">
                <Icon type="ios-information-circle"></Icon>
                <span>温馨提示</span>
            </p>
            <div style="text-align:center">
                <h3>确定要退出系统吗？</h3>
            </div>
            <div slot="footer">
                <Button type="error" size="large" long :loading="loading" @click="logout">确定退出</Button>
            </div>
        </Modal>
    </div>
</template>

<script>
    import './user.less'
    import {mapActions} from 'vuex'

    export default {
        name: 'User',
        data() {
            return {
                logoutm: false,
                loading: false
            }
        },
        props: {
            userAvator: {
                type: String,
                default: ''
            },
            messageUnreadCount: {
                type: Number,
                default: 0
            }
        },
        methods: {
            ...mapActions([
                'handleLogOut'
            ]),
            logout() {
                this.loading = true;
                this.handleLogOut().then(() => {
                    setTimeout(() => {
                        this.logoutm = false;
                        this.loading = false;
                        this.$router.push({
                            name: 'login'
                        })
                    }, 1500);
                }).catch(() => {
                    setTimeout(() => {
                        this.logoutm = false;
                        this.loading = false;
                        this.$router.push({
                            name: 'login'
                        })
                    }, 1500);
                })
            },
            message() {
                this.$router.push({
                    name: 'message_page'
                })
            },
            handleClick(name) {
                switch (name) {
                    case 'logout':
                        this.logoutm = true;
                        break
                    case 'message':
                        this.message()
                        break
                }
            }
        }
    }
</script>
