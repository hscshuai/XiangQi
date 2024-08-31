<template>
  <Pieces :side="config"></Pieces>
</template>

<script setup>
import { ref } from 'vue'
import Pieces from '../Pieces.vue';

const props = defineProps({
  side: Object,
})

let name = ref("兵")
if( props.side.type === 0){
  name.value = "卒"
}

const config = {
  name,
  ...props.side
}


</script>