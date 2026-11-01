import { Link } from "@tanstack/react-router";
import { useEffect, useState, type ReactNode } from "react";
import { useServerFn } from "@tanstack/react-start";
import { Menu, X, Phone, MapPin, Mail, Send, Lock } from "lucide-react";
import { sendLead } from "@/lib/lead.functions";
import { useLang } from "@/lib/i18n";

export const nav = [
  { to: "/", label: "Главная", en: "Home" },
  { to: "/about", label: "О нас", en: "About" },
  { to: "/courses", label: "Курсы", en: "Courses" },
  { to: "/prices", label: "Цены", en: "Prices" },
  { to: "/teachers", label: "Преподаватели", en: "Teachers" },
  { to: "/careers", label: "Вакансии", en: "Careers" },
  { to: "/contacts", label: "Контакты", en: "Contacts" },
] as const;

export function LangSwitch() {
  const { lang, setLang } = useLang();
  return (
    <div className="flex rounded-full border border-border/70 p-0.5 text-xs font-bold" role="group" aria-label="Language">
      {(["ru", "en"] as const).map((l) => (
        <button
          key={l}
          onClick={() => setLang(l)}
          aria-pressed={lang === l}
          className={`rounded-full px-2.5 py-1 uppercase ${lang === l ? "bg-primary text-primary-foreground" : "text-muted-foreground hover:text-foreground"}`}
        >
          {l}
        </button>
      ))}
    </div>
  );
}

export function Header() {
  const [open, setOpen] = useState(false);
  const { t } = useLang();
  return (
    <header className="sticky top-0 z-40 border-b bg-background/85 backdrop-blur">
      <div className="container-x flex h-18 items-center justify-between gap-4 py-4">
        <Link to="/" className="flex items-center gap-2">
          <span className="grid h-10 w-10 place-items-center rounded-full bg-primary font-display text-lg font-bold text-primary-foreground">B</span>
          <span className="font-display text-xl font-semibold">Bridge<span className="text-accent">.</span>English</span>
        </Link>
        <nav className="hidden items-center gap-5 lg:flex">
          {nav.map((n) => (
            <Link key={n.to} to={n.to} activeOptions={{ exact: true }} className="text-sm font-semibold text-muted-foreground hover:text-foreground" activeProps={{ className: "text-accent" }}>
              {t(n.label, n.en)}
            </Link>
          ))}
          <Link to="/admin" className="flex items-center gap-1.5 rounded-full border border-border/70 px-3 py-1.5 text-sm font-semibold text-muted-foreground hover:border-accent/50 hover:text-accent" activeProps={{ className: "border-accent text-accent" }}>
            <Lock size={13} /> {t("Админка", "Admin")}
          </Link>
        </nav>
        <div className="flex items-center gap-3">
          <LangSwitch />
          <Link to="/contacts" className="btn-accent hidden !py-2.5 text-sm xl:inline-flex">{t("Пробный урок", "Free lesson")}</Link>
          <button aria-label="Menu" className="lg:hidden" onClick={() => setOpen(!open)}>{open ? <X /> : <Menu />}</button>
        </div>
      </div>
      {open && (
        <nav className="container-x flex flex-col gap-3 pb-5 lg:hidden">
          {nav.map((n) => (
            <Link key={n.to} to={n.to} onClick={() => setOpen(false)} className="font-semibold">{t(n.label, n.en)}</Link>
          ))}
          <Link to="/admin" onClick={() => setOpen(false)} className="flex items-center gap-2 font-semibold text-muted-foreground">
            <Lock size={14} /> {t("Админка", "Admin")}
          </Link>
        </nav>
      )}
    </header>
  );
}

