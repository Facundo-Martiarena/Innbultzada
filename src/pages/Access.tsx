import { ArrowRight, CircleAlert, CircleCheckBig, Lightbulb, Rocket, Undo2 } from 'lucide-react';
import { useEffect, type ReactNode } from 'react';
import { FlowNav } from '../components/FlowNav';
import { PageHeader } from '../components/PageHeader';
import { ACCELERATORS, FINANCIAL_SECTORS } from '../data/ecosystem';
import { useDemo } from '../state/DemoContext';

/* Acceso de la startup: llega recomendada por su aceleradora/incubadora y pasa un filtro rápido. */
export default function Access() {
  const { accelerator, setAccelerator, eligibility, setEligibility, reach } = useDemo();
  useEffect(() => { reach(1); }, []); // eslint-disable-line react-hooks/exhaustive-deps
  const { sector, mvp } = eligibility;
  const outOfScope = sector === 'Otro sector';
  const noMvp = mvp === false;
  const ok = !!accelerator && !!sector && !outOfScope && mvp === true;

  const Radio = ({ name, on, onChange, children }: { name: string; on: boolean; onChange: () => void; children: ReactNode }) => (
    <label className={`card flex cursor-pointer items-start gap-3 p-4 transition hover:shadow-lift has-[:focus-visible]:outline has-[:focus-visible]:outline-[3px] has-[:focus-visible]:outline-magenta ${on ? '!border-magenta ring-2 ring-magenta' : ''}`}>
      <input type="radio" name={name} className="sr-only" checked={on} onChange={onChange} />
      <span aria-hidden className={`mt-0.5 h-5 w-5 shrink-0 rounded-full border-2 ${on ? 'border-magenta bg-magenta shadow-[inset_0_0_0_3px_white]' : 'border-line'}`} />
      <span className="min-w-0">{children}</span>
    </label>
  );

  return (
    <>
      <PageHeader
        stage="match"
        title={<>4 · La startup llega <span className="text-magenta">recomendada por su aceleradora</span></>}
        lead="Todo empieza con una idea. Las aceleradoras e incubadoras del ecosistema recomiendan INNBULTZADA a las startups cuya solución resuelve problemas de servicios financieros."
      />

      {/* Recorrido de entrada */}
      <ol className="mb-6 flex items-center gap-2 text-sm" aria-label="Cómo llega una startup">
        {[{ I: Lightbulb, t: 'Idea de la startup' }, { I: Rocket, t: 'Aceleradora o incubadora' }, { I: CircleCheckBig, t: 'Filtro: servicios financieros + MVP' }, { I: ArrowRight, t: 'Retos de LABORAL Kutxa' }].map(({ I, t }, i, a) => (
          <li key={t} className="flex items-center gap-2">
            <span className="flex items-center gap-2 rounded-full bg-paper-raised px-3 py-1.5 font-semibold text-navy shadow-card ring-1 ring-line"><I size={15} className="text-magenta" aria-hidden />{t}</span>
            {i < a.length - 1 && <ArrowRight size={15} className="text-navy-300" aria-hidden />}
          </li>
        ))}
      </ol>

      <div className="grid grid-cols-12 gap-6">
        <div className="col-span-8 grid gap-6 max-lg:col-span-12">
          <fieldset>
            <legend className="mb-3 text-lg font-semibold text-navy">1. ¿Qué aceleradora o incubadora te recomienda?</legend>
            <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
              {ACCELERATORS.map((a) => (
                <Radio key={a.id} name="acc" on={accelerator === a.id} onChange={() => setAccelerator(a.id)}>
                  <span className="block font-semibold leading-tight text-navy">{a.name}</span>
                  <span className="mt-0.5 block text-xs text-ink-muted">{a.kind} · {a.pais}</span>
                </Radio>
              ))}
              <Radio name="acc" on={accelerator === 'otra'} onChange={() => setAccelerator('otra')}>
                <span className="block font-semibold text-navy">Otra de la red</span>
                <span className="mt-1 block text-sm text-ink-soft">Aceleradoras e incubadoras colaboradoras</span>
              </Radio>
            </div>
          </fieldset>

          <fieldset>
            <legend className="mb-3 text-lg font-semibold text-navy">2. ¿Qué problema de servicios financieros resuelve tu solución?</legend>
            <div className="flex flex-wrap gap-2">
              {FINANCIAL_SECTORS.map((s) => (
                <button key={s} type="button" aria-pressed={sector === s} onClick={() => setEligibility({ ...eligibility, sector: s })}
                  className={`btn min-h-[40px] px-4 text-sm ${sector === s ? 'bg-navy text-white' : 'border border-line bg-paper-raised text-navy hover:bg-navy-50'}`}>{s}</button>
              ))}
            </div>
          </fieldset>

          <fieldset>
            <legend className="mb-3 text-lg font-semibold text-navy">3. ¿Tienes un MVP?</legend>
            <div className="flex gap-2">
              {[{ v: true, l: 'Sí, ya funciona con usuarios' }, { v: false, l: 'Todavía no' }].map((o) => (
                <button key={o.l} type="button" aria-pressed={mvp === o.v} onClick={() => setEligibility({ ...eligibility, mvp: o.v })}
                  className={`btn min-h-[40px] px-4 text-sm ${mvp === o.v ? 'bg-navy text-white' : 'border border-line bg-paper-raised text-navy hover:bg-navy-50'}`}>{o.l}</button>
              ))}
            </div>
          </fieldset>
        </div>

        <aside className="col-span-4 max-lg:col-span-12" aria-live="polite">
          {outOfScope ? (
            <div className="rounded-xl2 border-2 border-magenta bg-magenta-50 p-6">
              <p className="flex items-center gap-2 font-display text-xl font-semibold text-magenta-600"><CircleAlert size={20} aria-hidden />Fuera del foco</p>
              <p className="mt-2 text-sm text-ink-soft">INNBULTZADA se centra en servicios financieros: banca, seguros, pagos… Tu aceleradora te orientará a otros programas.</p>
            </div>
          ) : noMvp ? (
            <div className="rounded-xl2 border-2 border-opportunity-600/40 bg-opportunity-100 p-6">
              <p className="flex items-center gap-2 font-display text-xl font-semibold text-navy"><Undo2 size={20} aria-hidden />Te derivamos a incubación</p>
              <p className="mt-2 text-sm text-ink-soft">Los proyectos sin MVP pasan por <strong>Gaztenpresa</strong> (esquema «tipo ascensor»). Cuando tengas MVP, vuelve a INNBULTZADA.</p>
            </div>
          ) : ok ? (
            <div className="rounded-xl2 bg-impact p-6 text-white animate-rise">
              <p className="flex items-center gap-2 font-display text-xl font-semibold"><CircleCheckBig size={20} aria-hidden />Acceso concedido</p>
              <p className="mt-2 text-sm text-impact-50">Verás los retos de LABORAL Kutxa ordenados por prioridad. Si ninguno encaja, podrás contarnos tu idea.</p>
            </div>
          ) : (
            <div className="card p-6">
              <p className="font-semibold text-navy">Requisitos para entrar</p>
              <ul className="mt-2 grid gap-1.5 text-sm text-ink-soft">
                <li>• Recomendación de una aceleradora o incubadora de la red</li>
                <li>• Solución para servicios financieros</li>
                <li>• Startup constituida, con MVP y hasta 8 años</li>
              </ul>
            </div>
          )}
        </aside>
      </div>

      <FlowNav step="entrada" nextLabel="Ver retos de LABORAL Kutxa" nextDisabled={!ok} disabledHint="Completa los tres pasos." />
    </>
  );
}
