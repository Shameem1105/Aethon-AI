async function test() {
  try {
    const res = await fetch("http://localhost:3000/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email: "admin@aethon.com", password: "password" })
    });
    const data = await res.json();
    console.log("Login Response:", data);
  } catch(e) {
    console.error("Fetch error:", e.message);
  }
}
test();
