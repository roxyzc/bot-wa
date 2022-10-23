import { Client, LocalAuth } from "whatsapp-web.js";
import qrcode from "qrcode-terminal";

const client = new Client({
  authStrategy: new LocalAuth(),
});

client.on("qr", (qr) => {
  qrcode.generate(qr, { small: true });
});

client.on("ready", () => {
  console.log("Client is ready");
});

client.on("message", async (msg) => {
  if (msg.body.toLowerCase() === "do") {
    msg.reply("iya ada apa -Bot roxyzc-");
  }
  if (msg.body.startsWith("!s") && msg.type === "image") {
    let media;
    try {
      media = await msg.downloadMedia();
    } catch (error: any) {
      console.error(error.message);
      return msg.reply("Proses gagal");
    }
    client.sendMessage(msg.from, media, {
      sendMediaAsSticker: true,
      stickerAuthor: "roxyzc",
    });
  }
});

client.initialize();
