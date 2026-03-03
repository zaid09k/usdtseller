# Telegram Bot for USDT Seller (credential generator)

This small Node.js bot generates site `userId` and `password` pairs on Telegram and stores them in `telegram-bot/users.json`.

Prerequisites
- Node 18+ (or a recent Node with ESM support)
- A Telegram bot token (create via @BotFather)

Install

```bash
# from project root
npm install
# installs telegraf (added to package.json)
```

Run

```bash
# set token in env and run
set TELEGRAM_BOT_TOKEN=your_token_here   # Windows PowerShell: $env:TELEGRAM_BOT_TOKEN = "your_token"
npm run bot

# or pass token as arg
node telegram-bot/index.js YOUR_TOKEN_HERE
```

Commands
- `/generate` — generate a new `userId` and `password` and receive them privately
- `/mycreds` — list credentials generated for your Telegram account
- `/help` — show help

Notes
- Credentials are stored locally in `telegram-bot/users.json`. For production use, move to a secure database.
- Keep your bot token secret.
