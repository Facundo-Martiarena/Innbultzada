import { ArrowRight, BadgeEuro, Check, Clock, Gift, Globe2, Link2, Scale, Target, Trophy, Users } from 'lucide-react';
import type { ReactNode } from 'react';
import { useNavigate } from 'react-router-dom';
import { PageHeader } from '../components/PageHeader';
import { ProgramTimeline } from '../components/ProgramTimeline';
import { Reveal } from '../components/primitives';
import { PROGRAM } from '../data/program';

function Field({ q, title, Icon, children, className = '', flat = false }: { q: string; title: string; Icon: typeof Globe2; children: ReactNode; className?: string; flat?: boolean }) {
  return (
    <section className={`${flat ? '' : 'card p-6'} ${className}`}>
      <p className="eyebrow !text-[0.66rem]">{q}</p>
      <h2 className="mt-1 flex items-center gap-2 text-lg font-semibold"><Icon size={18} className="text-magenta" aria-hidden />{title}</h2>
      <div className="mt-3 text-[0.95rem] leading-relaxed text-ink-soft">{children}</div>
    </section>
  );
}

const List = ({ items }: { items: readonly string[] }) => (
  <ul className="grid gap-1.5">{items.map((i) => <li key={i} className="flex gap-2"><Check size={16} className="mt-1 shrink-0 text-impact" aria-hidden />{i}</li>)}</ul>
);

