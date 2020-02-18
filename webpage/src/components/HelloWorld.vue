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
    const axios = require('axios').default;
    export default {
        name: 'HelloWorld',
        props: {
            msg: String
        },
        data: function () {
            return {
                deviceID: String,
                sharedAccessKey: String,
                clicked: false,
                xValue: 'to shake',
                yValue: 'to shake',
                zValue: 'to shake',
                username: null,
                sessionID: String,
                lastMessageTime: 0,
                timePeriod: 1000,
                topic: String,
                client: undefined
            };
        },
        async created() {
            await this.getDeviceID();
            let uri = window.location.search.substring(1);
            let params = new URLSearchParams(uri);
            this.sessionID = params.get("session");
            this.createMQTTConnection();
        },
        beforeDestroy() {
            //TODO
            console.log("Before Destroy reached")
            axios.post('api/ResetDeviceID?deviceID='+this.deviceID).then(() => console.log("Reset device")).catch(e => console.log(e))
            //this.releaseDevice();
            this.client.end();
        },
        methods: {
            async getDeviceID() {
                try {
                    let response = await axios.get(API_URL + '/api/GetDeviceID') // eslint-disable-line
                    console.log(response.data)
                    this.deviceID = response.data.deviceID;
                    this.sharedAccessKey = response.data.sharedAccessKey;
                } catch (e) {
                    console.log("Error getting data: " + e)
                }
            },
            releaseDevice() {
                try {
                    axios.post(API_URL + 'api/ResetDeviceID?deviceID='+this.deviceID) // eslint-disable-line
                    console.log("Device reset")
                } catch (e) {
                    console.log("Error resetting device: " + e)
                }
            },
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
                //showTime erst nach der Permission ausführen, um gleiche Zeit/Anzahl der Nachrichten für iOS und Android
                //requestPermission for iPhones, give permission manual
                if (typeof DeviceMotionEvent.requestPermission === 'function') {
                    DeviceMotionEvent.requestPermission()
                        .then(permissionState => {
                            if (permissionState === 'granted') {
                                window.addEventListener('devicemotion', this.motion, true);
                                this.showTime();
                            }
                        })
                        .catch(Window.console.error);
                } else {
                    // handle regular non iOS 13+ devices
                    this.showTime();
                    window.addEventListener('devicemotion', this.motion, true);
                }
            },
            motion(e) {
                let currentTime = Date.now()
                console.log('Engage');
                console.log(e);
                let acc = e.acceleration;
                this.xValue = Math.round(acc.x * 100) / 100;
                this.yValue = Math.round(acc.y * 100) / 100;
                this.zValue = Math.round(acc.z * 100) / 100;
                if (this.lastMessageTime == 0 || this.lastMessageTime + this.timePeriod < currentTime) {
                    console.log("New Message now on sending status")
                    this.sendMessage(this.topic);
                    this.lastMessageTime = Date.now();
                }
            },
            async createMQTTConnection() {
                let mqtt = require("mqtt");
                //let deviceID = "TestDeviceWeb";
                let host = 'ShowcaseHub.azure-devices.net';
                //let host = 'ShowcaseHubSM.azure-devices.net';
                //Device Shared Access Key
                //let sharedAccessKey = 'oGCxm9N23jyDtq9EC9LAoqR95PrSEg5uzwpXX9o6R0E=';
                //let sharedAccessKey = 'ZYwl6LA2+OlxOKWOPqjhx1qDFR+2oNZFavQuQp/t1Ao=';
                console.log("Ist da "+this.deviceID+" "+this.sharedAccessKey)
                let sharedGeneratedKey = this.generateSAS(host + '/devices/' + this.deviceID, this.sharedAccessKey, null, 2);
                this.topic = 'devices/' + this.deviceID + '/messages/events/';
                this.client = mqtt.connect({
                    host: host,
                    port: 443,
                    path: '/$iothub/websocket?iothub-no-client-cert=true',
                    protocol: 'mqtts',
                    protocolId: 'MQTT',
                    protocolVersion: 4,
                    clientId: this.deviceID,
                    username: host + '/' + this.deviceID + '/api-version=2018-06-30',
                    password: sharedGeneratedKey,
                    keepalive: 30000
                });
                this.client.on('connect', function (packet) {
                    console.log('mqtt connected at the beginning', packet);
                });
                this.client.on('reconnect', function () {
                    console.log('mqtt reconnected!');
                });
                this.client.on('message', function (topic, message) {
                    let string = new TextDecoder("utf-8").decode(message);
                    console.log('receive!', string);
                });
                this.client.on('close', function (c) {
                    console.log('mqtt closed!', c);
                });
            },
            // Create a message and send it to the IoT Hub
            sendMessage(topic) {
                let message = JSON.stringify({
                    sessionID: this.sessionID,
                    deviceID: this.username,
                    deviceCoordinateX: this.xValue,
                    deviceCoordinateY: this.yValue,
                    deviceCoordinateZ: this.zValue,
                    sendingTimestamp: Date.now()
                });
                console.log('Sending message: ' + message);
                this.client.publish(topic, message);
            },
            showTime() {
                //never set on false again, user must reload page
                setTimeout(() => {
                    window.removeEventListener('devicemotion', this.motion, true);
                    //show something
                    //Idee: navigator.vibrate(200); funktioniert nicht =>
                    //TODO sound abspielen
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
                if (policyName) token += "&skn=" + policyName;
                console.log("Generating end")
                return token;
            }
        }
    }
</script>

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
