import { Link } from "@tanstack/react-router";
import { useEffect, useState, type ReactNode } from "react";
import { useServerFn } from "@tanstack/react-start";
import { Menu, X, Phone, MapPin, Mail, Send, Lock } from "lucide-react";
import { sendLead } from "@/lib/lead.functions";

export const nav = [
  { to: "/", label: "Главная" },
  { to: "/about", label: "О нас" },
  { to: "/courses", label: "Курсы" },
  { to: "/prices", label: "Цены" },
  { to: "/teachers", label: "Преподаватели" },
  { to: "/careers", label: "Вакансии" },
  { to: "/contacts", label: "Контакты" },
] as const;

export function Header() {
  const [open, setOpen] = useState(false);
  return (
    <header className="sticky top-0 z-40 border-b bg-background/85 backdrop-blur">
      <div className="container-x flex h-18 items-center justify-between py-4">
        <Link to="/" className="flex items-center gap-2">
          <span className="grid h-10 w-10 place-items-center rounded-full bg-primary font-display text-lg font-bold text-primary-foreground">B</span>
          <span className="font-display text-xl font-semibold">Bridge<span className="text-accent">.</span>English</span>
        </Link>
        <nav className="hidden items-center gap-6 lg:flex">
          {nav.map((n) => (
            <Link key={n.to} to={n.to} activeOptions={{ exact: true }} className="text-sm font-semibold text-muted-foreground hover:text-foreground" activeProps={{ className: "text-accent" }}>
              {n.label}
            </Link>
          ))}
          <Link to="/admin" className="flex items-center gap-1.5 rounded-full border border-border/70 px-3 py-1.5 text-sm font-semibold text-muted-foreground hover:border-accent/50 hover:text-accent" activeProps={{ className: "border-accent text-accent" }}>
            <Lock size={13} /> Админка
          </Link>
        </nav>
        <Link to="/contacts" className="btn-accent hidden !py-2.5 text-sm lg:inline-flex">Пробный урок</Link>
        <button aria-label="Меню" className="lg:hidden" onClick={() => setOpen(!open)}>{open ? <X /> : <Menu />}</button>
      </div>
      {open && (
        <nav className="container-x flex flex-col gap-3 pb-5 lg:hidden">
          {nav.map((n) => (
            <Link key={n.to} to={n.to} onClick={() => setOpen(false)} className="font-semibold">{n.label}</Link>
          ))}
        </nav>
      )}
    </header>
  );
}

export function Footer() {
  return (
    <footer className="mt-24 bg-primary text-primary-foreground">
      <div className="container-x grid gap-10 py-14 md:grid-cols-3">
        <div>
          <p className="font-display text-2xl">Bridge<span className="text-gold">.</span>English</p>
          <p className="mt-3 text-sm opacity-75">Школа английского языка в Москве с 2012 года. Говорите свободно — без страха и зубрёжки.</p>
        </div>
        <div className="grid grid-cols-2 gap-2 text-sm">
          {nav.map((n) => <Link key={n.to} to={n.to} className="opacity-80 hover:opacity-100">{n.label}</Link>)}
        </div>
        <div className="space-y-2 text-sm opacity-90">
          <p className="flex gap-2"><MapPin size={16} /> Москва, ул. Тверская, 12, офис 305</p>
          <p className="flex gap-2"><Phone size={16} /> +7 (495) 123-45-67</p>
          <p className="flex gap-2"><Mail size={16} /> hello@bridge-english.ru</p>
        </div>
      </div>
      <p className="border-t border-primary-foreground/15 py-5 text-center text-xs opacity-60">© 2026 Bridge English. Все права защищены.</p>
    </footer>
  );
}

export function PageHero({ eyebrow, title, text }: { eyebrow: string; title: ReactNode; text: string }) {
  return (
    <section className="container-x pt-16 pb-10">
      <p className="text-sm font-bold uppercase tracking-[0.2em] text-accent">{eyebrow}</p>
      <h1 className="mt-3 max-w-3xl text-4xl font-semibold md:text-6xl">{title}</h1>
      <p className="mt-5 max-w-2xl text-lg text-muted-foreground">{text}</p>
    </section>
  );
}

export const courseOptions = ["General English", "Разговорный клуб", "Business English", "IELTS / TOEFL", "Английский для детей", "ОГЭ / ЕГЭ", "Индивидуально"];

