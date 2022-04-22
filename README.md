#### pinia

> 安装

```shell
yarn add pinia
# or with npm
npm install pinia
```

> 挂载到 Vue

```typescript
import { createApp } from 'vue'
import App from './App.vue'
//引入 createPinia并挂载createPinia()执行返回值到Vue实例
import { createPinia } from 'pinia'
const app = createApp(App)
app.use(createPinia())
app.mount('#app')
```

> 新建index.ts文件

```typescript
//TS 
import { defineStore } from 'pinia'

interface UserInfo {
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
    mobile: 11111111111,
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

```

> 在vue文件中使用

```vue
<template>
  <ul>
    <p>第一种写法</p>
    <li>{{ userInfo.name }}</li>
    <li>{{ userInfo.avatar }}</li>
    <li>{{ userInfo.mobile }}</li>
    <li>{{ userInfo.auths }}</li>
  </ul>
  <ul>
    <p>解构写法用storeToRefs()</p>
    <li>{{ name }}</li>
    <li>{{ avatar }}</li>
    <li>{{ mobile }}</li>
    <li>{{ auths }}</li>
  </ul>

  <ul>
    <li>{{ age }}</li>
    <li>{{ ageAdd }}</li>
  </ul>
  <button @click="handleClick">修改</button>
</template>
<script setup lang="ts">
import { ref } from "vue";
import { userStore } from "../store/index";
import { storeToRefs } from "pinia";
const userInfo = userStore();
//解构写法用storeToRefs包裹防止数据的响应式失效
const { name, avatar, mobile, auths, age, ageAdd } = storeToRefs(userInfo);

//方式一：修改单条数据
// const handleClick = () => {
//   userInfo.name = "李四";
// };

//方式二：修改多条数据使用 $patch
// const handleClick = () => {
//   userInfo.$patch({
//     name: (userInfo.name = "李四"),
//     avatar: (userInfo.avatar = "https://bing.com/images/avatar.png"),
//     mobile: (userInfo.mobile = 110),
//     auths: [...userInfo.auths, "masterman"],
//   });
// };

//方式三：修改多条数据 $patch函数
// const handleClick = () => {
//   userInfo.$patch((state) => {
//     state.name = "王五";
//     state.avatar = "https://bing.com/images/avatar.png";
//     state.mobile = 119;
//     state.auths.push("jisoo");
//   });
// };

//方式四：修改多条数据 通过调用actions中的方法
const handleClick = () => {
  userInfo.changeState();
};
</script>

<style scoped>
ul {
  background-color: rgb(233, 146, 146);
}
</style>
```