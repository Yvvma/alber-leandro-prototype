import type { APIRoute } from 'astro';
import { Resend } from 'resend';

const resend = new Resend(import.meta.env.RESEND_API_KEY);

export const POST: APIRoute = async ({ request }) => {
  const { name, email, phone, marketingConsent } = await request.json();

  if (!name || !email || !marketingConsent) {
    return new Response(JSON.stringify({ error: 'Missing required fields' }), { status: 400 });
  }

  try {
    await resend.emails.send({
      from: 'contato@malcolmvl.com.br',
      to: 'malcolmvlrio@gmail.com',
      subject: `Novo contato via site — ${name}`,
      html: `
        <!DOCTYPE html>
        <html>
        <head>
          <meta charset="utf-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;600;700&display=swap" rel="stylesheet">
        </head>
        <body style="margin:0;padding:0;background-color:#0a0a0a;font-family:'Inter',Arial,sans-serif;">
          <table width="100%" cellpadding="0" cellspacing="0" style="background-color:#0a0a0a;padding:40px 20px;">
            <tr>
              <td align="center">
                <table width="600" cellpadding="0" cellspacing="0" style="max-width:600px;width:100%;">
                  <tr>
                    <td align="center" style="padding-bottom:32px;">
                      <img src="https://res.cloudinary.com/dupiyr9g5/image/upload/v1781272281/vl-logo-v2_ltdkwj.gif" alt="Malcolm VL" style="width:160px;height:auto;border-radius:8px;">
                    </td>
                  </tr>
                  <tr>
                    <td style="background-color:#141414;border-radius:16px;padding:40px;border:1px solid #2a2a2a;">
                      <h1 style="color:#ffffff;font-size:22px;font-weight:600;margin:0 0 8px 0;">Novo contato recebido</h1>
                      <p style="color:#aaaaaa;font-size:14px;font-weight:300;margin:0 0 32px 0;">Alguém enviou um formulário no site.</p>
                      <table width="100%" cellpadding="0" cellspacing="0">
                        <tr>
                          <td style="padding-bottom:20px;">
                            <table width="100%" cellpadding="0" cellspacing="0" style="background-color:#1a1a1a;border-radius:12px;padding:20px;border:1px solid #2a2a2a;">
                              <tr>
                                <td style="padding-bottom:16px;">
                                  <p style="color:#888888;font-size:11px;font-weight:400;text-transform:uppercase;letter-spacing:1px;margin:0 0 4px 0;">Nome</p>
                                  <p style="color:#ffffff;font-size:16px;font-weight:400;margin:0;">${name}</p>
                                </td>
                              </tr>
                              <tr>
                                <td style="padding-bottom:16px;">
                                  <p style="color:#888888;font-size:11px;font-weight:400;text-transform:uppercase;letter-spacing:1px;margin:0 0 4px 0;">E-mail</p>
                                  <p style="color:#ffffff;font-size:16px;font-weight:400;margin:0;">${email}</p>
                                </td>
                              </tr>
                              ${phone ? `
                              <tr>
                                <td style="padding-bottom:16px;">
                                  <p style="color:#888888;font-size:11px;font-weight:400;text-transform:uppercase;letter-spacing:1px;margin:0 0 4px 0;">Telefone</p>
                                  <p style="color:#ffffff;font-size:16px;font-weight:400;margin:0;">${phone}</p>
                                </td>
                              </tr>
                              ` : ''}
                              <tr>
                                <td>
                                  <p style="color:#888888;font-size:11px;font-weight:400;text-transform:uppercase;letter-spacing:1px;margin:0 0 4px 0;">Consentimento de marketing</p>
                                  <p style="color:#4ade80;font-size:14px;font-weight:400;margin:0;">${marketingConsent ? 'Autorizado' : 'Não autorizado'}</p>
                                </td>
                              </tr>
                            </table>
                          </td>
                        </tr>
                      </table>
                    </td>
                  </tr>
                </table>
              </td>
            </tr>
          </table>
        </body>
        </html>
      `,
    });

    return new Response(JSON.stringify({ message: 'Email enviado com sucesso' }), { status: 200 });
  } catch (error) {
    console.error('Erro ao enviar email:', error);
    return new Response(JSON.stringify({ error: 'Falha ao enviar email' }), { status: 500 });
  }
};
