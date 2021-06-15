<template>
    <div>
        <h1>Results</h1>
        <b>License already used: </b> {{startingQuestionsAnswers.questionTwoPointTwo}}
        <br><br>
        <p class="notes">License compatibilities are currently not implemented.</p>
    </div>
</template>

<script>
    export default {
        name: "ResultsAlreadyUsedLicense",
        data() {
            return {
                startingQuestionsAnswers: this.$parent.startingQuestionsAnswers
            }
        }
    }
</script>

<style scoped>
    .notes {
        color: red;
        font-size: 150%;
        text-align: justify;
        letter-spacing: 1px;
    }
</style>
