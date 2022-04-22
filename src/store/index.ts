import { defineStore } from 'pinia'

interface IUserInfoProps {
  name: string
  avatar: string
  mobile: number
  auths: string[]
  age: number
}

export const userStore = defineStore({
  id: 'user',
  state: (): IUserInfoProps => ({
    name: 'zhangsan',
    avatar: 'https://www.baidu.com/images/head.png',
    mobile: 18113391106,
    auths: ['Tim Walker'],
    age: 20,
  }),
  /**
   * 类似于vue2中的computed 有缓存
   */
  getters: {
    ageAdd(state) {
      return state.age + 10
    },
  },
  /**
   * 类似于vue中的methods
   */
  actions: {
    changeState() {
      // 方式一：通过this获取当前容器对象 方法中可添加自定义参数
      // this.name = '赵六'
      // this.avatar = 'https://www.baidu.com/images/head.png'
      // this.mobile = 15646626266
      // this.auths = ['mike', 'rose']

      // 方式二：通过 $patch 函数
      this.$patch((state) => {
        state.name = '赵六'
        state.avatar = 'https://www.baidu.com/images/head.png'
        state.mobile = 15646626266
        state.auths = ['mike', 'rose']
      })
    },
  },
})
