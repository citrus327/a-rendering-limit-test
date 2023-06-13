<script setup lang="ts">
import { Struct } from 'utils';
const props = defineProps<{ value: Struct }>()
const {
  value,
} = props 
</script>

<template>
  <div class="square">
    {{value.count}}
  </div>
</template>

<style scoped>
.square {
  display: inline-flex;
  width: 40px;
  height: 40px;
  background: gray;
  align-items: center;
  justify-content: center;
  color: white;
}
</style>