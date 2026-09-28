import { VW, VH, NODES, EDGES, DASHED, c, type NodeId } from '../data/ecosystemGraph';

const pct = (v: number, t: number) => `${(v / t) * 100}%`;

/* Diagrama del ecosistema: SVG interactivo en desktop, lista vertical en móvil. */
export function EcosystemDiagram({ sel, onSelect }: { sel: NodeId; onSelect: (id: NodeId) => void }) {
  return (
    <>
      {/* Diagrama (desktop) */}
      <div className="relative hidden w-full rounded-xl2 border-2 border-dashed border-navy-300 bg-paper-raised lg:block" style={{ aspectRatio: `${VW} / ${VH}` }}>
        <svg viewBox={`0 0 ${VW} ${VH}`} className="absolute inset-0 h-full w-full" aria-hidden>
          <defs>
            <marker id="arr" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="7" markerHeight="7" orient="auto-start-reverse"><path d="M0,0 L10,5 L0,10 z" fill="rgb(var(--navy-500))" /></marker>
          </defs>
          {EDGES.map((e, i) => {
            const [x1, y1] = c(...e.from); const [x2, y2] = c(...e.to);
            return <path key={i} d={`M${x1},${y1} L${x2},${y2}`} fill="none" stroke="rgb(var(--navy-500))" strokeWidth={2} markerEnd="url(#arr)" opacity={0.8} />;
          })}
          {DASHED.map((d) => <path key={d} d={d} fill="none" stroke="rgb(var(--navy-500))" strokeWidth={1.5} strokeDasharray="6 6" markerEnd="url(#arr)" opacity={0.75} />)}
          <text x={870} y={170} fontSize={13} fill="rgb(var(--ink-muted))">recursos y herramientas</text>
          <text x={120} y={752} fontSize={13} fill="rgb(var(--ink-muted))">las empresas establecidas cubren las necesidades de los departamentos</text>
          <text x={16} y={28} fontSize={15} fontWeight={700} fill="rgb(var(--navy))">Ecosistema I&amp;E Bizkaia</text>
          <text x={430} y={30} fontSize={12} fontWeight={600} fill="rgb(var(--magenta-600))">Entrada ecosistema · aceleradoras y startups</text>
          <text x={60} y={310} fontSize={12} fontWeight={600} fill="rgb(var(--navy))">Entrada LK · departamentos y votación</text>
        </svg>
        {(Object.keys(NODES) as NodeId[]).map((id) => {
          const n = NODES[id]; const on = sel === id;
          const shape = n.shape === 'circle' ? 'rounded-[50%]' : n.shape === 'cloud' ? 'rounded-full' : n.shape === 'tri' ? '[clip-path:polygon(50%_0,100%_100%,0_100%)] rounded-none' : 'rounded-2xl';
          return (
            <button key={id} type="button" aria-pressed={on} onClick={() => onSelect(id)}
              className={`absolute flex flex-col items-center justify-center p-2 text-center shadow-card transition hover:scale-[1.03] ${shape} ${n.tone} ${on ? 'ring-4 ring-magenta ring-offset-2 ring-offset-paper-raised' : ''}`}
              style={{ left: pct(n.x, VW), top: pct(n.y, VH), width: pct(n.w, VW), height: pct(n.h, VH) }}>
              <span className={`font-semibold leading-tight ${id === 'match' ? 'font-display text-2xl' : n.shape === 'tri' ? 'mt-8 text-xs' : 'text-sm'}`}>{n.label}</span>
              {n.sub && <span className="mt-1 text-[0.7rem] leading-snug opacity-85">{n.sub}</span>}
            </button>
          );
        })}
      </div>

      {/* Lista vertical (móvil) */}
      <ol className="grid gap-2 lg:hidden" aria-label="Bloques del ecosistema">
        {(Object.keys(NODES) as NodeId[]).map((id) => {
          const n = NODES[id]; const on = sel === id;
          return (
            <li key={id}>
              <button type="button" aria-pressed={on} onClick={() => onSelect(id)}
                className={`block w-full rounded-2xl border bg-paper-raised p-4 text-left transition ${on ? 'border-magenta ring-2 ring-magenta' : 'border-line'}`}>
                <span className={`inline-flex rounded-lg px-2.5 py-1 text-sm font-semibold ${n.tone}`}>{n.label}</span>
                {n.sub && <span className="mt-2 block text-sm leading-snug text-ink-soft">{n.sub}</span>}
              </button>
            </li>
          );
        })}
      </ol>
    </>
  );
}
