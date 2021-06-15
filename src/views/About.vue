<template>
    <div id="main">
        <div class="mt-5 about">
    <h1> About the Website</h1>
    <p class="hint">The website is still under construction.</p>

    <p>This website is intended to help developers who are in the process of programming an open source software to find a license for this program. This is to be done by answering certain questions. The corresponding answers in combination will provide the developer with several results after submitting the questionnaire.</p>

    <p>Currently, the questionnaire only returns results if the developer is the original author of the program, or if the program used is not yet licensed.</p>

    This website differs from similar existing websites in the following points:
    <ol>
        <li>
            There will be hints for commercial use for every License
        </li>
        <li>
            In each license, corresponding paragraphs are shown from the license that relates to the topic of the question.
        </li>
        <li>
            Not only licenses are shown that match the answers 100%. Thus, the programmer may choose a license that does not completely match his questions by adjusting his answers accordingly.
        </li>
    </ol>
        </div>

        <div class="mt-5 contact">
            <h1>Contact Us</h1>
            <p>If you have any questions, comments or if you have found any bugs on this website/programm send an email to:</p>
            <p>Fabian Rajewski <a href="mailto:fabian.rajewski@ovgu.de">fabian.rajewski@ovgu.de</a></p>

        </div>
</div>
</template>

<script>
    export default {
        name: "About",
    }
</script>

<style scoped>
    .hint {
        text-align: justify;
        letter-spacing: 1px;
        font-style: italic;

    }
    a {
        text-decoration: underline;
    }

    a:hover {
        text-decoration: none;
    }
</style>
