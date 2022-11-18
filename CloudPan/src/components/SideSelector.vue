<script setup>
import SelectorVue from './SIdeComponents/Selector.vue';
import { useRouter } from 'vue-router';

const router = useRouter()

function loginDown() {
  if(confirm('确定要退出吗?')) {
    router.push('/')
  }
}


</script>

<template>
  <div class="flex flex-col flex-shrink-0 w-2/12 h-full text-gray-600">
    
    <RouterLink :to="{path: '/home'}">
      <SelectorVue title="我的文件"><i class="iconfont text-3xl ml-3">&#xe85f;</i></SelectorVue>
    </RouterLink>
    <SelectorVue title="新建文件夹" @click="newFolder"><i class="iconfont text-3xl ml-3">&#xe85e;</i></SelectorVue>
    <SelectorVue title="个人中心"><i class="iconfont text-3xl ml-3">&#xe670;</i></SelectorVue>
    <SelectorVue title="登出" @click="loginDown"><i class="iconfont text-3xl ml-3">&#xe602;</i></SelectorVue>
  </div>
</template>