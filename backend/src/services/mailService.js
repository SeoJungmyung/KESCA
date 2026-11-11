/**
 * Mail service stub — logs notifications instead of sending real email.
 * Replace console.log calls with a real mailer (e.g. nodemailer) when ready.
 */

/**
 * Notify about a new inquiry submission.
 * @param {{ name: string, email: string }} inquiry
 */
exports.sendInquiryNotification = async (inquiry) => {
  console.log(`New inquiry from ${inquiry.name} <${inquiry.email}>`);
};
