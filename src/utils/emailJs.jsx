import emailjs from "@emailjs/browser";

export const sendMessage = async (templateParams) => {
  const serviceId = "service_aeql2cm";
  const templateId = "template_49tqa76";
  const publicKey = "w6bVXehPSjek_yjv8";

  try {
    const response = await emailjs.send(
      serviceId,
      templateId,
      templateParams,
      publicKey
    );
    return response;
  } catch (error) {
    console.error("Error sending email:", error);
    throw error;
  }
};
