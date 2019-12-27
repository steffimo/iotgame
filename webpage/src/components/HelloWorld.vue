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
                xValue: "to shake",
                yValue: "to shake",
                zValue: "to shake"
            };
        },
        methods: {
            startDataTransfer() {
                window.addEventListener('devicemotion', this.motion, true);
                //TODO DeviceMotionEvent

            },
            motion(e) {
                // eslint-disable-next-line no-console
                console.log('Engage');
                // eslint-disable-next-line no-console
                console.log(e);
                let acc = e.acceleration;
                this.xValue = acc.x;
                this.yValue = acc.y;
                this.zValue = acc.z;
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
