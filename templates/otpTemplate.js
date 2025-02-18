const otpTemplate = (otp) => {
	return `<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>OTP Verification Email</title>
    <style>
      body {
        font-family: Arial, sans-serif;
        background-color: #f5f5f5;
        margin: 0;
        padding: 0;
      }
      .container {
        max-width: 600px;
        height: auto;
        margin: 20px auto;
        background: #ffffff;
        padding: 20px;
        position: relative;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        border-radius: 8px;
        box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.1);
        text-align: center;
      }
      .logo {
        margin-bottom: 20px;
        z-index: 50;
      }
      .banner img {
        position: absolute;
        top: 0;
        left: 0;
        border-radius: 8px;
        z-index: 0;
        max-height: 200px;
        width: 100%;
      }
      .main-content {
        padding-top: 20px;
        z-index: 100;
        backdrop-filter: blur(16px) saturate(180%);
        -webkit-backdrop-filter: blur(16px) saturate(180%);
        background-color: rgba(255, 255, 255, 0.5);
        border-radius: 12px;
        border: 1px solid rgba(209, 213, 219, 0.3);
      }
      .otp {
        display: flex;
        justify-content: center;
        align-items: center;
        width: 100%;
        font-size: 24px;
        font-weight: bold;
      }
      .otp div {
        background: #f0f0f0;
        padding: 10px;
        margin: 5px;
        border-radius: 5px;
        width: auto !important;
        text-align: center;
      }
      .footer {
        margin-top: 20px;
        font-size: 12px;
        color: #666;
      }
      .social-icons {
        margin-top: 15px;
      }
      .social-icons a {
        text-decoration: none;
        margin: 0 10px;
      }
    </style>
  </head>
  <body>
    <div class="container">
      <div class="logo">
        <img
          src="https://i.ibb.co/DDqB3Szp/c.png"
          alt="Corporate Cruise Logo"
          width="80"
        />
      </div>
      <div class="banner">
        <img
          src="https://www.shutterstock.com/image-vector/taxi-service-app-advertising-web-260nw-1646408965.jpg"
          alt="Corporate Cruise Banner"
        />
      </div>
      <div class="main-content">
        <h2>Hey User,</h2>
        <p>
          Here is your One Time Password (OTP).<br />
          Please enter this code to verify your email address for Corporate
          Cruise.
        </p>
        <div class="otp">
          <div>${otp}</div>
        </div>
        <p>OTP will expire in <strong>5 minutes</strong>.</p>
        <p>
          Best Regards, <br /><span style="color: #6c63ff; font-weight: bold"
            >Corporate Cruise team</span
          >
        </p>
        <div class="social-icons">
          <a href="#"
            ><img
              src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRF58H8w3pm_H5mgkihLstCFTyhzd3DOzE4pA&s"
              alt="Instagram"
              width="24"
          /></a>
          <a href="#"
            ><img
              src="https://upload.wikimedia.org/wikipedia/commons/thumb/0/05/Facebook_Logo_%282019%29.png/900px-Facebook_Logo_%282019%29.png?20190503112358"
              alt="Facebook"
              width="24"
          /></a>
        </div>
        <div class="footer">
          <p>&copy; 2025 Corporate Cruise. All rights reserved.</p>
          <p>
            You are receiving this mail because you registered to join the
            Corporate Cruise platform as a user or a creator.<br />
            This also shows that you agree to our Terms of Use and Privacy
            Policies. If you no longer want to receive mails from us, click the
            unsubscribe link below.
          </p>
          <p>
            <a href="#">Privacy Policy</a> | <a href="#">Terms of Service</a> |
            <a href="#">Help Center</a> | <a href="#">Unsubscribe</a>
          </p>
        </div>
      </div>
    </div>
  </body>
</html>
 `;
}
module.exports = otpTemplate;
