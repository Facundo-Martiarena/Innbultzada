import { CircleCheckBig, Paperclip, Send } from 'lucide-react';
import { useState, type FormEvent } from 'react';
import { Navigate } from 'react-router-dom';
import { FlowNav } from '../components/FlowNav';
import { PageHeader } from '../components/PageHeader';
import { DemoBadge } from '../components/primitives';
import { applicantById } from '../data/applicants';
import { CAPABILITIES } from '../data/model';
import type { CapabilityId } from '../data/types';
import { CAPABILITY_ICON } from '../lib/icons';
import { useRouteChallenge } from '../lib/useRouteChallenge';
import { DEMO_STARTUP } from './Explore';

const field = 'mt-1.5 w-full rounded-xl border border-line bg-paper-raised px-3.5 py-2.5 text-[0.95rem] text-ink focus:border-navy focus:outline-none focus:ring-2 focus:ring-magenta/40';

export default function Apply() {
  const { challenge: c, applied, setApplied } = useRouteChallenge(1);
  const me = applicantById(DEMO_STARTUP)!;
  const [caps, setCaps] = useState<CapabilityId[]>(me.capabilities);
  if (!c) return <Navigate to="/startup/retos" replace />;

  const submit = (e: FormEvent) => { e.preventDefault(); setApplied(true); };

  return (
    <>
      <PageHeader
        stage="match"
        title={<>5b · La startup <span className="text-magenta">se postula al reto</span></>}
        lead="Describe su especialidad, las capacidades que aporta y su propuesta para el reto. Una postulación clara para que el equipo evalúe el encaje con criterio."
        aside={<DemoBadge label="Ejemplo ficticio" />}
      />

      <div className="grid grid-cols-12 gap-6">
        <form onSubmit={submit} className="card col-span-8 grid grid-cols-1 gap-5 p-7 max-lg:col-span-12 sm:grid-cols-2" aria-label="Formulario de postulación">
          <fieldset disabled={applied} className="contents">
            <label className="text-sm font-semibold text-navy">Startup
              <input className={field} defaultValue={me.name} />
            </label>
            <div className="grid grid-cols-2 gap-3">
              <label className="text-sm font-semibold text-navy">Madurez (TRL)
                <select className={field} defaultValue={me.trl}>{[3, 4, 5, 6, 7, 8, 9].map((t) => <option key={t} value={t}>TRL {t}</option>)}</select>
              </label>
              <label className="text-sm font-semibold text-navy">Equipo
                <input className={field} type="number" defaultValue={me.teamSize} min={1} />
              </label>
            </div>
            <label className="text-sm font-semibold text-navy">Año de constitución
              <input className={field} type="number" defaultValue={me.founded} />
            </label>
            <label className="text-sm font-semibold text-navy">¿Tiene MVP?
              <select className={field} defaultValue={me.mvp ? 'si' : 'no'}><option value="si">Sí, en uso con clientes</option><option value="no">Todavía no</option></select>
            </label>
            <label className="col-span-2 text-sm font-semibold text-navy">Especialidad
              <textarea className={field} rows={2} defaultValue={me.specialty} />
            </label>
            <fieldset className="col-span-2">
              <legend className="text-sm font-semibold text-navy">Capacidades que aportas</legend>
              <div className="mt-2 flex flex-wrap gap-2">
                {CAPABILITIES.map((cap) => {
                  const on = caps.includes(cap.id);
                  const need = c.needs.includes(cap.id);
                  const Icon = CAPABILITY_ICON[cap.id];
                  return (
                    <button key={cap.id} type="button" aria-pressed={on} onClick={() => setCaps((s) => (on ? s.filter((x) => x !== cap.id) : [...s, cap.id]))}
                      className={`chip min-h-[36px] px-3 transition ${on ? 'bg-navy text-white' : 'border border-line bg-paper-raised text-ink-soft'}`}>
                      <Icon size={13} aria-hidden />{cap.name}{need && <span className={`ml-1 rounded px-1 text-[0.6rem] ${on ? 'bg-magenta' : 'bg-magenta-50 text-magenta'}`}>el reto lo busca</span>}
                    </button>
                  );
                })}
              </div>
            </fieldset>
            <label className="col-span-2 text-sm font-semibold text-navy">Propuesta para este reto
              <textarea className={field} rows={3} defaultValue={me.pitch} />
            </label>
            <label className="text-sm font-semibold text-navy">Tracción / evidencias
              <input className={field} defaultValue={me.traction} />
            </label>
            <div className="text-sm font-semibold text-navy">Pitch deck
              <div className="mt-1.5 flex items-center gap-2 rounded-xl border border-dashed border-navy-300 px-3.5 py-2.5 font-normal text-ink-soft"><Paperclip size={15} aria-hidden />fluxia-pitch.pdf <span className="text-xs text-ink-muted">(simulado)</span></div>
            </div>
          </fieldset>
          <div className="col-span-2 flex items-center justify-between border-t border-line pt-5">
            <label className="flex items-center gap-2 text-sm text-ink-soft"><input type="checkbox" defaultChecked className="h-4 w-4 accent-[rgb(var(--magenta))]" disabled={applied} />Acepto las bases de la convocatoria</label>
            <button type="submit" className="btn-primary min-h-[48px] px-6" disabled={applied}><Send size={18} aria-hidden />{applied ? 'Enviada' : 'Enviar postulación'}</button>
          </div>
        </form>

        <aside className="col-span-4 grid content-start gap-4 max-lg:col-span-12">
          <div className="card p-5">
            <p className="eyebrow">Te postulas a</p>
            <p className="mt-1 font-display text-lg font-semibold leading-snug text-navy">{c.title}</p>
            <p className="mt-1 text-sm text-ink-muted">{c.code} · cierre {c.deadline}</p>
          </div>
          <div className={`rounded-xl2 p-5 transition ${applied ? 'bg-impact text-white' : 'bg-paper-sunk text-ink-soft'}`} aria-live="polite">
            {applied ? (
              <>
                <p className="flex items-center gap-2 font-display text-xl font-semibold"><CircleCheckBig size={20} aria-hidden />Postulación recibida</p>
                <p className="mt-1 text-sm text-impact-50">El equipo evaluador (Innovación + área dueña del reto) aplicará el primer filtro y preseleccionará 5 para el pitch final.</p>
              </>
            ) : (
              <p className="text-sm">Tras el cierre: <strong>primer filtro</strong> del equipo evaluador → <strong>5 preseleccionadas</strong> → <strong>pitch final</strong> tipo «Shark Tank» → se eligen <strong>1–2</strong> para un piloto pagado de 30.000 €. El resto queda en el <strong>pool de empresas solución</strong>.</p>
            )}
          </div>
        </aside>
      </div>

      <FlowNav step="postular" nextLabel="Ver mi seguimiento" nextDisabled={!applied} disabledHint="Envía la postulación para continuar." />
    </>
  );
}
