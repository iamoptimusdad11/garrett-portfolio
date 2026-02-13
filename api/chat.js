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
          { role: "system", content: "You are a rocket science expert." },
          { role: "user", content: message }
        ]
      }),
    });

    const data = await response.json();

    if (!response.ok) {
      return res.status(500).json({
        reply: "OpenAI error",
        details: data
      });
    }

    res.status(200).json({ reply: data.choices[0].message.content });

  } catch (error) {
    res.status(500).json({
      reply: "Server error",
      details: error.message
    });
  }
}
