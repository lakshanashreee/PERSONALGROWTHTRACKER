document.addEventListener("DOMContentLoaded", () => {
    console.log("Script Loaded Successfully! ✅");  // Debugging Check

    // 🎨 Theme Toggle
    const themeToggle = document.getElementById("themeToggle");
    if (themeToggle) {
        themeToggle.addEventListener("click", () => {
            document.body.classList.toggle("dark-theme");
        });
    }

    // 🔥 Streak Tracker Fix
    let streakCount = localStorage.getItem("streak") || 0;
    const streakElement = document.getElementById("streakCount");

    if (streakElement) {
        streakElement.textContent = streakCount;
    } else {
        console.warn("⚠️ Element with id 'streakCount' not found! Check your HTML.");
    }

    function updateStreak() {
        streakCount++;
        localStorage.setItem("streak", streakCount);
        if (streakElement) {
            streakElement.textContent = streakCount;
        }
    }
    setTimeout(updateStreak, 86400000); // Simulate streak increase daily

    // ✅ To-Do List with Reminders
    const taskInput = document.getElementById("taskInput");
    const reminderTimeInput = document.getElementById("reminder-time");
    const addTaskBtn = document.getElementById("addTask");
    const todoList = document.getElementById("todoList");
    const reminderSound = document.getElementById("reminderSound");
    const stopSoundBtn = document.getElementById("stopSound");

    if (addTaskBtn) {
        addTaskBtn.addEventListener("click", () => {
            const taskText = taskInput.value.trim();
            const reminderTime = reminderTimeInput.value.trim();

            if (!taskText) {
                alert("⚠ Please enter a task!");
                return;
            }

            // Create list item
            let li = document.createElement("li");
            let timerSpan = document.createElement("span");

            li.innerHTML = `
                <span>${taskText}</span>
                <div>
                    <button class="tick-btn">✔️</button>
                    <button class="delete-btn">❌</button>
                </div>
            `;

            if (reminderTime) {
                timerSpan.classList.add("timer");
                li.insertBefore(timerSpan, li.querySelector("span").nextSibling);
                startTimer(reminderTime, taskText, timerSpan);
            }

            todoList.appendChild(li);

            li.querySelector(".tick-btn").addEventListener("click", () => {
                li.classList.toggle("completed");
            });

            li.querySelector(".delete-btn").addEventListener("click", () => {
                li.remove();
            });

            taskInput.value = "";
            reminderTimeInput.value = "";
        });

        stopSoundBtn.addEventListener("click", () => {
            if (reminderSound) {
                reminderSound.pause();
                reminderSound.currentTime = 0;
            }
            stopSoundBtn.style.display = "none";
        });
    }

    function startTimer(reminderTime, taskText, timerSpan) {
        let [hours, minutes] = reminderTime.split(":").map(Number);
        let reminderDate = new Date();
        reminderDate.setHours(hours, minutes, 0, 0);

        let now = new Date();
        let timeLeft = reminderDate - now;

        if (timeLeft < 0) {
            reminderDate.setDate(reminderDate.getDate() + 1);
            timeLeft = reminderDate - now;
        }

        let updateTimer = setInterval(() => {
            let now = new Date();
            let timeLeft = reminderDate - now;

            if (timeLeft <= 0) {
                clearInterval(updateTimer);
                timerSpan.textContent = "⏰ Time's up!";
                playAlarm(taskText);
            } else {
                let minutesLeft = Math.floor(timeLeft / 60000);
                let secondsLeft = Math.floor((timeLeft % 60000) / 1000);
                timerSpan.textContent = `(${minutesLeft}m ${secondsLeft}s left)`;
            }
        }, 1000);
    }

    function playAlarm(taskText) {
        if (reminderSound) {
            reminderSound.play();
            stopSoundBtn.style.display = "block";
        }
        alert(`⏰ Reminder: ${taskText}`);
    }

    // ✅ Mood Tracker
    const saveMoodBtn = document.getElementById("saveMood");
    const moodHistory = document.getElementById("moodHistory");

    if (saveMoodBtn) {
        saveMoodBtn.addEventListener("click", () => {
            let mood = document.getElementById("mood").value;
            let currentDate = new Date().toLocaleDateString();
            let moodText = `(${currentDate}) - Mood: ${mood}`;
            let para = document.createElement("p");
            para.textContent = moodText;
            moodHistory.appendChild(para);
        });
    }

    // ✅ Quote of the Day
    const quotes = [
        "Success is not final; failure is not fatal: It is the courage to continue that counts.",
        "Don’t watch the clock; do what it does. Keep going.",
        "Believe in yourself and all that you are."
    ];
    const dailyQuote = document.getElementById("dailyQuote");
    if (dailyQuote) {
        dailyQuote.textContent = quotes[Math.floor(Math.random() * quotes.length)];
    }

    // ✅ Register Form Handling
    const registerForm = document.getElementById("register-form");
    if (registerForm) {
        registerForm.addEventListener("submit", function (e) {
            e.preventDefault();
            console.log("Register Button Clicked! ✅");

            const fullName = document.getElementById("register-name").value.trim();
            const email = document.getElementById("register-email").value.trim();
            const password = document.getElementById("register-password").value.trim();
            const confirmPassword = document.getElementById("register-confirm-password").value.trim();

            if (!fullName || !email || !password || !confirmPassword) {
                alert("Please fill in all fields.");
                return;
            }

            if (password !== confirmPassword) {
                alert("Passwords do not match.");
                return;
            }

            if (localStorage.getItem(email)) {
                alert("User already registered! Please log in.");
                window.location.href = "login.html";
                return;
            }

            localStorage.setItem(email, JSON.stringify({ fullName, email, password }));
            alert("Registration successful! Redirecting to home page...");
            localStorage.setItem("isLoggedIn", "true");
            localStorage.setItem("currentUser", email);
            window.location.href = "home.html";
        });
    }

// ✅ Login Handling
const loginForm = document.getElementById("login-form");
if (loginForm) {
    loginForm.addEventListener("submit", function (e) {
        e.preventDefault();
        console.log("Login Button Clicked! ✅");

        const loginEmail = document.getElementById("login-email").value.trim();
        const loginPassword = document.getElementById("login-password").value.trim();

        if (!loginEmail || !loginPassword) {
            alert("Please enter both email and password.");
            return;
        }

        const storedUserData = localStorage.getItem(loginEmail);
        
        if (!storedUserData) {
            alert("User not found! Please register first.");
            return;
        }

        try {
            const storedUser = JSON.parse(storedUserData);

            if (loginPassword === storedUser.password) {
                alert("Login successful! Redirecting to home page...");
                localStorage.setItem("isLoggedIn", "true");
                localStorage.setItem("currentUser", loginEmail);
                window.location.href = "home.html";
            } else {
                alert("Incorrect password. Please try again.");
            }
        } catch (error) {
            alert("An error occurred while logging in. Please try again.");
            console.error("Login Error:", error);
        }
    });
}


    // ✅ Logout Handling
    const logoutBtn = document.getElementById("logoutBtn");
    if (logoutBtn) {
        logoutBtn.addEventListener("click", function () {
            localStorage.removeItem("isLoggedIn");
            localStorage.removeItem("currentUser");
            alert("Logged out successfully!");
            window.location.href = "index.html";
        });
    }

    // ✅ Prevent Unauthorized Access
    if (window.location.pathname.includes("home.html")) {
        if (localStorage.getItem("isLoggedIn") !== "true") {
            alert("You must log in first!");
            window.location.href = "login.html";
        }
    }

    // ✅ Redirect Logged-in Users
    if (localStorage.getItem("isLoggedIn") === "true") {
        let currentPage = window.location.pathname.split("/").pop();
        if (currentPage === "login.html" || currentPage === "register.html") {
            window.location.href = "home.html";
        }
    }

    // 🏠 Welcome Page & Authentication UI
    const getStartedBtn = document.getElementById("getStarted");
    if (getStartedBtn) {
        getStartedBtn.addEventListener("click", () => {
            document.querySelector(".auth-container").style.bottom = "0";
            document.querySelector(".welcome-screen").style.display = "none";
        });
    }

    // Clear session storage to show the welcome page every time Live Server restarts
    sessionStorage.clear();
});