const nodemailer = require('nodemailer')

const { settings } = require('../settings')

const { Client } = require('pg')

const ini = ` <!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta http-equiv="X-UA-Compatible" content="IE=edge" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <style>
        * {
          box-sizing: border-box;
          margin: 0;
          padding: 0;
          
        }
  
        body {
          font-family: 'Roboto', sans-serif;
          font-size: 16px;
          line-height: 1.5;
          color: #707070;
        }
  
        .app {
          max-width: 500px;
          margin: 0 auto;
        }
  
        .header {
          margin: 40px 0;
          padding: 30px;
          background-color: #005182;
        }
  
        .logo {
          max-width: 100%;
        }
  
        .titulo2 {
          margin: 40px 30px 20px;
          font-weight: bold;
        }
  
        .titulo3 {
          margin: 0 30px 20px;
          font-weight: bold;
        }
  
        .titulo3 a {
          color: #005182;
          text-decoration: none;
        }
  
        .titulo4 {
          margin: 0 30px;
          font-size: 0.8rem;
          color: #005182;
        }
        .titulo5 {
          margin: 0 30px;
          font-size: 0.8rem;
          color: #005182;
        }
  
        .footer {
          margin: 40px 0;
          padding: 30px;
          font-size: 0.8rem;
          background-color: #005182;
          color: #fff;
          text-align: center;
        }
  
        .footer a {
          color: #005182;
          text-decoration: none;
        }
  
        .footer a:hover {
          text-decoration: underline;
        }
      </style>
  </head>
  <body>
    <div class="app">
    <div class="header">
    <img class="logo" src="${settings.publicUrl}/source/assets/logo.png" alt="Logo" />
  </div>`

const fin = ` <div class="footer">
Este correo electrónico fue enviado automáticamente. Por favor, no respondas a este correo electrónico. Para más información, visita nuestro sitio web:<br/> <a href=${settings.publicUrl}>${settings.publicUrl}</a>.
</div>
</div>
</body>
</html>`

const templateHead = `<!DOCTYPE html> <html lang="en"> <head>
<meta charset="UTF-8">
<meta http-equiv="X-UA-Compatible" content="IE=edge">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<style> .flex { display: flex; }
    .x_center { align-items: center; }
    .y_center { justify-content: center; }
    .header { background-color: #007994; height: 20%; width: 100%; padding: 20px; }
    .body { flex-direction: column; background-color: #fff; color: black; padding: 20px;}
    .footer {flex-direction: column;padding-top: 20px;}
    .final-line { margin-top: 10px; height: 10px; background-color: #007994; width: 100%; }
    .botton-activate { display: flex; justify-content: center; align-items: center; color: #fff; background-color: #007994; border-radius: 5px; width: 120px; height: 40px;}
    .botton-activate:hover { cursor: pointer;}
    .strong { font-weight: bold; }
    .image_container { padding: 5px; width: 50%; align-self: center; justify-self: center; }
</style> </head>
<body> <div class="flex">
    <div class="flex x_center y_center header"> <div> <img src="${settings.publicUrl}/source/assets/icons/bna_conecta_footer_logo.svg" alt="BNA Conecta"> </div> </div>
</div>`

function getBDConnection () {
  return new Client({
    user: String(settings.dbUser),
    host: String(settings.dbHost),
    database: String(settings.dbName),
    password: String(settings.dbPassword),
    port: 5432
  })
}

function getEmail (toEmail, toSubject, content) {
  return {
    from: settings.nodemailerSmtpEmail,
    to: toEmail,
    subject: toSubject,
    html: content
  }
}

const transporter = nodemailer.createTransport({
  host: settings.nodemailerSmtpHost,
  secure: false,
  tls: {
    ciphers: 'SSLv3'
  },
  port: settings.nodemailerSmtpPort,
  auth: {
    user: settings.nodemailerSmtpEmail,
    pass: settings.nodemailerSmtpPassword
  }
})

function sendWelcomeEmail (newCustomer) {
  const content = customerWelcomeContent(newCustomer)
  const email = getEmail(newCustomer.email, 'Bienvenido a BNA Conecta', content)
  transporter.sendMail(email)
}

function sendSellerWelcomeEmail (newStore) {
  const content = storeWelcomeEmailContent(newStore)
  const email = getEmail(newStore.email, 'Bienvenido a BNA Conecta', content)
  transporter.sendMail(email)
}

