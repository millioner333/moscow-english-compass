import { createFileRoute, Link } from "@tanstack/react-router";
import { Check } from "lucide-react";
import { CtaSection, PageHero, meta } from "@/components/site";
import { useLang } from "@/lib/i18n";

export const Route = createFileRoute("/prices")({
  head: () => meta("Цены на курсы английского — Bridge English", "Стоимость групповых и индивидуальных занятий английским в Москве. Первый урок бесплатно."),
  component: Prices,
});

type P = readonly [string, string];
const plans: { t: P; p: string; per: P; hot?: boolean; f: P[] }[] = [
  { t: ["Мини-группа", "Mini-group"], p: "5 900", per: ["₽ / месяц", "₽ / month"], f: [["8 занятий по 90 минут", "8 lessons of 90 minutes"], ["Группа до 6 человек", "Group of up to 6"], ["Учебные материалы включены", "Materials included"], ["Разговорный клуб 1 раз в месяц", "Speaking club once a month"]] },
  { t: ["Интенсив", "Intensive"], p: "9 900", per: ["₽ / месяц", "₽ / month"], hot: true, f: [["12 занятий по 90 минут", "12 lessons of 90 minutes"], ["Группа до 4 человек", "Group of up to 4"], ["Еженедельный клуб с носителем", "Weekly club with a native speaker"], ["Личный куратор и отчёты", "Personal tutor and reports"]] },
  { t: ["Индивидуально", "Private"], p: "2 500", per: ["₽ / урок", "₽ / lesson"], f: [["Занятия 60 минут", "60-minute lessons"], ["Программа под вашу цель", "Program tailored to your goal"], ["Гибкое расписание", "Flexible schedule"], ["Очно или онлайн", "In person or online"]] },
];

const special: [P, P][] = [
  [["Business English", "Business English"], ["8 900 ₽ / мес", "8,900 ₽ / month"]],
  [["IELTS / TOEFL", "IELTS / TOEFL"], ["9 900 ₽ / мес", "9,900 ₽ / month"]],
  [["Английский для детей", "English for kids"], ["5 400 ₽ / мес", "5,400 ₽ / month"]],
  [["ОГЭ / ЕГЭ", "OGE / EGE exams"], ["6 900 ₽ / мес", "6,900 ₽ / month"]],
  [["Корпоративное обучение", "Corporate training"], ["по запросу", "on request"]],
];

function Prices() {
  const { t } = useLang();
  return (
    <>
      <PageHero eyebrow={t("Цены", "Prices")} title={t("Прозрачные цены без скрытых платежей", "Transparent prices, no hidden fees")} text={t("Оплата помесячно. При оплате курса за 3 месяца — скидка 10%. Пробный урок бесплатно.", "Monthly payment. 10% off when paying for 3 months. Trial lesson is free.")} />
      <section className="container-x grid gap-5 md:grid-cols-3">
        {plans.map((pl) => (
          <div key={pl.t[0]} className={`flex flex-col rounded-2xl p-8 ${pl.hot ? "bg-primary text-primary-foreground shadow-card md:-translate-y-4" : "border bg-card"}`}>
            {pl.hot && <span className="mb-3 w-fit rounded-full bg-gold px-3 py-1 text-xs font-bold text-primary">{t("Хит", "Popular")}</span>}
            <h2 className="text-2xl font-semibold">{t(...pl.t)}</h2>
            <p className="mt-5"><span className="font-display text-5xl">{pl.p}</span> <span className="opacity-70">{t(...pl.per)}</span></p>
            <ul className="mt-6 flex-1 space-y-3">
              {pl.f.map((x) => <li key={x[0]} className="flex gap-2"><Check size={18} className="mt-0.5 shrink-0 text-accent" />{t(...x)}</li>)}
            </ul>
            <Link to="/contacts" className="btn-accent mt-8">{t("Записаться", "Sign up")}</Link>
          </div>
        ))}
      </section>
      <section className="container-x mt-20 overflow-x-auto">
        <h2 className="text-3xl font-semibold">{t("Специальные программы", "Special programs")}</h2>
        <table className="mt-6 w-full min-w-[480px] text-left">
          <tbody>
            {special.map(([n, p]) => (
              <tr key={n[0]} className="border-b"><td className="py-4 font-semibold">{t(...n)}</td><td className="py-4 text-right">{t(...p)}</td></tr>
            ))}
          </tbody>
        </table>
      </section>
      <CtaSection source="Цены" />
    </>
  );
}
