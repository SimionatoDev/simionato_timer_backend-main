const express = require('express');
const router = express.Router();
const nodemailer = require('nodemailer');
const UsuarioSrv = require('../services/usuarioServices');

const port = 30777;
const user = 'control_time@simionatoauditores.com.br';
const password = 'uv0Hq0%7*pG^TUhT2qyu';
const smtp = 'mail-ssl.m9.network'
const nome = 'TIMER'

function getHtml(user) {
    const html = `<!DOCTYPE html>
    <html lang="pt-br">
        <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <title>Boas Vindas</title>
            <style>
                  @media screen and (min-width: 601px) {

                        .email_cabecalho {
                            background-color: coral;
                            height: 100px;
                            width: 100%;
                        }
                        .email_img {
                            float: left;
                            margin-right: 10px;
                        }
                        .header2 {
                            color: #0000CC;
                            font-size: 32px;
                            font-family: 'Times New Roman', Times, serif;
                            font-weight: bold;
                            margin-top: 10px;
                            margin-bottom: 10px;
                            text-align: left;
                        }
                        
                        .label_paragrafo {
                            color: black;
                            font-size: 24px;
                            font-family: 'Times New Roman', Times, serif;
                            font-weight: 600;
                            margin-top: 30px;
                            margin-left: 30px;
                            margin-bottom: 10px;
                        }    
                        
                    }
                    @media screen and (max-width: 600px) {
                        .email_cabecalho {
                            background-color: coral;
                            height: 100px;
                        }
                        .email_img {
                            float: left;
                            margin-right: 10px;
                            text-align: end;
                        }
                        .header2 {
                            color: #0000CC;
                            font-size: 14px;
                            font-family: 'Times New Roman', Times, serif;
                            font-weight: bold;
                            margin-top: 5px;
                            margin-bottom: 5px;
                            text-align: left;
                        }
                        
                        .label_paragrafo {
                            color: black;
                            font-size: 12px;
                            font-family: 'Times New Roman', Times, serif;
                            font-weight: 600;
                            margin-top: 10px;
                            margin-left: 10px;
                            margin-bottom: 10px;
                        }    
                        
                    }
            </style>
        </head>
    
        <body>
            <div class="email_cabecalho">
                <div class="email_img">
                    <img src="cid:logo" alt="Logo" />
                </div>
            </div>
            <p class="header2">Prezado(a) ${user.nome}</p>
            <div class="label_paragrafo">
                <p class="label_paragrafo">Este E-Mail tem apenas o intuito de validar as rotinas de envio de e-mails.</p>
                <p class="label_paragrafo">Por esta razão solicito a gentiliza de responder com um simples "OK" ou "Ciente"</p>
                <p class="label_paragrafo">Em breve você receberá outro e-mail, para que seja feita uma atualização cadastral, bem como a digitação da senha."</p>
            </div>
            <div class="label_paragrafo">
                <p class="label_paragrafo">Por enquanto agradeço a atenção,</p>
            </div>
            <div class="label_paragrafo">
                <p class="label_paragrafo">Sistema Timer.</p>
            </div>
        </body>
        
    </html>`;

    return html;
}

router.post('/api/emailOla', async function(req, res) {
    /*
        {
             public id_empresa: number = 0;
             public users: UserEmail[] = [];
             public mensagem: string = '';
             public html: string = '';
        }
    */
    const params = req.body;

    const transporter = nodemailer.createTransport({
        host: smtp,
        port: 465,
        secure: true,
        auth: { user: user, pass: password },
    });

    console.log(params);

    for (id = 0; id < params.users.length; id++) {
        result = await transporter.sendMail({
            from: user,
            to: ['falconi.2050@gmail.com', params.users[id].email],
            subject: "Boas Vindas",
            html: getHtml(params.users[id]),
            attachments: [{
                filename: 'simionato_logo.png',
                path: __dirname + '/../img/simionato_logo.png',
                cid: 'logo'
            }]
        });
    }

    res.status(200).json({ rejected: 10, accepted: 10 });
})


/* Exemplo de attachments

  result = await transporter.sendMail({
        from: user,
        to: ['falconi.2050@gmail.com', 'marcosfalconi64@gmail.com'],
        subject: "Dados Pessoais",
        html: getHtml(),
        attachments: [{
            filename: 'simionato_logo.png',
            path: __dirname + '/../img/simionato_logo.png'
        }]


    });
*/
module.exports = router;