function customerWelcomeContent (newCustomer) {
  const nombre = newCustomer.nombre

  return `${ini}
        <div class="flex body">
            <h4> Hola ${nombre}</h4>
            <p>
                Te registraste correctamente en BNA Conecta como Usuario Comprador
            </p>
            <p>
                A partir de ahora, recordá que podés crear los Usuarios Colaboradores que necesites, teniendo en cuenta que
                tendrán los mismos accesos
                y funcionalidades que vos.
            </p>
            <p>
                No obstante, para cada Compra cada uno de esos Usuarios deberá cargar los datos
                correspondientes del medio de pago que utilice.
            </p>
            <p>
                No te olvides que si compras con las
                Tarjetas PYMEnación o AgroNación deberás realizar la validación de dicho consumo a través
                del canal de Autoconsulta de PYMEnación o AgroNación según corresponda
            </p>
            <p>
                Te sugerimos visitar nuestras <a href="https://bnaconecta.com.ar/preguntasfrecuentes"> preguntas frecuentes</a>
            </p>
            <p>
                Si tenés alguna duda ingresa tu consulta a través del portal BNA Conecta en la sección
                <a href="https://bnaconecta.com.ar/ayuda"> "Ayuda" </a> o comunicate al 0810-444-0081 de lunes a Viernes de 8:00 a las 20:00 hs
            </p>
        </div>
        <div class="flex x_center y_center footer">
            <p> Saludos, equipo BNA CONECTA.</p>
            <div class="final-line"></div>
        </div>}
        ${fin}
    `
}

function storeWelcomeEmailContent (newStore) {
  const nombre = newStore.nombre
  const registrarUrl = 'https://bnaconecta.com.ar/auth/registerbna'

  return `${templateHead}
        <div class="flex body">
            <h4> Hola ${nombre}</h4>
            <p>
            Un/a representante autorizado/a de tu empresa te confió la designación como Usuario/a
            responsable para operar en el portal BNA Conecta.
        </p>
        <p>
            Para comenzar tenés que crear un Usuario y Clave ingresando a: <a href="${registrarUrl}"> bnaconecta.com/registro. </a>
        </p>
        <p>
            Recordar tener a mano tu documento, ya que te pediremos algunos datos para validar tu identidad.
        </p>
        <p>
            Te sugerimos visitar nuestras <a href="https://bnaconecta.com.ar/preguntasfrecuentes"> preguntas frecuentes</a>
        </p>
        <p>
            Si tenés alguna duda ingresa tu consulta a través del portal BNA Conecta en la sección
            <a href="https://bnaconecta.com.ar/ayuda"> "Ayuda" </a> o comunicate al 0810-444-0081 de lunes a Viernes de 8:00 a las 20:00 hs
        </p>
        <p>
            Gracias por unirte a BNA CONECTA.
        </p>
        <a href="" class="botton-activate"> Activacion! </a>
        </div>
        <div class="flex x_center y_center footer">
            <p> Saludos, equipo BNA CONECTA.</p>
            <div class="final-line"></div>
        </div>
    </body>
    </html>`
}

async function getContentBudgetEmail (budgetId) {
  const client = getBDConnection()
  await client.connect()

  const selectQuery = 'SELECT c.nombre AS "nombreComprador", b.description AS "solicitud", p.nombre AS "nombreProducto", s.nombre AS "nombreTienda", p.images FROM budgets b INNER JOIN customers c ON c.id=b.customer_id INNER JOIN stores s ON s.id=b.store_id INNER JOIN products p ON b.product_id=p.id WHERE b.id = $1 LIMIT 1;'

  const result = await client.query(selectQuery, [budgetId])
  await client.end()

  const info = result.rows[0]

  if (!result) {
    throw Error('No se encontraron datos o sin conexion a la base de datos')
  }

  const imgProduct = info.images[0] ? `<div class="image_container"> <img src="${info.images[0]}"> </div>` : ''

  return `
  ${ini}
    <div class="titulo2">Hola <span> ${info.nombreTienda}</span></div>
    <div class="titulo2">Hemos registrado que tienes una solicitud de presupuesto en la publicación <b>${info.nombreProducto}</b>.</div>
    <div>Solicitud:</div>
    <div class="titulo3">
      <div class="producto">
        <img src=https://storage.googleapis.com/nssa-gke-testing-001-testing-bnaconecta/products/${imgProduct}>
      </div>
      <p>${info.nombreProducto} </p>
      <p><b>Solicitud:</b>${info.solicitud}</p>
    </div>
    <div class="titulo4">Contestá en el menor tiempo posible ¡El comprador ${info.nombreComprador} te está esperando!</div>

    <div class="titulo5">Te sugerimos visitar nuestras <a href='/preguntas-frecuentes'>preguntas frecuentes.</a></div>
    <div class="titulo5">Si tenés alguna duda ingresá tu consulta a través del portal BNA Conecta en la sección "Ayuda" o comunicate al 0810-444-0081 de lunes a viernes de 8:00 a 20:00 hs.</div>
    <div class="titulo5">Gracias por utilizar BNA Conecta.</div>
    <div class="titulo5">Saludos.</div>
    <div class="titulo5">Equipo BNA Conecta</div>
    <img class="logo" src="${settings.publicUrl}/source/assets/logo.png" alt="Logo" />
  ${fin}
  `
}

module.exports = { sendWelcomeEmail, sendSellerWelcomeEmail, getContentBudgetEmail }
