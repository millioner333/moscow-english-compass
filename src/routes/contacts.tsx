import { createFileRoute } from "@tanstack/react-router";
import { MapPin, Phone, Mail, Clock } from "lucide-react";
import { LeadForm, PageHero, meta } from "@/components/site";
import { useLang } from "@/lib/i18n";

export const Route = createFileRoute("/contacts")({
  head: () => meta("Контакты — Bridge English, Москва", "Адрес, телефон и график работы школы английского Bridge English. Запишитесь на бесплатный пробный урок."),
  component: Contacts,
});

function Contacts() {
  const { t } = useLang();
  const items = [
    [MapPin, t("Адрес", "Address"), t("Москва, ул. Тверская, 12, офис 305 (м. Пушкинская)", "Moscow, 12 Tverskaya St., office 305 (Pushkinskaya metro)")],
    [Phone, t("Телефон", "Phone"), "+7 (495) 123-45-67"],
    [Mail, "Email", "hello@bridge-english.ru"],
    [Clock, t("Часы работы", "Opening hours"), t("Пн–Пт 9:00–21:00, Сб–Вс 10:00–18:00", "Mon–Fri 9:00–21:00, Sat–Sun 10:00–18:00")],
  ] as const;
  return (
    <>
      <PageHero eyebrow={t("Контакты", "Contacts")} title={t("Будем рады видеть вас", "We'd love to see you")} text={t("Оставьте заявку — администратор перезвонит в течение 15 минут в рабочее время.", "Leave a request — our manager will call back within 15 minutes during business hours.")} />
      <section className="container-x grid gap-10 md:grid-cols-2">
        <div className="space-y-6">
          {items.map(([Icon, ti, v]) => (
            <div key={ti} className="flex gap-4">
              <span className="grid h-12 w-12 shrink-0 place-items-center rounded-full bg-secondary text-accent"><Icon size={20} /></span>
              <div><p className="text-sm text-muted-foreground">{ti}</p><p className="text-lg font-semibold">{v}</p></div>
            </div>
          ))}
          <iframe title={t("Карта", "Map")} className="h-72 w-full rounded-2xl border" loading="lazy" src="https://yandex.ru/map-widget/v1/?ll=37.6066%2C55.7603&z=15&pt=37.6066,55.7603,pm2rdm" />
        </div>
        <LeadForm source="Контакты" />
      </section>
    </>
  );
}
