import { SESClient, SendEmailCommand } from "@aws-sdk/client-ses";
import type { SendEmailCommandOutput } from "@aws-sdk/client-ses";

const sesClient = new SESClient({
  region: process.env.AWS_REGION,
});

export async function sendEmail(
  to: string,
  subject: string,
  body: string
): Promise<boolean> {
  // Build the SES sendEmail parameters.
  console.log("Sending email to", to);
  console.log("Source email", process.env.SOURCE_EMAIL);
  const params = {
    Source: process.env.SOURCE_EMAIL,
    Destination: {
      ToAddresses: [to],
    },
    Message: {
      Subject: {
        Data: subject,
      },
      Body: {
        Text: { Data: body },
        // To send HTML content, you can include:
        // Html: { Data: `<html><body>${body}</body></html>` },
      },
    },
  };

  try {
    const command = new SendEmailCommand(params);
    const data: SendEmailCommandOutput = await sesClient.send(command);
    console.log("Email sent successfully", data);
    return true;
  } catch (err) {
    console.error("Error sending email", err);
    return false;
  }
}
