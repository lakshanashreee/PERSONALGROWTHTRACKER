document.addEventListener("DOMContentLoaded", () => {

    // 🎨 Theme Toggle
    const themeToggle = document.getElementById("themeToggle");
    themeToggle.addEventListener("click", () => {
        document.body.classList.toggle("dark-theme");
    });

    const todoInput = document.getElementById("todoInput");
const todoTimer = document.getElementById("todoTimer");
const addTaskBtn = document.getElementById("addTask");
const todoList = document.getElementById("todoList");

addTaskBtn.addEventListener("click", () => {
    if (todoInput.value.trim() === "") return;

    let li = document.createElement("li");
    li.textContent = todoInput.value;

    // ✅ Mark task as completed
    li.addEventListener("click", () => li.classList.toggle("completed"));

    // ✅ Delete task button
    let deleteBtn = document.createElement("button");
    deleteBtn.textContent = "❌";
    deleteBtn.classList.add("delete-btn");
    deleteBtn.addEventListener("click", () => li.remove());
    
    li.appendChild(deleteBtn);
    todoList.appendChild(li);

    // ✅ Set reminder if time is entered
    if (todoTimer.value.trim() !== "") {
        let time = parseInt(todoTimer.value) * 60000; // Convert minutes to milliseconds
        setTimeout(() => {
            alert(`⏰ Reminder: ${todoInput.value}`);
        }, time);
    }

    // Clear input fields
    todoInput.value = "";
    todoTimer.value = "";
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
