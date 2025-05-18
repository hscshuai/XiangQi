<template>
  <Pieces :pieces="config"></Pieces>
</template>

<script setup>
import { ref } from 'vue'
import Pieces from '../Pieces.vue';

const props = defineProps({
  pieces: Object,
})

let name = ref("士")
if( props.pieces.side === 0){
  name.value = "仕"
}

const config = {
  name,
  ...props.pieces
}


</script>