export function LeadForm({ source, defaultCourse = "" }: { source: string; defaultCourse?: string }) {
  const send = useServerFn(sendLead);
  const [state, setState] = useState<"idle" | "loading" | "ok" | "error">("idle");
  const [error, setError] = useState("");
  const [cap, setCap] = useState({ a: 3, b: 4 });
  const newCap = () => setCap({ a: 1 + Math.floor(Math.random() * 9), b: 1 + Math.floor(Math.random() * 9) });
  useEffect(newCap, []);

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const f = new FormData(e.currentTarget);
    const name = String(f.get("name") || "").trim();
    const phone = String(f.get("phone") || "").trim();
    if (name.length < 2) return setError("Укажите имя"), setState("error");
    if (!/^[0-9+()\-\s]{6,30}$/.test(phone)) return setError("Укажите корректный телефон"), setState("error");
    const answer = Number(String(f.get("captcha") || "").trim());
    if (answer !== cap.a + cap.b) { newCap(); return setError("Неверный ответ на пример"), setState("error"); }
    setState("loading");
    try {
      await send({ data: { name, phone, course: String(f.get("course") || ""), comment: String(f.get("comment") || ""), source, a: cap.a, b: cap.b, answer, website: String(f.get("website") || "") } });
      setState("ok");
      e.currentTarget?.reset?.();
    } catch {
      newCap();
      setError("Не удалось отправить. Позвоните нам: +7 (495) 123-45-67");
      setState("error");
    }
  }

  if (state === "ok")
    return (
      <div className="rounded-2xl bg-card p-8 text-center shadow-card">
        <p className="font-display text-3xl">Спасибо! 🎉</p>
        <p className="mt-2 text-muted-foreground">Заявка получена. Администратор свяжется с вами в ближайшее время.</p>
        <button className="mt-5 text-sm font-semibold text-accent" onClick={() => setState("idle")}>Отправить ещё одну</button>
      </div>
    );

  return (
    <form onSubmit={onSubmit} className="space-y-4 rounded-2xl bg-card p-7 text-card-foreground shadow-card">
      <p className="font-display text-2xl">Запишитесь на бесплатный пробный урок</p>
      <input name="name" placeholder="Ваше имя" maxLength={100} className="field" />
      <input name="phone" type="tel" placeholder="+7 (___) ___-__-__" maxLength={30} className="field" />
      <select name="course" defaultValue={defaultCourse} className="field">
        <option value="">Какой курс интересует?</option>
        {courseOptions.map((c) => <option key={c}>{c}</option>)}
      </select>
      <textarea name="comment" placeholder="Комментарий (необязательно)" rows={3} maxLength={1000} className="field" />
      <label className="flex items-center gap-3">
        <span className="shrink-0 font-semibold">Сколько будет {cap.a} + {cap.b}?</span>
        <input name="captcha" inputMode="numeric" maxLength={3} placeholder="Ответ" className="field" />
      </label>
      <input name="website" tabIndex={-1} autoComplete="off" aria-hidden="true" className="hidden" />
      {state === "error" && <p className="text-sm text-destructive">{error}</p>}
      <button disabled={state === "loading"} className="btn-accent w-full disabled:opacity-60">
        <Send size={18} /> {state === "loading" ? "Отправляем…" : "Отправить заявку"}
      </button>
      <p className="text-xs text-muted-foreground">Нажимая кнопку, вы соглашаетесь на обработку персональных данных.</p>
    </form>
  );
}

export function CtaSection({ source }: { source: string }) {
  return (
    <section className="container-x mt-24">
      <div className="grid items-center gap-10 rounded-[2rem] bg-primary p-8 text-primary-foreground md:grid-cols-2 md:p-14">
        <div>
          <h2 className="text-4xl font-semibold md:text-5xl">Первый урок — <span className="text-gold italic">бесплатно</span></h2>
          <p className="mt-4 opacity-80">Определим ваш уровень, подберём группу и расписание. Никаких обязательств.</p>
        </div>
        <LeadForm source={source} />
      </div>
    </section>
  );
}

export function meta(title: string, description: string) {
  return {
    meta: [
      { title },
      { name: "description", content: description },
      { property: "og:title", content: title },
      { property: "og:description", content: description },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  };
}
