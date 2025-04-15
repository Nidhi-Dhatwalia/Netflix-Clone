<template>
  <div>
    <headerPage />
    <mainPage /> 
    <watchList />
    <reasonToJoin />
    <footerSection />
  </div>
</template>

<script>
import headerPage from '../components/headerPage.vue';
import mainPage from  '../components/mainPage.vue'; 
import footerSection from  '../components/footerSection.vue';
import watchList from '../components/watchList.vue';
import reasonToJoin from '../components/reasonToJoin.vue';


export default { 
  components: {
    headerPage,
    mainPage,
    reasonToJoin,
   footerSection,
   watchList,
  },
};
</script>

<style>
body {
  margin: 0;
  font-family: Arial, sans-serif;
  background-color: #141414;
  color: white;
}
</style>
