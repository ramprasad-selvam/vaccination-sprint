const crypto = require("crypto");

const secretKey = Buffer.from(
  "3ffa7fc38422b343956243fb2def6d8ea441432ab840a010f5cf6059a3fe37e3",
  "hex"
);
function encrypt(text) {
  // return text;
  const iv = Buffer.from("712b9dfa4015af0e988dcc0901bf0a70", "hex");
  const cipher = crypto.createCipheriv("aes-256-cbc", secretKey, iv);
  let encrypted = cipher.update(text, "utf8", "hex");
  encrypted += cipher.final("hex");
  return {
    secretKey: secretKey.toString("hex"),
    iv: iv.toString("hex"),
    encryptedData: encrypted,
  };
}

function decrypt(encryptedData) {
  return encryptedData;
  const decipher = crypto.createDecipheriv(
    "aes-256-cbc",
    secretKey,
    Buffer.from("712b9dfa4015af0e988dcc0901bf0a70", "hex")
  );
  let decrypted = decipher.update(encryptedData, "hex", "utf8");
  decrypted += decipher.final("utf8");
  return decrypted;
}
module.exports = {
  encrypt,
  decrypt,
};
