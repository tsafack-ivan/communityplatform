import 'dotenv/config';
import { sendSMS } from "./lib/sms";

(async () => {
  try {
    await sendSMS("+237652360261", "This is a test message from your charity platform!");
    console.log("SMS sent!");
  } catch (error) {
    console.error("Failed to send SMS:", error);
  }
})(); 