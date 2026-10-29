import { createFileRoute, Link } from "@tanstack/react-router";
import { CtaSection, PageHero, meta } from "@/components/site";

export const Route = createFileRoute("/courses")({
  head: () => meta("Курсы английского языка — Bridge English", "General English, Business English, IELTS, курсы для детей и подготовка к ОГЭ/ЕГЭ в Москве."),
  component: Courses,
});

const courses = [
  { t: "General English", lvl: "A1–C1", who: "Взрослые", d: "Сбалансированное развитие всех навыков: говорение, аудирование, чтение, письмо.", dur: "2 раза в неделю · 90 мин" },
  { t: "Разговорный клуб", lvl: "B1+", who: "Взрослые", d: "Свободное общение на актуальные темы с носителем языка.", dur: "1 раз в неделю · 90 мин" },
  { t: "Business English", lvl: "B1–C1", who: "Специалисты", d: "Переговоры, презентации, e-mail, small talk и отраслевая лексика.", dur: "2 раза в неделю · 90 мин" },
  { t: "IELTS / TOEFL", lvl: "B1+", who: "Абитуриенты, релокация", d: "Стратегии каждого раздела, пробные экзамены, разбор эссе.", dur: "3 раза в неделю · 90 мин" },
  { t: "Английский для детей", lvl: "7–12 лет", who: "Дети", d: "Игровая методика, проекты, песни и много говорения.", dur: "2 раза в неделю · 60 мин" },
  { t: "ОГЭ / ЕГЭ", lvl: "8–11 класс", who: "Школьники", d: "Системная подготовка к экзамену на высокий балл.", dur: "2 раза в неделю · 90 мин" },
];

function Courses() {
  return (
    <>
      <PageHero eyebrow="Курсы" title="Программа под вашу цель" text="Все курсы проходят очно в центре Москвы или онлайн. Перед стартом — бесплатное тестирование уровня." />
      <section className="container-x grid gap-5 md:grid-cols-2">
        {courses.map((c) => (
          <article key={c.t} className="flex flex-col rounded-2xl border bg-card p-8 transition hover:shadow-card">
            <div className="flex flex-wrap gap-2 text-xs font-bold">
              <span className="rounded-full bg-accent/10 px-3 py-1 text-accent">{c.lvl}</span>
              <span className="rounded-full bg-secondary px-3 py-1">{c.who}</span>
            </div>
            <h2 className="mt-5 text-3xl font-semibold">{c.t}</h2>
            <p className="mt-3 flex-1 text-muted-foreground">{c.d}</p>
            <div className="mt-6 flex items-center justify-between border-t pt-5 text-sm">
              <span className="text-muted-foreground">{c.dur}</span>
              <Link to="/prices" className="font-semibold text-accent">Цены →</Link>
            </div>
          </article>
        ))}
      </section>
      <CtaSection source="Курсы" />
    </>
  );
}
