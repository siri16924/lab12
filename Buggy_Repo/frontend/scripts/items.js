const baseURL = "http://localhost:8000";

async function loadItems(searchTerm = "") {
  try {
    const res = await fetch(`${baseURL}/items`);
    if (!res.ok) throw new Error("Failed to fetch items");
    const data = await res.json();
    const list = document.getElementById("itemList");
    list.innerHTML = "";

    const filteredItems = data.filter(item =>
      item.name.toLowerCase().includes(searchTerm.toLowerCase())
    ).slice(0, 1); // Limit to one item

    document.getElementById("itemCount").textContent = `Total items: ${filteredItems.length}`;

    filteredItems.forEach(item => {
      const li = document.createElement("li");
      li.textContent = `${item.name}: ${item.description}`;
      const del = document.createElement("button");
      del.textContent = "Delete";
      del.setAttribute("aria-label", `Delete ${item.name}`);
      del.onclick = () => deleteItem(item._id);
      li.appendChild(del);
      list.appendChild(li);
    });
  } catch (err) {
    document.getElementById("itemList").innerHTML += `<p class="error">Error: ${err.message}</p>`;
  }
}

async function deleteItem(id) {
  try {
    await fetch(`${baseURL}/items/${id}`, { method: "DELETE" });
    loadItems(document.getElementById("itemSearch").value);
  } catch (err) {
    document.getElementById("itemList").innerHTML += `<p class="error">Error: ${err.message}</p>`;
  }
}

document.getElementById("itemSearch").addEventListener("input", (e) => {
  loadItems(e.target.value);
});

document.getElementById("itemForm").addEventListener("submit", async (e) => {
  e.preventDefault();
  const name = document.getElementById("name").value.trim();
  const description = document.getElementById("description").value.trim();
  if (!name || !description) {
    document.getElementById("itemList").innerHTML += `<p class="error">Name and description are required</p>`;
    return;
  }
  try {
    await fetch(`${baseURL}/items`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name, description })
    });
    e.target.reset();
    loadItems(document.getElementById("itemSearch").value);
  } catch (err) {
    document.getElementById("itemList").innerHTML += `<p class="error">Error: ${err.message}</p>`;
  }
});

loadItems();