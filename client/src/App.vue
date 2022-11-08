<script setup>
import ServerPanel from './components/ServerPanel.vue'
import ScanPanel from './components/ScanPanel.vue'
import SearchPanel from './components/SearchPanel.vue'
import {useStore} from './store/store.js'
import API from './services/api.js'
const api = new API()

const store = useStore()
console.log(store.all)
</script>

<template>
  <div class="wrapper">
    <ScanPanel/>
    <div class="server-container">
       <!-- <ServerPanel v-for="item in store.all" :motd="item.motd" :address="item.address" :port="item.port" :ping="item.ping" :version="item.version"
        :protocol="item.protocol" :online-players="item.onlinePlayers" :max-players="item.maxPlayers" :list="item.list"
        :icon="item.icon" /> -->
    </div>
    <SearchPanel/>
  </div>
</template>

<style>
@import 'https://fonts.googleapis.com/css2?family=Roboto+Mono:ital,wght@0,100;0,200;0,300;0,400;0,500;0,600;0,700;1,100;1,200;1,300;1,400;1,500;1,600;1,700&display=swap';

* {
  font-family: 'Roboto Mono', monospace;
}

body {
  background: #303030;
  margin: 0;
  padding: 0;
  overflow: hidden;
  color: #FFF;
}

.wrapper
{
  display: flex;
  flex-direction: row;
}

.server-container
{
  margin: auto;
  background: #202020;
  padding: 10px;
  height: 95vh;
  width: 50%;
  border-radius: 10px;
  overflow: auto;
}

h1,
h2,
h3,
h4,
h5,
h6 {
  padding: 0;
  margin: 0;
}
</style>
