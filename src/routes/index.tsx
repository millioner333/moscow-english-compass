import { createFileRoute, Link } from "@tanstack/react-router";
import { MessageCircle, Users, Award, Clock, ArrowRight, Star } from "lucide-react";
import hero from "@/assets/hero.jpg";
import { CtaSection, LeadForm, meta } from "@/components/site";
import { useLang } from "@/lib/i18n";

export const Route = createFileRoute("/")({
  head: () => meta("Bridge English — курсы английского языка в Москве", "Курсы английского для взрослых и детей в центре Москвы. Мини-группы до 6 человек, носители языка, бесплатный пробный урок."),
  component: Index,
});

const features = [
  { icon: MessageCircle, t: ["70% разговорной практики", "70% speaking practice"], d: ["Говорите с первого занятия — коммуникативная методика.", "Speak from the very first lesson — communicative method."] },
  { icon: Users, t: ["Группы до 6 человек", "Groups of up to 6"], d: ["Внимание преподавателя каждому студенту.", "The teacher's attention for every student."] },
  { icon: Award, t: ["Сертификат CEFR", "CEFR certificate"], d: ["Международная шкала уровней A1–C2.", "International A1–C2 level scale."] },
  { icon: Clock, t: ["Утро, вечер, выходные", "Mornings, evenings, weekends"], d: ["Удобное расписание и онлайн-формат.", "Flexible schedule and online format."] },
] as const;

const programs = [
  ["General English", ["Базовый курс для взрослых от нуля до продвинутого.", "Core course for adults, from zero to advanced."], ["от 5 900 ₽/мес", "from 5,900 ₽/month"]],
  ["Business English", ["Переговоры, презентации, деловая переписка.", "Negotiations, presentations, business emails."], ["от 8 900 ₽/мес", "from 8,900 ₽/month"]],
  ["IELTS / TOEFL", ["Подготовка к экзаменам с гарантией балла.", "Exam prep with a guaranteed score."], ["от 9 900 ₽/мес", "from 9,900 ₽/month"]],
] as const;

const steps = [
  ["Оставляете заявку — перезвоним за 15 минут", "Leave a request — we'll call back in 15 minutes"],
  ["Бесплатный тест и пробный урок", "Free level test and trial lesson"],
  ["Подбираем группу и расписание", "We match you with a group and schedule"],
  ["Учитесь и видите прогресс каждый месяц", "Study and see your progress every month"],
] as const;

const reviews = [
  [["Анна, маркетолог", "Anna, marketer"], ["За полгода перешла с A2 на B1 и наконец-то спокойно созваниваюсь с зарубежными коллегами.", "In six months I went from A2 to B1 and now calmly call my colleagues abroad."]],
  [["Дмитрий, IT", "Dmitry, IT"], ["Сдал IELTS на 7.5 с первой попытки. Преподаватель знал все ловушки экзамена.", "Got IELTS 7.5 on the first try. My teacher knew every exam trap."]],
  [["Ольга, мама Миши", "Olga, Misha's mom"], ["Сын бежит на занятия с удовольствием — это лучший показатель.", "My son loves running to his lessons — that's the best sign."]],
] as const;

function Index() {
  const { t } = useLang();
  return (
    <>
      <section className="container-x grid items-center gap-12 pt-12 md:grid-cols-[1.1fr_1fr] md:pt-20">
        <div>
          <p className="inline-flex items-center gap-2 rounded-full bg-secondary px-4 py-1.5 text-sm font-semibold">
            <Star size={14} className="fill-gold text-gold" /> {t("4.9 на Яндекс Картах · 2 400+ выпускников", "4.9 on Yandex Maps · 2,400+ graduates")}
          </p>
          <h1 className="mt-6 text-5xl font-semibold leading-[1.05] md:text-7xl">
            {t("Английский, на котором", "English you'll")} <em className="text-accent">{t("хочется", "love")}</em> {t("говорить", "to speak")}
          </h1>
          <p className="mt-6 max-w-lg text-lg text-muted-foreground">
            {t("Школа английского языка в самом центре Москвы. Живые уроки, сильные преподаватели и результат, который слышно.", "An English school in the very heart of Moscow. Lively lessons, strong teachers and results you can hear.")}
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Link to="/contacts" className="btn-accent">{t("Бесплатный пробный урок", "Free trial lesson")} <ArrowRight size={18} /></Link>
            <Link to="/courses" className="btn-ghost">{t("Выбрать курс", "Choose a course")}</Link>
          </div>
        </div>
        <div className="relative">
          <img src={hero} alt={t("Урок английского в Bridge English", "English lesson at Bridge English")} width={1600} height={1104} className="aspect-[4/5] w-full rounded-[2rem] object-cover shadow-card md:aspect-[4/5]" />
          <div className="absolute -bottom-6 -left-6 rounded-2xl bg-card p-5 shadow-card">
            <p className="font-display text-4xl text-accent">14</p>
            <p className="text-sm text-muted-foreground">{t("лет учим Москву", "years teaching Moscow")}</p>
          </div>
        </div>
      </section>

      <section className="container-x mt-28 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
        {features.map((f) => (
          <div key={f.t[0]} className="rounded-2xl border bg-card p-6">
            <f.icon className="text-accent" />
            <h3 className="mt-4 text-xl font-semibold">{t(f.t)}</h3>
            <p className="mt-2 text-sm text-muted-foreground">{t(f.d)}</p>
          </div>
        ))}
      </section>

      <section className="container-x mt-28">
        <div className="flex flex-wrap items-end justify-between gap-4">
          <h2 className="text-4xl font-semibold md:text-5xl">{t("Популярные программы", "Popular programs")}</h2>
          <Link to="/courses" className="font-semibold text-accent">{t("Все курсы →", "All courses →")}</Link>
        </div>
        <div className="mt-10 grid gap-5 md:grid-cols-3">
          {programs.map(([name, d, p], i) => (
            <div key={name} className={`rounded-2xl p-8 ${i === 1 ? "bg-primary text-primary-foreground" : "bg-secondary"}`}>
              <h3 className="text-2xl font-semibold">{name}</h3>
              <p className="mt-3 opacity-80">{t(d)}</p>
              <p className="mt-8 font-bold">{t(p)}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="container-x mt-28 grid gap-10 md:grid-cols-2">
        <div>
          <h2 className="text-4xl font-semibold md:text-5xl">{t("Как проходит обучение", "How it works")}</h2>
          <ol className="mt-8 space-y-6">
            {steps.map((s, i) => (
              <li key={s[0]} className="flex gap-4">
                <span className="grid h-10 w-10 shrink-0 place-items-center rounded-full bg-accent font-bold text-accent-foreground">{i + 1}</span>
                <p className="pt-2 text-lg">{t(s)}</p>
              </li>
            ))}
          </ol>
        </div>
        <LeadForm source="Главная" />
      </section>

      <section className="container-x mt-28">
        <h2 className="text-4xl font-semibold md:text-5xl">{t("Отзывы студентов", "Student reviews")}</h2>
        <div className="mt-10 grid gap-5 md:grid-cols-3">
          {reviews.map(([n, txt]) => (
            <figure key={n[0]} className="rounded-2xl border bg-card p-7">
              <blockquote className="font-display text-lg leading-relaxed">«{t(txt)}»</blockquote>
              <figcaption className="mt-5 text-sm font-semibold text-muted-foreground">{t(n)}</figcaption>
            </figure>
          ))}
        </div>
      </section>

      <CtaSection source="Главная (низ)" />
    </>
  );
}
