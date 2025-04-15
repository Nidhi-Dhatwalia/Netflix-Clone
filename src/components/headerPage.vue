<template>
  <v-app-bar class="header-bar" flat>
    <v-container fluid>
      <div class="header-content">
        <div class="brand-logo">
          <v-toolbar-title class="logo">NETFLIX</v-toolbar-title>
        </div>

        <div class="main-nav">
          <v-btn text class="nav-btn">Popular Now</v-btn>
          <v-btn text class="nav-btn">Plans</v-btn>
          <v-btn text class="nav-btn">Reasons to Join</v-btn>
          <v-btn text class="nav-btn">FAQ</v-btn>
        </div>

        <div class="user-action">
          <router-link to="/signin">
            <v-btn class="sign-in-btn">Sign In</v-btn>
          </router-link>
        </div>
      </div>
    </v-container>
  </v-app-bar>
</template>

<script>
export default {
  name: 'headerPage',
};
</script>

<style scoped>
.header-bar {
  background-color: #000 !important;
  box-shadow: none;
  margin: 10px;
  padding: 10px;
}

.header-content {
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 64px;
  width: 100%;
}

.brand-logo .logo {
  font-size: 32px;
  font-weight: 900;
  color: #e50914;
  letter-spacing: 2px;
}

.main-nav {
  display: flex;
  gap: 30px;
  align-items: center;
  justify-content: center;
  background-color: rgb(73, 73, 73);
  padding: 5px 15px;
  border-radius: 20px;
}

.user-action {
  display: flex;
  align-items: center;
}

.nav-btn {
  font-weight: 600;
  font-size: 16px;
  text-transform: none;
  color: white !important;
  transition: color 0.3s;
}

.nav-btn:hover {
  color: #e50914 !important;
}

.sign-in-btn {
  font-weight: bold;
  font-size: 14px;
  text-transform: none;
  background-color: white;
  color: black;
  padding: 6px 18px;
  border-radius: 20px;
  transition: 0.3s ease;
  margin-right: 20px;
}

.sign-in-btn:hover {
  background-color: black;
  color: white;
}
</style>
