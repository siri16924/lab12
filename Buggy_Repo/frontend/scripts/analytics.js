const baseURL = "http://localhost:8000";

async function loadAnalytics() {
  try {
    const res = await fetch(`${baseURL}/analytics`);
    if (!res.ok) throw new Error("Failed to fetch analytics");
    const data = await res.json();
    
    document.getElementById("itemCount").textContent = data.stats.item_count;
    document.getElementById("userCount").textContent = data.stats.user_count;
    document.getElementById("avgItemName").textContent = data.stats.avg_item_name_length.toFixed(2);
    document.getElementById("avgUserName").textContent = data.stats.avg_user_username_length.toFixed(2);
    document.getElementById("maxItemName").textContent = data.stats.max_item_name_length;
    document.getElementById("maxUserName").textContent = data.stats.max_user_username_length;
    
    document.getElementById("plot").src = `data:image/png;base64,${data.plot}`;
  } catch (err) {
    document.getElementById("stats").innerHTML += `<p class="error">Error: ${err.message}</p>`;
  }
}

loadAnalytics();