/* Ficha del programa: la fila de INNBULTZADA en el benchmarking de incubadoras/aceleradoras. */
export default function ProgramSheet() {
  const nav = useNavigate();
  return (
    <>
      <PageHeader
        title="Ficha del programa INNBULTZADA"
        lead="Aceleración con modelo venture client para banca: retos reales de LABORAL Kutxa, piloto pagado y sin equity."
        aside={<span className="chip border border-dashed border-navy-300 text-navy-500">{PROGRAM.status}</span>}
      />

      {/* Cifras clave */}
      <div className="mb-5 grid grid-cols-4 gap-4 max-lg:grid-cols-2">
        {[
          { v: PROGRAM.funding.headline, l: 'Piloto pagado por startup' },
          { v: '0 %', l: 'Equity para LABORAL Kutxa' },
          { v: '6 meses', l: 'Prorrogables · 1 + 4 + 1' },
          { v: '> 70 %', l: 'Objetivo de pilotos convertidos en contrato' },
        ].map((k) => (
          <div key={k.l} className="card p-5"><p className="font-display text-4xl font-semibold text-navy">{k.v}</p><p className="mt-1 text-sm text-ink-muted">{k.l}</p></div>
        ))}
      </div>

      {/* Esencial: dinero, usuario y proceso de selección */}
      <div className="grid grid-cols-12 gap-5">
        <Field q="Financiamiento" title={`${PROGRAM.funding.headline} · ${PROGRAM.funding.label.toLowerCase()}`} Icon={BadgeEuro} className="col-span-6 max-lg:col-span-12">
          <p className="font-semibold text-navy">{PROGRAM.funding.equity}.</p>
          <p className="mt-2">Además, financiación en especie:</p>
          <div className="mt-2 flex flex-wrap gap-1.5">{PROGRAM.funding.inKind.map((t) => <span key={t} className="chip bg-opportunity-100 text-navy">{t}</span>)}</div>
        </Field>
        <Field q="Usuario" title="Startups y scaleups" Icon={Users} className="col-span-6 max-lg:col-span-12">
          <List items={PROGRAM.eligibility} />
          <p className="mt-3 text-sm">Canales: {PROGRAM.channels.join(' · ')}.</p>
        </Field>
        <Field q="Proceso de selección" title="Del reto a 1–2 startups" Icon={Trophy} className="col-span-12">
          <ol className="grid grid-cols-6 gap-2 max-lg:grid-cols-3">
            {PROGRAM.selection.map((st, i) => (
              <li key={st.n} className={`rounded-xl p-3 ${i === PROGRAM.selection.length - 1 ? 'bg-magenta text-white' : i === 4 ? 'bg-opportunity-100' : 'bg-navy-50'}`}>
                <p className={`font-mono text-xs ${i === PROGRAM.selection.length - 1 ? 'text-magenta-50' : 'text-magenta'}`}>0{st.n}</p>
                <p className={`font-semibold leading-tight ${i === PROGRAM.selection.length - 1 ? 'text-white' : 'text-navy'}`}>{st.label}</p>
                <p className={`mt-0.5 text-xs leading-snug ${i === PROGRAM.selection.length - 1 ? 'text-magenta-50' : 'text-ink-muted'}`}>{st.note}</p>
              </li>
            ))}
          </ol>
        </Field>
      </div>

      {/* El resto de la ficha, a demanda */}
      <div className="mt-5 grid gap-3">
        <Reveal summary={<span className="flex items-center gap-2"><Globe2 size={16} className="text-magenta" aria-hidden />Contexto: país, enfoque y tipo de programa</span>}>
          <div className="grid grid-cols-12 gap-6 max-lg:grid-cols-1">
            <Field flat q="País" title={PROGRAM.country} Icon={Globe2} className="col-span-4"><p>{PROGRAM.scope}</p></Field>
            <Field flat q="Enfoque" title="Open innovation · venture client" Icon={Target} className="col-span-5">
              <p>{PROGRAM.focus}</p>
              <div className="mt-3 flex flex-wrap gap-1.5">{PROGRAM.focusTags.map((t) => <span key={t} className="chip bg-navy-50 text-navy">{t}</span>)}</div>
            </Field>
            <Field flat q="¿Incubación o aceleración?" title={PROGRAM.type} Icon={ArrowRight} className="col-span-3"><p>{PROGRAM.typeNote}</p></Field>
          </div>
        </Reveal>

        <Reveal summary={<span className="flex items-center gap-2"><Scale size={16} className="text-magenta" aria-hidden />Métricas: rúbrica de selección y KPIs</span>}>
          <div className="grid grid-cols-2 gap-6 max-lg:grid-cols-1">
            <Field flat q="Rúbrica de selección" title="¿Cómo se evalúan las propuestas?" Icon={Scale}>
              <ul className="grid gap-2.5">
                {PROGRAM.rubric.map((r) => (
                  <li key={r.id}>
                    <div className="flex justify-between text-sm"><span>{r.label}</span><span className="font-mono font-semibold text-navy">{r.weight} %</span></div>
                    <div className="mt-1 h-2 rounded-full bg-paper-sunk" aria-hidden><div className="h-full rounded-full bg-magenta" style={{ width: `${(r.weight / 30) * 100}%` }} /></div>
                  </li>
                ))}
              </ul>
            </Field>
            <Field flat q="KPIs del programa" title="¿Cómo se mide el éxito?" Icon={Target}>
              <ul className="grid gap-2">
                {PROGRAM.kpis.map((k) => (
                  <li key={k.label} className="flex items-center justify-between gap-3 text-sm"><span>{k.label}</span><span className={`chip ${k.target.startsWith('Objetivo') ? 'bg-impact text-white' : 'bg-paper-sunk text-ink-muted'}`}>{k.target}</span></li>
                ))}
              </ul>
            </Field>
          </div>
        </Reveal>

        <Reveal summary={<span className="flex items-center gap-2"><Gift size={16} className="text-magenta" aria-hidden />Servicios, post-programa y valor para LABORAL Kutxa</span>}>
          <div className="grid grid-cols-3 gap-6 max-lg:grid-cols-1">
            <Field flat q="Ofrece" title="Servicios del programa" Icon={Gift}><List items={PROGRAM.offers} /></Field>
            <Field flat q="Post" title="Después del programa" Icon={Clock}><List items={PROGRAM.post} /></Field>
            <section className="rounded-xl2 bg-navy p-6 text-white">
              <p className="font-mono text-[0.66rem] uppercase tracking-[0.14em] text-navy-100">¿Qué gana LABORAL Kutxa?</p>
              <h2 className="mt-1 text-lg font-semibold text-white">Valor para LABORAL Kutxa</h2>
              <ul className="mt-3 grid gap-1.5 text-[0.95rem] text-white/90">{PROGRAM.lkGains.map((g) => <li key={g} className="flex gap-2"><Check size={16} className="mt-1 shrink-0 text-opportunity" aria-hidden />{g}</li>)}</ul>
            </section>
          </div>
        </Reveal>

        <Reveal summary={<span className="flex items-center gap-2"><Clock size={16} className="text-magenta" aria-hidden />Duración y requisitos legales</span>}>
          <div className="grid gap-5">
            <div>
              <p className="eyebrow mb-2 !text-[0.66rem]">Duración</p>
              <ProgramTimeline />
            </div>
            <section aria-labelledby="legal">
              <div className="flex flex-wrap items-center gap-3">
                <Scale size={20} className="text-impact-600" aria-hidden />
                <h2 id="legal" className="text-lg font-semibold">Viabilidad desde España y requisitos legales</h2>
                <span className="chip bg-impact text-white">Viabilidad {PROGRAM.legal.viability.toLowerCase()}</span>
                <span className="text-sm text-ink-muted">{PROGRAM.legal.note}</span>
              </div>
              <ol className="mt-4 grid grid-cols-4 gap-3 max-lg:grid-cols-2">
                {PROGRAM.legal.items.map((it, i) => (
                  <li key={it.title} className="rounded-xl bg-paper-sunk/50 p-4">
                    <p className="font-mono text-xs text-impact-600">0{i + 1}</p>
                    <p className="font-semibold text-navy">{it.title}</p>
                    <p className="mt-1 text-sm leading-snug text-ink-soft">{it.text}</p>
                  </li>
                ))}
              </ol>
            </section>
          </div>
        </Reveal>

        <p className="flex items-center gap-2 text-sm text-ink-muted"><Link2 size={15} aria-hidden />Enlaces: {PROGRAM.links}</p>
      </div>

      <div className="my-12 flex items-center justify-between rounded-[1.75rem] bg-navy p-8 text-white">
        <p className="font-display text-2xl font-semibold">Veámoslo en la app, de principio a fin.</p>
        <button type="button" className="btn-primary min-h-[52px] px-7 text-lg" onClick={() => nav('/laboral-kutxa/diagnostico')}>Empezar la demo <ArrowRight size={20} aria-hidden /></button>
      </div>
    </>
  );
}
