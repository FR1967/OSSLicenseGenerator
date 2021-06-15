<template>
    <v-card class="center">

        <v-tabs v-model="result"
                background-color="#0068B4"
                dark
        >

            <v-tab v-for="(result, index) in resultList" :key="result.fullName"
                   @click="setIndividualInformation(index)"
            >
                {{ result.name }}
            </v-tab>
        </v-tabs>
        <v-tabs-items v-model="result">
            <v-tab-item
                    v-for="result in resultList" :key="result.fullName"
            >
                <v-card flat>
                    <v-card-text class="ml-2">
                        <v-container class="grey lighten-2">
                            <v-row>
                                <v-col>
                                    <b>License:</b>
                                    <p>{{ result.fullName }}</p>
                                </v-col>
                                <v-col>
                                    <b>Fits:</b>
                                    <p v-if="parseInt(result.percentageValue) === 100"
                                       class="bestLicense">
                                        {{result.percentageValue}}% <i>(best value)</i>
                                    </p>
                                    <p v-else-if="result.percentageValue === resultList[0].percentageValue">

                                        {{result.percentageValue}}% <i>(best value)</i>
                                    </p>
                                    <p v-else class="worstLicense">
                                        {{result.percentageValue}}% <i>(best value:
                                        {{resultList[0].percentageValue}}%)</i>
                                    </p>
                                </v-col>
                            </v-row>
                            <v-row>
                                <v-col>
                                    <b class="mb-0">Answers which fit this License: </b>

                                    <p v-if="parseInt(result.percentageValue) === 100"
                                       class="bestLicense">
                                        All
                                    </p>
                                    <p v-else>
                                        Answer no.:
                                        <template v-for="rightAnswers in result.rightAnswers"
                                        >
                                            {{rightAnswers}}
                                            <template
                                                    v-if="rightAnswers === result.rightAnswers[result.rightAnswers.length-1]">

                                            </template>
                                            <template
                                                    v-else-if="rightAnswers === result.rightAnswers[result.rightAnswers.length-2]">
                                                and
                                            </template>
                                            <template v-else>,</template>
                                        </template>
                                        <template v-if="result.rightAnswers.length === 0">
                                        </template>
                                        <i>({{result.rightAnswers.length}} of {{ numberOfQuestions }})</i>
                                    </p>

                                </v-col>
                                <v-col>
                                    <b>Links:</b>
                                    <div v-if="result.url != null">
                                        <a :href="result.url" target="_blank"> Official link (external url)</a>
                                    </div>
                                    <div>
                                        <a @click="routeURL()"> Full license</a>
                                    </div>
                                </v-col>
                            </v-row>
                            <v-row>
                                <v-col><b>Individual references</b></v-col>
                                <v-data-table
                                        :headers="headers"
                                        :items="individualTableContent"
                                        :items-per-page="-1"
                                        :footer-props="footerTableProps"
                                        class="grey lighten-2"
                                        id="tableIndiviual"
                                >
                                    <template v-slot:item.licenseSection="{ item }">
                                        <div v-html="item.licenseSection">
                                        </div>
                                    </template>
                                </v-data-table>
                                <div class="tableHint">
                                    *The shown sections from the license refer only to the specific topics from the
                                    questions.
                                    <br>
                                    Be sure to read the entire license carefully before using it for your software.
                                </div>
                            </v-row>
                            <v-row>
                                <v-col
                                        cols="12"
                                        md="10"
                                >
                                    <!-- { "questionOne": "no", "questionTwo": "", "questionTwoPointOne": "", "questionTwoPointTwo": "The 2-Clause BSD License" } -->
                                    <b>How to use commercial:</b>
                                    <div v-if="multiLicensingPossible === true">

                                        <strong>Multi-Licensing</strong> <a
                                            href="https://en.wikipedia.org/wiki/Multi-licensing" target="_blank">[Wikipedia
                                        (external url)]</a>
                                        <br>
                                        Because you are the original author of the software, you have the
                                        possibility to distribute your program under multiple licenses. Therefore,
                                        you can distribute your product under this license as an open source
                                        software, and distribute the same or a similar product under commercial
                                        software.
                                        <br>
                                        Possible scenarios are for example:
                                        <ul>
                                            <li v-for="item in multiLicensingListItems" :key="item.title">
                                                {{ item.title }}
                                                <ul>
                                                    <li v-for="child in item.children" :key="child.title">
                                                        {{ child.title }}
                                                    </li>
                                                </ul>
                                            </li>
                                        </ul>


                                    </div>
                                    <br>
                                    <p>
                                        <strong>Software-related offers</strong>
                                        <br>
                                        Since this is an Open Source license, you cannot charge a price on the product
                                        based on
                                        this license. However, it is possible to offer software-related services. These
                                        are for example installation services, support, subscriptions and maintenance of
                                        the software.
                                    </p>
                                    <div v-if="result.softwareRelatedOffer != null">
                                        In this license, the {{result.softwareRelatedOffer[0]}} directly refers to
                                        software related offers: <br>
                                        <div class="softwareRelatedOffer" v-html="result.softwareRelatedOffer[1]">
                                        </div>
                                    </div>
                                </v-col>
                            </v-row>
                            <v-row>
                                <v-col>
                                    <v-divider></v-divider>
                                </v-col>
                            </v-row>
                            <v-row>
                                <v-col cols="12"
                                       md="10"
                                       class="notes">
                                    <div v-for="note in notes" :key="note.id">
                                        Note {{note.id}}: {{note.title}}
                                    </div>

                                </v-col>
                            </v-row>
                        </v-container>
                    </v-card-text>
                </v-card>
            </v-tab-item>
        </v-tabs-items>
    </v-card>
