<template>
  <Pieces :pieces="config"></Pieces>
</template>

<script setup>
import { ref } from 'vue'
import Pieces from '../Pieces.vue';

const props = defineProps({
  pieces: Object,
})

let name = ref("相")
if( props.pieces.chess.side === 1){
  name.value = "象"
}

const config = {
  name,
  ...props.pieces
}


</script>