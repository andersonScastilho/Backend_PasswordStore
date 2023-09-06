declare class SendEmail {
    private readonly _recipient;
    private readonly _subject;
    private readonly _text;
    private readonly sender;
    constructor(_recipient: string, _subject: string, _text: string);
    sendEmail(): void;
}
export default SendEmail;
