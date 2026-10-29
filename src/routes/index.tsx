import { createFileRoute, Link } from "@tanstack/react-router";
import { MessageCircle, Users, Award, Clock, ArrowRight, Star } from "lucide-react";
import hero from "@/assets/hero.jpg";
import { CtaSection, LeadForm, meta } from "@/components/site";

export const Route = createFileRoute("/")({
  head: () => meta("Bridge English — курсы английского языка в Москве", "Курсы английского для взрослых и детей в центре Москвы. Мини-группы до 6 человек, носители языка, бесплатный пробный урок."),
  component: Index,
});

const features = [
  { icon: MessageCircle, t: "70% разговорной практики", d: "Говорите с первого занятия — коммуникативная методика." },
  { icon: Users, t: "Группы до 6 человек", d: "Внимание преподавателя каждому студенту." },
  { icon: Award, t: "Сертификат CEFR", d: "Международная шкала уровней A1–C2." },
  { icon: Clock, t: "Утро, вечер, выходные", d: "Удобное расписание и онлайн-формат." },
];

function Index() {
  return (
    <>
      <section className="container-x grid items-center gap-12 pt-12 md:grid-cols-[1.1fr_1fr] md:pt-20">
        <div>
          <p className="inline-flex items-center gap-2 rounded-full bg-secondary px-4 py-1.5 text-sm font-semibold">
            <Star size={14} className="fill-gold text-gold" /> 4.9 на Яндекс Картах · 2 400+ выпускников
          </p>
          <h1 className="mt-6 text-5xl font-semibold leading-[1.05] md:text-7xl">
            Английский, на котором <em className="text-accent">хочется</em> говорить
          </h1>
          <p className="mt-6 max-w-lg text-lg text-muted-foreground">
            Школа английского языка в самом центре Москвы. Живые уроки, сильные преподаватели и результат, который слышно.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Link to="/contacts" className="btn-accent">Бесплатный пробный урок <ArrowRight size={18} /></Link>
            <Link to="/courses" className="btn-ghost">Выбрать курс</Link>
          </div>
        </div>
        <div className="relative">
          <img src={hero} alt="Урок английского в Bridge English" width={1600} height={1104} className="aspect-[4/5] w-full rounded-[2rem] object-cover shadow-card md:aspect-[4/5]" />
          <div className="absolute -bottom-6 -left-6 rounded-2xl bg-card p-5 shadow-card">
            <p className="font-display text-4xl text-accent">14</p>
            <p className="text-sm text-muted-foreground">лет учим Москву</p>
          </div>
        </div>
      </section>

      <section className="container-x mt-28 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
        {features.map((f) => (
          <div key={f.t} className="rounded-2xl border bg-card p-6">
            <f.icon className="text-accent" />
            <h3 className="mt-4 text-xl font-semibold">{f.t}</h3>
            <p className="mt-2 text-sm text-muted-foreground">{f.d}</p>
          </div>
        ))}
      </section>

      <section className="container-x mt-28">
        <div className="flex flex-wrap items-end justify-between gap-4">
          <h2 className="text-4xl font-semibold md:text-5xl">Популярные программы</h2>
          <Link to="/courses" className="font-semibold text-accent">Все курсы →</Link>
        </div>
        <div className="mt-10 grid gap-5 md:grid-cols-3">
          {[
            ["General English", "Базовый курс для взрослых от нуля до продвинутого.", "от 5 900 ₽/мес"],
            ["Business English", "Переговоры, презентации, деловая переписка.", "от 8 900 ₽/мес"],
            ["IELTS / TOEFL", "Подготовка к экзаменам с гарантией балла.", "от 9 900 ₽/мес"],
          ].map(([t, d, p], i) => (
            <div key={t} className={`rounded-2xl p-8 ${i === 1 ? "bg-primary text-primary-foreground" : "bg-secondary"}`}>
              <h3 className="text-2xl font-semibold">{t}</h3>
              <p className="mt-3 opacity-80">{d}</p>
              <p className="mt-8 font-bold">{p}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="container-x mt-28 grid gap-10 md:grid-cols-2">
        <div>
          <h2 className="text-4xl font-semibold md:text-5xl">Как проходит обучение</h2>
          <ol className="mt-8 space-y-6">
            {["Оставляете заявку — перезвоним за 15 минут", "Бесплатный тест и пробный урок", "Подбираем группу и расписание", "Учитесь и видите прогресс каждый месяц"].map((s, i) => (
              <li key={s} className="flex gap-4">
                <span className="grid h-10 w-10 shrink-0 place-items-center rounded-full bg-accent font-bold text-accent-foreground">{i + 1}</span>
                <p className="pt-2 text-lg">{s}</p>
              </li>
            ))}
          </ol>
        </div>
        <LeadForm source="Главная" />
      </section>

      <section className="container-x mt-28">
        <h2 className="text-4xl font-semibold md:text-5xl">Отзывы студентов</h2>
        <div className="mt-10 grid gap-5 md:grid-cols-3">
          {[
            ["Анна, маркетолог", "За полгода перешла с A2 на B1 и наконец-то спокойно созваниваюсь с зарубежными коллегами."],
            ["Дмитрий, IT", "Сдал IELTS на 7.5 с первой попытки. Преподаватель знал все ловушки экзамена."],
            ["Ольга, мама Миши", "Сын бежит на занятия с удовольствием — это лучший показатель."],
          ].map(([n, t]) => (
            <figure key={n} className="rounded-2xl border bg-card p-7">
              <blockquote className="font-display text-lg leading-relaxed">«{t}»</blockquote>
              <figcaption className="mt-5 text-sm font-semibold text-muted-foreground">{n}</figcaption>
            </figure>
          ))}
        </div>
      </section>

      <CtaSection source="Главная (низ)" />
    </>
  );
}
