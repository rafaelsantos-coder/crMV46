const http = require('http');
const fs = require('fs');
const path = require('path');

const PORT = process.env.PORT || 3000;

const GOOGLE_CALENDAR_CLIENT_ID = '786355285772-0hujrij5hpadrddjq9konaci7825ljr8.apps.googleusercontent.com';
const GOOGLE_AUTHORIZED_ORIGINS = 'http://localhost:3000,https://sistema-integrado-crm-production.up.railway.app';

function sendJson(res, statusCode, data) {
  const body = JSON.stringify(data, null, 2);
  res.writeHead(statusCode, {
    'Content-Type': 'application/json; charset=utf-8',
    'Content-Length': Buffer.byteLength(body)
  });
  res.end(body);
}

function sendHtml(res) {
  const html = fs.readFileSync(path.join(__dirname, 'public', 'index.html'), 'utf8');
  res.writeHead(200, {
    'Content-Type': 'text/html; charset=utf-8',
    'Cache-Control': 'no-store'
  });
  res.end(html);
}

function clientIdLooksValid(clientId) {
  return /^[0-9]+-[a-zA-Z0-9_-]+\.apps\.googleusercontent\.com$/.test(clientId);
}

const server = http.createServer((req, res) => {
  try {
    const url = new URL(req.url, `http://${req.headers.host}`);

    if (url.pathname === '/health') {
      return sendJson(res, 200, {
        ok: true,
        app: 'Sistema Integrado Sulnet',
        version: 'v46',
        googleCalendarConfigured: true,
        googleClientIdLooksValid: clientIdLooksValid(GOOGLE_CALENDAR_CLIENT_ID),
        authorizedOrigins: GOOGLE_AUTHORIZED_ORIGINS
      });
    }

    if (url.pathname === '/api/config') {
      return sendJson(res, 200, {
        googleCalendarConfigured: true,
        googleClientIdLooksValid: clientIdLooksValid(GOOGLE_CALENDAR_CLIENT_ID),
        googleClientId: GOOGLE_CALENDAR_CLIENT_ID,
        authorizedOrigins: GOOGLE_AUTHORIZED_ORIGINS,
        mode: 'hardcoded-in-files'
      });
    }

    return sendHtml(res);
  } catch (error) {
    console.error(error);
    return sendJson(res, 500, {
      ok: false,
      error: 'Erro interno ao carregar o Sistema Integrado Sulnet'
    });
  }
});

server.listen(PORT, '0.0.0.0', () => {
  console.log(`Sistema Integrado Sulnet v46 rodando na porta ${PORT}`);
  console.log(`Google Client ID gravado: ${GOOGLE_CALENDAR_CLIENT_ID}`);
  console.log(`Origens autorizadas gravadas: ${GOOGLE_AUTHORIZED_ORIGINS}`);
});
