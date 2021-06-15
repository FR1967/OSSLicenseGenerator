<template>
    <div>
        <h1>Oops!</h1>
        <router-link :to="{ name: 'event-list' }">Du wirst in <span id="timeLeft">{{ timeLeft }}5</span> Sekunden auf die Startseite weitergeleitet!</router-link>
    </div>
</template>
<script>
    export default {
        name: "err",
        data () {
            return {
                timeLeft: ''
            }
        },
    created() {
        var timeLeft = 4
        var timer = setInterval(function(){
            if(timeLeft <= 0){
                clearInterval(timer);
                window.location.href = '/'
            }
            document.getElementById("timeLeft").innerHTML = timeLeft
            timeLeft -= 1;
        }, 1000);
    },
    }

</script>
