<template>
  <div id="app">
    <img alt="Vue logo" src="./assets/logo.png">
    
    <div @click="requestTo"
         class="go"
    >
      Go ahead!!!
    </div>
    <div>dd = {{dd}}</div>
  
  </div>
</template>

<script>
import axios from 'axios'

export default {
  data: () => ({
    dd: 'Привет!'
  }),
  methods: {
    requestTo() {
      console.log('requestTo')
      axios('/api/testwithcurrentuser')  //начало пути у URL- ОТСУТСТВУЕТ (!) См. #20.
      .then(response => {
        console.log('response.data', response.data)
        this.dd = response.data
      })
    }
  }
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}

.go {
  color: green;
  font-size: 20px;
  cursor: pointer;
}
</style>
