import { createFileRoute } from "@tanstack/react-router";
import { CtaSection, PageHero, meta } from "@/components/site";

export const Route = createFileRoute("/teachers")({
  head: () => meta("Преподаватели — Bridge English", "Сертифицированные преподаватели CELTA/DELTA и носители языка в школе английского Bridge English."),
  component: Teachers,
});

const team: [string, string, string][] = [
  ["Елена Смирнова", "Методист, DELTA", "15 лет опыта · Business English"],
  ["James Carter", "Носитель, Великобритания", "CELTA · Разговорные клубы"],
  ["Мария Волкова", "IELTS-эксперт", "Личный балл IELTS 8.5"],
  ["Алексей Орлов", "Преподаватель, CELTA", "General English · B1–C1"],
  ["Sarah Mitchell", "Носитель, США", "TESOL · Американский акцент"],
  ["Анна Ковалёва", "Детский преподаватель", "Игровая методика · 7–12 лет"],
];

function Teachers() {
  return (
    <>
      <PageHero eyebrow="Преподаватели" title="Команда, которая влюбляет в язык" text="Только 1 из 12 кандидатов проходит наш отбор. Все преподаватели имеют международные сертификаты и регулярно повышают квалификацию." />
      <section className="container-x grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {team.map(([n, r, d], i) => (
          <div key={n} className="rounded-2xl border bg-card p-7">
            <div className={`grid h-20 w-20 place-items-center rounded-full font-display text-2xl ${i % 2 ? "bg-accent text-accent-foreground" : "bg-primary text-primary-foreground"}`}>
              {n.split(" ").map((w) => w[0]).join("")}
            </div>
            <h2 className="mt-5 text-2xl font-semibold">{n}</h2>
            <p className="font-semibold text-accent">{r}</p>
            <p className="mt-2 text-sm text-muted-foreground">{d}</p>
          </div>
        ))}
      </section>
      <CtaSection source="Преподаватели" />
    </>
  );
}
