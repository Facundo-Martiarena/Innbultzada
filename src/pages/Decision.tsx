import { Blocks, Check, Coins, Cpu, FileLock2, FileSignature, GraduationCap, Handshake, Receipt, Rocket, Store, Users } from 'lucide-react';
import { Navigate } from 'react-router-dom';
import { DecisionCard } from '../components/DecisionCard';
import { FlowNav } from '../components/FlowNav';
import { PageHeader } from '../components/PageHeader';
import { ProgramTimeline } from '../components/ProgramTimeline';
import { OUTCOMES, VENTURE_SUPPORTS } from '../data/model';
import { PROGRAM } from '../data/program';
import type { OutcomeId } from '../data/types';
import { useRouteChallenge } from '../lib/useRouteChallenge';

const ICON: Record<OutcomeId, typeof Rocket> = { buy: FileSignature, integrate: Blocks, partner: Handshake, venture: Rocket };
const TONE: Record<OutcomeId, 'navy' | 'yellow' | 'green' | 'magenta'> = { buy: 'magenta', integrate: 'navy', partner: 'green', venture: 'yellow' };
const SUPPORT_ICON: Record<string, typeof Users> = { equipo: Users, financiacion: Coins, pi: FileLock2, mercado: Store, mentoring: GraduationCap, tecnologia: Cpu, ventas: Receipt };

export default function Decision() {
  const { challenge: c, journey: j, outcome, setOutcome } = useRouteChallenge(4);
  if (!c || !j) return <Navigate to="/startup/retos" replace />;
  const chosen = OUTCOMES.find((o) => o.id === outcome);

  return (
    <>
      <PageHeader
        stage="venture"
        title={<>Mes 6 · <span className="text-magenta">¿LABORAL Kutxa firma como cliente?</span></>}
        lead="Con los KPIs del piloto se decide el vehículo. El modelo es venture client: si el piloto funciona, LABORAL Kutxa contrata la solución. LABORAL Kutxa no se queda con ningún % de la empresa."
      />

      <div className="mb-6"><ProgramTimeline current="decision" /></div>

      <div role="radiogroup" aria-label="Resultado del programa" className="grid grid-cols-4 gap-4 max-lg:grid-cols-2">
        {OUTCOMES.map((o) => (
          <DecisionCard key={o.id} name="outcome" code={o.en} title={o.es} summary={o.summary} bullets={o.when}
            Icon={ICON[o.id]} tone={TONE[o.id]} selected={outcome === o.id} onSelect={() => setOutcome(o.id)}
            footer={<p className="rounded-lg bg-paper-sunk px-3 py-2 text-xs font-medium text-ink-soft"><span className="font-semibold text-navy">Resultado:</span> {o.result}</p>} />
        ))}
      </div>
      <p className="mt-3 text-sm text-ink-muted">Si el piloto no funciona, el programa se cierra con el aprendizaje documentado y la startup queda en el <strong className="text-navy">pool de empresas solución</strong>.</p>

      {chosen && (
        <section key={chosen.id} className="mt-8 overflow-hidden rounded-[1.75rem] bg-navy p-8 text-white animate-rise" aria-live="polite" aria-labelledby="after">
          <div className="grid grid-cols-12 gap-8">
            <div className="col-span-5 max-lg:col-span-12">
              <p className="font-mono text-xs uppercase tracking-[0.16em] text-navy-100">{chosen.en}</p>
              <h2 id="after" className="mt-1 font-display text-3xl font-semibold text-white">{chosen.es}</h2>
              <p className="mt-2 text-navy-100">{chosen.result}</p>
              <p className="mt-5 inline-flex items-center gap-2 rounded-xl bg-white/10 px-4 py-2 text-sm font-semibold ring-1 ring-white/20">{PROGRAM.funding.equity}</p>
            </div>
            <div className="col-span-7 max-lg:col-span-12">
              <p className="font-semibold text-opportunity">Después del programa</p>
              <ul className="mt-2 grid gap-2">
                {PROGRAM.post.map((p) => (
                  <li key={p} className="flex gap-2 text-sm text-white/90"><Check size={16} className="mt-0.5 shrink-0 text-opportunity" aria-hidden />{p}</li>
                ))}
              </ul>
            </div>
          </div>
          <p className="mt-8 font-semibold text-opportunity">Apoyos del ecosistema</p>
          <ul className="mt-3 grid grid-cols-2 gap-3 sm:grid-cols-4 xl:grid-cols-7">
            {VENTURE_SUPPORTS.map((s, i) => {
              const Icon = SUPPORT_ICON[s.id];
              return (
                <li key={s.id} className="rounded-2xl bg-white/[0.07] p-4 ring-1 ring-white/10 animate-rise" style={{ animationDelay: `${200 + i * 70}ms` }}>
                  <Icon size={20} strokeWidth={1.75} className="text-opportunity" aria-hidden />
                  <p className="mt-2 font-semibold leading-tight">{s.label}</p>
                  <p className="mt-1 text-xs leading-snug text-white/85 present:hidden">{s.text}</p>
                  <p className="mt-2 border-t border-white/15 pt-2 text-[0.7rem] leading-snug text-opportunity-100">{s.from}</p>
                </li>
              );
            })}
          </ul>
        </section>
      )}

      <FlowNav step="decision" nextLabel="Ver post-programa" nextDisabled={!outcome} disabledHint="Elige un resultado (la demo recomienda «LABORAL Kutxa firma como cliente»)." />
    </>
  );
}
