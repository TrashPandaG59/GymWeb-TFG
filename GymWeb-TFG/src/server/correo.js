// Si usas módulos:
import emailjs from '@emailjs/browser'; 

// Inicializa EmailJS
emailjs.init("g1r6pPUPTnTfbZrt-"); // Reemplaza con tu clave pública de EmailJS

function enviarCorreoConfirmacion({
  recipientEmail,
  confirmLink
}) {
  if (!recipientEmail) {
    console.error("El parámetro 'recipientEmail' es obligatorio.");
    return;
  }

const templateParams = {
  to_email: recipientEmail,
  confirm_link: confirmLink // ✅ el nombre debe coincidir
};


  emailjs.send("service_m0vsrok", "template_imvq4sc", templateParams)
    .then(function (response) {
      console.log("Correo enviado correctamente:", response.status, response.text);
    }, function (error) {
      console.error("Error al enviar correo:", error);
    });
}

export const enviarCorreo = (correo, newURL) => {
  enviarCorreoConfirmacion({
    recipientEmail: correo,
    confirmLink: newURL
  });
};
