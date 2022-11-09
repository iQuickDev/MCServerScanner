<script setup>
import copy from '../assets/copy.png'
const props = defineProps({
  address: String,
  port: Number,
  icon: String,
  ping: Number,
  motd: String,
  version: String,
  protocol: Number,
  maxPlayers: Number,
  onlinePlayers: Number,
  list: Array
})

function copyTuple(event, address, port)
{
  window.navigator.clipboard.writeText(`${address}:${port}`)
  let description = event.currentTarget.querySelector('span')
  description.textContent = "COPIED!"
  setTimeout(() => description.textContent = "Copy IP:PORT", 500)
}

</script>

<template>
  <div class="serverpanel-wrapper">
    <div class="info-wrapper">
      <span class="subtext">MOTD: </span>
      <h3 class="motd">{{ props.motd.clean.substring(0, 100) }}</h3>
    </div>
    <div class="rows">
      <img :src="props.icon" width="80" height="80">
      <div class="row firstrow">
        <span class="subtext">Ping: </span>
        <h4>{{ props.ping }}ms</h4>
        <br>
        <span class="subtext">Version: </span>
        <h4>{{ props.version }} ({{ props.protocol }})</h4>
        <br>
        <span class="subtext">Address: </span>
        <h4>{{ props.address }}</h4>
        <br>
        <span class="subtext">Port: </span>
        <h4>{{ props.port }}</h4>
        <br>
      </div>
      <div class="row secondrow">
        <span class="subtext">Players: </span>
        <h4>{{ props.onlinePlayers }} / {{ props.maxPlayers }}</h4>
        <br>
        <span class="subtext">List: </span>
        <h4 v-for="player in props.list"> {{player.name}}&nbsp; </h4>
      </div>
      <div class="copy-section" @click="copyTuple($event, props.address, props.port)">
        <img :src="copy" class="copy" width="50" height="50">
        <span class="description">Copy IP:PORT</span>
      </div>
    </div>
  </div>
</template>

<style scoped>
h3,
h4 {
  display: inline-block;
}

.serverpanel-wrapper {
  width: 95%;
  height: 130px;
  border-radius: 10px;
  background: #000;
  color: #FFF;
  padding: 5px;
  display: flex;
  flex-flow: column;
  margin: 10px auto 10px auto
}

.info-wrapper
{
  margin-bottom: 5px;
}

.row {
  width: 50%;
}

.rows {
  display: flex;
  flex-direction: row;
  justify-content: space-evenly;
}

.subtext {
  font-weight: 400;
}

img {
  display: inline-block;
  border-radius: 5px;
  margin: auto;
  margin-right: 15px;
  margin-left: 5px;
  image-rendering: optimizeQuality;
}

.copy {
  margin: auto;
  filter: invert(1);
}

.copy-section {
  cursor: pointer;
  display: flex;
  flex-direction: column;
  text-align: center;
  font-size: .8rem;
}
</style>
