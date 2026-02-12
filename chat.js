async function sendRocketMessage() {
  const input = document.getElementById("rocketInput");
  const chatbox = document.getElementById("rocketChat");

  const message = input.value.trim();
  if (!message) return;

  chatbox.innerHTML += `<p><strong>You:</strong> ${message}</p>`;
  input.value = "";
  chatbox.scrollTop = chatbox.scrollHeight;

  const res = await fetch("/api/chat", {
    method: "POST",
    headers: {"Content-Type": "application/json"},
    body: JSON.stringify({ message }),
  });

  const data = await res.json();

  chatbox.innerHTML += `<p><strong>RocketBot:</strong> ${data.reply}</p>`;
  chatbox.scrollTop = chatbox.scrollHeight;
}
