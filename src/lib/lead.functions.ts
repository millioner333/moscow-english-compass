import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";

const CHAT_ID = "8619890195";

export const leadSchema = z.object({
  name: z.string().trim().min(2, "Укажите имя").max(100),
  phone: z.string().trim().min(6, "Укажите телефон").max(30).regex(/^[0-9+()\-\s]+$/, "Некорректный телефон"),
  course: z.string().trim().max(100).optional().default(""),
  comment: z.string().trim().max(1000).optional().default(""),
  source: z.string().trim().max(50).optional().default(""),
});

const esc = (s: string) => s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");

export const sendLead = createServerFn({ method: "POST" })
  .inputValidator((d: unknown) => leadSchema.parse(d))
  .handler(async ({ data }) => {
    const token = process.env["TELEGRAM_BOT_TOKEN"];
    if (!token) throw new Error("Бот не настроен");
    const text = [
      "<b>📩 Новая заявка с сайта</b>",
      `<b>Имя:</b> ${esc(data.name)}`,
      `<b>Телефон:</b> ${esc(data.phone)}`,
      data.course && `<b>Курс:</b> ${esc(data.course)}`,
      data.comment && `<b>Комментарий:</b> ${esc(data.comment)}`,
      data.source && `<i>Страница: ${esc(data.source)}</i>`,
    ].filter(Boolean).join("\n");
    const res = await fetch(`https://api.telegram.org/bot${token}/sendMessage`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ chat_id: CHAT_ID, text, parse_mode: "HTML" }),
    });
    const body = await res.json().catch(() => ({}));
    if (!res.ok || !body.ok) {
      console.error("Telegram error", res.status, body);
      throw new Error("Не удалось отправить заявку");
    }
    return { ok: true };
  });
