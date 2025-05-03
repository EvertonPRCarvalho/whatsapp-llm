##Callback de Status de Sessão
Mais detalhes em {@link StatusFind}

| Status            | Condição |
|------------------|------------------------------------------------------------------------------------------------------|
| isLogged         | Quando o usuário já estiver logado no navegador |
| notLogged       | Quando o usuário não estiver conectado ao navegador, é necessário ler o código QR através do celular na opção WhatsApp Web |
| browserClose    | Se o navegador é fechado este parâmetro é retornado |
| qrReadSuccess   | Se o usuário não estiver conectado, o código QR é passado no terminal um callback é retornado. Depois da leitura correta por telefone celular, este parâmetro é retornado |
| qrReadFail      | Se o navegador parar quando a verificação do código QR estiver em andamento, este parâmetro será retornado |
| autocloseCalled | O navegador foi fechado usando o comando AutoClose |
| desconnectedMobile | O cliente se desconectou ao celular |
| serverClose     | O cliente se desconectou ao celular |
| deleteToken     | Se você passar true dentro da função client.getSessionTokenBrowser(true) |