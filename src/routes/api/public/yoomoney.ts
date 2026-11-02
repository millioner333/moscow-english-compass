import { createFileRoute } from "@tanstack/react-router";
import { PLAN_PRICES } from "@/lib/plans";

const CHAT_ID = "8619890195";

async function sha1Hex(s: string) {
  const buf = await crypto.subtle.digest("SHA-1", new TextEncoder().encode(s));
  return [...new Uint8Array(buf)].map((b) => b.toString(16).padStart(2, "0")).join("");
}

export const Route = createFileRoute("/api/public/yoomoney")({
  server: {
    handlers: {
      POST: async ({ request }) => {
        const secret = process.env["YOOMONEY_SECRET"];
        if (!secret) return new Response("not configured", { status: 500 });
        const f = new URLSearchParams(await request.text());
        const g = (k: string) => f.get(k) ?? "";
        const check = [g("notification_type"), g("operation_id"), g("amount"), g("currency"), g("datetime"), g("sender"), g("codepro"), secret, g("label")].join("&");
        if ((await sha1Hex(check)) !== g("sha1_hash").toLowerCase()) return new Response("bad signature", { status: 400 });
        if (g("codepro") === "true" || g("unaccepted") === "true") return new Response("ignored", { status: 200 });

        const planId = g("label").replace(/^bridge-/, "");
        const plan = PLAN_PRICES[planId];
        const paid = Number(g("withdraw_amount") || g("amount"));
        const status = plan && paid >= plan.sum ? "paid" : "amount_mismatch";

        const { supabaseAdmin } = await import("@/integrations/supabase/client.server");
        const { data: inserted, error } = await supabaseAdmin
          .from("payments")
          .upsert({
            operation_id: g("operation_id"), label: g("label"), plan: plan?.name ?? planId,
            amount: Number(g("amount")), withdraw_amount: paid, expected_amount: plan?.sum ?? 0,
            status, sender: g("sender"), email: g("email"), paid_at: g("datetime"),
          }, { onConflict: "operation_id", ignoreDuplicates: true })
          .select("id");
        if (error) { console.error("payment save", error); return new Response("db error", { status: 500 }); }

        // Notify only once per operation (duplicates return no rows).
        const token = process.env["TELEGRAM_BOT_TOKEN"];
        if (inserted?.length && token) {
          const text = [
            status === "paid" ? "<b>💳 Новая оплата ЮMoney</b>" : "<b>⚠️ Оплата с неверной суммой</b>",
            `<b>Тариф:</b> ${plan?.name ?? planId}`,
            `<b>Оплачено:</b> ${paid} ₽${plan ? ` (цена ${plan.sum} ₽)` : ""}`,
            g("email") && `<b>Email:</b> ${g("email")}`,
            `<i>Операция ${g("operation_id")}</i>`,
          ].filter(Boolean).join("\n");
          await fetch(`https://api.telegram.org/bot${token}/sendMessage`, {
            method: "POST", headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ chat_id: CHAT_ID, text, parse_mode: "HTML" }),
          }).catch((e) => console.error("tg", e));
        }
        return new Response("ok", { status: 200 });
      },
    },
  },
});
