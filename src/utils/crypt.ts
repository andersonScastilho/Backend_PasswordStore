import crypto from "crypto";

const algorithm = "aes-256-gcm";

const secretKey = Buffer.from(process.env.TESTE ?? "", "hex");

const iv = crypto.randomBytes(16);

export const encrypt = (text: string) => {
  try {
    const cipher = crypto.createCipheriv(algorithm, secretKey, iv);

    const encrypted = Buffer.concat([
      cipher.update(text.toString()),
      cipher.final(),
    ]);

    const tag = cipher.getAuthTag();

    return {
      iv: iv.toString("hex"),
      content: encrypted.toString("hex"),
      tag: tag.toString("hex"),
    };
  } catch (e) {
    throw Error("Erro ao criptografar os dados");
  }
};

export const decrypt = (data: { iv: string; content: string; tag: string }) => {
  try {
    const decipher = crypto.createDecipheriv(
      algorithm,
      secretKey,
      Buffer.from(data.iv, "hex")
    );
    decipher.setAuthTag(Buffer.from(data.tag, "hex")); // Define a tag de autenticação.

    const encryptedContent = Buffer.from(data.content, "hex");
    const decrypted = Buffer.concat([
      decipher.update(encryptedContent),
      decipher.final(),
    ]);

    return decrypted.toString("utf8");
  } catch (e) {
    throw new Error("Erro ao descriptografar os dados.");
  }
};
