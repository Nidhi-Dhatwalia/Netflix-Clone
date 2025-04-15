<template>
  <div class="page">
    <h2 class="heading">More reasons to join</h2>
    <div class="cards">
      <div class="card">
        <p>Cancel or switch plans anytime</p>
        <span class="emoji">🤝</span>
      </div>
      <div class="card">
        <p>A safe place just for kids</p>
        <span class="emoji">❤️</span>
      </div>
      <div class="card">
        <p>Watch on your favourite devices</p>
        <span class="emoji">💻</span>
      </div>
      <div class="card">
        <p>Stories tailored to your taste</p>
        <span class="emoji">📖</span>
      </div>
    </div>
  </div>
</template>

<style scoped>
.page { 
  background: linear-gradient(to bottom, #1e1e1e, #121212);
  padding: 40px 20px;
  color: #fff;
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
  text-align: center;
}

.heading {
  font-size: 32px;
  font-weight: 700;
  margin-bottom: 40px;
}

.cards {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 20px;
}

.card {
  background: rgba(255, 255, 255, 0.05);
  backdrop-filter: blur(8px);
  -webkit-backdrop-filter: blur(8px);
  border: 1px solid rgba(255, 255, 255, 0.1);
  padding: 25px 20px;
  border-radius: 16px;
  width: 260px;
  min-height: 180px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  transition: transform 0.3s ease, box-shadow 0.3s ease;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.3);
}

.card:hover {
  transform: translateY(-6px);
  box-shadow: 0 8px 20px rgba(0, 0, 0, 0.5);
}

.card p {
  font-size: 16px;
  font-weight: 600;
  margin-bottom: 10px;
  line-height: 1.4;
}

.emoji {
  font-size: 32px;
}
</style>