export function Footer() {
  const { t } = useLang();
  return (
    <footer className="mt-24 bg-primary text-primary-foreground">
      <div className="container-x grid gap-10 py-14 md:grid-cols-3">
        <div>
          <p className="font-display text-2xl">Bridge<span className="text-gold">.</span>English</p>
          <p className="mt-3 text-sm opacity-75">{t("Школа английского языка в Москве с 2012 года. Говорите свободно — без страха и зубрёжки.", "English language school in Moscow since 2012. Speak freely — no fear, no cramming.")}</p>
        </div>
        <div className="grid grid-cols-2 gap-2 text-sm">
          {nav.map((n) => <Link key={n.to} to={n.to} className="opacity-80 hover:opacity-100">{t(n.label, n.en)}</Link>)}
        </div>
        <div className="space-y-2 text-sm opacity-90">
          <p className="flex gap-2"><MapPin size={16} /> {t("Москва, ул. Тверская, 12, офис 305", "Moscow, 12 Tverskaya St., office 305")}</p>
          <p className="flex gap-2"><Phone size={16} /> +7 (495) 123-45-67</p>
          <p className="flex gap-2"><Mail size={16} /> hello@bridge-english.ru</p>
        </div>
      </div>
      <p className="border-t border-primary-foreground/15 py-5 text-center text-xs opacity-60">© 2026 Bridge English. {t("Все права защищены.", "All rights reserved.")}</p>
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

export const courseOptions: [string, string][] = [
  ["General English", "General English"],
  ["Разговорный клуб", "Speaking club"],
  ["Business English", "Business English"],
  ["IELTS / TOEFL", "IELTS / TOEFL"],
  ["Английский для детей", "English for kids"],
  ["ОГЭ / ЕГЭ", "OGE / EGE exams"],
  ["Индивидуально", "Private lessons"],
];

export function LeadForm({ source, defaultCourse = "" }: { source: string; defaultCourse?: string }) {
  const send = useServerFn(sendLead);
  const { t } = useLang();
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
    if (name.length < 2) return setError(t("Укажите имя", "Please enter your name")), setState("error");
    if (!/^[0-9+()\-\s]{6,30}$/.test(phone)) return setError(t("Укажите корректный телефон", "Please enter a valid phone")), setState("error");
    const answer = Number(String(f.get("captcha") || "").trim());
    if (answer !== cap.a + cap.b) { newCap(); return setError(t("Неверный ответ на пример", "Wrong answer to the sum")), setState("error"); }
    setState("loading");
    try {
      await send({ data: { name, phone, course: String(f.get("course") || ""), comment: String(f.get("comment") || ""), source, a: cap.a, b: cap.b, answer, website: String(f.get("website") || "") } });
      setState("ok");
      e.currentTarget?.reset?.();
    } catch {
      newCap();
      setError(t("Не удалось отправить. Позвоните нам: +7 (495) 123-45-67", "Couldn't send. Call us: +7 (495) 123-45-67"));
      setState("error");
    }
  }

  if (state === "ok")
    return (
      <div className="rounded-2xl bg-card p-8 text-center shadow-card">
        <p className="font-display text-3xl">{t("Спасибо!", "Thank you!")} 🎉</p>
        <p className="mt-2 text-muted-foreground">{t("Заявка получена. Администратор свяжется с вами в ближайшее время.", "Request received. Our manager will contact you shortly.")}</p>
        <button className="mt-5 text-sm font-semibold text-accent" onClick={() => setState("idle")}>{t("Отправить ещё одну", "Send another")}</button>
      </div>
    );

  return (
    <form onSubmit={onSubmit} className="space-y-4 rounded-2xl bg-card p-7 text-card-foreground shadow-card">
      <p className="font-display text-2xl">{t("Запишитесь на бесплатный пробный урок", "Book a free trial lesson")}</p>
      <input name="name" placeholder={t("Ваше имя", "Your name")} maxLength={100} className="field" />
      <input name="phone" type="tel" placeholder="+7 (___) ___-__-__" maxLength={30} className="field" />
      <select name="course" defaultValue={defaultCourse} className="field">
        <option value="">{t("Какой курс интересует?", "Which course are you interested in?")}</option>
        {courseOptions.map(([ru, en]) => <option key={ru} value={ru}>{t(ru, en)}</option>)}
      </select>
      <textarea name="comment" placeholder={t("Комментарий (необязательно)", "Comment (optional)")} rows={3} maxLength={1000} className="field" />
      <label className="flex items-center gap-3">
        <span className="shrink-0 font-semibold">{t("Сколько будет", "What is")} {cap.a} + {cap.b}?</span>
        <input name="captcha" inputMode="numeric" maxLength={3} placeholder={t("Ответ", "Answer")} className="field" />
      </label>
      <input name="website" tabIndex={-1} autoComplete="off" aria-hidden="true" className="hidden" />
      {state === "error" && <p className="text-sm text-destructive">{error}</p>}
      <button disabled={state === "loading"} className="btn-accent w-full disabled:opacity-60">
        <Send size={18} /> {state === "loading" ? t("Отправляем…", "Sending…") : t("Отправить заявку", "Send request")}
      </button>
      <p className="text-xs text-muted-foreground">{t("Нажимая кнопку, вы соглашаетесь на обработку персональных данных.", "By clicking the button, you agree to the processing of personal data.")}</p>
    </form>
  );
}

export function CtaSection({ source }: { source: string }) {
  const { t } = useLang();
  return (
    <section className="container-x mt-24">
      <div className="grid items-center gap-10 rounded-[2rem] bg-primary p-8 text-primary-foreground md:grid-cols-2 md:p-14">
        <div>
          <h2 className="text-4xl font-semibold md:text-5xl">{t("Первый урок —", "First lesson is")} <span className="text-gold italic">{t("бесплатно", "free")}</span></h2>
          <p className="mt-4 opacity-80">{t("Определим ваш уровень, подберём группу и расписание. Никаких обязательств.", "We'll assess your level and find a group and schedule. No obligations.")}</p>
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
