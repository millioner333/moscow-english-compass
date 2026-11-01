import { createFileRoute, Link } from "@tanstack/react-router";
import { CtaSection, PageHero, meta } from "@/components/site";
import { useLang } from "@/lib/i18n";

export const Route = createFileRoute("/courses")({
  head: () => meta("Курсы английского языка — Bridge English", "General English, Business English, IELTS, курсы для детей и подготовка к ОГЭ/ЕГЭ в Москве."),
  component: Courses,
});

const courses = [
  { t: ["General English", "General English"], lvl: ["A1–C1", "A1–C1"], who: ["Взрослые", "Adults"], d: ["Сбалансированное развитие всех навыков: говорение, аудирование, чтение, письмо.", "Balanced development of all skills: speaking, listening, reading, writing."], dur: ["2 раза в неделю · 90 мин", "Twice a week · 90 min"] },
  { t: ["Разговорный клуб", "Speaking club"], lvl: ["B1+", "B1+"], who: ["Взрослые", "Adults"], d: ["Свободное общение на актуальные темы с носителем языка.", "Free conversation on current topics with a native speaker."], dur: ["1 раз в неделю · 90 мин", "Once a week · 90 min"] },
  { t: ["Business English", "Business English"], lvl: ["B1–C1", "B1–C1"], who: ["Специалисты", "Professionals"], d: ["Переговоры, презентации, e-mail, small talk и отраслевая лексика.", "Negotiations, presentations, emails, small talk and industry vocabulary."], dur: ["2 раза в неделю · 90 мин", "Twice a week · 90 min"] },
  { t: ["IELTS / TOEFL", "IELTS / TOEFL"], lvl: ["B1+", "B1+"], who: ["Абитуриенты, релокация", "Applicants, relocation"], d: ["Стратегии каждого раздела, пробные экзамены, разбор эссе.", "Strategies for every section, mock exams, essay feedback."], dur: ["3 раза в неделю · 90 мин", "3 times a week · 90 min"] },
  { t: ["Английский для детей", "English for kids"], lvl: ["7–12 лет", "Ages 7–12"], who: ["Дети", "Kids"], d: ["Игровая методика, проекты, песни и много говорения.", "Game-based method, projects, songs and lots of speaking."], dur: ["2 раза в неделю · 60 мин", "Twice a week · 60 min"] },
  { t: ["ОГЭ / ЕГЭ", "OGE / EGE exams"], lvl: ["8–11 класс", "Grades 8–11"], who: ["Школьники", "School students"], d: ["Системная подготовка к экзамену на высокий балл.", "Systematic preparation for a high exam score."], dur: ["2 раза в неделю · 90 мин", "Twice a week · 90 min"] },
] as const;

function Courses() {
  const { t } = useLang();
  return (
    <>
      <PageHero eyebrow={t("Курсы", "Courses")} title={t("Программа под вашу цель", "A program for your goal")} text={t("Все курсы проходят очно в центре Москвы или онлайн. Перед стартом — бесплатное тестирование уровня.", "All courses run in person in central Moscow or online. Free level test before you start.")} />
      <section className="container-x grid gap-5 md:grid-cols-2">
        {courses.map((c) => (
          <article key={c.t[0]} className="flex flex-col rounded-2xl border bg-card p-8 transition hover:shadow-card">
            <div className="flex flex-wrap gap-2 text-xs font-bold">
              <span className="rounded-full bg-accent/10 px-3 py-1 text-accent">{t(...c.lvl)}</span>
              <span className="rounded-full bg-secondary px-3 py-1">{t(...c.who)}</span>
            </div>
            <h2 className="mt-5 text-3xl font-semibold">{t(...c.t)}</h2>
            <p className="mt-3 flex-1 text-muted-foreground">{t(...c.d)}</p>
            <div className="mt-6 flex items-center justify-between border-t pt-5 text-sm">
              <span className="text-muted-foreground">{t(...c.dur)}</span>
              <Link to="/prices" className="font-semibold text-accent">{t("Цены →", "Prices →")}</Link>
            </div>
          </article>
        ))}
      </section>
      <CtaSection source="Курсы" />
    </>
  );
}
