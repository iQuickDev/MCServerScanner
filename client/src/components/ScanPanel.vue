<script setup>
import { useStore } from '../store/store.js'
import CircleProgress from "vue3-circle-progress"
import {ref} from 'vue'

const props = defineProps({
  network: String,
  firstPort: Number,
  lastPort: Number,
  delay: Number
})

const store = useStore()
const isScanning = ref(false)
const scanProgress = ref(0)
store.API.socket.on('progress', (progress) =>
{
  scanProgress.value = progress
  if (progress == 100)
  stop()
})

function scan(network, range, delay, $event)
{
  let networkTuple = network.split('/')
  store.API.scan(networkTuple[0], networkTuple[1], range, delay)
  isScanning.value = true
  clearFields($event.target)
}

function stop()
{
  store.API.stop()
  isScanning.value = false
}

function clearFields(form)
{
  form.reset()
}
</script>

<template>
  <div class="serverscanner-wrapper">
    <div class="panel">
      <h1 class="title">Scanner</h1>
      <form @submit.prevent="scan(network, [firstPort, lastPort], delay, $event)">
      <label for="ip">IP Address / Netmask</label>
      <br>
      <input v-model="network" name="ip" type="text" maxlength="20" placeholder="e.g. 192.168.1.0/24" required>
      <br>
      <label for="ip">Port Range</label>
      <br>
      <input v-model="firstPort" name="range" type="number" max="65535" min="1" placeholder="e.g. 20000" required>
      -
      <input v-model="lastPort" name="range" type="number" max="65535" min="1" placeholder="e.g. 25565" required>
      <br>
      <label for="ip">Delay (recommended: 5)</label>
      <br>
      <input v-model="delay" name="delay" type="number" max="60" min="0" placeholder="e.g. 5" required>
      <br>
      <button class="scan-button" v-show="!isScanning">SCAN</button>
    </form>
    <form @submit.prevent="stop()">
      <button class="stop-button" v-show="isScanning">STOP</button>
    </form>
    <div class="progressbar">
    <circle-progress
    :percent="scanProgress"
    empty-color="#000"
    :border-width="10"
    :transition="100"
    :border-bg-width="15"
    fill-color="#a000ff"/>
  </div>
    </div>
  </div>
</template>

<style scoped>
.serverscanner-wrapper {
  position: relative;
  height: 100vh;
  width: max-content;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-left: 15px;
}

.panel {
  margin: auto;
  background: #000;
  width: max-content;
  height: 90%;
  border-radius: 20px;
  padding: 15px;
}

input {
  border-radius: 5px;
  border: none;
  padding: 5px;
  margin-top: 5px;
  margin-bottom: 5px;
  outline: none;
}

.progressbar
{
  position: absolute;
  top: calc(50% - 15px);
  transform: translateX(50%);
  right: 50%;
  pointer-events: none;
  z-index: 0;
}

button
{
  position: absolute;
  top: 50%;
  transform: translateX(50%);
  right: 50%;
  border-radius: 50%;
  width: 150px;
  height: 150px;
  border: none;
  font-weight: bolder;
  font-size: 2.2rem;
  z-index: 1;
  transition: .5s;
}

button:hover
{
  transition: .5s;
  transform: translateX(50%) scale(1.1) rotate(15deg);
}

.scan-button
{
  background: #00ff78;
}

.stop-button
{
  background: #ff003f;
}

form
{
  margin: 15px;
}

input[name="range"]
{
  width: 100px;
}

.title
{
  text-align: center;
}
</style>
