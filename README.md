# Game Play 🎮

Projeto React Native desenvolvido com Expo, configurado para desenvolvimento em ambiente **WSL (Windows Subsystem for Linux)** e execução com **Expo Go**.

---

## 🚀 Como Executar no WSL com Expo Go

Como o projeto está rodando dentro do WSL 2 no Windows, o Metro Bundler pode rodar em uma rede virtual interna (`172.x.x.x`). Para conectar seu celular com o aplicativo **Expo Go**, siga as opções abaixo:

### Opção 1: Modo Tunnel (Recomendado para WSL) 🌟

O modo túnel utiliza o `@expo/ngrok` para criar uma ponte segura entre o WSL e o aplicativo Expo Go no seu smartphone (Android/iOS), sem necessidade de configurações complexas de firewall ou roteamento no Windows.

```bash
npm run start:tunnel
# ou
npx expo start --tunnel
```

1. Abra o **Expo Go** no seu celular.
2. Escaneie o QR Code exibido no terminal (no Android via Expo Go, no iOS via app Câmera).

---

### Opção 2: Modo LAN (Rede Local)

Se você estiver na mesma rede Wi-Fi e tiver configurado o modo espelhado de rede do WSL 2 (`networkingMode=mirrored` no `.wslconfig`) ou redirecionamento de porta:

```bash
npm run start:lan
# ou
npx expo start --lan
```

> **Dica WSL**: Se o Expo Go não conectar via LAN por causa do IP virtual do WSL, defina o IP da sua máquina Windows na variável de ambiente:
> ```bash
> export REACT_NATIVE_PACKAGER_HOSTNAME="SEU_IP_WINDOWS_NA_REDE_WIFI"
> npm start
> ```

---

### Opção 3: Modo Padrão / Emulador

```bash
npm start
```

Pressione as teclas no terminal para interagir:
- `a`: Abrir no emulador Android
- `w`: Abrir versão Web
- `r`: Recarregar o app
- `c`: Limpar cache e reiniciar

---

## 📦 Scripts Disponíveis

| Comando | Descrição |
| :--- | :--- |
| `npm start` | Inicia o servidor Metro do Expo |
| `npm run start:tunnel` | Inicia o Metro com túnel Ngrok (ideal para WSL e Expo Go no celular) |
| `npm run start:lan` | Inicia o Metro em modo LAN |
| `npm run start:clear` | Inicia limpando o cache do Metro |
| `npm run typecheck` | Executa a verificação estática de tipos com TypeScript |
| `npm run android` | Inicia o app no emulador Android |
| `npm run web` | Inicia a aplicação no navegador web |
