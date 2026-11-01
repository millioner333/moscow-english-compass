import { createFileRoute } from "@tanstack/react-router";
import { CtaSection, PageHero, meta } from "@/components/site";
import { useLang } from "@/lib/i18n";

export const Route = createFileRoute("/about")({
  head: () => meta("О школе — Bridge English, Москва", "История, ценности и методика школы английского языка Bridge English в Москве."),
  component: About,
});

const stats = [["2012", ["год основания", "founded"]], ["2 400+", ["выпускников", "graduates"]], ["25", ["преподавателей", "teachers"]], ["94%", ["рекомендуют нас", "recommend us"]]] as const;
const values = [
  [["Без страха ошибок", "No fear of mistakes"], ["Ошибка — часть обучения. Атмосфера поддержки, а не экзамена.", "Mistakes are part of learning. A supportive atmosphere, not an exam."]],
  [["Результат", "Results"], ["Конкретные цели на каждый модуль и прозрачная обратная связь.", "Clear goals for every module and transparent feedback."]],
  [["Сообщество", "Community"], ["Разговорные клубы, киновечера и встречи с носителями.", "Speaking clubs, movie nights and meetups with native speakers."]],
] as const;

function About() {
  const { t } = useLang();
  return (
    <>
      <PageHero eyebrow={t("О нас", "About us")} title={<>{t("Мы строим мост между вами и", "We build a bridge between you and")} <em className="text-accent">{t("английским", "English")}</em></>} text={t("Bridge English открылась в 2012 году как маленький разговорный клуб на Тверской. Сегодня это школа с 25 преподавателями и тысячами выпускников.", "Bridge English opened in 2012 as a small speaking club on Tverskaya Street. Today it's a school with 25 teachers and thousands of graduates.")} />
      <section className="container-x grid gap-5 md:grid-cols-4">
        {stats.map(([n, l]) => (
          <div key={n} className="rounded-2xl bg-secondary p-7">
            <p className="font-display text-5xl text-accent">{n}</p>
            <p className="mt-2 text-muted-foreground">{t(...l)}</p>
          </div>
        ))}
      </section>
      <section className="container-x mt-24 grid gap-12 md:grid-cols-2">
        <h2 className="text-4xl font-semibold">{t("Наша методика", "Our method")}</h2>
        <div className="space-y-5 text-lg text-muted-foreground">
          <p>{t("Мы используем коммуникативный подход: грамматика и лексика осваиваются через живое общение, а не через заучивание правил.", "We use the communicative approach: grammar and vocabulary are learned through real conversation, not memorizing rules.")}</p>
          <p>{t("Работаем по учебникам Cambridge и Oxford, дополняя их актуальными материалами: подкастами, статьями, сериалами.", "We use Cambridge and Oxford coursebooks, plus up-to-date materials: podcasts, articles, TV series.")}</p>
          <p>{t("Каждый месяц — промежуточное тестирование, чтобы вы видели свой прогресс в цифрах.", "Monthly progress tests let you see your improvement in numbers.")}</p>
        </div>
      </section>
      <section className="container-x mt-24">
        <h2 className="text-4xl font-semibold">{t("Наши ценности", "Our values")}</h2>
        <div className="mt-10 grid gap-5 md:grid-cols-3">
          {values.map(([ti, d]) => (
            <div key={ti[0]} className="rounded-2xl border bg-card p-7">
              <h3 className="text-2xl font-semibold">{t(...ti)}</h3>
              <p className="mt-3 text-muted-foreground">{t(...d)}</p>
            </div>
          ))}
        </div>
      </section>
      <CtaSection source="О нас" />
    </>
  );
}
