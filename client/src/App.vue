<script setup>
import ServerPanel from './components/ServerPanel.vue'
import ScanPanel from './components/ScanPanel.vue'
import { useStore } from './store/store.js'

const store = useStore()
</script>

<template>
  <div class="wrapper">
    <ScanPanel />
    <div class="server-container">
      <TransitionGroup name="bounce" tag="ServerPanel">
        <ServerPanel v-for="item in store.servers" :key="item.ip" :motd="item.info.motd" :address="item.ip" :port="item.port"
          :ping="item.info.roundTripLatency" :version="item.info.version.name" :protocol="item.info.version.protocol"
          :online-players="item.info.players.online" :max-players="item.info.players.max" :icon="item.info.favicon"
          :list="item.info.players.sample" />
      </TransitionGroup>
    </div>
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

.wrapper {
  display: flex;
  flex-direction: row;
}

.server-container {
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

.bounce-enter-active {
  animation: bounce-in 0.5s;
}

.bounce-leave-active {
  animation: bounce-in 0.5s reverse;
}

@keyframes bounce-in {
  0% {
    transform: scale(0);
  }

  50% {
    transform: scale(1.1);
  }

  100% {
    transform: scale(1);
  }
}
</style>
