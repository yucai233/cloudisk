<script setup>
import { defineProps } from 'vue';
const props = defineProps(['dir', 'path', 'idx'])
const emit = defineEmits(['checkout'])

function checkout() {
    emit('checkout', {
        path: props.path,
        idx: props.idx
    })
}

</script>


<template>
    <i>
        <span class="cursor-default"> > </span>
        <span @click="checkout" 
        class="text-gray-500 hover:bg-gray-300 cursor-pointer">{{dir}}</span>
    </i>
</template>