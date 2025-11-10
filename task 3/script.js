function registerUser() {
    const fullName = document.getElementById("name").value.trim();
    const email = document.getElementById("email").value.trim();
    const password = document.getElementById("password").value.trim();
    const phone = document.getElementById("phone").value.trim();

    const msg = document.getElementById("msg");

    if (!fullName || !email || !password || !phone) {
        msg.textContent = "⚠ All fields are required!";
        msg.style.color = "red";
        return;
    }

    if (password.length < 6) {
        msg.textContent = "⚠ Password must be at least 6 characters!";
        msg.style.color = "red";
        return;
    }

    fetch("http://localhost:5000/api/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ fullName, email, password, phone })
    })
    .then(res => res.json())
    .then(data => {
        msg.textContent = data.message;
        msg.style.color = data.success ? "green" : "red";
    })
    .catch(err => console.error(err));
}
