<template>
    <div class="hello">
        <h1>{{ msg }}</h1>
        <p>
            ShakeIT is a simple and fun Internet of Things game, used for the development of an IoT showcase in purpose
            of a thesis.
        </p>
        <p>Your current session is identified with <b>{{sessionID}}</b>.</p>
        <p>First, create your username. Second, press the button "Go for IT". After pressing the button, shake your
            device for 10 seconds.</p>
        <form id="login">
            <p>
                <input id="username" v-model="username" placeholder="Create Your username here">
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
                username: null,
                sessionID: String
            };
        },
        created() {
            let uri = window.location.search.substring(1);
            let params = new URLSearchParams(uri);
            this.sessionID = params.get("session");
        },
        methods: {
            startDataTransfer() {
                if (this.username == null | this.username == "") {
                    window.alert("No username!");
                    return;
                }
                if (this.sessionID == null) {
                    window.alert("No session! Scann again!");
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
                this.xValue = Math.round(acc.x * 100) / 100;
                this.yValue = Math.round(acc.y * 100) / 100;
                this.zValue = Math.round(acc.z * 100) / 100;
                //TODO every second/intervall!
                this.sendMessage();
            },
            // Create a message and send it to the IoT Hub
            sendMessage() {
                let mqtt = require("mqtt");
                let deviceId = "TestDeviceWeb";
                let host = 'ShowcaseHubSM.azure-devices.net';
                let sharedAccessKey = 'ZYwl6LA2+OlxOKWOPqjhx1qDFR+2oNZFavQuQp/t1Ao=';
                let sharedGeneratedKey = this.generateSAS(host + '/devices/' + deviceId, sharedAccessKey, null, 2);
                let topic = 'devices/' + deviceId + '/messages/events/';
                let client = mqtt.connect({
                    host: host,
                    port: 443,
                    path: '/$iothub/websocket?iothub-no-client-cert=true',
                    protocol: 'mqtts',
                    protocolId: 'MQTT',
                    protocolVersion: 4,
                    clientId: deviceId,
                    username: host + '/' + deviceId + '/api-version=2018-06-30',
                    password: sharedGeneratedKey,
                    keepalive: 30000
                });

                let message = JSON.stringify({
                    sessionID: this.sessionID,
                    deviceID: this.username,
                    deviceCoordinateX: this.xValue,
                    deviceCoordinateY: this.yValue,
                    deviceCoordinateZ: this.zValue,
                    sendingTimestamp: Date.now()
                });

                client.on('connect', function (packet) {
                    console.log('mqtt connected!', packet);
                    console.log('Sending message: ' + message);
                    // Send the message.
                    client.publish(topic, message);
                })

                client.on('reconnect', function () {
                    console.log('mqtt reconnected!');
                })
                client.on('close', function (c) {
                    console.log('mqtt closed!', c);
                })
                client.on('message', function (topic, message) {
                    let string = new TextDecoder("utf-8").decode(message);
                    console.log('receive!', string);
                })
            },
            showTime() {
                //never set on false again, user must reload page
                setTimeout(() => {
                    window.removeEventListener('devicemotion', this.motion, true);
                    //show something
                    document.getElementById('timeover').style.display = "block";
                }, 10 * 1000);
            },
            generateSAS(resourceUri, signingKey, policyName, expiresInMins) {
                console.log("Generating")
                const crypto = require('crypto');

                resourceUri = encodeURIComponent(resourceUri);

                // Set expiration in seconds
                let expires = (Date.now() / 1000) + expiresInMins * 60;
                expires = Math.ceil(expires);
                let toSign = resourceUri + '\n' + expires;

                // Use crypto
                let hmac = crypto.createHmac('sha256', Buffer.from(signingKey, 'base64'));
                hmac.update(toSign);
                let base64UriEncoded = encodeURIComponent(hmac.digest('base64'));

                // Construct authorization string
                let token = "SharedAccessSignature sr=" + resourceUri + "&sig="
                    + base64UriEncoded + "&se=" + expires;
                if (policyName) token += "&skn="+policyName;
                console.log("Generating end")
                return token;
            }
        }
    }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
    ul {
        list-style-type: none;
        padding: 0;
    }

    li {
        margin: 0 10px;
    }

    input {
        margin-left: 10px;
    }
</style>
