require("dotenv").config();
const Client = require("discord.js-selfbot-v13");
const { send } = require("./send");

const kingstar = new Client.Client({
  checkUpdate: false,
});

kingstar.on("messageCreate", async (message) => {
  console.log(message);
  const { guildId, author, type } = message;

  if (type !== "GUILD_MEMBER_JOIN") return;

  const guild = kingstar.guilds.cache.get(guildId);
  let content;

  if (kingstar.user.id === author.id) {
    content = `✅ You just joined ${
      guild ? guild.name : "Unknown Server"
    }(${guildId}) server!`;
  } else {
    content = `
🆕 New user joined ${guild ? guild.name : "Unknown Server"}(${guildId}) server!

👤 User: ${author.globalName}(@${author.tag})
📅 Joined at: ${new Date().toLocaleString()}
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
