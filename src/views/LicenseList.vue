
<template>
    <div id="main">
    <h1 class="mt-5">Licenselist</h1>
        <p>The license list currently includes {{licenseList.length}} licenses. Click on the wanted license to display it.</p>
    <v-container >
        <v-row v-if="this.showSoloLicense === false">
            <v-col cols="12" md="6">
                <div v-for="license in licenseList" :key="license.License">
                    <button @click="showLicense(license.id)">{{license.License}}</button>
                </div>
            </v-col>
        </v-row>
        <div id="solo">
            <v-row>
                <v-col cols="12" md="6">
                    <h3>License: {{ soloLicense.License }}</h3>
                </v-col>
                <v-col cols="12" md="6">
                    <button @click="goBack()" class="goBack"> (go back to all licenses)</button>
                </v-col>
            </v-row>
            <v-row id="v-for-object">
                <v-col cols="12" lg="1" md="1">
                </v-col>
                <v-col cols="12" lg="8" md="10" >
                    <div class="license" id="wrapper"></div>
                </v-col>
                <v-col cols="12" lg="3" md="1">
                </v-col>
            </v-row>
        <v-row>
            <v-col cols="12" md="6">
            </v-col>
            <v-col cols="12" md="6">
                <button @click="goBack()" class="goBack"> (go back to all licenses)</button>
            </v-col>
        </v-row>
        </div>

    </v-container>
    </div>
</template>

<script>
    /* eslint-disable */
    export default {
        name: "License",
        data() {
            return {
                licenseList: [],
                showSoloLicense: false,
                soloLicense: {},
                license: ""
            }
        },
        created() {
            this.getLicenses();
        },
        mounted() {
            document.getElementById("solo").style.visibility = "hidden";
        },
        methods: {
            getLicenses() {
                fetch("./licenses.json")
                    .then(response => response.json())
                    .then(data => (this.licenseList = data));
            },
            showLicense(id) {
                this.soloLicense = {...this.licenseList[id]}
                delete this.soloLicense.id
                delete this.soloLicense.softwareRelatedOffer
                delete this.soloLicense.url
                delete this.soloLicense.licenseShort;
                this.showSoloLicense = true
                if(this.showSoloLicense === true) {
                    document.getElementById("solo").style.visibility = "visible";
                    this.setInnerHtml()
                }
            },
            setInnerHtml() {
                for (var value in this.soloLicense) {
                    if (Object.prototype.hasOwnProperty.call(this.soloLicense, value)) {
                        this.license = this.license + "<p>" + this.soloLicense[value] + "</p>"
                    }

                }
                document.getElementById("wrapper").innerHTML = this.license
            },

            goBack() {
                this.showSoloLicense = false
                document.getElementById("solo").style.visibility = "hidden";
                document.getElementById("wrapper").innerHTML = " "
                this.soloLicense = {}
                this.license = ""
                window.scrollTo(0,0);
            }
        }
    }
</script>

<style scoped>
    .goBack {
        font-size: small;
        font-style: italic;
        text-align: right;
    }

    .license {
        color: black;
        border: 1px solid black;
        border-radius: 8px;
        padding: 10px;
    }
</style>
