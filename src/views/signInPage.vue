<template>
  <div class="signin-container">
    <div class="form-box">
      <h2>Sign In</h2> 
      <input type="text" placeholder="Email or mobile number" class="input-box" />
      <input type="password" placeholder="Password" class="input-box" />


      <router-link to="/">  <button class="sign-in-btn">Sign In</button> </router-link>  
  
      <div class="divider">OR</div>

      <button class="code-btn">Use a sign-in code</button>

      <div class="options">
        <div class="remember-me">
          <input type="checkbox" id="remember" />
          <label for="remember">Remember me</label>
        </div>
        <a href="#" class="forgot-link">Forgot password?</a>
      </div>

      <div class="signup">
        <span>New to Netflix?</span> 
        <router-link to="/">Sign up now.</router-link> 
      </div>

      <p class="recaptcha-info">
        This page is protected by Google reCAPTCHA to ensure you're not a bot.
        <a href="#">Learn more.</a>
      </p>
    </div>
  </div>
</template>

 

<style scoped>
.signin-container {
  display: flex;
  justify-content: center;
  align-items: center;
  background: url('@/assets/background.jpg') no-repeat center center/cover;
  height: 100vh;
  width: 100%;   
}

.form-box {
  background-color: rgba(0, 0, 0, 0.6);
  padding: 40px;
  border-radius: 8px;
  width: 100%;
  max-width: 350px;
  color: white;
  display: flex;
  flex-direction: column;
 
}

h2 {
  margin-bottom: 20px;
  font-size: 28px;
}

.input-box {
  padding: 12px;
  margin: 10px 0;
  background: #333;
  border: none;
  color: white;
  border-radius: 4px;
}

.sign-in-btn {
  background-color: red;
  color: white;
  padding: 12px;
  border: none;
  border-radius: 4px;
  margin-top: 15px;
  cursor: pointer;
  font-weight: bold;
  width: 100%;
}

.divider {
  text-align: center;
  margin: 20px 0;
  color: #bbb;
}

.code-btn {
  background-color: #333;
  color: white;
  padding: 12px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}

.options {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 15px;
  font-size: 14px;
}

.remember-me {
  display: flex;
  align-items: center;
}

.remember-me input {
  margin-right: 5px;
}

.forgot-link {
  color: #bbb;
  text-decoration: none;
}

.signup {
  margin-top: 30px;
  font-size: 14px;
}

.signup a {
  margin-left: 5px;
  color: white;
  text-decoration: none;
  font-weight: bold;
}

.recaptcha-info {
  margin-top: 20px;
  font-size: 12px;
  color: #777;
}

.recaptcha-info a {
  color: #0071eb;
}
</style>
