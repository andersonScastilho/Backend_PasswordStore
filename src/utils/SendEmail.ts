import nodemailer from "nodemailer";

class SendEmail {
  private readonly sender = "passtorageapp@gmail.com";

  constructor(
    private readonly _recipient: string,
    private readonly _subject: string,
    private readonly _text: string
  ) {}

  sendEmail() {
    let transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.MAIL_USERNAME,
        pass: process.env.MAIL_PASSWORD,
      },
    });

    let mailOptions = {
      from: this.sender,
      to: this._recipient,
      subject: this._subject,
      html: this._text,
    };

    transporter.sendMail(mailOptions, function (err, data) {
      if (err) {
        console.log("Error " + err);
      } else {
        console.log("Email sent successfully");
      }
    });
  }
}
export default SendEmail;
