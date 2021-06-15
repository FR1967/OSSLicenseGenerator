<template>
    <div class="mt-5">
        <h1>Results</h1>
        <div v-if="numberOfBestLicense === 1">
            The license that best fits to your answers is the following:
            <ul>
                <li>
                    {{resultList[0].fullName }}
                </li>
            </ul>
            with an accuracy of {{resultList[0].percentageValue }}%.
        </div>
        <div v-if="numberOfBestLicense > 1">
            The licenses that best fits to your answers are the following:
            <ul>
                <div v-for="result in resultList" :key="result.fullName">
                    <li v-if="resultList[0].percentageValue === result.percentageValue">
                        {{ result.fullName }}
                    </li>
                </div>
            </ul>
            with an accuracy of {{resultList[0].percentageValue }}%.
        </div>
        <br>
        <v-data-table
                :headers="headers"
                :items="tableContentBest"
                :items-per-page="-1"
                :footer-props="footerTableProps"
                class="elevation-1"
        >
        </v-data-table>
        <br>
        <p>
            All licenses are ordered so that the license that most matches your answers is shown first, and the one
            that least matches is shown last in the top tabs.
        </p>
        <div v-if="!showSolo">
            <v-btn color="#0068B4" rounded class="button my-2 ml-2" @click="showSoloInfo">
                Show individual Information
                <v-icon dark right>mdi-playlist-check</v-icon>
            </v-btn>

        </div>
        <div v-else>
            <v-btn color="#0068B4" rounded class="button my-2 ml-2" @click="showSoloInfo">
                Hide individual Information
                <v-icon dark right>mdi-playlist-remove</v-icon>
            </v-btn>

            <result-card/>

            <v-btn color="#0068B4" rounded class="button my-2 ml-2" @click="showSoloInfo">
                Hide individual Information
                <v-icon dark right>mdi-playlist-remove</v-icon>
            </v-btn>
        </div>
    </div>
</template>


