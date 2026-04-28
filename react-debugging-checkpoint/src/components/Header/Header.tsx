interface HeaderProps { itemCount: number; }

export function Header({ itemCount }: HeaderProps) {
  return (
    <header className="sticky top-0 z-50 border-b border-slate-200 bg-white/90 backdrop-blur-sm">
      <div className="mx-auto flex w-full max-w-7xl items-center justify-between px-4 py-3 sm:px-6">
        <div className="flex items-center gap-2.5">
          <span className="flex h-8 w-8 items-center justify-center rounded-full bg-amber-400 text-xs font-bold text-slate-900">RS</span>
          <span className="text-sm font-semibold tracking-wide text-slate-900 sm:text-base">React Shop</span>
        </div>
        <div className="relative cursor-pointer">
          <span className="text-2xl">🛒</span>
          {itemCount > 0 && (
            <span className="absolute -right-2 -top-2 flex h-5 w-5 items-center justify-center rounded-full bg-rose-500 text-[0.65rem] font-bold text-white">
              {itemCount}
            </span>
          )}
        </div>
      </div>
    </header>
  );
}
