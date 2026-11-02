import { createFileRoute } from "@tanstack/react-router";
import { CtaSection, PageHero, meta } from "@/components/site";
import { useLang } from "@/lib/i18n";

export const Route = createFileRoute("/teachers")({
  head: () => meta("Преподаватели — Bridge English", "Сертифицированные преподаватели CELTA/DELTA и носители языка в школе английского Bridge English."),
  component: Teachers,
});

type P = readonly [string, string];
const team: [P, P, P][] = [
  [["Елена Смирнова", "Elena Smirnova"], ["Методист, DELTA", "Head of methodology, DELTA"], ["15 лет опыта · Business English", "15 years of experience · Business English"]],
  [["James Carter", "James Carter"], ["Носитель, Великобритания", "Native speaker, UK"], ["CELTA · Разговорные клубы", "CELTA · Speaking clubs"]],
  [["Мария Волкова", "Maria Volkova"], ["IELTS-эксперт", "IELTS expert"], ["Личный балл IELTS 8.5", "Personal IELTS score 8.5"]],
  [["Алексей Орлов", "Alexey Orlov"], ["Преподаватель, CELTA", "Teacher, CELTA"], ["General English · B1–C1", "General English · B1–C1"]],
  [["Sarah Mitchell", "Sarah Mitchell"], ["Носитель, США", "Native speaker, USA"], ["TESOL · Американский акцент", "TESOL · American accent"]],
  [["Анна Ковалёва", "Anna Kovaleva"], ["Детский преподаватель", "Kids' teacher"], ["Игровая методика · 7–12 лет", "Game-based method · ages 7–12"]],
];

function Teachers() {
  const { t } = useLang();
  return (
    <>
      <PageHero eyebrow={t("Преподаватели", "Teachers")} title={t("Команда, которая влюбляет в язык", "A team that makes you love English")} text={t("Только 1 из 12 кандидатов проходит наш отбор. Все преподаватели имеют международные сертификаты и регулярно повышают квалификацию.", "Only 1 in 12 candidates passes our selection. All teachers hold international certificates and keep improving their skills.")} />
      <section className="container-x grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {team.map(([n, r, d], i) => {
          const name = t(n);
          return (
            <div key={n[0]} className="rounded-2xl border bg-card p-7">
              <div className={`grid h-20 w-20 place-items-center rounded-full font-display text-2xl ${i % 2 ? "bg-accent text-accent-foreground" : "bg-primary text-primary-foreground"}`}>
                {name.split(" ").map((w) => w[0]).join("")}
              </div>
              <h2 className="mt-5 text-2xl font-semibold">{name}</h2>
              <p className="font-semibold text-accent">{t(r)}</p>
              <p className="mt-2 text-sm text-muted-foreground">{t(d)}</p>
            </div>
          );
        })}
      </section>
      <CtaSection source="Преподаватели" />
    </>
  );
}
