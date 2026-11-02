import { createFileRoute } from "@tanstack/react-router";
import { PageHero, meta } from "@/components/site";
import { useLang } from "@/lib/i18n";

export const Route = createFileRoute("/careers")({
  head: () => meta("Вакансии — работа в Bridge English", "Вакансии преподавателей английского и администраторов в школе Bridge English, Москва."),
  component: Careers,
});

type P = readonly [string, string];
const jobs: [P, P, P][] = [
  [["Преподаватель английского (взрослые)", "English teacher (adults)"], ["от 120 000 ₽", "from 120,000 ₽"], ["Уровень C1+, опыт от 2 лет, CELTA приветствуется.", "C1+ level, 2+ years of experience, CELTA is a plus."]],
  [["Преподаватель для детей", "Kids' teacher"], ["от 100 000 ₽", "from 100,000 ₽"], ["Опыт работы с детьми 7–12 лет, любовь к игровым форматам.", "Experience with kids aged 7–12, love for game-based formats."]],
  [["Носитель языка (разговорные клубы)", "Native speaker (speaking clubs)"], ["от 2 000 ₽ / час", "from 2,000 ₽ / hour"], ["Native speaker, частичная занятость, вечер и выходные.", "Native speaker, part-time, evenings and weekends."]],
  [["Администратор школы", "School administrator"], ["от 70 000 ₽", "from 70,000 ₽"], ["Работа с клиентами, CRM, график 5/2 или 2/2.", "Client service, CRM, 5/2 or 2/2 schedule."]],
];

function Careers() {
  const { t } = useLang();
  return (
    <>
      <PageHero eyebrow={t("Вакансии", "Careers")} title={t("Присоединяйтесь к команде", "Join our team")} text={t("Официальное оформление, методическая поддержка, оплачиваемое обучение и дружный коллектив в центре Москвы.", "Official employment, methodological support, paid training and a friendly team in central Moscow.")} />
      <section className="container-x space-y-4">
        {jobs.map(([ti, s, d]) => (
          <div key={ti[0]} className="flex flex-col justify-between gap-4 rounded-2xl border bg-card p-7 md:flex-row md:items-center">
            <div>
              <h2 className="text-2xl font-semibold">{t(ti)}</h2>
              <p className="mt-2 text-muted-foreground">{t(d)}</p>
            </div>
            <div className="flex shrink-0 items-center gap-5">
              <span className="font-bold">{t(s)}</span>
              <a href={`mailto:hr@bridge-english.ru?subject=${encodeURIComponent(t(ti))}`} className="btn-accent !py-2.5">{t("Откликнуться", "Apply")}</a>
            </div>
          </div>
        ))}
        <p className="pt-4 text-muted-foreground">{t("Не нашли подходящую вакансию? Пришлите резюме на hr@bridge-english.ru", "Didn't find a suitable position? Send your CV to hr@bridge-english.ru")}</p>
      </section>
    </>
  );
}
