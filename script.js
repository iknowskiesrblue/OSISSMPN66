// Define whitelisted users with roles, passwords, and keys
const users = [
    // Inti OSIS
    { username: "satorunaa", password: "akucantik", role: "Inti OSIS", key: "69Rja2o39M2R0I289T4a410CB", failedAttempts: 0, lastFailedAttemptTime: null },
    { username: "hesa", password: "ketoswell", role: "Inti OSIS", key: "21w3PdXjxXbDuumQT2dQaln97", failedAttempts: 0, lastFailedAttemptTime: null },
    { username: "syahid", password: "sidanton", role: "Inti OSIS", key: "uXSrbAr7xG40PhNxTG5wp7yA0", failedAttempts: 0, lastFailedAttemptTime: null },
    { username: "lia", password: "pacarsidanton", role: "Inti OSIS", key: "TGAsmeRO2OfcsGzEeVLqUK1BI", failedAttempts: 0, lastFailedAttemptTime: null },
    { username: "kayla", password: "pcriko", role: "Inti OSIS", key: "aCwvLc0xwRT3VY4xABI45vqvd", failedAttempts: 0, lastFailedAttemptTime: null },
    // Anggota osis
    { username: "OSISSMPN66", password: "juIqxZfTWjfSxBOrMjjH", role: "user", key: null, failedAttempts: 0, lastFailedAttemptTime: null }

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
            if (user.role === "Inti OSIS") {
                document.getElementById("adminKeyBox").classList.remove("hidden");
                document.querySelector('.login-box').style.display = 'none'; // Hide the login box
            } else {
                document.getElementById("exampleLinksBox").classList.remove("hidden");
                document.querySelector('.login-box').style.display = 'none'; // Hide the login box
            }
        } else {
            // Increment failed login attempts and set last failed attempt time
            const failedUser = users.find(user => user.username === username);
            if (failedUser) {
                failedUser.failedAttempts++;
                if (failedUser.failedAttempts >= 3) {
                    const currentTime = new Date();
                    if (!failedUser.lastFailedAttemptTime || (currentTime - failedUser.lastFailedAttemptTime) >= 30000) {
                        alert("Terlalu banyak percobaan login yang gagal, Sistem UL233 telah aktif. Silakan coba lagi nanti.");
                        failedUser.lastFailedAttemptTime = currentTime;
                    }
                }   else {
                    alert("Kesalahan dalam Username atau password terdeteksi, Coba lagi.");
                }
            }
        }
    });

    // Submit admin key
    document.getElementById("adminKeySubmit").addEventListener("click", function() {
        const adminKey = document.getElementById("adminKeyInput").value;
        const username = document.getElementById("username").value;
        const user = users.find(user => user.username === username);
        if (user && user.role === "Inti OSIS" && adminKey === user.key) {
            document.getElementById("adminLinksBox").classList.remove("hidden");
            document.getElementById("adminKeyBox").classList.add("hidden"); // Hide the admin key box
        } else {
            alert("Kunci Admin salah, Hubungi seksi bidang 9 jika ada masalah");
        }
    });
};
