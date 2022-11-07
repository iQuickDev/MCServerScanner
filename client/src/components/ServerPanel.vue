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
</script>

<template>
  <div class="serverpanel-wrapper">
    <img :src="props.icon" width="80" height="80">
    <div class="row firstrow">
      <span class="subtext">MOTD: </span>
      <h3>{{ props.motd }}</h3>
      <br>
      <span class="subtext">Address: </span>
      <h4>{{ props.address }}</h4>
      <br>
      <span class="subtext">Port: </span>
      <h4>{{ props.port }}</h4>
      <br>
    </div>
    <div class="row secondrow">
      <span class="subtext">Ping: </span>
      <h4>{{ props.ping }}ms</h4>
      <br>
      <span class="subtext">Version: </span>
      <h4>{{ props.version }} ({{ props.protocol }})</h4>
      <br>
      <span class="subtext">Players: </span>
      <h4>{{ props.onlinePlayers }} / {{ props.maxPlayers }}</h4>
      <br>
      <span class="subtext">List: </span>
      <h4>{{ props.list.toString().replaceAll(',', ' ') }}</h4>
    </div>
    <div class="copy-section">
      <img :src="copy" class="copy" width="50" height="50">
      <span>Copy IP:PORT</span>
    </div>
  </div>
</template>

<style scoped>
h3,
h4 {
  display: inline-block;
}

.serverpanel-wrapper {
  border-radius: 10px;
  background: #000;
  color: #FFF;
  padding: 5px;
  display: flex;
  flex-flow: row;
  width: max-content;
}

.row {
  margin-right: 20px;
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
}

.copy {
  margin: auto;
  filter: invert(1);
}

.copy-section
{
  display: flex;
  flex-direction: column;
  text-align: center;
  font-size: .8rem;
}
</style>
