// Define whitelisted users with roles and keys
const users = [
    { username: "satorunaa", password: "akucantik", role: "admin", key: "69Rja2o39M2R0I289T4a410CB" }, // Admin user
    { username: "ab", password: "cd", role: "user", key: null },
    { username: "Mahesa Pradita", password: "1eZy", role: "admin", key: "21w3PdXjxXbDuumQT2dQaln97" }
    // Add more users as needed
];

window.onload = function() {
    const form = document.getElementById("loginForm");
    form.addEventListener("submit", function(event) {
        event.preventDefault(); // Prevent the default form submission behavior
        // Get input values
        const username = document.getElementById("username").value;
        const password = document.getElementById("password").value;

        // Check if user is whitelisted
        const user = users.find(user => user.username === username && user.password === password);

        if (user) {
            if (user.role === "admin") {
                document.getElementById("adminKeyBox").classList.remove("hidden");
                document.querySelector('.login-box').style.display = 'none'; // Hide the login box
            } else {
                document.getElementById("exampleLinksBox").classList.remove("hidden");
                document.querySelector('.login-box').style.display = 'none'; // Hide the login box
            }
        } else {
            alert("Invalid username or password. Please try again.");
        }
    });

    // Submit admin key
    document.getElementById("adminKeySubmit").addEventListener("click", function() {
        const adminKey = document.getElementById("adminKeyInput").value;
        const username = document.getElementById("username").value;
        const user = users.find(user => user.username === username);
        if (user && user.role === "admin" && adminKey === user.key) {
            document.getElementById("adminLinksBox").classList.remove("hidden");
            document.getElementById("adminKeyBox").classList.add("hidden"); // Hide the admin key box
        } else {
            alert("Invalid admin key. Please try again.");
        }
    });
};
