import SibApiV3Sdk from "sib-api-v3-sdk";

export default async function sendCodeToEmail({
  email,
  subject,
  verificationCode,
  mode = "registration"
}) {
  const defaultClient = SibApiV3Sdk.ApiClient.instance;
  let apiKey = defaultClient.authentications["api-key"];
  apiKey.apiKey = process.env.SIB_API_KEY;

  let apiInstance = new SibApiV3Sdk.TransactionalEmailsApi();
  let sendSmtpEmail = new SibApiV3Sdk.SendSmtpEmail();

  const sender = {
    email: "noreply@advocateiron.tech",
    name: "AdvocateIron",
  };
  const to = [{
    email,
  }];

  sendSmtpEmail.sender = sender;
  sendSmtpEmail.to = to;
  sendSmtpEmail.subject = subject;
  sendSmtpEmail.htmlContent = VerificationBody({ verificationCode, mode });

  try {
    await apiInstance.sendTransacEmail(sendSmtpEmail);
    
    return {
      success: true,
      message: "Email sent"
    }
  } catch (error) {
    const errorMessage = error?.response?.error?.text || error.message;
    console.log('error', error?.response?.error || error.message);
    return {
      success: false,
      message: errorMessage
    }
  }
}

function VerificationBody({ verificationCode, mode }) {

  const textMode = mode === 'registration' ? 'registration' : 'password reset';

  return `
  <!DOCTYPE html>
  <html lang="en">
  
  <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>Email Verification Code</title>
      <style>
          body {
              font-family: 'Arial', sans-serif;
              background-color: #f4f4f4;
              padding: 20px;
              text-align: center;
          }
  
          .container {
              max-width: 600px;
              margin: 0 auto;
              background-color: #ffffff;
              padding: 20px;
              border-radius: 8px;
              box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
              text-align: center;
          }
  
          h2 {
              color: #333;
          }
  
          p {
              color: #555;
              line-height: 1.6;
          }
  
          .header-image {
              max-width: 30%;
              height: auto;
          }
  
          .verification-code {
              font-size: 24px;
              font-weight: bold;
              color: #AA0505;
              margin-bottom: 20px;
          }
  
          .button {
              display: inline-block;
              padding: 10px 20px;
              background-color: #007bff;
              color: #ffffff;
              text-decoration: none;
              border-radius: 4px;
          }
  
          .footer {
              margin-top: 20px;
              color: #888;
          }
      </style>
  </head>
  
  <body>
      <div class="container">
          <img src="https://advocateiron.tech/static/media/logo.54648d274fd8c353b970.png" alt="Company Logo" class="header-image">
          <h2>Email Verification Code</h2>
          <p>Please use the following verification code to complete your ${textMode}:</p>
          <div class="verification-code">
            ${verificationCode}
          </div>
          <p>If you didn't request this code, you can safely ignore this email.</p>
          <p>If you have any questions or need assistance, please contact our support team.</p>
          <p class="footer">This email was sent by AdvocateIron. &copy; <span id="currentYear"></span> All rights reserved.</p>
      </div>
  </body>
  
  <script>
    // Dynamically set the current year
    document.getElementById('currentYear').textContent = new Date().getFullYear();
  </script>
  </html>
  `;
}
