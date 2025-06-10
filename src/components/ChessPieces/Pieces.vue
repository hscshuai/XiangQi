<template>
  <div class="pieces" :style="{color: color}">
    {{ pieces.name }}
  </div>
</template>

<script setup>
import { ref } from 'vue'

const props = defineProps({
  pieces: Object,
})

let color = ref("red")
if( props.pieces.chess.side === 1){
  color = ref("black")
}

</script>