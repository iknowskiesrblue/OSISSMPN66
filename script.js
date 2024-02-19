const admin_bypass_key = process.env.ADMIN_KEY_SECRET;

// Define whitelisted users with roles and keys
const users = [
    { username: "satorunaa", password: "akucantik", role: "admin", key: ADMIN_KEY1 }, // Admin user
    { username: "ab", password: "cd", role: "user", key: null },
    { username: "Mahesa Pradita", password: "1eZy", role: "admin", key: ADMIN_KEY2 }
    // Add more users as needed
];

const userLockSecret = process.env.USER_LOCK; // Assuming you are using Node.js and this script runs in an environment where process.env is available

window.onload = function() {
    const form = document.getElementById("loginForm");
    form.addEventListener("submit", function(event) {
        event.preventDefault(); // Prevent the default form submission behavior
        // Get input values
        const username = document.getElementById("username").value;
        const password = document.getElementById("password").value;

        // Find the user in the list of users
        const user = users.find(user => user.username === username);

        if (user) {
            // Check if the entered password matches the user's password
            if (password === user.password) {
                // Reset failed login attempts
                user.failedAttempts = 0;
                // Proceed with login logic
                alert("Login sukses!");
            } else {
                // Increment failed login attempts
                user.failedAttempts++;
                // Check if the user has reached the threshold of failed attempts
                if (user.failedAttempts >= 5) {
                    alert("Akun terkunci, Terlalu banyak login dengan password yang salah.")
                    user.password = userLockSecret // Set the password to the secret value or a default value
                } else {
                    // Notify user about incorrect password
                    alert("Incorrect password. Please try again.");
                }
            }
        } else {
            alert("Invalid username. Please try again.");
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
