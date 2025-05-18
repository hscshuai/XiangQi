<template>
  <Pieces :pieces="config"></Pieces>
</template>

<script setup>
import { ref } from 'vue'
import Pieces from '../Pieces.vue';

const props = defineProps({
  pieces: Object,
})

let name = ref("帅")
if( props.pieces.side === 0){
  name.value = "将"
}

const config = {
  name,
  ...props.pieces
}


</script>