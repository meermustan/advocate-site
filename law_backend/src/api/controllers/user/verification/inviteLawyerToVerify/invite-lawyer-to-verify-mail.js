import SibApiV3Sdk from "sib-api-v3-sdk";

export default async function inviteLawyerToVerifyEmail({
  userName,
  email,
  subject,
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
  sendSmtpEmail.htmlContent = InvitationBody({userName})

  try {
    await apiInstance.sendTransacEmail(sendSmtpEmail);
    
    return {
      success: true,
      message: "Email sent"
    }
  } catch (error) {
    const errorMessage = error?.response?.error?.text || error?.message;
    console.log('error', error?.response?.error || error?.message);
    return {
      success: false,
      message: errorMessage
    }
  }
}

function InvitationBody({userName}) {


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
  
          .verfied-image-outer {
            margin-top: 20px;
            max-width:100px;
            max-height: 100px;
            margin-bottom: 30px;
            display: flex;
            justify-content: center;
            align-items: center;
            margin-left: auto;
            margin-right: auto;

          }
  
          .button {
              display: inline-block;
              padding: 10px 20px;
              background-color: #aa0505;
              color: #ffffff !important;
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
          <h2>Hello ${userName}👋🏻 ,Verify your details now!</h2>
          <div class="verfied-image-outer">
              <img src="https://cdn-icons-png.flaticon.com/512/3187/3187927.png" width="80" height="80"/>
          </div>
          <p>Invitation to verify your account now! You'll be able to submit proposals to cases and have your profile enhanced and accessible to users!</p>
          <a class="button" href="https://advocateiron.tech/lawyer-profile">Verify now!</a>
      </div>
  </body>
  
  <script>
    // Dynamically set the current year
    document.getElementById('currentYear').textContent = new Date().getFullYear();
  </script>
  </html>
  `;
}
