<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue'
import { generate2DArray, Struct } from 'utils'
import { INTERVAL } from '../common'
import Square from './Square.vue'

const size = ref(50)
const data = ref<Struct[][]>(generate2DArray(size.value))
const timerId = ref<number>(null!)
const inputValue = ref<string>('')

onMounted(() => {
  setInterval(() => {
    data.value.forEach((o) => {
      o.forEach(o => {
        o.count = (Math.random() * 100).toFixed()
      })
    })
  }, INTERVAL);
})

onUnmounted(() => {
  clearInterval(timerId.value)
})

</script>

<template>
  <div>当前数量：{{ size }} * {{ size }} = {{ size * size }}</div>
  <label for="size">使用输入框检测用户输入卡顿情况 </label>
  <input id="size" v-model="size"/>
  <div>当前interval间隔：{{ INTERVAL }}</div>
  <label for="input">使用输入框检测用户输入卡顿情况 </label>
  <input id="input" v-model="inputValue"/>

  <div>
    <template v-for="(items) in data">
      <template v-for="(item) in items">
        <Square :value="item"/>
      </template>
    </template>
  </div>
</template>
