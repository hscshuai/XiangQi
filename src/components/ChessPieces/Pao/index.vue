<template>
  <Pieces :side="config"></Pieces>
</template>

<script setup>
import { ref } from 'vue'
import Pieces from '../Pieces.vue';

const props = defineProps({
  side: Object,
})

let name = ref("炮")

const config = {
  name,
  ...props.side
}


</script>