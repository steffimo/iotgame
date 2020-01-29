<template>
    <div class="hello">
        <h1>{{ msg }}</h1>
        <p>
            ShakeIT is a simple and fun Internet of Things game, used for the development of an IoT showcase in purpose
            of a thesis.
        </p>
        <p>
            So now register to the next session and create your username. After pressing the button "Go for IT" shake
            your device for 10 seconds.
        </p>
        <form id="login">
            <p>
                <label for="session_id">Session-ID</label>
                <input id="session_id" v-model="session_id">
            </p>

            <p>
                <label for="username">Username</label>
                <input id="username" v-model="username">
            </p>
            <div id="StartButton">
                <button @click="startDataTransfer" :disabled='clicked'>Go for IT</button>
            </div>
        </form>
        <div class='output-info'>
            <ul>
                <li class='x_axis'><b>x</b> {{xValue}}</li>
                <li class='y_axis'><b>y</b> {{yValue}}</li>
                <li class='z_axis'><b>z</b> {{zValue}}</li>
            </ul>
        </div>
        <div id="timeover" style="display: none;">
            <p>Time is over!</p>
        </div>
    </div>
</template>

<script>
    export default {
        name: 'HelloWorld',
        props: {
            msg: String
        },
        data: function () {
            return {
                clicked: false,
                xValue: 'to shake',
                yValue: 'to shake',
                zValue: 'to shake',
                session_id: null,
                username: null
            };
        },
        methods: {
            startDataTransfer() {
                if (this.session_id == null | this.session_id == "" | this.username == null | this.username == "" ){
                    window.alert("No session or no username!");
                    return;
                }
                this.clicked = true;
                this.showTime();
                //requestPermission for iPhones, give permission manual
                if (typeof DeviceMotionEvent.requestPermission === 'function') {
                    DeviceMotionEvent.requestPermission()
                        .then(permissionState => {
                            if (permissionState === 'granted') {
                                window.addEventListener('devicemotion', this.motion, true);
                            }
                        })
                        .catch(Window.console.error);
                } else {
                    // handle regular non iOS 13+ devices
                    window.addEventListener('devicemotion', this.motion, true);
                }
            },
            motion(e) {
                console.log('Engage');
                console.log(e);
                let acc = e.acceleration;
                this.xValue = Math.round(acc.x*100)/100;
                this.yValue = Math.round(acc.y*100)/100;
                this.zValue = Math.round(acc.z*100)/100;
                //TODO every second/intervall!
                this.sendMessage();
            },
            // Create a message and send it to the IoT Hub
            sendMessage() {
                var mqtt = require("mqtt");
                var deviceId = "TestDeviceWeb";
                var host='ShowcaseHubSM.azure-devices.net';
                var sharedKey = 'SharedAccessSignature sr=ShowcaseHubSM.azure-devices.net%2Fdevices%2FTestDeviceWeb&sig=%2BtmniSmyDNXFi8yz%2FF9V%2FdzJLGwCLIsS4iB5eUk9D0I%3D&se=1580323571';
                var topic = 'devices/'+deviceId+'/messages/events/';
                var client  = mqtt.connect({
                    host:host,
                    port:443,
                    path:'/$iothub/websocket?iothub-no-client-cert=true',
                    protocol: 'mqtts',
                    protocolId: 'MQTT',
                    protocolVersion: 4,
                    clientId:deviceId,
                    username: host+'/'+deviceId+'/api-version=2018-06-30',
                    password: sharedKey,
                    keepalive: 30000
                });

                //Dummy Data
                /*var temperature = 20 + (Math.random() * 15);
                var message = JSON.stringify({
                    temperature: temperature,
                    humidity: 60 + (Math.random() * 20)
                });*/

                //real data to json
                var message = JSON.stringify({
                    sessionID: this.session_id,
                    deviceID: this.username,
                    deviceCoordinateX: this.xValue,
                    deviceCoordinateY: this.yValue,
                    deviceCoordinateZ: this.zValue,
                    sendingTimestamp: Date.now()
                });

                client.on('connect', function(packet){
                    console.log('mqtt connected!', packet);
                    console.log('Sending message: ' + message);
                    // Send the message.
                    client.publish(topic, message);
                })

                client.on('reconnect', function(){
                    console.log('mqtt reconnected!');
                })
                client.on('close', function(c){
                    console.log('mqtt closed!',c);
                })
                client.on('message', function(topic, message){
                    var string = new TextDecoder("utf-8").decode(message);
                    console.log('receive!',string);
                })
            },
            showTime() {
                //never set on false again, user must reload page
                setTimeout(() => {
                    window.removeEventListener('devicemotion', this.motion, true);
                    //show something
                    document.getElementById('timeover').style.display = "block";
                }, 10 * 1000);
            }
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
        margin: 0 10px;
    }

    a {
        color: #42b983;
    }

    input {
        margin-left: 10px;
    }
</style>
