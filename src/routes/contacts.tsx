import { createFileRoute } from "@tanstack/react-router";
import { MapPin, Phone, Mail, Clock } from "lucide-react";
import { LeadForm, PageHero, meta } from "@/components/site";

export const Route = createFileRoute("/contacts")({
  head: () => meta("Контакты — Bridge English, Москва", "Адрес, телефон и график работы школы английского Bridge English. Запишитесь на бесплатный пробный урок."),
  component: Contacts,
});

function Contacts() {
  const items = [
    [MapPin, "Адрес", "Москва, ул. Тверская, 12, офис 305 (м. Пушкинская)"],
    [Phone, "Телефон", "+7 (495) 123-45-67"],
    [Mail, "Email", "hello@bridge-english.ru"],
    [Clock, "Часы работы", "Пн–Пт 9:00–21:00, Сб–Вс 10:00–18:00"],
  ] as const;
  return (
    <>
      <PageHero eyebrow="Контакты" title="Будем рады видеть вас" text="Оставьте заявку — администратор перезвонит в течение 15 минут в рабочее время." />
      <section className="container-x grid gap-10 md:grid-cols-2">
        <div className="space-y-6">
          {items.map(([Icon, t, v]) => (
            <div key={t} className="flex gap-4">
              <span className="grid h-12 w-12 shrink-0 place-items-center rounded-full bg-secondary text-accent"><Icon size={20} /></span>
              <div><p className="text-sm text-muted-foreground">{t}</p><p className="text-lg font-semibold">{v}</p></div>
            </div>
          ))}
          <iframe title="Карта" className="h-72 w-full rounded-2xl border" loading="lazy" src="https://yandex.ru/map-widget/v1/?ll=37.6066%2C55.7603&z=15&pt=37.6066,55.7603,pm2rdm" />
        </div>
        <LeadForm source="Контакты" />
      </section>
    </>
  );
}
