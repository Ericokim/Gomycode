interface DebugPanelProps {
  itemCount: number;
  filteredCount: number;
}

const fixedIssues = [
  {
    title: 'Quantity edge cases',
    detail:
      'The cart now removes an item when quantity drops below one instead of leaving invalid values behind.',
  },
  {
    title: 'Derived totals',
    detail:
      'Cart totals recalculate from live state so the amount always matches the visible rows and quantities.',
  },
  {
    title: 'State persistence',
    detail:
      'The custom hook now syncs cart updates to localStorage so a refresh preserves the debugging session.',
  },
];

const inspectionSteps = [
  'Inspect App to confirm the active search, selected category, sort mode, and derived counters.',
  'Open ProductList to watch filter props change as you search and switch categories.',
  'Select ProductCard and verify the incoming product object matches the rendered badge, stock, and price.',
  'Inspect Cart and CartItem to confirm quantity updates trigger the correct recalculated total.',
];

export function DebugPanel({ itemCount, filteredCount }: DebugPanelProps) {
  return (
    <section className={styles.panel}>
      <div className={styles.heroCard}>
        <h2 className={styles.title}>Debugging walkthrough</h2>
        <p className={styles.subtitle}>
          This screen is built to be inspected, not just used. Every major interaction changes
          state or props in a visible way.
        </p>

        <div className={styles.statGrid}>
          <article className={styles.statCard}>
            <span className={styles.statLabel}>Visible cards</span>
            <strong className={styles.statValue}>{filteredCount}</strong>
          </article>
          <article className={styles.statCard}>
            <span className={styles.statLabel}>Cart items</span>
            <strong className={styles.statValue}>{itemCount}</strong>
          </article>
        </div>
      </div>

      <div className={styles.section}>
        <h3 className={styles.sectionTitle}>Issues fixed</h3>
        <div className={styles.listWrap}>
          {fixedIssues.map((issue) => (
            <article key={issue.title} className={styles.issueCard}>
              <h4 className={styles.issueTitle}>{issue.title}</h4>
              <p className={styles.issueText}>{issue.detail}</p>
            </article>
          ))}
        </div>
      </div>

      <div className={styles.section}>
        <h3 className={styles.sectionTitle}>Inspect in React DevTools</h3>
        <ul className={styles.stepList}>
          {inspectionSteps.map((step) => (
            <li key={step} className={styles.stepItem}>
              {step}
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

const styles = {
  panel: 'flex flex-col gap-6',
  heroCard:
    'rounded-[32px] bg-slate-900 p-6 text-white shadow-xl shadow-slate-300/30 sm:p-8',
  title: 'text-2xl font-bold',
  subtitle: 'mt-3 text-sm leading-6 text-slate-200',
  statGrid: 'mt-6 grid gap-4 sm:grid-cols-2',
  statCard: 'rounded-3xl bg-white/10 p-4 ring-1 ring-white/10 backdrop-blur',
  statLabel: 'text-xs uppercase tracking-[0.2em] text-slate-300',
  statValue: 'mt-2 block text-3xl font-bold text-amber-300',
  section: 'rounded-[32px] bg-white p-6 shadow-xl shadow-slate-200/60 sm:p-8',
  sectionTitle: 'text-xl font-bold text-slate-900',
  listWrap: 'mt-5 grid gap-4',
  issueCard: 'rounded-3xl border border-slate-200 bg-slate-50 p-4',
  issueTitle: 'text-sm font-semibold text-slate-900',
  issueText: 'mt-2 text-sm leading-6 text-slate-600',
  stepList: 'mt-5 flex flex-col gap-3',
  stepItem:
    'rounded-3xl border border-amber-200 bg-amber-50 px-4 py-4 text-sm leading-6 text-slate-700',
};
