<script setup>
function scan()
{
  alert('scanning')
}
</script>

<template>
  <div class="serverscanner-wrapper">
    <div class="panel">
      <h1 class="title">Scanner</h1>
      <form @submit.prevent="scan">
      <label for="ip">IP Address / Netmask</label>
      <br>
      <input name="ip" type="text" maxlength="16" placeholder="e.g. 192.168.1.0/24">
      <br>
      <label for="ip">Port Range</label>
      <br>
      <input name="range" type="number" max="65535" min="1" placeholder="e.g. 20000">
      -
      <input name="range" type="number" max="65535" min="1" placeholder="e.g. 25565">
      <br>
      <label for="ip">Delay (recommended: 5)</label>
      <input name="delay" type="number" max="60" min="0" placeholder="e.g. 5">
      <br>
      <button class="scan-button">SCAN</button>
    </form>
    </div>
  </div>
</template>

<style scoped>
.serverscanner-wrapper {
  height: 100vh;
  width: 20%;
  display: flex;
  justify-content: center;
  align-items: center;
}

.panel {
  margin: auto;
  background: #000;
  width: 90%;
  height: 90%;
  border-radius: 20px;
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
  margin-top: 15px;
  text-align: center;
}
</style>
