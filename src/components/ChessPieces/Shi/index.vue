<template>
  <Pieces :side="config"></Pieces>
</template>

<script setup>
import { ref } from 'vue'
import Pieces from '../Pieces.vue';

const props = defineProps({
  side: Object,
})

let name = ref("士")
if( props.side.type === 0){
  name.value = "仕"
}

const config = {
  name,
  ...props.side
}


</script>