</template>

<script>
    export default {
        name: "ResultCard",
        data() {
            return {
                result: null,
                resultList: this.$parent.resultList,
                numberOfQuestions: this.$parent.numberOfQuestions,
                parentTableContent: this.$parent.tableContentAll,
                startingQuestionsAnswers: this.$parent.startingQuestionsAnswers,
                footerTableProps: this.$parent.footerTableProps,
                multiLicensingPossible: false,
                headers: [
                    {id: 0, text: 'Question', value: 'question', sortable: false},
                    {id: 1, text: 'Answer', value: 'answer', sortable: false},
                    {id: 2, text: 'Fits', value: 'fits', sortable: false},
                    {
                        id: 3,
                        text: 'License section showing the theme of the question*',
                        value: 'licenseSection',
                        sortable: false
                    },
                ],
                individualTableContent: [],
                notes: [
                    {
                        id: 1,
                        title: 'Be aware that if you provide software-related offerings, you may incur liability and warranty risks, including those outside the scope of this license',
                    },
                ],
                multiLicensingListItems: [
                    {
                        title: 'Launch the commercial product a certain time before the open source software',
                        children: [{title: 'Commercial customers would thus gain a competitive advantage'}],

                    },
                    {
                        title: 'You may version both products differently',
                        children: [{title: 'For example, the commercial product could be offered server-side, and the open source software only locally'}],
                    },
                    {
                        title: 'Your brand name does not have to be included in the commercial product',
                        children: [{title: 'Commercial customers can distribute the product under their own name without using their name in advertisements, for example'}],
                    },

                ],
            }
        },
        created() {
            this.checkMultiLicensingPossible()
            this.setIndividualInformation(0)
        },
        methods: {
            setIndividualInformation(index) {
                this.setIndividualTableContent(index)
                if (this.multiLicensingPossible === true) {
                    this.setMultiLicensingList(index)
                }
                this.setNotes(index)
            },
            setIndividualTableContent(index) {
                let content = this.parentTableContent.map(a => ({...a}))
                for (var j = 0; j <= (content.length - 1); j++) {
                    if (content[j] != null) {
                        for (var i = 0; i <= (this.resultList.length - 1); i++) {
                            var deleteUnusedResults = "result" + i
                            var deleteNotUsedSections = "section" + i
                            if (i !== index) { // delete everything expect the right License
                                delete content[j][deleteUnusedResults]
                                delete content[j][deleteNotUsedSections]
                            } else {
                                if (Object.prototype.hasOwnProperty.call(content[j], deleteUnusedResults)) {
                                    content[j]["fits"] = content[j][deleteUnusedResults];
                                    delete content[j][deleteUnusedResults];
                                }
                                if (Object.prototype.hasOwnProperty.call(content[j], deleteNotUsedSections)) {
                                    content[j]["licenseSection"] = content[j][deleteNotUsedSections];
                                    delete content[j][deleteNotUsedSections];
                                }
                            }

                        }
                    }
                }
                this.individualTableContent = content

            },
            setNotes(index) {
                if (this.startingQuestionsAnswers.questionOne === 'no' && this.notes.length <= 1) {
                    this.notes.push(
                        {
                            id: this.notes.length+1,
                            title: "Because you are not the original author of the software, you must ensure that your licensee does not exclude software-related offerings on your side",
                        }
                    )
                }
                if (this.resultList[index].name === 'LGPL 3.0' && this.notes.findIndex(x => x.condition === 'LGPL3') === -1) { // if name ist licenses.json -> licenseShort
                    this.notes.push(
                        {
                            condition: 'LGPL3',
                            id: this.notes.length+1,
                            title: "'This version of the GNU Lesser General Public License incorporates the terms and conditions of version 3 of the GNU General Public License[...]' GNU Library or \"Lesser\" General Public License version 3.0  - Copyright Sentence 3",

                        }
                    )
                } else if (this.resultList[index].name !== 'LGPL 3.0' && this.notes.findIndex(x => x.condition === 'LGPL3') !== -1) {
                    let lgpl3ID = this.notes.findIndex(x => x.condition === 'LGPL3')
                    this.notes.splice(lgpl3ID, 1);
                }

            },
            setMultiLicensingList(index) {
                // only show reciprocity clause information in the GPL licenses
                if ((this.resultList[index].name === 'GPL 3.0' || this.resultList[index].name === 'GPL 2.0') && this.multiLicensingListItems.findIndex(x => x.condition === 'GPL') === -1) { // if name ist licenses.json -> licenseShort
                    this.multiLicensingListItems.push(
                        {
                            condition: 'GPL',
                            title: 'The commercial product no longer has a reciprocity clause. (check question no. 4)',
                            children: [{title: 'Commercial customers can customize their product according to their needs without passing this change on to youe'}],

                        }
                    )
                } else if (this.resultList[index].name !== 'GPL 3.0' && this.resultList[index].name !== 'GPL 2.0' && this.multiLicensingListItems.findIndex(x => x.condition === 'GPL') !== -1) {
                    const gplID = this.multiLicensingListItems.findIndex(x => x.condition === 'GPL')
                    this.multiLicensingListItems.splice(gplID, 1);
                }
            },
            checkMultiLicensingPossible() {
                if (this.startingQuestionsAnswers.questionOne === 'yes' && this.startingQuestionsAnswers.questionTwo === 'no') {
                    this.multiLicensingPossible = true
                } else if (this.startingQuestionsAnswers.questionOne === 'yes' && this.startingQuestionsAnswers.questionTwo === 'yes' && this.startingQuestionsAnswers.questionTwoPointTwo === 'No License is used') {
                    this.multiLicensingPossible = true
                } else if (this.startingQuestionsAnswers.questionOne === 'no' && this.startingQuestionsAnswers.questionTwoPointTwo === 'No license is used') {
                    this.multiLicensingPossible = true
                }
            },

            routeURL() {
                let routeData = this.$router.resolve({name: 'License'});
                window.open(routeData.href, '_blank');
            }
        }
    }
</script>

<style scoped>
    >>> #tableIndiviual li {
        display: inline;
    }

    >>> #tableIndiviual ul {
        padding-left: 0;
    }

    .tableHint {
        font-style: italic;
        font-size: smaller;
        margin-right: 0;
        margin-left: auto;
        margin-top: 10px;
    }

    .notes {
        text-align: justify;
        letter-spacing: 1px;
        font-size: smaller;
    }

    .softwareRelatedOffer {
        text-indent: 20px;
    }

    b {
        color: black;
    }

    a {
        text-decoration: underline;
    }

    a:hover {
        text-decoration: none;
    }

    .bestLicense {
        color: green;
    }

    .worstLicense {
        color: red;
    }
</style>
