<template>
  <div class="hello">
    <h1>{{ msg }}</h1>
    <p>
      ShakeIT is a simple and fun Internet of Things game, used for the development of an IoT showcase in purpose of a thesis.
    </p>
    <p>
    So now register to the next session and create your username. After pressing the button "Go for IT" shake your device for 10 seconds.
    </p>
    <div id="StartButton">
      <button @click="startDataTransfer">Go for IT</button>
      <div class="xValue">
        <p>shakedX {{xValue}}</p>
          <p>shakedY</p>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'HelloWorld',
  props: {
    msg: String,
  },
  data: function() {
    return {xValue: "to shake"};
  },
  methods: {
    startDataTransfer() {
      this.xValue = ""+window.DeviceMotionEvent;
      onClick();
      //window.addEventListener('devicemotion',motion,true)
       /* document.addEventListener('DOMContentLoaded', init, true);
        function init() {
            Window.console.log('Engage');
            window.addEventListener('devicemotion', motion, true);
        }*/
      //TODO DeviceMotionEvent

    }
  }
}

function onClick() {
    // feature detect
    if (typeof DeviceMotionEvent.requestPermission === 'function') {
        DeviceMotionEvent.requestPermission()
            .then(permissionState => {
                if (permissionState === 'granted') {
                    window.addEventListener('devicemotion', () => {});
                }
            })
            .catch(Window.console.error);
    } else {
        // handle regular non iOS 13+ devices
    }
}

document.addEventListener('DOMContentLoaded', init, true);
function init() {
    Window.console.log('Engage');
    window.addEventListener('devicemotion', motion, true);
}

function motion(e) {
    let acc = e.acceleration;
    this.xValue = ""+acc.x;
    if (!acc.hasOwnProperty('x')) {
        acc = e.accelerationIncludingGravity;
    }
}

</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h3 {
  margin: 40px 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>
