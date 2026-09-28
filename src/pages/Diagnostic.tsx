import { Check, Gauge, RotateCcw, Send } from 'lucide-react';
import { useEffect, useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FlowNav } from '../components/FlowNav';
import { PageHeader } from '../components/PageHeader';
import { DemoBadge } from '../components/primitives';
import { DEPARTMENTS } from '../data/ecosystem';
import { DIAG_QUESTIONS, impactScore, quadrant, type DiagAnswers, type Quadrant } from '../data/diagnostic';
import { useDemo } from '../state/DemoContext';

const QUAD_TONE: Record<Quadrant, string> = {
  'Prioridad': 'bg-magenta text-white',
  'Investigar': 'bg-navy text-white',
  'Quick win': 'bg-impact text-white',
  'Descartar': 'bg-paper-sunk text-ink-muted',
};

export default function Diagnostic() {
  const { reach, setMyDiagnosis } = useDemo();
  const nav = useNavigate();
  useEffect(() => { reach(0); }, []); // eslint-disable-line react-hooks/exhaustive-deps
  const [dept, setDept] = useState(DEPARTMENTS[0].id);
  const [name, setName] = useState('');
  const [answers, setAnswers] = useState<DiagAnswers>({});
  const [viability, setViability] = useState(60);

  const impact = useMemo(() => impactScore(answers), [answers]);
  const quad = quadrant(impact, viability);
  const answered = DIAG_QUESTIONS.filter((q) => (answers[q.id] ?? []).length > 0).length;
  const deptName = DEPARTMENTS.find((d) => d.id === dept)!.name;
  const canSend = answered > 0 && name.trim().length > 0;

  const send = () => {
    setMyDiagnosis({ name: name.trim(), area: deptName, impact, viability });
    nav('/laboral-kutxa/votacion');
  };

  const choose = (qid: string, i: number, multi?: boolean) => {
    setAnswers((a) => {
      const cur = a[qid] ?? [];
      if (multi) return { ...a, [qid]: cur.includes(i) ? cur.filter((x) => x !== i) : [...cur, i] };
      return { ...a, [qid]: [i] };
    });
  };

  return (
    <>
      <PageHeader
        stage="discover"
        title={<>1 · Cada departamento <span className="text-magenta">diagnostica y puntúa su necesidad</span></>}
        lead="Una plantilla común: se responden 6 preguntas y sale un Impact Score de 0 a 100. Así todas las necesidades se comparan igual y se ubican en la matriz de decisión."
        aside={<DemoBadge />}
      />

      {/* Contexto: nombre + área / equipo */}
      <section className="card mb-6 p-4" aria-label="Contexto de la iniciativa">
        <label className="block text-sm font-semibold text-navy">Nombre de la iniciativa o proceso
          <input value={name} onChange={(e) => setName(e.target.value)} placeholder="Ej.: Anticipar tensiones de tesorería en PYMEs cliente"
            className="mt-1.5 w-full rounded-xl border border-line bg-paper-raised px-3.5 py-2.5 text-[0.95rem] text-ink focus:border-navy focus:outline-none focus:ring-2 focus:ring-magenta/40" />
        </label>
        <p className="mb-2 mt-4 text-xs font-semibold uppercase tracking-wide text-ink-muted">Área / equipo que diagnostica</p>
        <div className="flex flex-wrap gap-2">
          {DEPARTMENTS.map((d) => (
            <button key={d.id} type="button" aria-pressed={dept === d.id} onClick={() => setDept(d.id)}
              className={`chip min-h-[34px] px-3 ${dept === d.id ? 'bg-navy text-white' : 'bg-paper-sunk text-navy hover:bg-navy-50'}`}>{d.name}</button>
          ))}
        </div>
      </section>

      <div className="grid grid-cols-12 gap-6">
        {/* Cuestionario */}
        <section className="col-span-8 grid gap-4 max-lg:col-span-12" aria-label="Cuestionario de diagnóstico">
          {DIAG_QUESTIONS.map((q, n) => {
            const sel = answers[q.id] ?? [];
            return (
              <article key={q.id} className="card p-5">
                <div className="flex items-baseline justify-between gap-3">
                  <h2 className="font-semibold leading-snug text-navy"><span className="font-mono text-sm text-magenta">{n + 1}.</span> {q.q}</h2>
                  <span className="shrink-0 font-mono text-xs text-ink-muted">{q.weight} pts{q.multi ? ' · varias' : ''}</span>
                </div>
                <div className="mt-3 flex flex-wrap gap-2">
                  {q.options.map((o, i) => {
                    const on = sel.includes(i);
                    return (
                      <button key={o.label} type="button" aria-pressed={on} onClick={() => choose(q.id, i, q.multi)}
                        className={`chip min-h-[36px] gap-1.5 px-3 transition ${on ? 'bg-magenta text-white' : 'border border-line bg-paper-raised text-ink-soft hover:border-navy-300'}`}>
                        {on && <Check size={13} strokeWidth={3} aria-hidden />}{o.label}
                        <span className={`font-mono text-[0.6rem] ${on ? 'text-magenta-50' : 'text-ink-muted'}`}>+{o.points}</span>
                      </button>
                    );
                  })}
                </div>
              </article>
            );
          })}
        </section>

        {/* Resultado */}
        <aside className="col-span-4 grid content-start gap-4 max-lg:col-span-12">
          <div className="card sticky top-24 p-6" aria-live="polite">
            <p className="flex items-center gap-2 text-sm font-semibold text-navy"><Gauge size={17} className="text-magenta" aria-hidden />Impact Score</p>
            <p className="mt-2 font-display text-5xl font-semibold text-navy">{impact}<span className="text-2xl text-ink-muted">/100</span></p>
            <div className="mt-2 h-2 rounded-full bg-paper-sunk" aria-hidden><div className="h-full rounded-full bg-magenta transition-all" style={{ width: `${impact}%` }} /></div>
            <p className="mt-1 text-xs text-ink-muted">{answered}/{DIAG_QUESTIONS.length} preguntas respondidas</p>

            <label className="mt-5 block text-sm font-semibold text-navy">Viabilidad estimada <span className="font-mono text-magenta">{viability}</span>
              <input type="range" min={0} max={100} value={viability} onChange={(e) => setViability(Number(e.target.value))}
                className="mt-2 w-full accent-[rgb(var(--magenta))]" />
            </label>

            {/* Matriz de decisión */}
            <p className="mt-5 text-xs font-semibold uppercase tracking-wide text-ink-muted">Matriz de decisión</p>
            <div className="relative mt-2 grid grid-cols-2 grid-rows-2 gap-1 text-[0.62rem] font-semibold">
              {(['Investigar', 'Prioridad', 'Descartar', 'Quick win'] as Quadrant[]).map((qd) => (
                <div key={qd} className={`grid h-12 place-items-center rounded-lg text-center ${quad === qd ? QUAD_TONE[qd] + ' ring-2 ring-navy' : 'bg-paper-sunk text-ink-muted'}`}>{qd}</div>
              ))}
            </div>
            <div className="mt-1 flex justify-between font-mono text-[0.58rem] text-ink-muted"><span>← viabilidad →</span><span>↑ impacto</span></div>

            <div className={`mt-4 rounded-xl px-3 py-2 text-center text-sm font-semibold ${QUAD_TONE[quad]}`}>{quad}</div>

            <button type="button" onClick={send} disabled={!canSend} className="btn-primary mt-4 w-full disabled:opacity-40">
              <Send size={16} aria-hidden />Enviar a votación
            </button>
            {!canSend && <p className="mt-1 text-center text-xs text-ink-muted">Poné un nombre y respondé al menos una pregunta.</p>}
            <button type="button" onClick={() => { setAnswers({}); setViability(60); setName(''); }} className="btn-ghost mt-2 w-full text-sm">
              <RotateCcw size={15} aria-hidden />Reiniciar
            </button>
          </div>
        </aside>
      </div>

      <FlowNav step="diagnostico" nextLabel="Votar y priorizar" />
    </>
  );
}
