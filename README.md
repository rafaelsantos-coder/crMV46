# Sistema Integrado Sulnet v46

Versão com configuração do Google Calendar gravada diretamente nos arquivos do projeto.

## Configuração Google gravada

Client ID:

```text
786355285772-0hujrij5hpadrddjq9konaci7825ljr8.apps.googleusercontent.com
```

Origens autorizadas:

```text
http://localhost:3000,https://sistema-integrado-crm-production.up.railway.app
```

## Rodar localmente

```bash
node server.js
```

Abra:

```text
http://localhost:3000
```

## Publicar na Railway

Suba todos os arquivos para o GitHub e faça Redeploy na Railway.

Não precisa configurar variáveis de ambiente para o Google nesta versão, porque o Client ID e as origens já estão gravados no código.

## Conferir configuração publicada

Depois do deploy, abra:

```text
https://sistema-integrado-crm-production.up.railway.app/api/config
```

Deve aparecer:

```json
"googleCalendarConfigured": true,
"googleClientIdLooksValid": true,
"mode": "hardcoded-in-files"
```

## Google Cloud

Mesmo com os dados gravados no código, o Google Cloud precisa ter esta origem cadastrada em **Authorized JavaScript origins**:

```text
https://sistema-integrado-crm-production.up.railway.app
```

Sem barra final e sem `/#/agenda`.
