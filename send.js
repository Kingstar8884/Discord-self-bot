require("dotenv").config();

const send = async (content) => {
    const response = await fetch(`https://api.telegram.org/bot${process.env.TELEGRAM_BOT_TOKEN}/sendMessage`, {
       method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        chat_id: process.env.RECEIVER_CHAT_ID,
        text: content,
      })
    });
  const data = await response.json();
  if (!response.ok){
    console.error("Error sending message:", data.description || error.message);
    return;
  }
  console.log("Update sent to:", data.result.chat);
  return true;
};

module.exports = { send };