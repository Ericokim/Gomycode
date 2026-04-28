interface HeaderProps {
  itemCount: number;
  total: number;
}

export function Header({ itemCount, total }: HeaderProps) {
  return (
    <header className={styles.header}>
      <div className={styles.inner}>
        <div className={styles.brandWrap}>
          <span className={styles.brandMark}>RD</span>
          <div>
            <p className={styles.brandTitle}>React Shop</p>
            <p className={styles.brandSubtitle}>Browse, filter, and manage your cart</p>
          </div>
        </div>

        <div className={styles.statsWrap}>
          <div className={styles.statPill}>
            <span className={styles.statLabel}>Items</span>
            <strong className={styles.statValue}>{itemCount}</strong>
          </div>
          <div className={styles.statPill}>
            <span className={styles.statLabel}>Total</span>
            <strong className={styles.statValue}>${total.toFixed(2)}</strong>
          </div>
        </div>
      </div>
    </header>
  );
}

const styles = {
  header:
    'sticky top-0 z-50 border-b border-slate-200/80 bg-white/90 backdrop-blur-md',
  inner:
    'mx-auto flex w-full max-w-7xl flex-col gap-4 px-4 py-4 sm:px-6 lg:flex-row lg:items-center lg:justify-between',
  brandWrap: 'flex items-center gap-3',
  brandMark:
    'flex h-11 w-11 items-center justify-center rounded-2xl bg-slate-900 text-sm font-bold tracking-[0.2em] text-amber-300',
  brandTitle: 'text-sm font-semibold tracking-wide text-slate-900 sm:text-base',
  brandSubtitle: 'text-xs text-slate-500 sm:text-sm',
  statsWrap: 'flex flex-wrap gap-3',
  statPill:
    'flex min-w-[110px] items-center justify-between gap-3 rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3',
  statLabel: 'text-xs font-medium uppercase tracking-[0.18em] text-slate-500',
  statValue: 'text-sm font-bold text-slate-900',
};
