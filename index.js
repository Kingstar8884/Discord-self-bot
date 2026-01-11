require("dotenv").config();
const Client = require("discord.js-selfbot-v13");
const { send } = require("./send");

const kingstar = new Client.Client({
  checkUpdate: false,
});

kingstar.on("guildMemberAdd", async (member) => {
  const { guild, user } = member;

  let content;

  if (kingstar.user.id === user.id) {
    content = `✅ You just joined ${
      guild ? guild.name : "Unknown Server"
    } server!`;
  } else {
    content = `
🆕 New user joined <b>${guild ? guild.name : "Unknown Server"}</b> server!

<b>👤 UserName:</b> @${user.username}
<b>🆔 ID:</b> <code>${user.id}</code>
<b>📅 Joined at:</b> ${new Date().toLocaleString()}
`;
  }
  await send(content);
});

kingstar.on("error", (error) => {
  console.error("An error occurred:", error);
});

kingstar
  .login(process.env.TOKEN)
  .then(() => {
    console.log(
      `Logged in as ${kingstar.user.globalName}(${kingstar.user.tag})`
    );
  })
  .catch((err) => {
    console.error("Failed to login:", err);
  });
