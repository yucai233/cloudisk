<script setup>
import FileVue from './File.vue';
</script>


<template>
    <div class="w-10/12 text-gray-500 font-normal pl-5 mr-8">
        <div class="w-full h-9 border-b border-gray-300 border-solid flex-shrink-0 mb-5">

        </div>
        <div class="flex flex-col pl-5 mb-3">
            <div class="flex">
                <span class="flex-auto">名称</span>
                <span class="flex-1">大小</span>
                <span class="flex-1">最后修改</span>
            </div>
        </div>
        <FileVue></FileVue>
        <FileVue></FileVue>
        <FileVue></FileVue>
    </div>
</template>
