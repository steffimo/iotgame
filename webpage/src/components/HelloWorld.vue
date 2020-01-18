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
                // az iot hub device-identity show-connection-string --hub-name {YourIoTHubName} --device-id MyNodeDevice --output table
                connectionString: 'HostName=ShowcaseHubSM.azure-devices.net;DeviceId=MyJavaDevice;SharedAccessKey=3MtwHpv0cPQlWyOPbtDxqJvsrV8U/Q906hMNcSB22jk=',
                errors: [],
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
                this.xValue = acc.x;
                this.yValue = acc.y;
                this.zValue = acc.z;
                this.setInterval();
            },
            // Create a message and send it to the IoT Hub (TODO every second?)
            setInterval() {
                // The sample connects to a device-specific MQTT endpoint on your IoT Hub.
                //https://stackoverflow.com/questions/51711853/connect-to-azure-iothub-using-mqtt-in-javascript/51719672
                var mqtt = require('mqtt');
                var deviceId = "MyJavaDevice";
                var iotHubName = "ShowcaseHubSM";
                var userName = `${iotHubName}.azure-devices.net/${deviceId}/?api-version=2018-06-30`;

                var client = mqtt.connect(`mqtts://${iotHubName}.azure-devices.net:8883`, {
                    keepalive: 10,
                    clientId: deviceId,
                    protocolId: 'MQTT',
                    clean: false,
                    protocolVersion: 4,
                    //reconnectPeriod: 1000,
                    //connectTimeout: 30 * 1000,
                    username: userName,
                    //TODO SAS Key
                    password: "SharedAccessSignature sr=.....",
                    rejectUnauthorized: false,
                });

                console.log('client connected: ' + client.connected);
                //Dummy Data
                var temperature = 20 + (Math.random() * 15);
                var message = JSON.stringify({
                    temperature: temperature,
                    humidity: 60 + (Math.random() * 20)
                });

                //real data to json
                /*var message = JSON.stringify({
                    sessionID: this.session_id,
                    deviceID: this.username,
                    deviceCoordinateX: this.xValue,
                    deviceCoordinateY: this.yValue,
                    deviceCoordinateZ: this.zValue,
                    timestamp: Date.now()
                });*/
                console.log('Sending message: ' + message);
                // Send the message.
                client.publish('topic', message)
                client.end()

                /*client.sendEvent(message, function (err) {
                    if (err) {
                        console.error('send error: ' + err.toString());
                    } else {
                        console.log('message sent');
                    }
                });*/
            },
            showTime() {
                //never set on false again, user must reload page
                setTimeout(() => {
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
