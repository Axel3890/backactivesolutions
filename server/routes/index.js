const { Router } = require("express");
const router = Router();
const { Resend } = require("resend");
const resend = new Resend("re_QtukWrAS_Luw14AGH9QUebnMpAmbxMFov");



router.post("/enviando-email-con-resend-node-express", async (req, res) => {
    console.log(req.body);
    for (const campo in req.body) {
      if (!req.body[campo]) {
        res.send(`Error: El campo ${campo} está vacío.`);
        return;
      }
    }
    const { nombre_cliente, email_cliente, mensaje_cliente } = req.body;
    try {
      const data = await resend.emails.send({
        from: "NodeJS + Express <nodeExpress@resend.dev>",
        to: ["activesolutionselectro@gmail.com"],
        subject: "Email desde Node & Express",
        html: `<p>Hola gente, recibiendo email desde Node con Express 
          datos del Cliente:</p>
          <p>Cliente: ${nombre_cliente}</p> 
          <p>Email: ${email_cliente}</p> 
          <p>Mensaje: ${mensaje_cliente}</p> `,
      });
  
      console.log("Respuesta enviada:", data);
  

    } catch (error) {
      console.error("Error al enviar el correo electrónico:", error);
      res.status(500).json({ error: "Error al enviar el correo electrónico" });
    }
    
  });

module.exports = router;