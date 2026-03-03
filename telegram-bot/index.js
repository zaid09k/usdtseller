import { Telegraf } from 'telegraf';
import fs from 'fs/promises';
import path from 'path';

const token = process.env.TELEGRAM_BOT_TOKEN || process.argv[2];
if (!token) {
  console.error('Missing Telegram bot token. Set TELEGRAM_BOT_TOKEN or pass token as first arg.');
  process.exit(1);
}

const bot = new Telegraf(token);
const DATA_FILE = path.resolve(new URL('.', import.meta.url).pathname, 'users.json');
const PUBLIC_FILE = path.resolve(process.cwd(), 'public', 'telegram_users.json');

async function readUsers() {
  try {
    const txt = await fs.readFile(DATA_FILE, 'utf8');
    return JSON.parse(txt || '[]');
  } catch (err) {
    return [];
  }
}

async function writeUsers(users) {
  await fs.writeFile(DATA_FILE, JSON.stringify(users, null, 2), 'utf8');
}

function genUserId() {
  return 'USR' + Math.random().toString(36).slice(2, 8).toUpperCase();
}

function genPassword(len = 10) {
  const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%';
  let out = '';
  for (let i = 0; i < len; i++) out += chars[Math.floor(Math.random() * chars.length)];
  return out;
}

bot.start((ctx) => {
  ctx.reply(
    'Welcome! Use /generate to create a new site user ID and password. Keep them safe.'
  );
});

bot.command('generate', async (ctx) => {
  try {
    const tgId = ctx.from.id;
    const tgName = ctx.from.username || `${ctx.from.first_name || ''} ${ctx.from.last_name || ''}`.trim();
    const uid = genUserId();
    const pwd = genPassword();
    const createdAt = new Date().toISOString();

    const users = await readUsers();
    users.push({ telegramId: tgId, telegramName: tgName, userId: uid, password: pwd, createdAt });
    await writeUsers(users);
+    try {
+      await fs.writeFile(PUBLIC_FILE, JSON.stringify(users, null, 2), 'utf8');
+    } catch (err) {
+      console.error('could not write public users file', err);
+    }
+    // mirror to public folder for frontend consumption
+    try {
+      await fs.writeFile(PUBLIC_FILE, JSON.stringify(users, null, 2), 'utf8');
+    } catch (err) {
+      console.error('could not write public users file', err);
+    }

    await ctx.replyWithMarkdown(`*New credentials generated*\n\n*User ID:* \` ${uid} \`\n*Password:* \` ${pwd} \`\n\nYou can now login to the site. Keep these credentials private.`);
  } catch (err) {
    console.error(err);
    ctx.reply('Sorry, an error occurred while generating credentials.');
  }
});

bot.command('mycreds', async (ctx) => {
  const tgId = ctx.from.id;
  const users = await readUsers();
  const my = users.filter((u) => u.telegramId === tgId);
  if (!my.length) return ctx.reply('No credentials found for your Telegram account. Use /generate to create one.');
  let msg = '*Your generated credentials:*\n\n';
  my.slice(-5).forEach((u) => {
    msg += `• \` ${u.userId} \` — \` ${u.password} \` (created ${new Date(u.createdAt).toLocaleString()})\n`;
  });
  ctx.replyWithMarkdown(msg);
});

bot.command('help', (ctx) => {
  ctx.reply('/generate — create a new user ID & password\n/mycreds — list your generated credentials\n/help — this message');
});

bot.launch().then(() => console.log('Telegram bot started'));

process.once('SIGINT', () => bot.stop('SIGINT'));
process.once('SIGTERM', () => bot.stop('SIGTERM'));
