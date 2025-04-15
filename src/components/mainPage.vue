<template>
  <div class="main-container">
    <div class="sidebar">
      <router-link to="/" class="nav-item">
        <v-icon>mdi-home</v-icon>
        <span class="nav-label">Home</span>
      </router-link>

      <router-link to="/search" class="nav-item">
        <v-icon>mdi-magnify</v-icon>
        <span class="nav-label">Search</span>
      </router-link>

      <router-link to="/categories" class="nav-item">
        <v-icon>mdi-view-list</v-icon>
        <span class="nav-label">Categories</span>
      </router-link>

      <router-link to="/sports" class="nav-item">
        <v-icon>mdi-basketball</v-icon>
        <span class="nav-label">Sports</span>
      </router-link>
      <router-link to="/" class="nav-item">
        <v-icon>mdi-menu</v-icon>
        <span class="nav-label">More</span>
      </router-link>
    </div>

    <section class="main-section">
      <div class="overlay">
        <h1>Unlimited movies, TV shows and more</h1>
        <p>Starts at ₹149. Cancel at any time.</p>
        <div class="email-form">
          <input
            v-model="email"
            type="email"
            placeholder="Enter your email"
            :class="{ invalid: emailError }"
          />
          <button @click="handleGetStarted" class="button-style">
            Get Started
          </button>
        </div>
        <p v-if="emailError" class="error-message">{{ emailError }}</p>
      </div>
    </section>
  </div>
</template>

<script>
export default {
  name: "mainPage",
  data() {
    return {
      email: "",
      emailError: "",
    };
  },
  methods: {
    handleGetStarted() {
      this.emailError = "";
      const emailPattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;

      if (!this.email || !emailPattern.test(this.email)) {
        this.emailError = "Please enter a valid email address.";
        return;
      }
      this.$router.push({ name: "categoriesPage" });
    },
  },
};
</script>

<style scoped>
.main-container {
  display: flex;
  height: 100vh;
  margin-top: 50px;
}

.sidebar {
  width: 80px;
  background-color: rgba(0, 0, 0);
  padding-top: 60px;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 20px;
  position: relative;
}

.nav-item {
  position: relative;
  display: flex;
  align-items: center;
  flex-direction: row;
  gap: 10px;
  cursor: pointer;
  color: white;
}

.nav-item:hover .nav-label {
  opacity: 1;
  transform: translateX(15px);
  visibility: visible;
}

.nav-label {
  background-color: #333;
  color: white;
  padding: 10px 20px;
  border-radius: 5px;
  font-size: 18px;
  position: absolute;
  left: 100%;
  margin-left: 8px;
  opacity: 0;
  transition: all 0.3s ease;
}

.main-section {
  flex: 1;
  background-image: url("@/assets/background.jpg");
  background-size: cover;
  background-position: center;
  display: flex;
  justify-content: center;
  align-items: center;
}

.overlay {
  text-align: center;
  color: white;
  background-color: rgba(0, 0, 0, 0.7);
  padding: 60px 40px;
  border-radius: 20px;
  max-width: 700px;
  width: 90%;
  box-shadow: 0 8px 20px rgba(0, 0, 0, 0.5);
}

h1 {
  font-size: 48px;
  font-weight: bold;
  margin-bottom: 20px;
}

p {
  font-size: 20px;
  margin-bottom: 30px;
}

.email-form {
  display: flex;
  gap: 10px;
  justify-content: center;
  flex-wrap: wrap;
}

.email-form input {
  padding: 10px;
  font-size: 18px;
  width: 300px;
  max-width: 100%;
  border: 1px solid white;
  border-radius: 25px;
  outline: none;
  background-color: rgb(177, 177, 177);
  color: white;
}

.button-style {
  padding: 10px 25px;
  background-color: #e50914;
  color: white;
  font-size: 18px;
  border: none;
  border-radius: 25px;
  cursor: pointer;
  font-weight: bold;
}

.button-style:hover {
  background-color: #f6121d;
}

.invalid {
  border: 1px solid red;
}

.error-message {
  color: red;
  margin-top: 10px;
}
</style>
