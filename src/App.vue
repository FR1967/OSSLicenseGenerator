<template>
  <v-app id="main">
      <NavBar/>
        <v-main id="router">
            <router-view/>
        </v-main>
      <Footer></Footer>
    </v-app>
</template>


<script>
    document.title = 'OSSLicenseGenerator'
    import NavBar from "./components/NavBar";
    import Footer from "./components/Footer";
    export default {
        name: 'App',
        components: {
            NavBar,
            Footer
        },
    };
</script>

<style>
    #router {
        margin-bottom: 50px;
    }
    #main {
        font-family: Avenir, Helvetica, Arial, sans-serif;
        -webkit-font-smoothing: antialiased;
        -moz-osx-font-smoothing: grayscale;
        color: #0068B4;
        margin-left: 50px;
        margin-right: 50px;
    }
    .button {
        background-color: #0068B4;
        color: white;
        font-weight: bold;
    }

</style>
