const otpTemplate = (otp) => {
	return `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
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
            margin: 20px auto;
            background: #ffffff;
            padding: 20px;
            border-radius: 8px;
            box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.1);
            text-align: center;
        }
        .logo {
            margin-bottom: 20px;
        }
        .banner img {
            width: 100%;
            border-radius: 8px;
        }
        .otp {
            display: flex;
            justify-content: center;
            font-size: 24px;
            font-weight: bold;
        }
        .otp div {
            background: #f0f0f0;
            padding: 10px;
            margin: 5px;
            border-radius: 5px;
            width: 40px;
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
            <img src="logo.png" alt="CIRCO Logo" width="80">
        </div>
        <div class="banner">
            <img src="banner.png" alt="CIRCO Banner">
        </div>
        <h2>Hi Lokachi,</h2>
        <p>Here is your One Time Password (OTP).<br>
        Please enter this code to verify your email address for Circo.</p>
        <div class="otp">
            <div>${otp}</div>
        </div>
        <p>OTP will expire in <strong>5 minutes</strong>.</p>
        <p>Best Regards, <br><span style="color: #6c63ff; font-weight: bold;">CIRCO team</span></p>
        <div class="social-icons">
            <a href="#"><img src="instagram.png" alt="Instagram" width="24"></a>
            <a href="#"><img src="facebook.png" alt="Facebook" width="24"></a>
        </div>
        <div class="footer">
            <p>&copy; 2023 CIRCO. All rights reserved.</p>
            <p>You are receiving this mail because you registered to join the CIRCO platform as a user or a creator.<br>
            This also shows that you agree to our Terms of Use and Privacy Policies. If you no longer want to receive mails from us, click the unsubscribe link below.</p>
            <p><a href="#">Privacy Policy</a> | <a href="#">Terms of Service</a> | <a href="#">Help Center</a> | <a href="#">Unsubscribe</a></p>
        </div>
    </div>
</body>
</html> `;
}
module.exports = otpTemplate;
