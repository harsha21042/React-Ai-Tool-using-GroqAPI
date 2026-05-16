export const getAIResponse = async(currentQuestion) => {
     const response = await fetch(
      "https://api.groq.com/openai/v1/chat/completions",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${import.meta.env.VITE_GROQ_API_KEY}`
        },
        body: JSON.stringify({
          model: "openai/gpt-oss-120b",
          messages: [
            {
              role: "user",
              content: currentQuestion
            }
          ]
        })
      }
    )

    if (!response.ok) {
      throw new Error("API request failed")
    }

    let data = await response.json()

    let botAns = data?.choices?.[0]?.message?.content

    if (!botAns) {
      throw new Error("Invalid AI response")
    }

    return botAns
}