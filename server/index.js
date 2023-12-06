const express = require("express");
const cors = require("cors");

/**
 * Para el envío de Email
 */
const {Resend} = require("resend");

// Creando una nueva aplicación Express.
const app = express();
const resend = new Resend("re_jHeU9Xvg_49id2FeLWnCxHsKpa9P8nu7Y");
app.use(cors());


app.use(express.json()); // Para analizar JSON en el cuerpo de las solicitudes
app.use(express.urlencoded({ extended: true })); // Para analizar datos de formulario en el cuerpo de las solicitudes


/**
 * Establecer EJS como el Motor de plantillas
 */
app.set("view engine", "ejs");
app.set("views", "./views");



app.post("/enviando-email-con-resend-node-express", async (req, res) => {
  console.log(req.body);
  for (const campo in req.body) {
    if (!req.body[campo]) {
      res.send(`Error: El campo ${campo} está vacío.`);
      return;
    }
  }

  /**
   * Desestructuración de los datos del body
   */
  const { nombre_cliente, email_cliente, mensaje_cliente, asunto } = req.body;
  try {
    const data = await resend.emails.send({
      from: "NodeJS + Express <nodeExpress@resend.dev>",
      to: ["activesolutionselectro@gmail.com"],
      subject: "Email desde Node & Express",
      html: `<p>Correo de la pagina web:
        datos del Cliente:</p>
        <p>Cliente: ${nombre_cliente}</p> 
        <p>Email: ${email_cliente}</p> 
        <p>Asunto: ${asunto}</p>
        <p>Mensaje: ${mensaje_cliente}</p> `,
    });

    console.log("Respuesta enviada:", data);

    // Respuesta JSON después de la redirección
    //res.status(200).json({ data });

    // Redirigir antes de enviar la respuesta JSON
    res.send("todo ok")
  } catch (error) {
    res.status(500).json({ error });
  }
});

// Iniciar el servidor con Express
const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Servidor escuchando en http://localhost:${PORT}`);
});