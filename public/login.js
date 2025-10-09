async function login() {
  const user = document.getElementById("username").value.trim();
  const pass = document.getElementById("password").value.trim();

  try {
    const res = await fetch("login.json");
    const data = await res.json();

    const emp = data.employees.find(e => e.username === user && e.password === pass);

    if (emp) {
      // Save employee name in localStorage
      localStorage.setItem("employeeName", emp.name);
      window.location.href = "dashboard.html";
    } else {
      alert("❌ Invalid login, please try again.");
    }
  } catch (err) {
    alert("⚠️ Could not load login data.");
    console.error(err);
  }
}
