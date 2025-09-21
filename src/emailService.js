import emailjs from 'emailjs-com';

export function sendNotificationEmail({ to, subject, message }) {
  // Replace with your EmailJS service, template, and user IDs
  const serviceID = 'your_service_id';
  const templateID = 'your_template_id';
  const userID = 'your_user_id';

  const templateParams = {
    to_email: to,
    subject,
    message,
  };

  return emailjs.send(serviceID, templateID, templateParams, userID);
}
