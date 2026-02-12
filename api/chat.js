export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).send("Method not allowed");
  }

  const { message } = req.body;

  try {
    const response = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${process.env.OPENAI_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: "gpt-4o-mini",
        messages: [
          {
            role: "system",
            content: "You are RocketBot, an expert in rockets, propulsion, avionics, astrophysics, and orbital mechanics."
          },
          { role: "user", content: message }
        ]
      }),
    });

    const data = await response.json();
    res.status(200).json({ reply: data.choices[0].message.content });

  } catch (err) {
    res.status(500).json({ reply: "RocketBot encountered an error." });
  }
}
