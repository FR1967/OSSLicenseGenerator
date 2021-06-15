<template>
    <div>
        <div class="card mt-1">
            <section>
                <h4>Frage {{ question.id }}: {{ question.question }}</h4>
                <v-radio-group
                        v-model="radios"
                        non -mandatory
                >
                    <v-radio value="yes" @click="answerOneClick">
                        <template v-slot:label>
                            {{ question.answerYes }}
                        </template>
                    </v-radio>
                    <v-radio value="no" @click="answerTwoClick">
                        <template v-slot:label>
                            {{ question.answerNo }}
                        </template>
                    </v-radio>
                </v-radio-group>
            </section>
        </div>
        <div v-if="!this.questionAdditional" class="card">
            <section>

                <h4>Frage {{ questionListAdditional[0].id }}: {{ questionListAdditional[0].question }}</h4>
                <v-radio-group
                        v-model="radiosAdd"
                        non -mandatory
                >
                    <v-radio value="yes">
                        <template v-slot:label>
                            {{ questionListAdditional[0].answerYes }}
                        </template>
                    </v-radio>
                    <v-radio value="no">
                        <template v-slot:label>
                            {{ questionListAdditional[0].answerNo }}
                        </template>
                    </v-radio>
                </v-radio-group>
            </section>
        </div>
    </div>
</template>

<script>

    export default {
        name: "QuestionCard",
        data() {
            return {
                radios: null,
                radiosAdd: null,
                questionListAdditional: this.$parent.questionList,
                questionAdditional: true,
                footerTableProps: this.$parent.footerTableProps,
                //footerTableProps: {'items-per-page-options': [-1, 5, 10, 20, 50]}, // -1 is for showing all
            }
        },
        props: {
            question: {
                type: Object,
                required: true
            }
        },
        created() {
            this.radios = "Not filled"
        },
        methods: {
            answerOneClick() {
                this.questionListAdditional = this.questionListAdditional.filter(i => i.id === (this.question.id + 100))
                if( this.questionListAdditional[0] != null) {
                    this.radiosAdd = "Not filled"
                    this.questionAdditional = false
                }

            },
            answerTwoClick() {
                this.radiosAdd = null
                this.questionAdditional = true
            },
        }
    }

    // wenn addiotional eine variable +1 und dann an den parent
    //padding 20px noch

</script>

<style scoped>
    .card {
        border-bottom: 1px solid lightgray;
    }
</style>
