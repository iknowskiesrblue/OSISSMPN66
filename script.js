// Define whitelisted users with roles
const users = [
    { username: "satorunaa", password: "akucantik", role: "Inti OSIS" },
    { username: "ab", password: "cd", role: "user" },
    { username: "Mahesa Pradita", password: "1eZy", role: "Inti OSIS" }
    // Add more users as needed
];

// Define the secret key for admin access
const adminKeySecret = process.env.ADMIN_KEY_SECRET;

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
            if (user.role === "Inti OSIS") {
                document.getElementById("adminKeyBox").classList.remove("hidden");
                document.querySelector('.login-box').style.display = 'none'; // Hide the login box
            } else {
                document.getElementById("exampleLinksBox").classList.remove("hidden");
                document.querySelector('.login-box').style.display = 'none'; // Hide the login box
            }
        } else {
            // Check if the user exists
            const failedLoginUser = users.find(user => user.username === username);
            if (failedLoginUser) {
                failedLoginUser.failedAttempts = (failedLoginUser.failedAttempts || 0) + 1;
                if (failedLoginUser.failedAttempts >= 3) {
                    alert("Kesalahan dalam Username atau password terdeteksi 3 kali. Harap periksa kembali informasi Anda.");
                } else {
                    alert("Kesalahan dalam Username atau password terdeteksi, Coba lagi.");
                }
            } else {
                alert("Kesalahan dalam Username atau password terdeteksi, Coba lagi.");
            }
        }
    });

    // Submit admin key
    document.getElementById("adminKeySubmit").addEventListener("click", function() {
        const adminKey = document.getElementById("adminKeyInput").value;
        const username = document.getElementById("username").value;
        const user = users.find(user => user.username === username);
        if (user && user.role === "Inti OSIS" && adminKey === adminKeySecret) {
            document.getElementById("adminLinksBox").classList.remove("hidden");
            document.getElementById("adminKeyBox").classList.add("hidden"); // Hide the admin key box
        } else {
            alert("Invalid admin key. Please try again.");
        }
    });
};
