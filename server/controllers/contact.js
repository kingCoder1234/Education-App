import nodemailer from "nodemailer";

export const contact = async (req, res) => {
  const { name, email, subject, message } = req.body;

  // Validate input fields
  if (!name || !email || !subject || !message) {
    return res.status(400).json({ error: "All fields are required" });
  }

  try {
    // Check if environment variables are set
    const { Gmail, Password } = process.env;
    if (!Gmail || !Password) {
      return res
        .status(500)
        .json({ error: "Gmail credentials are not configured" });
    }

    // Set up nodemailer transporter with Gmail service
    let transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: Gmail,
        pass: Password,
      },
    });

    // Prepare HTML content for the email
    const htmlContent = `
      <!DOCTYPE html>
      <html lang="en">
      <head>
          <meta charset="UTF-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <title>Contact Us Form Submission</title>
          <style>
              body {
                  font-family: Arial, sans-serif;
                  margin: 0;
                  padding: 0;
                  display: flex;
                  justify-content: center;
                  align-items: center;
                  height: 100vh;
                  background-color: #f4f4f4;
              }
              .container {
                  background-color: #fff;
                  padding: 20px;
                  border-radius: 8px;
                  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
                  text-align: left;
              }
              h1 {
                  color: #4CAF50;
              }
              h5 {
                  color: #333;
              }
              p {
                  color: #666;
              }
              .message-content {
                  margin-top: 20px;
              }
          </style>
      </head>
      <body>
          <div class="container">
              <h1>Contact Us Submission</h1>
              <h5>Name: ${name},</h5>
              <p><strong>Email:</strong> ${email}</p>
              <div class="message-content">
                  <p><strong>Subject:</strong> ${subject}</p>
                  <p><strong>Message:</strong> ${message}</p>
              </div>
          </div>
      </body>
      </html>
    `;

    // Define mail options
    const mailOptions = {
      from: email,
      to: Gmail, // Send email to admin's Gmail account
      subject: "Contact Us Form Submission",
      html: htmlContent, // Send HTML content
    };

    // Send the email using nodemailer
    await transporter.sendMail(mailOptions);

    // Respond to the client
    res.status(200).json({ message: "Message sent successfully" });
  } catch (error) {
    console.error("Error sending email:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};
