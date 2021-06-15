<template>
    <div>
        <section >
            <h4>Frage 1: Sind Sie der Originalautor der Software?</h4>
            <v-radio-group
                    v-model="questOne"
                    non -mandatory
            ><!--- non -mandatory -->
                <v-radio value="yes" @click="clickQuestOne">
                    <template v-slot:label>
                        Ja
                    </template>
                </v-radio>
                <v-radio value="no" @click="clickQuestOne">
                    <template v-slot:label>
                        Nein, ich erweitere ein bereits bestehendes Programm
                    </template>
                </v-radio>
            </v-radio-group>

            <div v-if="this.questOne === 'yes'">
                <h4>Frage 2: Verwenden Sie Komponenten/Quellcode/Programme von anderer OSS?</h4>
                <v-radio-group
                        v-model="questTwo"
                        non -mandatory
                >
                    <v-radio value="yes" @click="clickQuestTwo">
                        <template v-slot:label>
                            Ja, ich nutze fremde Software
                        </template>
                    </v-radio>
                    <v-radio value="no" @click="clickQuestTwo">
                        <template v-slot:label>
                            Nein
                        </template>
                    </v-radio>
                </v-radio-group>
            </div>

            <div v-if="this.questTwo === 'no'">

                <h4>Frage 201: Unterliegt das Programm bereits einer Lizenz?</h4>
                <v-radio-group
                        v-model="questTwoPointOne"
                        non -mandatory
                >
                    <v-radio value="yes">
                        <template v-slot:label>
                            Ja
                        </template>
                    </v-radio>
                    <v-radio value="no" @click="clickQuestTwoPointOneNo">
                        <template v-slot:label>
                            Nein
                        </template>
                    </v-radio>
                </v-radio-group>
            </div>



            <div v-if="this.questOne === 'no' || this.questTwo === 'yes' || this.questTwoPointOne === 'yes'">
                <h4 >Frage 202: Unter welcher Lizenz ist Ihr Programm aktuell Lizensiert?</h4>
                <v-select
                        :items="licenseNamelist"
                        label="Choose a License"
                        v-model="usedLicense"
                        outlined
                        class="mt-4"
                ></v-select>


            </div>
        </section>
        <div v-if="this.questTwoPointOne === 'no' || this.usedLicense !== '' ">
        <v-btn  color="#0068B4" rounded class="button ml-2 my-5" @click="setstartComplete">
            Check answers <v-icon dark right> mdi-arrow-right</v-icon>
        </v-btn>
        </div>
    </div>
</template>

<script>
    export default {
        name: "StartingQuestions",
        data() {
            return {
                questOne: "",
                questTwo: "",
                questTwoPointOne: "",
                usedLicense: "",
                licenseNamelist: [],
                startingQuestionsAnswers: {}
            }
        },
        methods: {
            clickQuestOne() {
                this.questTwo= ""
                this.questTwoPointOne= ""
                this.usedLicense = ''
                if (this.licenseNamelist.length === 0) {
                    this.getLicenseName()
                }
            },
            clickQuestTwo() {
                this.questTwoPointOne= ""
                this.usedLicense = ''
            },
            clickQuestTwoPointOneNo() {
                this.usedLicense = ''
            },
            getLicenseName() {
                this.licenseNamelist.push('No license is used')
                for (var i = 0; i <= (this.$parent.licenseList.length - 1); i++) {
                    this.licenseNamelist.push(this.$parent.licenseList[i].License)  //licenses.json
                }
                this.licenseNamelist.push('None of these licenses')
            },
            setstartComplete() {
                this.startingQuestionsAnswers["questionOne"] = this.questOne
                this.startingQuestionsAnswers["questionTwo"] = this.questTwo
                this.startingQuestionsAnswers["questionTwoPointOne"] = this.questTwoPointOne
                this.startingQuestionsAnswers["questionTwoPointTwo"] = this.usedLicense
                this.$parent.startingQuestionsAnswers = this.startingQuestionsAnswers
                if(this.usedLicense === '' || this.usedLicense === 'No license is used') {
                    this.$parent.startComplete = !this.$parent.startComplete

                } else {
                    this.$parent.startComplete = !this.$parent.startComplete
                    this.$parent.formSend = !this.$parent.formSend
                }
            },
        }
    }
</script>

<style scoped>
    .button {
        color: white;
        font-weight: bold;
    }
</style>
