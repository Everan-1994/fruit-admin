import {
    login,
    logout,
    getMessage,
    getContentByMsgId,
    hasRead,
    removeReaded,
    restoreTrash
} from '@/api/user'
import {setToken, delToken, setLocalStorage, delLocalStorage} from '@/libs/util'

export default {
    state: {
        userName: '',
        userId: '',
        avatarImgPath: '',
        token: '',
        access: '',
        hasGetInfo: false,
        messageUnreadList: [],
        messageReadedList: [],
        messageTrashList: [],
        messageContentStore: {}
    },
    mutations: {
        setAvatar(state, avatarPath) {
            state.avatarImgPath = avatarPath;
            setLocalStorage('avatar', avatarPath);
        },
        setUserId(state, id) {
            state.userId = id;
            setLocalStorage('id', id);
        },
        setUserName(state, name) {
            state.userName = name;
            setLocalStorage('name', name);
        },
        setAccess(state, access) {
            state.access = access;
            setLocalStorage('access', access);
        },
        setToken(state, token) {
            state.token = token
            setToken(token)
        },
        setHasGetInfo(state, status) {
            state.hasGetInfo = status
        },
        setMessageUnreadList(state, list) {
            state.messageUnreadList = list
        },
        setMessageReadedList(state, list) {
            state.messageReadedList = list
        },
        setMessageTrashList(state, list) {
            state.messageTrashList = list
        },
        updateMessageContentStore(state, {msg_id, content}) {
            state.messageContentStore[msg_id] = content
        },
        moveMsg(state, {from, to, msg_id}) {
            const index = state[from].findIndex(_ => _.msg_id === msg_id)
            const msgItem = state[from].splice(index, 1)[0]
            msgItem.loading = false
            state[to].unshift(msgItem)
        }
    },
    getters: {
        messageUnreadCount: state => state.messageUnreadList.length,
        messageReadedCount: state => state.messageReadedList.length,
        messageTrashCount: state => state.messageTrashList.length
    },
    actions: {
        // 登录
        handleLogin({commit}, {userName, password}) {
            userName = userName.trim()
            return new Promise((resolve, reject) => {
                login({
                    userName,
                    password
                }).then(res => {
                    const data = res.data.data
                    commit('setToken', `${data.meta.tokenType} ${data.meta.accessToken}`);
                    commit('setAvatar', data.data.avatar || 'https://file.iviewui.com/dist/a0e88e83800f138b94d2414621bd9704.png');
                    commit('setUserName', data.data.remark || data.data.name);
                    commit('setUserId', data.data.id);
                    commit('setAccess', data.data.identify);
                    commit('setHasGetInfo', true);

                    resolve()
                }).catch(err => {
                    reject(err)
                })
            })
        },
        // 退出登录
        handleLogOut({state, commit}) {
            return new Promise((resolve, reject) => {
                logout().then(() => {
                    commit('setToken', '');
                    commit('setAccess', '');
                    commit('setAvatar', '');
                    commit('setUserName', '');
                    commit('setUserId', 0);
                    commit('setHasGetInfo', false);

                    delLocalStorage('id');
                    delLocalStorage('name');
                    delLocalStorage('avatar');
                    delLocalStorage('access');
                    delToken();

                    resolve()
                }).catch(err => {
                    commit('setToken', '');
                    commit('setAccess', '');
                    commit('setAvatar', '');
                    commit('setUserName', '');
                    commit('setUserId', 0);
                    commit('setHasGetInfo', false);

                    delLocalStorage('id');
                    delLocalStorage('name');
                    delLocalStorage('avatar');
                    delLocalStorage('access');
                    delToken();

                    reject(err)
                })
            })
        },
        // 获取消息列表，其中包含未读、已读、回收站三个列表
        getMessageList({state, commit}) {
            return new Promise((resolve, reject) => {
                getMessage().then(res => {
                    const {unread, readed, trash} = res.data
                    commit('setMessageUnreadList', unread.sort((a, b) => new Date(b.create_time) - new Date(a.create_time)))
                    commit('setMessageReadedList', readed.map(_ => {
                        _.loading = false
                        return _
                    }).sort((a, b) => new Date(b.create_time) - new Date(a.create_time)))
                    commit('setMessageTrashList', trash.map(_ => {
                        _.loading = false
                        return _
                    }).sort((a, b) => new Date(b.create_time) - new Date(a.create_time)))
                    resolve()
                }).catch(error => {
                    reject(error)
                })
            })
        },
        // 根据当前点击的消息的id获取内容
        getContentByMsgId({state, commit}, {msg_id}) {
            return new Promise((resolve, reject) => {
                let contentItem = state.messageContentStore[msg_id]
                if (contentItem) {
                    resolve(contentItem)
                } else {
                    getContentByMsgId(msg_id).then(res => {
                        const content = res.data
                        commit('updateMessageContentStore', {msg_id, content})
                        resolve(content)
                    })
                }
            })
        },
        // 把一个未读消息标记为已读
        hasRead({commit}, {msg_id}) {
            return new Promise((resolve, reject) => {
                hasRead(msg_id).then(() => {
                    commit('moveMsg', {
                        from: 'messageUnreadList',
                        to: 'messageReadedList',
                        msg_id
                    })
                    resolve()
                }).catch(error => {
                    reject(error)
                })
            })
        },
        // 删除一个已读消息到回收站
        removeReaded({commit}, {msg_id}) {
            return new Promise((resolve, reject) => {
                removeReaded(msg_id).then(() => {
                    commit('moveMsg', {
                        from: 'messageReadedList',
                        to: 'messageTrashList',
                        msg_id
                    })
                    resolve()
                }).catch(error => {
                    reject(error)
                })
            })
        },
        // 还原一个已删除消息到已读消息
        restoreTrash({commit}, {msg_id}) {
            return new Promise((resolve, reject) => {
                restoreTrash(msg_id).then(() => {
                    commit('moveMsg', {
                        from: 'messageTrashList',
                        to: 'messageReadedList',
                        msg_id
                    })
                    resolve()
                }).catch(error => {
                    reject(error)
                })
            })
        }
    }
}
