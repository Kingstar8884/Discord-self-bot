require("dotenv").config();
const { Client } = require("discord.js-selfbot-v13");
const { send } = require("./send");

const kingstar = new Client({
  checkUpdate: false,
});

const sendTicketMessage = async (data) => {
  console.log(data);
  const { type, guild, creator, creatorId, msg } = data;
  const content = `
🎫 <b>${type}</b> created in <b>${guild}</b> server!

<b>👤 Creator:</b> @${creator}
${creatorId ? `<b>🆔 ID:</b> <code>${creatorId}</code>` : ""}
${msg ? `<b>💬 Message:</b> <i>${msg}</i>` : ""}
<b>📅 Created at:</b> ${new Date().toLocaleString()}
`;
  await send(content, data.topicId);
};

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
  await send(content, 2);
});

kingstar.on("channelCreate", async (channel) => {
  if (!channel.guild) return;

  const text = `${channel.name} ${channel.topic || ""}`.toLowerCase();

  const isTicket =
    text.includes("ticket") ||
    text.includes("support") ||
    text.includes("help") ||
    text.includes("created by") ||
    /ticket\s?#\d+/i.test(text);

  if (!isTicket) return;

  const match = channel.topic?.match(/<@(\d+)>/);

  const creatorId = match?.[1] || null;

  const [id, ...rest] = channel.name.split("-");
  const creator = rest.join("-") || "Unknown User";

  sendTicketMessage({
    type: "Channel Ticket",
    guild: channel.guild.name,
    creator,
    creatorId,
    topicId: 3
  });
});

kingstar.on("threadCreate", (thread) => {
  if (!thread.guild) return;
  console.log("🧵 THREAD TICKET", thread);
  sendTicketMessage({
    type: "Thread Ticket",
    guild: thread.guild.name,
    creator: thread.name,
    topicId: 3
  });
});

kingstar.on("messageCreate", async (message) => {
  if (!message.guild || message.author.bot) return;

  const cryptoSignals = [
    "crypto problem",
    "crypto issue",
    "crypto help",
    "wallet issue",
    "wallet problem",
    "transaction failed",
    "tx failed",
    "transaction stuck",
    "tx stuck",
    "pending transaction",
    "pending tx",
    "crypto not received",
    "coins not received",
    "funds missing",
    "money missing",
    "payment not confirmed",
    "sent crypto not received",
    "wrong wallet address",
    "wrong address crypto",
    "double payment",
    "gas fee too high",
    "gas too high",
    "high gas fee",
    "insufficient gas",
    "not enough gas fee",
    "tx hash not found",
    "transaction hash not found",
    "withdrawal failed",
    "withdraw failed",
    "deposit not showing",
    "deposit not received",
    "wallet hacked",
    "my wallet hacked",
    "crypto stolen",
    "funds stolen",
    "money stolen crypto",
    "unauthorized transaction",
    "suspicious transaction",
    "private key lost",
    "lost private key",
    "seed phrase lost",
    "lost seed phrase",
    "wallet locked",
    "cannot access wallet",
    "cant access wallet",
    "unable to access wallet",
    "phishing scam crypto",
    "crypto phishing",
    "fake crypto site",
    "fake website crypto",
    "exchange not responding",
    "exchange down",
    "account frozen",
    "account locked crypto",
    "withdrawal suspended",
    "withdraw suspended",
    "kyc failed",
    "kyc verification failed",
    "unable to trade",
    "cant trade crypto",
    "liquidity issues",
    "no liquidity",
    "order not executed",
    "order failed",
    "funds stuck",
    "funds stuck on exchange",
    "crypto scam",
    "is this a scam",
    "rug pull",
    "got rugged",
    "fake token",
    "scam token",
    "scam project",
    "presale scam",
    "pump and dump",
    "ponzi crypto",
    "fake airdrop",
    "airdrop scam",
    "investment scam crypto",
    "phishing link crypto",

    "token price crashed",
    "price crashed crypto",

    "lost money in crypto",
    "lost my money crypto",
    "bad investment crypto",

    "token dumped",
    "liquidity removed",

    "devs disappeared",
    "devs gone",
    "project abandoned",

    "smart contract error",
    "contract error",

    "failed swap",
    "swap failed",

    "slippage too high",
    "high slippage",

    "liquidity pool error",

    "rpc error",
    "node error",
    "node issue",

    "network not supported",
    "wrong network",
    "blockchain delay",
    "network congestion",

    "urgent help crypto",
    "need help now",
    "help me crypto",

    "support not replying",
    "no response support",
    "customer service crypto",
    "ticket not answered",

    "refund crypto",
    "i want refund crypto",

    "crypto presale",
    "token presale",
    "buy presale token",
    "join presale",
    "how to join presale",

    "presale not received",
    "presale tokens missing",
    "presale allocation",

    "claim presale tokens",
    "claim my tokens",
    "presale claim issue",
    "cant claim tokens",
    "cannot claim tokens",

    "presale wallet connect issue",
    "wallet not connecting",

    "presale payment failed",
    "presale transaction failed",
    "presale bonus not received",

    "whitelist presale",

    "early investor crypto",
    "seed round crypto",
    "private sale crypto",

    "token launch date",
    "tge date",
    "when is launch",
    "wen launch",

    "presale ending",
    "presale price",
    "tokenomics",

    "soft cap hard cap",
    "liquidity lock",

    "vesting schedule",
    "roadmap crypto",
    "audit crypto project",

    "legit presale",
    "is this presale legit",
    "best crypto presale",
    "upcoming crypto launch",
    "new token launch",
    "dex launch",

    "staking rewards",
    "staking issues",
    "unstaking",
    "vesting",
  ];

  if (
    !message.content ||
    !cryptoSignals.some((signal) =>
      message.content.toLowerCase().includes(signal),
    )
  )
    return;

  sendTicketMessage(
    {
      type: "Crypto Issue",
      guild: message.guild.name,
      creator: message.author.username,
      creatorId: message.author.id,
      msg: message.content,
      topicId: 4
    },
    true,
  );
});

kingstar.on("error", (error) => {
  console.error("An error occurred:", error);
});

kingstar
  .login(process.env.TOKEN)
  .then(() => {
    console.log(
      `Logged in as ${kingstar.user.globalName}(${kingstar.user.tag})`,
    );
  })
  .catch((err) => {
    console.error("Failed to login:", err);
  });
