<script setup>
import SelectorVue from './SIdeComponents/Selector.vue';
</script>

<template>
  <div class="flex flex-col flex-shrink-0 w-2/12 h-full text-gray-600">
    <SelectorVue title="我的文件"><i class="iconfont text-3xl ml-3">&#xe85f;</i></SelectorVue>
    <SelectorVue title="新建文件夹"><i class="iconfont text-3xl ml-3">&#xe85e;</i></SelectorVue>
    <SelectorVue title="个人中心"><i class="iconfont text-3xl ml-3">&#xe670;</i></SelectorVue>
    <SelectorVue title="登出"><i class="iconfont text-3xl ml-3">&#xe602;</i></SelectorVue>
  </div>
</template>