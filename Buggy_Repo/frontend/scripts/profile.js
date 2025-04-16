const baseURL = "http://localhost:8000";

async function loadUsers() {
  try {
    const res = await fetch(`${baseURL}/users`);
    if (!res.ok) throw new Error("Failed to fetch users");
    const users = await res.json();
    const list = document.getElementById("userList");
    list.innerHTML = "";
    
    const filteredUsers = users.slice(0, 1); // Limit to one user
    document.getElementById("userCount").textContent = `Total users: ${filteredUsers.length}`;
    filteredUsers.forEach(user => {
      const li = document.createElement("li");
      li.textContent = `${user.username}: ${user.bio}`;

      const deleteBtn = document.createElement("button");
      deleteBtn.textContent = "Delete";
      deleteBtn.setAttribute("aria-label", `Delete ${user.username}`);
      deleteBtn.onclick = async () => {
        await fetch(`${baseURL}/users/${user._id}`, { method: "DELETE" });
        loadUsers();
      };

      li.appendChild(deleteBtn);
      list.appendChild(li);
    });
  } catch (err) {
    document.getElementById("userList").innerHTML += `<p class="error">Error: ${err.message}</p>`;
  }
}

document.getElementById("userSearch").addEventListener("input", async (e) => {
  const term = e.target.value.toLowerCase();
  try {
    const res = await fetch(`${baseURL}/users`);
    if (!res.ok) throw new Error("Failed to fetch users");
    const users = await res.json();
    const list = document.getElementById("userList");
    list.innerHTML = "";

    const filteredUsers = users.filter(user => user.username.toLowerCase().includes(term)).slice(0, 1);
    document.getElementById("userCount").textContent = `Total users: ${filteredUsers.length}`;

    filteredUsers.forEach(user => {
      const li = document.createElement("li");
      li.textContent = `${user.username}: ${user.bio}`;

      const deleteBtn = document.createElement("button");
      deleteBtn.textContent = "Delete";
      deleteBtn.setAttribute("aria-label", `Delete ${user.username}`);
      deleteBtn.onclick = async () => {
        await fetch(`${baseURL}/users/${user._id}`, { method: "DELETE" });
        loadUsers();
      };

      li.appendChild(deleteBtn);
      list.appendChild(li);
    });
  } catch (err) {
    document.getElementById("userList").innerHTML += `<p class="error">Error: ${err.message}</p>`;
  }
});

loadUsers();

document.getElementById("userForm").addEventListener("submit", async (e) => {
  e.preventDefault();
  const username = document.getElementById("username").value.trim();
  const bio = document.getElementById("bio").value.trim();
  if (!username || !bio) {
    document.getElementById("userList").innerHTML += `<p class="error">Username and bio are required</p>`;
    return;
  }
  try {
    await fetch(`${baseURL}/users`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ username, bio })
    });
    e.target.reset();
    loadUsers();
  } catch (err) {
    document.getElementById("userList").innerHTML += `<p class="error">Error: ${err.message}</p>`;
  }
});