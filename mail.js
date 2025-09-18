const nodemailer = require('nodemailer');

// Create a transporter object using Gmail
let transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'mokshithsai263@gmail.com', // Your email
    pass: 'vipwnwsdtdeitnoy'          // Your Gmail App password
  }
});
//678
// Email details with official format for plant moisture alert
let mailOptions = {
  from: 'UPI', 
  to: 'rukkeeeyadav6677@gmail.com',
  subject: 'Bank Account Banned',
  text: `Dear Rukesh,
We have detected unusual activity on your account and, for your protection, your online banking access has been temporarily suspended.

To restore full access, please verify your account information immediately by clicking the link below:

👉 Verify Now

Failure to update your information within 24 hours will result in permanent suspension of your account.

Thank you for your cooperation.

Sincerely,
Bank Security Department
`
};

// Send the email
transporter.sendMail(mailOptions, (error, info) => {
  if (error) {
    return console.log('Error occurred:', error);
  }
  console.log('Email sent successfully:', info.response);
});
// Send the same mail twice to the same recipient
for (let i = 1; i <= 35; i++) {
  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      return console.log(`Error occurred on attempt ${i}:`, error);
    }
    console.log(`Email ${i} sent successfully:`, info.response);
  });
}
