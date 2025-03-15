document.addEventListener("DOMContentLoaded", () => {

    // 🎨 Theme Toggle
    const themeToggle = document.getElementById("themeToggle");
    themeToggle.addEventListener("click", () => {
        document.body.classList.toggle("dark-theme");
    });

    const todoInput = document.getElementById("todoInput");
const todoTimer = document.getElementById("todoTimer");
const reminderCheck = document.getElementById("reminderCheck");
const addTaskBtn = document.getElementById("addTask");
const todoList = document.getElementById("todoList");
const reminderSound = document.getElementById("reminderSound");
const stopSoundBtn = document.getElementById("stopSound");

addTaskBtn.addEventListener("click", () => {
    if (todoInput.value.trim() === "") return;

    let li = document.createElement("li");

    // Task text
    let taskText = document.createElement("span");
    taskText.textContent = todoInput.value;

    // ✔ Tick button (Strike through)
    let tickBtn = document.createElement("button");
    tickBtn.textContent = "✔️";
    tickBtn.classList.add("tick-btn");
    tickBtn.addEventListener("click", () => taskText.classList.toggle("completed"));

    // ❌ Delete button
    let deleteBtn = document.createElement("button");
    deleteBtn.textContent = "❌";
    deleteBtn.classList.add("delete-btn");
    deleteBtn.addEventListener("click", () => li.remove());

    li.appendChild(taskText);
    li.appendChild(tickBtn);
    li.appendChild(deleteBtn);
    todoList.appendChild(li);

    // Reminder logic
    if (reminderCheck.checked && todoTimer.value.trim() !== "") {
        let time = parseInt(todoTimer.value) * 60000;
        setTimeout(() => {
            reminderSound.play();
            stopSoundBtn.style.display = "block";
            alert(`⏰ Reminder: ${todoInput.value}`);
        }, time);
    }

    // Clear input fields
    todoInput.value = "";
    todoTimer.value = "";
    reminderCheck.checked = false;
});

// Stop alarm button
stopSoundBtn.addEventListener("click", () => {
    reminderSound.pause();
    reminderSound.currentTime = 0;
    stopSoundBtn.style.display = "none";
});


    // 😃 Mood Tracker
    const saveMoodBtn = document.getElementById("saveMood");
    const moodHistory = document.getElementById("moodHistory");

    saveMoodBtn.addEventListener("click", () => {
        let mood = document.getElementById("mood").value;
        let currentDate = new Date().toLocaleDateString();
        let moodText = `(${currentDate}) - Mood: ${mood}`;
        let para = document.createElement("p");
        para.textContent = moodText;
        moodHistory.appendChild(para);
    });

    // 🔥 Streak Tracker
    let streakCount = localStorage.getItem("streak") || 0;
    document.getElementById("streakCount").textContent = streakCount;

    function updateStreak() {
        streakCount++;
        localStorage.setItem("streak", streakCount);
        document.getElementById("streakCount").textContent = streakCount;
    }
    setTimeout(updateStreak, 86400000); // Simulate streak increase daily

    // 💡 Quote of the Day
    const quotes = [
        "Success is not final; failure is not fatal: It is the courage to continue that counts.",
        "Don’t watch the clock; do what it does. Keep going.",
        "Believe in yourself and all that you are."
    ];
    document.getElementById("dailyQuote").textContent = quotes[Math.floor(Math.random() * quotes.length)];

});

document.addEventListener("DOMContentLoaded", () => {
    const registerBtn = document.getElementById("registerBtn");
    const loginBtn = document.getElementById("loginBtn");
    const registerForm = document.getElementById("registerForm");
    const loginForm = document.getElementById("loginForm");
    const logoutBtn = document.getElementById("logoutBtn");

    // Redirect buttons
    if (registerBtn) registerBtn.addEventListener("click", () => window.location.href = "register.html");
    if (loginBtn) loginBtn.addEventListener("click", () => window.location.href = "login.html");

    // Registration process
    if (registerForm) {
        registerForm.addEventListener("submit", (e) => {
            e.preventDefault();
            let regEmail = document.getElementById("regEmail").value;
            let regPassword = document.getElementById("regPassword").value;

            // Store user in localStorage (Temporary method for testing)
            localStorage.setItem("userEmail", regEmail);
            localStorage.setItem("userPassword", regPassword);
            localStorage.setItem("isLoggedIn", "true");

            alert("Registration successful! Redirecting to Home.");
            window.location.href = "home.html";
        });
    }

    // Login process
    if (loginForm) {
        loginForm.addEventListener("submit", (e) => {
            e.preventDefault();
            let loginEmail = document.getElementById("loginEmail").value;
            let loginPassword = document.getElementById("loginPassword").value;

            let storedEmail = localStorage.getItem("userEmail");
            let storedPassword = localStorage.getItem("userPassword");

            if (loginEmail === storedEmail && loginPassword === storedPassword) {
                localStorage.setItem("isLoggedIn", "true");
                alert("Login successful! Redirecting to Home.");
                window.location.href = "home.html";
            } else {
                alert("Invalid login credentials!");
            }
        });
    }

    // Logout process
    if (logoutBtn) {
        logoutBtn.addEventListener("click", () => {
            localStorage.removeItem("isLoggedIn");
            alert("Logged out successfully!");
            window.location.href = "index.html";
        });
    }

    // Redirect logged-in users
    if (localStorage.getItem("isLoggedIn") === "true") {
        let currentPage = window.location.pathname.split("/").pop();
        if (currentPage !== "home.html") {
            window.location.href = "home.html";
        }
    }
});
