<template>
    <div id="main">
        <div class="mt-5" v-if="!formSend || !startComplete">
            <h1>Survey to create license instructions</h1>
            <p>On this page you will be asked some questions about your project to give you an overview of which open source license you can use for it.</p>
            <p>Please note that currently only license references for new projects are possible (answer question 1 with "no") and/or for projects that are not licensed yet (answer question 2.2 with "No license is used"). License compatibilities are currently not implemented.</p>
        </div>
        <div v-if="!startComplete">
            <StartingQuestions
                    ref="StartingQuestions"/>

        </div>
        <div v-if="!formSend && startComplete">

                <QuestionCard ref="QuestionCard"
                              v-for="question in questionCard"
                              :key="question.id"
                              :question="question"/>
                <div v-if="errors.length <= 0" class="error--text">
                    <v-btn color="#0068B4" rounded class="button ml-2 my-5" @click="dataPick">
                        Show results <v-icon dark right>mdi-checkbox-marked-circle-outline</v-icon>
                    </v-btn>
                </div>
                <div v-if="errors.length >= 1" class="error--text">
                    <v-btn color="error" rounded class="button ml-2 my-5" @click="dataPick">
                        Show results <v-icon dark right>mdi-checkbox-marked-circle-outline</v-icon>
                    </v-btn>
                    <br>
                    Please answer the following question(s): -
                    <template v-for="error in errors"> {{ error }}</template>
                </div>
            </div>

        <div v-if="formSend && startComplete">
            <div v-if="startingQuestionsAnswers.questionTwoPointTwo === '' || startingQuestionsAnswers.questionTwoPointTwo === 'No license is used'">
                <Results/>
            </div>
            <div v-else>
                <ResultsAlreadyUsedLicense/>
            </div>
            <p class="mt-5">If you want to repeat the survey, click on the "restart survey" button below.</p>
            <v-btn color="#0068B4" rounded class="button ml-2 mb-5" @click="showQuestions">
                Restart survey <v-icon dark right>mdi-reload</v-icon>
            </v-btn>
        </div>
    </div>
</template>
<script>
    import QuestionCard from "../components/QuestionCard";
    import Results from "../components/Results";
    import StartingQuestions from "../components/StartingQuestions";
    import ResultsAlreadyUsedLicense from "../components/ResultsAlreadyUsedLicense";

    export default {

        components: {
            ResultsAlreadyUsedLicense,
            StartingQuestions,
            Results,
            QuestionCard
        },
        name: "Survey",

        data() {
            return {
                formSend: false,
                startComplete: false,
                validateQuantity: 0, // count number of Questions
                additionalQuest: 0, // how much additional questions are there (questions with number 100+)
                activeAdditionalQuest: 0, // how uch additonal questions are shown
                questionList: [], // questions.json
                licenseList: [], // licenses.json
                answerList: [],
                result: {},
                errors: [],
                startingQuestionsAnswers: '' // filled after 'StartingQuestions' is finished -> if already used a license you need other results
            }
        },
        computed: {
            questionCard: function () {
                return this.questionList.filter(i => i.id <= 99)
            }
        },
        created() {
            this.getQuestions();
            this.getLicense()
        },
        methods: {
            getQuestions() {
                fetch("./questions.json")
                    .then(response => response.json())
                    .then(data => (this.questionList = data));
            },
            getLicense() {
                fetch("./licenses.json")
                    .then(response => response.json())
                    .then(data => (this.licenseList = data));
            },
            dataPick() {
                this.additionalQuest = this.questionList.filter(i => i.id >= 99).length // get the number of addtional questions (questions with number 100+)
                var index = 0
                this.activeAdditionalQuest = 0
                for (var i = 0; i <= (this.questionList.length - (this.additionalQuest + 1)); i++) {
                    var result = {}
                    result["id"] = this.$refs.QuestionCard[i].question.id
                    result["value"] = this.$refs.QuestionCard[i].radios
                    this.answerList[index] = result
                    index++
                    if (this.questionList.findIndex(x => x.id === (100 + this.$refs.QuestionCard[i].question.id)) !== -1) {
                        result = {}
                        result["id"] = 100 + this.$refs.QuestionCard[i].question.id
                        result["value"] = this.$refs.QuestionCard[i].radiosAdd
                        this.answerList[index] = result
                        index++
                    }

                    if (this.$refs.QuestionCard[i].radiosAdd != null) {
                        this.activeAdditionalQuest++
                    }

                }
                this.validate()
            },

            validate() {
                this.errors = []
                this.validateQuantity = 0
                for (var i = 0; i <= (this.answerList.length - 1); i++) {
                    if (this.answerList[i].value === "yes" || this.answerList[i].value === "no") {
                        this.validateQuantity++
                    }  if (this.answerList[i].value === "Not filled") {
                        this.errors.push(this.answerList[i].id + " -")
                    }
                }
                if (this.validateQuantity === (this.questionList.length - this.additionalQuest + this.activeAdditionalQuest)) {
                    this.errors = []
                    this.showQuestions()
                }
            },

            showQuestions() {
                window.scrollTo(0, 0);
                if (this.formSend) {
                    this.validateQuantity = 0
                    this.startComplete = !this.startComplete
                }
                this.formSend = !this.formSend

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
