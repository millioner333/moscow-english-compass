import { createFileRoute } from "@tanstack/react-router";
import { CtaSection, PageHero, meta } from "@/components/site";

export const Route = createFileRoute("/about")({
  head: () => meta("О школе — Bridge English, Москва", "История, ценности и методика школы английского языка Bridge English в Москве."),
  component: About,
});

function About() {
  return (
    <>
      <PageHero eyebrow="О нас" title={<>Мы строим мост между вами и <em className="text-accent">английским</em></>} text="Bridge English открылась в 2012 году как маленький разговорный клуб на Тверской. Сегодня это школа с 25 преподавателями и тысячами выпускников." />
      <section className="container-x grid gap-5 md:grid-cols-4">
        {[["2012", "год основания"], ["2 400+", "выпускников"], ["25", "преподавателей"], ["94%", "рекомендуют нас"]].map(([n, l]) => (
          <div key={l} className="rounded-2xl bg-secondary p-7">
            <p className="font-display text-5xl text-accent">{n}</p>
            <p className="mt-2 text-muted-foreground">{l}</p>
          </div>
        ))}
      </section>
      <section className="container-x mt-24 grid gap-12 md:grid-cols-2">
        <h2 className="text-4xl font-semibold">Наша методика</h2>
        <div className="space-y-5 text-lg text-muted-foreground">
          <p>Мы используем коммуникативный подход: грамматика и лексика осваиваются через живое общение, а не через заучивание правил.</p>
          <p>Работаем по учебникам Cambridge и Oxford, дополняя их актуальными материалами: подкастами, статьями, сериалами.</p>
          <p>Каждый месяц — промежуточное тестирование, чтобы вы видели свой прогресс в цифрах.</p>
        </div>
      </section>
      <section className="container-x mt-24">
        <h2 className="text-4xl font-semibold">Наши ценности</h2>
        <div className="mt-10 grid gap-5 md:grid-cols-3">
          {[["Без страха ошибок", "Ошибка — часть обучения. Атмосфера поддержки, а не экзамена."], ["Результат", "Конкретные цели на каждый модуль и прозрачная обратная связь."], ["Сообщество", "Разговорные клубы, киновечера и встречи с носителями."]].map(([t, d]) => (
            <div key={t} className="rounded-2xl border bg-card p-7">
              <h3 className="text-2xl font-semibold">{t}</h3>
              <p className="mt-3 text-muted-foreground">{d}</p>
            </div>
          ))}
        </div>
      </section>
      <CtaSection source="О нас" />
    </>
  );
}
