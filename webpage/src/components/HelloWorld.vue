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
        <div id="StartButton">
            <button @click="startDataTransfer">Go for IT</button>
        </div>
        <div class='output-info'>
            <ul>
                <li class='x_axis'><b>x</b> {{xValue}}</li>
                <li class='y_axis'><b>y</b> {{yValue}}</li>
                <li class='z_axis'><b>z</b> {{zValue}}</li>
            </ul>
        </div>
    </div>
</template>

<script>
    export default {
        name: 'HelloWorld',
        props: {
            msg: String,
        },
        data: function () {
            return {
                xValue: 'to shake',
                yValue: 'to shake',
                zValue: 'to shake',
                // Using the Azure CLI:
                // az iot hub device-identity show-connection-string --hub-name {YourIoTHubName} --device-id MyNodeDevice --output table
                connectionString: 'HostName=ShowcaseHubSM.azure-devices.net;DeviceId=MyJavaDevice;SharedAccessKey=3MtwHpv0cPQlWyOPbtDxqJvsrV8U/Q906hMNcSB22jk='
            };
        },
        methods: {
            startDataTransfer() {
                debugger;
                window.addEventListener('devicemotion', this.motion, true);

            },
            motion(e) {
                debugger;
                console.log('Engage');
                console.log(e);
                let acc = e.acceleration;
                this.xValue = acc.x;
                this.yValue = acc.y;
                this.zValue = acc.z;
                this.setInterval();
            },
            // 'use strict';

            // npm install --save azure-iot-device azure-iot-device-mqtt
            // The device connection string to authenticate the device with your IoT hub.
            //
            // NOTE: For simplicity, this sample sets the connection string in code.
            // In a production environment, the recommended approach is to use an environment variable to make it available to your application or use an HSM or an x509 certificate.
            // https://docs.microsoft.com/azure/iot-hub/iot-hub-devguide-security
            // Create a message and send it to the IoT Hub (TODO every second?)
            setInterval() {
                // The sample connects to a device-specific MQTT endpoint on your IoT Hub.
                /*var Mqtt = require('azure-iot-device-mqtt').Mqtt;
                var DeviceClient = require('azure-iot-device').Client;
                var Message = require('azure-iot-device').Message;
                var client = DeviceClient.fromConnectionString(this.connectionString, Mqtt);*/
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

                console.log('client connected: '+client.connected);
                //Dummy Data
                //TODO real data
                var temperature = 20 + (Math.random() * 15);
                var message = JSON.stringify({
                    temperature: temperature,
                    humidity: 60 + (Math.random() * 20)
                });
                // Add a custom application property to the message.
                // An IoT hub can filter on these properties without access to the message body.
                //message.properties.add('temperatureAlert', (temperature > 30) ? 'true' : 'false');
                // eslint-disable-next-line no-console
                console.log('Sending message: ' + message);

                // Send the message.
                client.publish('topic', message)
                client.end()


                /*client.sendEvent(message, function (err) {
                    if (err) {
                        // eslint-disable-next-line no-console
                        console.error('send error: ' + err.toString());
                    } else {
                        // eslint-disable-next-line no-console
                        console.log('message sent');
                    }
                });*/
            }
        }
    }

    /*for iPhones
    function onClick() {
        // feature detect
        if (typeof DeviceMotionEvent.requestPermission === 'function') {
            DeviceMotionEvent.requestPermission()
                .then(permissionState => {
                    if (permissionState === 'granted') {
                        window.addEventListener('devicemotion', motion);
                    }
                })
                .catch(Window.console.error);
        } else {
            // handle regular non iOS 13+ devices
        }
    }*/
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
