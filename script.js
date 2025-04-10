// ======= ВРЕМЯ И ДАТА =======
function updateTime() {
  const timeElement = document.getElementById('current-time');
  const dateElement = document.getElementById('current-date');

  const now = new Date();
  const time = now.toLocaleTimeString('ru-RU', { hour12: false });
  const date = now.toLocaleDateString('ru-RU');

  timeElement.textContent = time;
  dateElement.textContent = date;
}
setInterval(updateTime, 1000);

// ======= ДОБАВЛЕНИЕ НОВОСТЕЙ =======
function addNews() {
  let newNews = prompt("Введите новость:");
  if (newNews) {
      const newsList = document.getElementById('news-list');
      const newNewsItem = document.createElement('li');
      const currentDate = new Date().toLocaleDateString('ru-RU');
      newNewsItem.innerHTML = `<strong>${currentDate}:</strong> ${newNews}`;
      newsList.appendChild(newNewsItem);
  }
}

// ======= ПЕРЕКЛЮЧЕНИЕ РАЗДЕЛОВ =======
function showContent(section) {
  let content = document.getElementById("content");
  let adminPanel = document.getElementById("admin-panel");
  let dashboard = document.getElementById("dashboard");

  adminPanel.classList.add("hidden");
  dashboard.classList.add("hidden");

  if (section === "dashboard") {
      dashboard.classList.remove("hidden");
  } else if (section === "reports") {
      content.innerHTML = "<h2>Репорты</h2><p>Список жалоб...</p>";
  } else if (section === "forms") {
      content.innerHTML = "<h2>Анкеты</h2><p>Список анкет...</p>";
  } else if (section === "reports_list") {
      content.innerHTML = "<h2>Отчёты</h2><p>Список отчётов...</p>";
  } else if (section === "profile") {
      content.innerHTML = "<h2>Профиль</h2><p>Информация о пользователе...</p>";
  } else if (section === "settings") {
      content.innerHTML = "<h2>Настройки</h2><p>Параметры системы...</p>";
  }

  content.classList.remove("hidden");
}

// ======= ХЕШ ПАРОЛЯ (от "123456") =======
const ADMIN_HASH = "8d969eef6ecad3c29a3a629280e686cf0c3f5d5a86aff3ca12020c923adc6c92";

// ======= ФУНКЦИЯ ХЕШИРОВАНИЯ =======
async function hashCode(input) {
  const encoder = new TextEncoder();
  const data = encoder.encode(input);
  const hashBuffer = await crypto.subtle.digest('SHA-256', data);
  const hashArray = Array.from(new Uint8Array(hashBuffer));
  return hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
}

// ======= ВХОД В АДМИН-ПАНЕЛЬ =======
function showAdminPanel() {
  document.getElementById("admin-popup").style.display = "block";
}

async function checkAdminCode() {
  let inputCode = document.getElementById("admin-code").value;
  let inputHash = await hashCode(inputCode);
  let content = document.getElementById("content");
  let adminPanel = document.getElementById("admin-panel");

  if (inputHash === ADMIN_HASH) {
      document.getElementById("admin-popup").style.display = "none";
      content.classList.add("hidden");
      adminPanel.classList.remove("hidden");
  } else {
      alert("Неверный код!");
  }
}

function closePopup() {
  document.getElementById("admin-popup").style.display = "none";
}

function exitAdminPanel() {
  let content = document.getElementById("content");
  let adminPanel = document.getElementById("admin-panel");

  adminPanel.classList.add("hidden");
  content.classList.remove("hidden");
}

// ======= ПРИ ЗАГРУЗКЕ СТРАНИЦЫ =======
window.onload = function() {
  showContent("dashboard");
}