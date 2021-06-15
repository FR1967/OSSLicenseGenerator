<template>
    <v-app-bar
            app
            color="#0068B4"
            dark
    >
        <div class="projectName">
            <router-link to="/">
                <span class="nameBig">OSSL</span>
                <span class="nameSmall">icense</span>
                <span class="nameBig">G</span>
                <span class="nameSmall">enerator {{projectName}}</span>
            </router-link>
        </div>

        <v-spacer></v-spacer>

        <span class="linkList">
            <router-link to="/">Home</router-link>
            <span class="spacer"> | </span>
                <router-link to="/survey" v-on:click.native="sameURLSurvey">Survey</router-link> <span
                class="spacer"> | </span>
                <router-link to="/license" v-on:click.native="sameURLLicense">Licenselist</router-link>
            <span class="spacer"> | </span>
                <router-link to="/about">About</router-link>
            </span>
    </v-app-bar>
</template>

<script>
    export default {
        name: "NavBar",
        data() {
            return {
                projectName: this.$parent.projectName,
            }
        },
        methods: {
            sameURLLicense() {
                const hash = window.location.hash.split('/')[1]
                if (hash === "license") {
                    location.reload()
                }
            },
            sameURLSurvey() {
                const hash = window.location.hash.split('/')[1]
                if (hash === "survey") {
                    location.reload()
                }
            }
        }
    }
    /*

     */
</script>

<style scoped>
    .projectName {
        margin-left: 10px;
        color: white;
        text-align: justify;
        font-family: "Times New Roman", Times, serif;
        font-style: oblique;
        font-weight: bold;
        top: 0;
        left: 0;
    }
    .projectName :hover {
        text-decoration: none;
    }

    .nameSmall {
        font-size: 150%;

    }

    .nameBig {
        font-size: 250%;
    }

    .linkList {
        margin-right: 10px;
        font-weight: bold;
    }

    .spacer {
        font-size: 150%;
    }

    a:visited, a:Link, a {
        color: white;
        text-decoration: none;
    }

    a:hover {
        color: white;
        text-decoration: underline;
    }
</style>
