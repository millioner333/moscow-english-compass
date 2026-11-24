import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";

const CHAT_ID = "8619890195";

export const leadSchema = z.object({
  name: z.string().trim().min(2, "Укажите имя").max(100),
  phone: z.string().trim().min(6, "Укажите телефон").max(30).regex(/^[0-9+()\-\s]+$/, "Некорректный телефон"),
  course: z.string().trim().max(100).optional().default(""),
  comment: z.string().trim().max(1000).optional().default(""),
  source: z.string().trim().max(50).optional().default(""),
  a: z.number().int().min(1).max(20),
  b: z.number().int().min(1).max(20),
  answer: z.number().int(),
  website: z.string().max(0, "spam").optional().default(""),
});

const esc = (s: string) => s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");

export const sendLead = createServerFn({ method: "POST" })
  .inputValidator((d: unknown) => leadSchema.parse(d))
  .handler(async ({ data }) => {
    if (data.a + data.b !== data.answer) throw new Error("Неверный ответ капчи");
    const { supabaseAdmin } = await import("@/integrations/supabase/client.server");
    const { error } = await supabaseAdmin.from("leads").insert({
      name: data.name, phone: data.phone, course: data.course, comment: data.comment, source: data.source,
    });
    if (error) {
      console.error("Lead save error", error);
      throw new Error("Не удалось сохранить заявку");
    }
    const token = process.env["TELEGRAM_BOT_TOKEN"];
    if (!token) {
      console.error("Telegram is not configured; lead saved");
      return { ok: true, telegramSent: false };
    }
    const text = [
      "<b>📩 Новая заявка с сайта</b>",
      `<b>Имя:</b> ${esc(data.name)}`,
      `<b>Телефон:</b> ${esc(data.phone)}`,
      data.course && `<b>Курс:</b> ${esc(data.course)}`,
      data.comment && `<b>Комментарий:</b> ${esc(data.comment)}`,
      data.source && `<i>Страница: ${esc(data.source)}</i>`,
    ].filter(Boolean).join("\n");
    try {
      const res = await fetch(`https://api.telegram.org/bot${token}/sendMessage`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ chat_id: CHAT_ID, text, parse_mode: "HTML" }),
      });
      const body = await res.json().catch(() => ({}));
      if (!res.ok || !body.ok) {
        console.error("Telegram error; lead saved", res.status, body);
        return { ok: true, telegramSent: false };
      }
      return { ok: true, telegramSent: true };
    } catch (e) {
      console.error("Telegram request failed; lead saved", e);
      return { ok: true, telegramSent: false };
    }
  });
