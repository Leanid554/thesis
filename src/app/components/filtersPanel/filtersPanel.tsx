"use client";
import React, { useState } from "react";

const filterData = [
  {
    title: "Profil zawodowy",
    name: "profile",
    options: [
      { label: "Lekarz", count: 126 },
      { label: "Pielęgniarka", count: 554 },
      { label: "Ratownik medyczny", count: 345 },
      { label: "Psycholog", count: 334 },
      { label: "Inne", count: 764 },
    ],
  },
  {
    title: "Specjalizacja",
    name: "specialization",
    options: [
      { label: "Pediatria", count: 126 },
      { label: "Kardiologia", count: 554 },
      { label: "Chirurgia", count: 345 },
      { label: "Endokrynologia", count: 334 },
      { label: "Psychologia", count: 764 },
    ],
  },
];

export default function FiltersPanel() {
  const [expanded, setExpanded] = useState<string | null>(null);
  const [selected, setSelected] = useState<Record<string, Set<string>>>({});

  const toggleFilter = (title: string) => {
    setExpanded(expanded === title ? null : title);
  };

  const handleCheckbox = (category: string, label: string) => {
    setSelected((prev) => {
      const current = new Set(prev[category] || []);
      if (current.has(label)) {
        current.delete(label);
      } else {
        current.add(label);
      }
      return { ...prev, [category]: current };
    });
  };

  const clearFilters = () => setSelected({});
  const activeCount = Object.values(selected).reduce(
    (acc, set) => acc + set.size,
    0
  );

  return (
    <div className=" flex flex-col sticky top-5 pt-5">
      {/* mobile */}
      <button
        className="xl:hidden border border-gray-300 text-blue-700 font-bold rounded-full px-4 py-2"
        onClick={() =>
          document.getElementById("filters")?.classList.toggle("hidden")
        }
      >
        Filtry
      </button>

      <div id="filters" className="hidden xl:block">
        {/* active filters */}
        {activeCount > 0 && (
          <div className="border rounded-xl px-5 py-3 bg-white shadow-sm mb-2">
            <div className="flex justify-between items-center mb-3">
              <span className="text-sm font-medium text-blue-700">
                Aktywne filtry ({activeCount})
              </span>
              <button
                onClick={clearFilters}
                className="text-xs font-bold text-black hover:underline"
              >
                Wyczyść
              </button>
            </div>
            <ul className="text-sm space-y-1 text-gray-700">
              {Object.entries(selected).map(([key, values]) =>
                Array.from(values).map((val) => <li key={key + val}>{val}</li>)
              )}
            </ul>
          </div>
        )}

        {/* filters */}
        <div className="flex flex-col gap-4">
          {filterData.map(({ title, name, options }) => (
            <div key={name} className="border rounded-xl bg-white shadow-sm">
              <button
                onClick={() => toggleFilter(title)}
                className="w-full flex justify-between items-center text-left font-medium text-sm text-blue-800 px-5 py-4 border-b border-gray-200 focus:outline-none"
              >
                <span>{title}</span>
                <svg
                  className={`w-5 h-5 transition-transform duration-300 ${
                    expanded === title ? "rotate-180" : ""
                  }`}
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M19 9l-7 7-7-7"
                  />
                </svg>
              </button>

              <div
                className={`overflow-hidden transition-all duration-300 px-5 ${
                  expanded === title ? "max-h-[500px] py-4" : "max-h-0"
                }`}
              >
                <div className="space-y-2 text-sm text-gray-700">
                  {options.map(({ label, count }) => (
                    <div
                      key={label}
                      className="flex justify-between items-center"
                    >
                      <label className="flex items-center gap-2 cursor-pointer">
                        <input
                          type="checkbox"
                          checked={selected[name]?.has(label) || false}
                          onChange={() => handleCheckbox(name, label)}
                          className="accent-blue-600"
                        />
                        {label}
                      </label>
                      <span>{count}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* buttons actions */}
        <div className="sticky bottom-0  bg-white pt-1  pb-6">
          {activeCount > 0 && (
            <button
              onClick={clearFilters}
              className="w-full border border-blue-700 text-blue-700 text-sm font-normal mt-2 py-3 rounded-full hover:bg-blue-50 transition"
            >
              Wyczyść filtry
            </button>
          )}
          <button className="w-full text-sm bg-blue-700 text-white font-normal py-3 rounded-full mt-3 hover:bg-blue-800 transition">
            Szukaj (2453)
          </button>
        </div>
      </div>
    </div>
  );
}
