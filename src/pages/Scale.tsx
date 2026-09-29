import { useEffect, useState } from 'react';
import { Navigate } from 'react-router-dom';
import { EcosystemMap } from '../components/EcosystemMap';
import { FlowNav } from '../components/FlowNav';
import { ProgramTimeline } from '../components/ProgramTimeline';
import { PROGRAM } from '../data/program';
import { Check, Target } from 'lucide-react';
import { ImpactCard } from '../components/ImpactCard';
import { PageHeader } from '../components/PageHeader';
import { IMPACTS, OUTCOMES, SCALE_RINGS } from '../data/model';
import { useRouteChallenge } from '../lib/useRouteChallenge';

export default function Scale() {
  const { challenge: c, journey: j, outcome } = useRouteChallenge(5);
  const [level, setLevel] = useState(0);

  // Animación de expansión al entrar
  useEffect(() => {
    const t = setInterval(() => setLevel((l) => (l < SCALE_RINGS.length - 1 ? l + 1 : l)), 700);
    return () => clearInterval(t);
  }, []);

  if (!c || !j) return <Navigate to="/laboral-kutxa/votacion" replace />;
  const out = OUTCOMES.find((o) => o.id === outcome);

  return (
    <>
      <PageHeader
        stage="scale"
        title={<>Post-programa: <span className="text-impact-600">de LABORAL Kutxa al mercado, con impacto en el territorio</span></>}
        lead={out && out.id !== 'venture'
          ? `Resultado: ${out.es}. Acompañamiento posventa y KPIs durante 12 meses; la solución crece por círculos concéntricos.`
          : `${j.ventureName} crece por círculos concéntricos, con KPIs durante 12 meses y conexión con Mondragon Promoción si busca inversión.`}
      />

      <div className="mb-8"><ProgramTimeline current="post" /></div>

      <div className="grid grid-cols-12 items-center gap-8">
        <div className="col-span-6 max-lg:col-span-12">
          <EcosystemMap level={level} onSelect={setLevel} />
        </div>
        <ol className="col-span-6 grid gap-2 max-lg:col-span-12" aria-label="Círculos de escalado">
          {SCALE_RINGS.map((r, i) => {
            const on = i <= level;
            return (
              <li key={r.id}>
                <button type="button" onClick={() => setLevel(i)} aria-current={i === level ? 'step' : undefined}
                  className={`flex w-full items-center gap-4 rounded-2xl border p-4 text-left transition ${i === level ? 'border-navy bg-paper-raised shadow-lift' : on ? 'border-line bg-paper-raised' : 'border-dashed border-line bg-transparent opacity-70'}`}>
                  <span className={`grid h-9 w-9 shrink-0 place-items-center rounded-full font-mono text-sm font-bold ${i === 0 ? 'bg-magenta text-white' : on ? 'bg-navy text-white' : 'bg-paper-sunk text-ink-muted'}`}>{i + 1}</span>
                  <span className="flex-1">
                    <span className="block font-semibold text-navy">{r.label}</span>
                    <span className="block text-sm text-ink-muted">{r.text}</span>
                  </span>
                  <span className={`text-xs font-semibold ${on ? 'text-impact-600' : 'text-ink-muted'}`}>{on ? 'Alcanzado' : 'Siguiente'}</span>
                </button>
              </li>
            );
          })}
        </ol>
      </div>

      <section className="mt-10 grid grid-cols-1 gap-5 lg:grid-cols-2" aria-label="KPIs del programa y qué gana LABORAL Kutxa">
        <div className="card p-6">
          <h2 className="flex items-center gap-2 text-lg font-semibold"><Target size={18} className="text-magenta" aria-hidden />KPIs del programa</h2>
          <ul className="mt-3 grid gap-2">
            {PROGRAM.kpis.map((k) => (
              <li key={k.label} className="flex items-center justify-between gap-3 rounded-xl bg-paper-sunk/60 px-3 py-2 text-sm">
                <span className="text-ink">{k.label}</span>
                <span className={`chip ${k.target.startsWith('Objetivo') ? 'bg-impact text-white' : 'bg-paper-raised text-ink-muted'}`}>{k.target}</span>
              </li>
            ))}
          </ul>
        </div>
        <div className="rounded-xl2 bg-navy p-6 text-white">
          <h2 className="text-lg font-semibold text-white">¿Qué gana LABORAL Kutxa?</h2>
          <ul className="mt-3 grid gap-2">
            {PROGRAM.lkGains.map((g) => <li key={g} className="flex gap-2 text-sm text-white/90"><Check size={16} className="mt-0.5 shrink-0 text-opportunity" aria-hidden />{g}</li>)}
          </ul>
        </div>
      </section>

      <section className="mt-10" aria-labelledby="impactos">
        <div className="mb-4 flex items-end justify-between">
          <h2 id="impactos" className="text-2xl font-semibold">Impactos esperados</h2>
          <p className="text-sm text-ink-muted">Indicadores propuestos para medir el mecanismo · sin cifras reales</p>
        </div>
        <div className="grid grid-cols-4 gap-4 max-lg:grid-cols-2">
          {IMPACTS.map((im, i) => <ImpactCard key={im.id} id={im.id as never} label={im.label} kpi={im.kpi} index={i} />)}
          <div className="flex flex-col justify-center rounded-xl2 bg-impact p-5 text-white">
            <p className="font-display text-lg font-semibold leading-snug">De retos reales a nuevas empresas arraigadas.</p>
          </div>
        </div>
      </section>

      <FlowNav step="escalar" />
    </>
  );
}
