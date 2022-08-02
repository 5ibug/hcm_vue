import {defineStore, StoreDefinition} from "pinia"
import {userInfo} from "../type/index/userInfo";
import {getUserInfo} from "../api/user";

export const userStore: StoreDefinition = defineStore('userInfo', {
    state: (): userInfo => {
        return {
            id: 0,
            hcmPhone: 0,
            name: '',
            cookie: '',
            autoUp: true,
            autoDown: true,
            createTime: '',
            updateTime: ''
        }
    },
    getters: {
    },
    actions: {
        saveCache(): void {
            localStorage.setItem("localUserInfo",JSON.stringify(this.$state))
        },
        // 根据user获取平台信息
        async getUser(): Promise<void> {
            // 先判断浏览器缓存是否有, 有的话先取浏览器缓存的再异步进行网络请求更新,防止页面展示空白信息
            const localUserInfo = localStorage.getItem("localUserInfo")
            if (localUserInfo) {
                try {
                    const localRes = JSON.parse(localUserInfo)
                    this.id = localRes.id
                    this.hcmPhone = localRes.hcmPhone
                    this.name = localRes.name
                    this.cookie = localRes.cookie
                    this.autoUp = localRes.autoUp
                    this.autoDown = localRes.autoDown
                    this.createTime = localRes.createTime
                    this.updateTime = localRes.updateTime
                } catch (e) {
                    console.error("浏览器缓存恢复出错", e)
                }
            }
            const res = await getUserInfo()
            // 更新浏览器缓存
            localStorage.setItem("localUserInfo", JSON.stringify(res))
            this.id = res.id
            this.hcmPhone = res.hcmPhone
            this.name = res.name
            this.cookie = res.cookie
            this.autoUp = res.autoUp
            this.autoDown = res.autoDown
            this.createTime = res.createTime
            this.updateTime = res.updateTime
        },

        logout() {
            this.$reset()
            localStorage.removeItem('token')
            history.go(0)
        }
    }
})