<script>
    import ResultCard from "./ResultCard";

    export default {
        name: "Results",
        components: {ResultCard},
        data() {
            return {
                showSolo: false,
                answerList: this.$parent.answerList, // array of objects for every question[{ "id": , "value": "" }...]
                checkList: this.$parent.questionList, //questions.json
                licenseList: this.$parent.licenseList, //licenses.json
                numberOfQuestions: this.$parent.validateQuantity, // how much answers have been answered
                startingQuestionsAnswers: this.$parent.startingQuestionsAnswers,
                numberOfBestLicense: 1,
                resultList: [], // array of objects for every license [{ "name": ", "fullName": "", "url": "", "softwareRelatedOffer": [ ], "answers": [ ], "rightAnswers": [ ], "percentageValue": "" }..]
                tableContentBest: [],
                tableContentAll: [],
                headers: [
                    {
                        id: 0,
                        text: 'ID',
                        value: 'id',
                        align: 'start',
                        sortable: false
                    },
                    {id: 1, text: 'Question', value: 'question', sortable: false},
                    {id: 2, text: 'Answer', value: 'answer', sortable: false},
                ],
                footerTableProps: {'items-per-page-options': [-1, 5, 10, 20, 50]}, // -1 is for showing all
            }
        },
        created() {
            this.setLicenseValue();
            this.createHeader();
            this.createTableContent();
        },
        methods: {
            setLicenseValue() {
                for (var counterLicense = 0; counterLicense <= (this.licenseList.length - 1); counterLicense++) { // create an array with shown for all licens the number of correct answers
                    var license = {}
                    license["name"] = this.licenseList[counterLicense].licenseShort
                    license["fullName"] = this.licenseList[counterLicense].License
                    license["url"] = this.licenseList[counterLicense].url
                    license["answers"] = []
                    license["rightAnswers"] = []
                    if (this.licenseList[counterLicense].softwareRelatedOffer != null) {
                        license["softwareRelatedOffer"] = ['section ' + this.licenseList[counterLicense].softwareRelatedOffer.slice(3).split('S').join(' sentence ').trim(), this.licenseList[counterLicense][this.licenseList[counterLicense].softwareRelatedOffer]]
                    }
                    for (var i = 0; i <= (this.answerList.length - 1); i++) {
                        console.log('For1 : ' + i)
                        var checkListID = this.checkList.findIndex(x => x.id === this.answerList[i].id)
                        if (this.answerList[i].value === 'yes' && this.answerList[i].id === this.checkList[checkListID].id) {
                            console.log('ifyes : ' + i)
                            if (this.checkList[checkListID].ifYes.includes(license.name)) { // check if the first answer is good for the license
                                license.answers[i] = 1 // answer matches the licenses-conditions
                            } else {
                                license.answers[i] = 0 // answer does not match the licenses-conditions
                            }
                        } else if (this.answerList[i].value === 'no' && this.answerList[i].id === this.checkList[checkListID].id) { // check if the second answer is good for the license
                            console.log('ifno : ' + i)
                            if (this.checkList[checkListID].ifNo.includes(license.name)) {
                                license.answers[i] = 1
                            } else {
                                license.answers[i] = 0
                            }
                        }
                        if ((i + 1) === this.answerList.length) {
                            console.log('ifende : ' + i)
                            this.resultList[counterLicense] = license
                        }
                    }
                }
                this.percentCalculation()
            },
            percentCalculation() {
                for (var i = 0; i <= (this.resultList.length - 1); i++) {
                    var numberOfMatches = 0
                    for (var counterPercent = 0; counterPercent <= (this.answerList.length - 1); counterPercent++) {
                        if (this.resultList[i].answers[counterPercent] === 1) { // count how often the license is correct for given answers
                            numberOfMatches++
                            this.resultList[i].rightAnswers.push(this.answerList[counterPercent].id)
                        }
                        if ((counterPercent + 1) === this.answerList.length) {
                            this.resultList[i].percentageValue = (numberOfMatches / this.numberOfQuestions * 100).toFixed(2) // percentage how much answers are good for the license
                        }
                    }
                }
                this.resultList.sort(function (a, b) { // sort by percent
                    return b.percentageValue - a.percentageValue;
                });

            },
            createHeader() {
                for (var i = 1; i <= (this.resultList.length - 1); i++) { // check how often the best percentage take place
                    if (this.resultList[0].percentageValue === this.resultList[i].percentageValue) {
                        this.numberOfBestLicense++
                    }
                }
                for (var counter = 0; counter <= (this.numberOfBestLicense - 1); counter++) { // set every license in the header
                    var header = {}
                    header["id"] = this.headers.length + 1
                    header["text"] = this.resultList[counter].name
                    header["value"] = "result" + counter
                    header["sortable"] = false
                    this.headers.push(header)

                }
            },
            createTableContent() {
                for (var countAnswer = 0; countAnswer <= (this.answerList.length - 1); countAnswer++) { // whole loop is for set the answer and question in one object
                    var contentBest = {}
                    var contentAll = {}
                    if (this.answerList[countAnswer].value != null) {
                        var checkListID = this.checkList.findIndex(x => x.id === this.answerList[countAnswer].id)
                        contentBest["id"] = this.checkList[checkListID].id
                        contentBest["question"] = this.checkList[checkListID].question
                        contentBest["answer"] = this.answerList[countAnswer].value
                        for (var countResultBest = 0; countResultBest <= (this.numberOfBestLicense - 1); countResultBest++) { // loop for create value for only the best licenses
                            if (this.resultList[countResultBest].answers[countAnswer] === 1) {
                                contentBest["result" + countResultBest] = "✔"
                            } else if (this.resultList[countResultBest].answers[countAnswer] === 0) {
                                contentBest["result" + countResultBest] = "✘"
                            } else {
                                contentBest["result" + countResultBest] = this.resultList[countResultBest].answers[countAnswer]
                            }
                        }
                        this.tableContentBest[countAnswer] = contentBest


                        // Table with all licenses is needed for individual content

                        contentAll["question"] = this.checkList[checkListID].id + ") " + this.checkList[checkListID].question
                        contentAll["answer"] = this.answerList[countAnswer].value
                        for (var countResultAll = 0; countResultAll <= (this.licenseList.length - 1); countResultAll++) { // loop for create value for all of the licenses
                            var licenseSectionList = this.checkList[checkListID].licenseSection.split(", "); // get the  LicenseSection from the object for the question
                            var licenseID = this.licenseList.findIndex(x => x.licenseShort === this.resultList[countResultAll].name)
                            var onlyLicense = licenseSectionList[licenseID].split('=').join(',').split('&').join(',').split(',') // for example: Apache=TOS4.3 split in array [Apache,TOS4.3]
                            if (onlyLicense[1] != null && onlyLicense[1] !== " ") {
                                contentAll["section" + countResultAll] = "<b> Section " + onlyLicense[1].slice(3).split('S').join(' Sentence ').trim() + ": </b> <br> " + this.licenseList[licenseID][onlyLicense[1].trim()]
                            } else {
                                contentAll["section" + countResultAll] = "There is no exact license section for this questions"
                            }
                            if (onlyLicense[2] != null && onlyLicense[2] !== " ") { // if there are multiple sections
                                contentAll["section" + countResultAll] += "<br> <b> Section " + onlyLicense[2].slice(3).split('S').join(' Sentence ').trim() + ": </b> <br> " + this.licenseList[licenseID][onlyLicense[2].trim()]
                            }


                            if (this.resultList[countResultAll].answers[countAnswer] === 1) {
                                contentAll["result" + countResultAll] = "✔"
                            } else if (this.resultList[countResultAll].answers[countAnswer] === 0) {
                                contentAll["result" + countResultAll] = "✘"
                            } else {
                                contentAll["result" + countResultAll] = this.resultList[countResultAll].answers[countAnswer]
                            }
                        }
                        this.tableContentAll[countAnswer] = contentAll
                    }

                }
            },
            showSoloInfo() {
                if (this.showSolo) {
                    this.showSolo = !this.showSolo
                } else {
                    this.showSolo = !this.showSolo
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
