import React from "react";
import { ChevronDown, Search } from "lucide-react";
import * as SelectPrimitive from "@radix-ui/react-select";

interface FilterOption {
  label: string;
  value: string;
}

interface FilterBarProps {
  searchPlaceholder?: string;
  searchQuery: string;
  setSearchQuery: (value: string) => void;
  activeFilter?: string;
  setActiveFilter?: (value: string) => void;
  options?: FilterOption[];
}

const FilterBar = ({
  searchPlaceholder = "¿Qué estás buscando?",
  searchQuery,
  setSearchQuery,
  activeFilter,
  setActiveFilter,
  options,
}: FilterBarProps) => {
  const hasOptions = options && options.length > 0;

  return (
    <div className="sticky top-20 z-30 bg-[#050505]/90 backdrop-blur-xl py-6 mb-12 border-b border-white/5">
      <div className="max-w-6xl mx-auto px-4">
        <div className="flex flex-col md:flex-row items-stretch rounded-xl border border-white/10 bg-white/2 shadow-2xl transition-all focus-within:border-white/20 focus-within:bg-white/4">
          <div className="relative flex-1 flex items-center group">
            <div className="absolute left-4 text-muted-foreground group-focus-within:text-white transition-colors">
              <Search size={20} strokeWidth={2} />
            </div>
            <input
              type="text"
              placeholder={searchPlaceholder}
              className="w-full h-14 bg-transparent pl-12 pr-4 text-white placeholder:text-gray-50/30 outline-none border-0 ring-0 focus:ring-0 text-sm md:text-base"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>

          {hasOptions && (
            <>
              <div className="hidden md:block w-px bg-white/10 my-3" />

              <div className="w-full md:w-96 flex items-center">
                <SelectPrimitive.Root
                  value={activeFilter}
                  onValueChange={setActiveFilter}
                >
                  <SelectPrimitive.Trigger className="w-full h-14 flex items-center justify-between px-6 text-white outline-none group hover:bg-white/2 transition-colors gap-3 overflow-hidden">
                    <div className="flex-1 text-left truncate text-sm md:text-base pr-2">
                      <SelectPrimitive.Value placeholder="Todas las categorías" />
                    </div>
                    <SelectPrimitive.Icon className="shrink-0">
                      <ChevronDown className="size-4 text-gray-500 group-hover:text-white transition-colors" />
                    </SelectPrimitive.Icon>
                  </SelectPrimitive.Trigger>

                  <SelectPrimitive.Portal>
                    <SelectPrimitive.Content
                      className="z-100 min-w-(--radix-select-trigger-width) bg-[#0A0A0A] border border-white/10 rounded-lg shadow-3xl overflow-hidden animate-in fade-in zoom-in-95"
                      position="popper"
                      sideOffset={5}
                    >
                      <SelectPrimitive.Viewport className="p-1">
                        {options.map((opt) => (
                          <SelectPrimitive.Item
                            key={opt.value}
                            value={opt.value}
                            className="flex items-center px-8 py-3 text-sm text-gray-400 cursor-pointer outline-none hover:bg-white/5 hover:text-white transition-colors relative data-[state=checked]:text-white data-[state=checked]:bg-white/3"
                          >
                            <SelectPrimitive.ItemText>
                              {opt.label}
                            </SelectPrimitive.ItemText>
                            <SelectPrimitive.ItemIndicator className="absolute left-3 inline-flex items-center justify-center">
                              <div className="size-1 rounded-full bg-white shadow-[0_0_8px_rgba(255,255,255,0.5)]" />
                            </SelectPrimitive.ItemIndicator>
                          </SelectPrimitive.Item>
                        ))}
                      </SelectPrimitive.Viewport>
                    </SelectPrimitive.Content>
                  </SelectPrimitive.Portal>
                </SelectPrimitive.Root>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default FilterBar;
