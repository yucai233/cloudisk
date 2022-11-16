<script setup>
const props = defineProps(['title'])
</script>

<template>
    <div class="w-full h-16 hover:bg-gray-200 flex-shrink-0 flex items-center transition font-semibold text-lg cursor-pointer">
        <slot></slot>
        
        <span class="ml-4">{{title}}</span>
    </div>
</template>