import { createFileRoute, Link } from "@tanstack/react-router";
import { meta } from "@/components/site";
import { useLang } from "@/lib/i18n";

export const Route = createFileRoute("/payment-success")({
  head: () => meta("Оплата принята — Bridge English", "Спасибо за оплату курса в школе английского Bridge English."),
  component: Success,
});

function Success() {
  const { t } = useLang();
  return (
    <section className="container-x py-24 text-center">
      <p className="font-display text-5xl">{t("Спасибо за оплату!", "Thank you for your payment!")} 🎉</p>
      <p className="mx-auto mt-4 max-w-xl text-lg text-muted-foreground">{t("Как только ЮMoney подтвердит платёж, администратор свяжется с вами, чтобы подобрать группу и расписание.", "Once YooMoney confirms the payment, our manager will contact you to arrange your group and schedule.")}</p>
      <Link to="/" className="btn-accent mt-8 inline-flex">{t("На главную", "Back to home")}</Link>
    </section>
  );
}
