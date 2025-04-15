import { createRouter, createWebHistory } from 'vue-router';
import managePage from './components/managePage.vue'; 
import categoriesPage from './views/categoriesPage.vue'; 
import searchPage from './views/searchPage.vue';
import sportsPage from './views/sportsPage.vue';
import watchList from './components/watchList.vue';
import movieGenres from './views/movieGenres.vue';
import signinPage from './views/signinPage.vue';
import movieDetails from './views/movieDetails.vue';

const routes = [
  {
    path:'/', name:'Dashboard' , component: managePage 
  }, 
  { path: '/categories', name: 'categoriesPage', component: categoriesPage },
  {
    path:'/search',
    name:'searchPage',
    component: searchPage,
  },
  {
    path:'/sports',
    name:'sportsPage',
    component: sportsPage,
  },
  {
    path:'/watchlist',
    name:'watchList',
    component: watchList,
  },
  {
    path:'/genres/:id/:name',
    name:'movieGenres',
    component: movieGenres,
  },
  {
    path:'/signin',
    name:'signinPage',
    component: signinPage,
  },
  {
    path:'/movie/:id',
    name:'movieDetails',
    component: movieDetails,
  },

];

const router = createRouter({
  history: createWebHistory('/'),
  routes,
});

export default router;
