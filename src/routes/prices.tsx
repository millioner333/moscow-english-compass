import { createFileRoute, Link } from "@tanstack/react-router";
import { Check } from "lucide-react";
import { CtaSection, PageHero, meta } from "@/components/site";

export const Route = createFileRoute("/prices")({
  head: () => meta("Цены на курсы английского — Bridge English", "Стоимость групповых и индивидуальных занятий английским в Москве. Первый урок бесплатно."),
  component: Prices,
});

const plans = [
  { t: "Мини-группа", p: "5 900", per: "₽ / месяц", f: ["8 занятий по 90 минут", "Группа до 6 человек", "Учебные материалы включены", "Разговорный клуб 1 раз в месяц"] },
  { t: "Интенсив", p: "9 900", per: "₽ / месяц", hot: true, f: ["12 занятий по 90 минут", "Группа до 4 человек", "Еженедельный клуб с носителем", "Личный куратор и отчёты"] },
  { t: "Индивидуально", p: "2 500", per: "₽ / урок", f: ["Занятия 60 минут", "Программа под вашу цель", "Гибкое расписание", "Очно или онлайн"] },
];

function Prices() {
  return (
    <>
      <PageHero eyebrow="Цены" title="Прозрачные цены без скрытых платежей" text="Оплата помесячно. При оплате курса за 3 месяца — скидка 10%. Пробный урок бесплатно." />
      <section className="container-x grid gap-5 md:grid-cols-3">
        {plans.map((pl) => (
          <div key={pl.t} className={`flex flex-col rounded-2xl p-8 ${pl.hot ? "bg-primary text-primary-foreground shadow-card md:-translate-y-4" : "border bg-card"}`}>
            {pl.hot && <span className="mb-3 w-fit rounded-full bg-gold px-3 py-1 text-xs font-bold text-primary">Хит</span>}
            <h2 className="text-2xl font-semibold">{pl.t}</h2>
            <p className="mt-5"><span className="font-display text-5xl">{pl.p}</span> <span className="opacity-70">{pl.per}</span></p>
            <ul className="mt-6 flex-1 space-y-3">
              {pl.f.map((x) => <li key={x} className="flex gap-2"><Check size={18} className="mt-0.5 shrink-0 text-accent" />{x}</li>)}
            </ul>
            <Link to="/contacts" className="btn-accent mt-8">Записаться</Link>
          </div>
        ))}
      </section>
      <section className="container-x mt-20 overflow-x-auto">
        <h2 className="text-3xl font-semibold">Специальные программы</h2>
        <table className="mt-6 w-full min-w-[480px] text-left">
          <tbody>
            {[["Business English", "8 900 ₽ / мес"], ["IELTS / TOEFL", "9 900 ₽ / мес"], ["Английский для детей", "5 400 ₽ / мес"], ["ОГЭ / ЕГЭ", "6 900 ₽ / мес"], ["Корпоративное обучение", "по запросу"]].map(([n, p]) => (
              <tr key={n} className="border-b"><td className="py-4 font-semibold">{n}</td><td className="py-4 text-right">{p}</td></tr>
            ))}
          </tbody>
        </table>
      </section>
      <CtaSection source="Цены" />
    </>
  );
}
