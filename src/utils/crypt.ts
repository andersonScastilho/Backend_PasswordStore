import crypto from "crypto";

const algorithm = "aes-256-ctr";

const secretKey: string = process.env.SECRET_CRYPTO ?? "";
const iv = crypto.randomBytes(16);

export const encrypt = (text: string) => {
  const cipher = crypto.createCipheriv(algorithm, secretKey, iv);

  const encrypted = Buffer.concat([
    cipher.update(text.toString()),
    cipher.final(),
  ]);

  return {
    iv: iv.toString("hex"),
    content: encrypted.toString("hex"),
  };
};

export const decrypt = (hash: string) => {
  const [newIv, text] = hash.split(":");

  const decipher = crypto.createDecipheriv(
    algorithm,
    secretKey,
    Buffer.from(newIv, "hex")
  );

  const decrypted = Buffer.concat([
    decipher.update(Buffer.from(text, "hex")),
    decipher.final(),
  ]);

  return decrypted.toString();
};
