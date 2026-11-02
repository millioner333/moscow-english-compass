import { createContext, useContext, useEffect, useState, type ReactNode } from "react";

export type Lang = "ru" | "en";
export type Pair = readonly [string, string];

type Ctx = { lang: Lang; setLang: (l: Lang) => void; t: (ru: string | Pair, en?: string) => string };

const LangContext = createContext<Ctx>({ lang: "ru", setLang: () => {}, t: (ru) => (typeof ru === "string" ? ru : ru[0]) });

export function LangProvider({ children }: { children: ReactNode }) {
  const [lang, setLangState] = useState<Lang>("ru");
  useEffect(() => {
    const saved = localStorage.getItem("lang");
    if (saved === "en" || saved === "ru") setLangState(saved);
  }, []);
  useEffect(() => {
    document.documentElement.lang = lang;
  }, [lang]);
  const setLang = (l: Lang) => {
    setLangState(l);
    localStorage.setItem("lang", l);
  };
  const t = (ru: string | Pair, en?: string) => {
    const [r, e] = typeof ru === "string" ? [ru, en ?? ru] : ru;
    return lang === "en" ? e : r;
  };
  return <LangContext.Provider value={{ lang, setLang, t }}>{children}</LangContext.Provider>;
}

export const useLang = () => useContext(LangContext);
