import { createFileRoute } from "@tanstack/react-router";
import { PageHero, meta } from "@/components/site";

export const Route = createFileRoute("/careers")({
  head: () => meta("Вакансии — работа в Bridge English", "Вакансии преподавателей английского и администраторов в школе Bridge English, Москва."),
  component: Careers,
});

const jobs: [string, string, string][] = [
  ["Преподаватель английского (взрослые)", "от 120 000 ₽", "Уровень C1+, опыт от 2 лет, CELTA приветствуется."],
  ["Преподаватель для детей", "от 100 000 ₽", "Опыт работы с детьми 7–12 лет, любовь к игровым форматам."],
  ["Носитель языка (разговорные клубы)", "от 2 000 ₽ / час", "Native speaker, частичная занятость, вечер и выходные."],
  ["Администратор школы", "от 70 000 ₽", "Работа с клиентами, CRM, график 5/2 или 2/2."],
];

function Careers() {
  return (
    <>
      <PageHero eyebrow="Вакансии" title="Присоединяйтесь к команде" text="Официальное оформление, методическая поддержка, оплачиваемое обучение и дружный коллектив в центре Москвы." />
      <section className="container-x space-y-4">
        {jobs.map(([t, s, d]) => (
          <div key={t} className="flex flex-col justify-between gap-4 rounded-2xl border bg-card p-7 md:flex-row md:items-center">
            <div>
              <h2 className="text-2xl font-semibold">{t}</h2>
              <p className="mt-2 text-muted-foreground">{d}</p>
            </div>
            <div className="flex shrink-0 items-center gap-5">
              <span className="font-bold">{s}</span>
              <a href={`mailto:hr@bridge-english.ru?subject=${encodeURIComponent(t)}`} className="btn-accent !py-2.5">Откликнуться</a>
            </div>
          </div>
        ))}
        <p className="pt-4 text-muted-foreground">Не нашли подходящую вакансию? Пришлите резюме на hr@bridge-english.ru</p>
      </section>
    </>
  );
}
