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
