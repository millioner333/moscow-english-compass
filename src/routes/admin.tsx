import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import type { Session } from "@supabase/supabase-js";
import { supabase } from "@/integrations/supabase/client";

export const Route = createFileRoute("/admin")({
  ssr: false,
  head: () => ({
    meta: [
      { title: "Панель администратора — Bridge English" },
      { name: "description", content: "Заявки с сайта Bridge English." },
      { property: "og:title", content: "Панель администратора — Bridge English" },
      { property: "og:description", content: "Заявки с сайта Bridge English." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary" },
      { name: "robots", content: "noindex" },
    ],
  }),
  component: Admin,
});

type Lead = { id: string; created_at: string; name: string; phone: string; course: string; comment: string; source: string; status: string };

function Admin() {
  const [session, setSession] = useState<Session | null | undefined>(undefined);
  useEffect(() => {
    supabase.auth.getSession().then(({ data }) => setSession(data.session));
    const { data } = supabase.auth.onAuthStateChange((_e, s) => setSession(s));
    return () => data.subscription.unsubscribe();
  }, []);
  if (session === undefined) return <p className="container-x py-20">Загрузка…</p>;
  if (!session) return <Login />;
  return <Leads userId={session.user.id} email={session.user.email ?? ""} />;
}

function Login() {
  const [mode, setMode] = useState<"in" | "up">("in");
  const [msg, setMsg] = useState("");
  const [busy, setBusy] = useState(false);
  async function submit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const f = new FormData(e.currentTarget);
    const email = String(f.get("email")), password = String(f.get("password"));
    setBusy(true); setMsg("");
    if (mode === "in") {
      const { error } = await supabase.auth.signInWithPassword({ email, password });
      if (error) setMsg("Неверный email или пароль");
    } else {
      const { data, error } = await supabase.auth.signUp({ email, password, options: { emailRedirectTo: `${window.location.origin}/admin` } });
      if (error) setMsg(error.message);
      else if (!data.session) setMsg("Проверьте почту и подтвердите email, затем войдите.");
    }
    setBusy(false);
  }
  return (
    <section className="container-x flex justify-center py-20">
      <form onSubmit={submit} className="w-full max-w-sm space-y-4 rounded-2xl bg-card p-7 shadow-card">
        <p className="font-display text-2xl">{mode === "in" ? "Вход для администратора" : "Регистрация администратора"}</p>
        <input name="email" type="email" required placeholder="Email" className="field" />
        <input name="password" type="password" required minLength={6} placeholder="Пароль" className="field" />
        {msg && <p className="text-sm text-muted-foreground">{msg}</p>}
        <button disabled={busy} className="btn-accent w-full disabled:opacity-60">{mode === "in" ? "Войти" : "Зарегистрироваться"}</button>
        <button type="button" onClick={() => setMode(mode === "in" ? "up" : "in")} className="w-full text-sm font-semibold text-accent">
          {mode === "in" ? "Первый вход? Создать аккаунт" : "Уже есть аккаунт? Войти"}
        </button>
      </form>
    </section>
  );
}

function Leads({ userId, email }: { userId: string; email: string }) {
  const [isAdmin, setIsAdmin] = useState<boolean | null>(null);
  const [leads, setLeads] = useState<Lead[]>([]);
  const [filter, setFilter] = useState<"all" | "new" | "done">("all");

  async function load() {
    const { data } = await supabase.from("leads").select("*").order("created_at", { ascending: false });
    setLeads((data as Lead[]) ?? []);
  }
  useEffect(() => {
    supabase.rpc("has_role", { _user_id: userId, _role: "admin" }).then(({ data }) => {
      setIsAdmin(!!data);
      if (data) load();
    });
  }, [userId]);

  async function toggle(l: Lead) {
    const status = l.status === "new" ? "done" : "new";
    await supabase.from("leads").update({ status }).eq("id", l.id);
    setLeads((ls) => ls.map((x) => (x.id === l.id ? { ...x, status } : x)));
  }
  async function remove(l: Lead) {
    if (!confirm(`Удалить заявку от ${l.name}?`)) return;
    await supabase.from("leads").delete().eq("id", l.id);
    setLeads((ls) => ls.filter((x) => x.id !== l.id));
  }

  const signOut = <button onClick={() => supabase.auth.signOut()} className="text-sm font-semibold text-accent">Выйти</button>;
  if (isAdmin === null) return <p className="container-x py-20">Загрузка…</p>;
  if (!isAdmin) return <section className="container-x py-20"><p className="text-lg">У аккаунта {email} нет доступа к панели.</p>{signOut}</section>;

  const shown = leads.filter((l) => filter === "all" || l.status === filter);
  const newCount = leads.filter((l) => l.status === "new").length;
  return (
    <section className="container-x py-12">
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <h1 className="text-4xl font-semibold">Заявки</h1>
          <p className="mt-1 text-muted-foreground">Всего {leads.length}, новых {newCount} · {email}</p>
        </div>
        <div className="flex items-center gap-4">
          {(["all", "new", "done"] as const).map((f) => (
            <button key={f} onClick={() => setFilter(f)} className={`text-sm font-semibold ${filter === f ? "text-accent" : "text-muted-foreground"}`}>
              {f === "all" ? "Все" : f === "new" ? "Новые" : "Обработанные"}
            </button>
          ))}
          <button onClick={load} className="text-sm font-semibold text-muted-foreground">Обновить</button>
          {signOut}
        </div>
      </div>
      <div className="mt-8 overflow-x-auto rounded-2xl bg-card shadow-card">
        <table className="w-full text-left text-sm">
          <thead className="border-b text-muted-foreground">
            <tr>{["Дата", "Имя", "Телефон", "Курс", "Комментарий", "Страница", "Статус", ""].map((h) => <th key={h} className="p-4 font-semibold">{h}</th>)}</tr>
          </thead>
          <tbody>
            {shown.map((l) => (
              <tr key={l.id} className="border-b last:border-0 align-top">
                <td className="whitespace-nowrap p-4">{new Date(l.created_at).toLocaleString("ru-RU", { dateStyle: "short", timeStyle: "short" })}</td>
                <td className="p-4 font-semibold">{l.name}</td>
                <td className="whitespace-nowrap p-4"><a href={`tel:${l.phone}`} className="text-accent">{l.phone}</a></td>
                <td className="p-4">{l.course || "—"}</td>
                <td className="max-w-xs p-4 text-muted-foreground">{l.comment || "—"}</td>
                <td className="p-4 text-muted-foreground">{l.source || "—"}</td>
                <td className="p-4">
                  <button onClick={() => toggle(l)} className={`rounded-full px-3 py-1 text-xs font-bold ${l.status === "new" ? "bg-accent text-accent-foreground" : "bg-secondary text-secondary-foreground"}`}>
                    {l.status === "new" ? "Новая" : "Обработана"}
                  </button>
                </td>
                <td className="p-4"><button onClick={() => remove(l)} className="text-xs text-destructive">Удалить</button></td>
              </tr>
            ))}
            {shown.length === 0 && <tr><td colSpan={8} className="p-8 text-center text-muted-foreground">Заявок пока нет</td></tr>}
          </tbody>
        </table>
      </div>
    </section>
  );
}
