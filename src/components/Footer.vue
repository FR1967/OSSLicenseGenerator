<template>
    <div class="footer">
        <v-divider></v-divider>
        <p> {{projectName}} - Fabian Rajewski {{ new Date().getFullYear() }}  </p>
    </div>
</template>

<script>
    export default {
        name: "Footer",
        data() {
            return {
                projectName: "OSSLicenseGenerator",
            }
        }
    }
</script>

<style scoped>
    a:visited, a:Link, a {
        color: #0068B4;
        text-decoration: none;
    }

    a:hover {
        color: #0068B4;
        text-decoration: underline;;
    }
    .footer {
        position: absolute;
        right: 0;
        bottom: 0;
        left: 0;
        text-align: center;
    }
</style>
