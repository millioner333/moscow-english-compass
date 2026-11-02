// Single source of truth for paid plans: used by the prices page and by the
// YooMoney notification handler to check that the paid amount matches.
export const YOOMONEY_WALLET = "4100119665803159";

export const PLANS = {
  "mini-group": { name: "Мини-группа", sum: 5900 },
  intensive: { name: "Интенсив", sum: 9900 },
  private: { name: "Индивидуально", sum: 2500 },
} as const;

export const PLAN_PRICES: Record<string, { name: string; sum: number } | undefined> = PLANS;
