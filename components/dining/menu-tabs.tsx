"use client";

import { useRef, useState, type KeyboardEvent } from "react";
import type { Menu } from "@/lib/dining";
import { cn } from "@/lib/format";

/** Menus as an accessible tab set: arrow keys move between tabs. */
export function MenuTabs({ menus, id }: { menus: Menu[]; id: string }) {
  const [active, setActive] = useState(0);
  const tabs = useRef<(HTMLButtonElement | null)[]>([]);
  const menu = menus[active];

  const onKey = (e: KeyboardEvent) => {
    const map: Record<string, number> = { ArrowRight: 1, ArrowLeft: -1 };
    if (e.key === "Home" || e.key === "End") {
      e.preventDefault();
      const i = e.key === "Home" ? 0 : menus.length - 1;
      setActive(i);
      tabs.current[i]?.focus();
    } else if (e.key in map) {
      e.preventDefault();
      const i = (active + map[e.key] + menus.length) % menus.length;
      setActive(i);
      tabs.current[i]?.focus();
    }
  };

  return (
    <div className="mt-10">
      {menus.length > 1 ? (
        <div role="tablist" aria-label="Menus" className="flex gap-6 border-b border-current/20" onKeyDown={onKey}>
          {menus.map((m, i) => (
            <button
              key={m.title}
              ref={(el) => {
                tabs.current[i] = el;
              }}
              role="tab"
              id={`${id}-tab-${i}`}
              aria-selected={i === active}
              aria-controls={`${id}-panel`}
              tabIndex={i === active ? 0 : -1}
              onClick={() => setActive(i)}
              className={cn("t-label -mb-px border-b-2 pb-3 transition-colors", i === active ? "border-current" : "border-transparent opacity-80 hover:opacity-100")}
            >
              {m.title}
            </button>
          ))}
        </div>
      ) : (
        <p className="t-label border-b border-current/20 pb-3">{menu.title}</p>
      )}
      <div
        id={`${id}-panel`}
        role={menus.length > 1 ? "tabpanel" : undefined}
        aria-labelledby={menus.length > 1 ? `${id}-tab-${active}` : undefined}
        key={active}
        className="page-in"
      >
        {menu.note ? <p className="muted mt-4 text-[0.9rem]">{menu.note}</p> : null}
        <ul className="mt-2">
          {menu.items.map((item) => (
            <li key={item.name} className="border-b border-current/10 py-4">
              <p className="text-[1.05rem]">{item.name}</p>
              <p className="muted text-[0.9rem]">{item.detail}</p>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
