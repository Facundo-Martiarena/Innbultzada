import { ArrowLeft, CircleCheckBig, Lightbulb, Send } from 'lucide-react';
import { useState, type FormEvent } from 'react';
import { useNavigate } from 'react-router-dom';
import { PageHeader } from '../components/PageHeader';
import { DemoBadge } from '../components/primitives';
import { applicantById } from '../data/applicants';
import { DEPARTMENTS, FINANCIAL_SECTORS } from '../data/ecosystem';
import { useDemo } from '../state/DemoContext';
import { DEMO_STARTUP } from './Explore';

const field = 'mt-1.5 w-full rounded-xl border border-line bg-paper-raised px-3.5 py-2.5 text-[0.95rem] text-ink focus:border-navy focus:outline-none focus:ring-2 focus:ring-magenta/40';

/* Propuesta abierta: la startup no encuentra un reto publicado y manifiesta su idea. */
export default function Idea() {
  const { idea, setIdea } = useDemo();
  const nav = useNavigate();
  const me = applicantById(DEMO_STARTUP)!;
  const [form, setForm] = useState({
    title: 'Scoring de salud financiera para autónomos',
    sector: 'Financiación',
    area: 'Autónomos y Comercios',
    summary: 'Indicador semanal de salud financiera para autónomos, con recomendaciones y acceso a productos adecuados.',
  });

  const submit = (e: FormEvent) => {
    e.preventDefault();
    setIdea({ id: 'mine', startup: me.name, sector: form.sector, title: form.title, summary: form.summary, area: form.area, status: 'Nueva' });
  };

  return (
    <>
      <PageHeader
        stage="match"
        title={<>¿Sin reto para ti? <span className="text-magenta">Cuéntanos tu idea</span></>}
        lead="Si ninguna problemática publicada encaja, la startup puede manifestar su idea. El equipo de innovación de LABORAL Kutxa la revisa y, si responde a una necesidad real, puede convertirse en un nuevo reto."
        aside={<DemoBadge label="Ejemplo ficticio" />}
      />

      <div className="grid grid-cols-12 gap-6">
        <form onSubmit={submit} className="card col-span-8 grid grid-cols-2 gap-5 p-7 max-lg:col-span-12" aria-label="Propuesta de idea">
          <fieldset disabled={!!idea} className="contents">
            <label className="col-span-2 text-sm font-semibold text-navy">Título de la idea
              <input className={field} value={form.title} onChange={(e) => setForm({ ...form, title: e.target.value })} />
            </label>
            <label className="text-sm font-semibold text-navy">Ámbito de servicios financieros
              <select className={field} value={form.sector} onChange={(e) => setForm({ ...form, sector: e.target.value })}>
                {FINANCIAL_SECTORS.filter((s) => s !== 'Otro sector').map((s) => <option key={s}>{s}</option>)}
              </select>
            </label>
            <label className="text-sm font-semibold text-navy">¿A qué departamento de LABORAL Kutxa ayudaría?
              <select className={field} value={form.area} onChange={(e) => setForm({ ...form, area: e.target.value })}>
                {DEPARTMENTS.map((d) => <option key={d.id}>{d.name}</option>)}
              </select>
            </label>
            <label className="col-span-2 text-sm font-semibold text-navy">Qué problema resuelve y cómo
              <textarea className={field} rows={4} value={form.summary} onChange={(e) => setForm({ ...form, summary: e.target.value })} />
            </label>
          </fieldset>
          <div className="col-span-2 flex items-center justify-between border-t border-line pt-5">
            <button type="button" className="btn-ghost" onClick={() => nav('/startup/retos')}><ArrowLeft size={16} aria-hidden />Volver a los retos</button>
            <button type="submit" className="btn-primary min-h-[48px] px-6" disabled={!!idea}><Send size={18} aria-hidden />{idea ? 'Enviada' : 'Enviar idea'}</button>
          </div>
        </form>

        <aside className="col-span-4 grid content-start gap-4 max-lg:col-span-12" aria-live="polite">
          {idea ? (
            <div className="rounded-xl2 bg-impact p-6 text-white animate-rise">
              <p className="flex items-center gap-2 font-display text-xl font-semibold"><CircleCheckBig size={20} aria-hidden />Idea recibida</p>
              <p className="mt-2 text-sm text-impact-50">Llega a la bandeja del equipo de innovación de LABORAL Kutxa junto a las candidaturas. Podrás seguir su estado.</p>
              <button type="button" className="btn mt-4 min-h-[40px] bg-white px-4 text-sm text-impact-600" onClick={() => nav('/startup/seguimiento')}>Ver mi seguimiento</button>
            </div>
          ) : (
            <div className="card p-6">
              <p className="flex items-center gap-2 font-semibold text-navy"><Lightbulb size={18} className="text-magenta" aria-hidden />Qué pasa con tu idea</p>
              <ol className="mt-2 grid gap-1.5 text-sm text-ink-soft">
                <li>1. Llega a la bandeja del equipo de innovación.</li>
                <li>2. Se contrasta con el diagnóstico del departamento.</li>
                <li>3. Si encaja, se convierte en reto y entra en la votación.</li>
              </ol>
            </div>
          )}
        </aside>
      </div>
    </>
  );
}
