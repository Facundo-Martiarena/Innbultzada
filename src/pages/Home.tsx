import { Briefcase, FastForward, GraduationCap, Handshake, Microscope, PlayCircle, Rocket, Target, Umbrella, UserRound, UserRoundCheck } from 'lucide-react';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { BrandHero } from '../components/BrandLogo';
import { SECTIONS } from '../data/sections';

const ORBIT = [
  { label: 'Startups', Icon: Rocket },
  { label: 'IKERLAN', Icon: Microscope },
  { label: 'Universidades', Icon: GraduationCap },
  { label: 'BAT', Icon: FastForward },
  { label: 'Seguros Lagun Aro', Icon: Umbrella },
  { label: 'Cooperativas MONDRAGON', Icon: Handshake },
  { label: 'PYMEs clientes', Icon: Briefcase },
  { label: 'Expertos', Icon: UserRoundCheck },
  { label: 'Intraemprendedores', Icon: UserRound },
  { label: 'Gaztenpresa', Icon: Target },
];

const FACTS = ['Piloto pagado 30.000 €', 'Sin equity', '6 meses'];

export default function Home() {
  const nav = useNavigate();
  const [noGif, setNoGif] = useState(false);
  return (
    <>
      {/* Hero: la promesa + entrar a la presentación */}
      <section className="relative grid grid-cols-12 items-center gap-10 pb-12 pt-8 sm:gap-12 sm:pb-16 sm:pt-12">
        <div className="grid-bg pointer-events-none absolute -inset-x-8 inset-y-0 -z-10 [mask-image:radial-gradient(ellipse_at_70%_40%,black,transparent_70%)]" aria-hidden />
        <div className="col-span-7 max-lg:col-span-12">
          <p className="eyebrow animate-rise">Un mecanismo de innovación para LABORAL Kutxa · concepto</p>
          <h1 className="mt-4 animate-rise" style={{ animationDelay: '60ms' }}>
            <BrandHero onMissing={() => setNoGif(true)} />
            {noGif && <span className="block text-5xl font-bold leading-[0.95] tracking-[-0.03em] sm:text-[4.6rem] present:text-[5.2rem]">INNBULTZADA</span>}
          </h1>
          <p className="mt-5 font-display text-3xl font-semibold leading-[1.05] text-magenta animate-rise sm:text-[2.4rem]" style={{ animationDelay: '120ms' }}>
            De retos a nuevas empresas.
          </p>
          <p className="mt-4 max-w-xl leading-relaxed text-ink-soft animate-rise sm:text-lg" style={{ animationDelay: '180ms' }}>
            LABORAL Kutxa publica sus retos de servicios financieros; las startups se postulan y las mejores llegan a un <strong className="text-navy">piloto pagado</strong>.
          </p>
          <div className="mt-7 flex flex-wrap gap-3 animate-rise" style={{ animationDelay: '240ms' }}>
            <button type="button" className="btn-primary min-h-[52px] px-6 text-lg" onClick={() => nav('/seccion/portada')}>
              <PlayCircle size={20} aria-hidden /> Empezar la presentación
            </button>
            <button type="button" className="btn-ghost min-h-[52px] px-6 text-lg" onClick={() => nav('/ecosistema')}>
              Ver el ecosistema
            </button>
          </div>
          <ul className="mt-6 flex flex-wrap items-center gap-x-3 gap-y-1 text-sm animate-rise" style={{ animationDelay: '280ms' }} aria-label="El programa en cifras">
            {FACTS.map((t, i) => (
              <li key={t} className="flex items-center gap-3">
                {i > 0 && <span aria-hidden className="text-navy-300">·</span>}
                <span className="font-semibold text-navy">{t}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Constelación: LABORAL Kutxa como orquestador (solo desktop) */}
        <div className="col-span-5 max-lg:hidden">
          <div className="relative mx-auto aspect-square max-w-[460px] animate-rise" style={{ animationDelay: '200ms' }} aria-label="Ecosistema orquestado por LABORAL Kutxa" role="img">
            <div className="absolute inset-[6%] rounded-full border border-dashed border-navy-300/70" />
            <div className="absolute inset-[24%] rounded-full border border-navy-100" />
            <div className="absolute left-1/2 top-1/2 grid h-32 w-32 -translate-x-1/2 -translate-y-1/2 place-items-center rounded-full bg-navy text-center text-white shadow-lift">
              <span className="absolute inset-0 animate-pulseRing rounded-full bg-magenta/40" aria-hidden />
              <span className="relative px-3 text-sm font-semibold leading-tight">LABORAL Kutxa<span className="mt-1 block text-[0.68rem] font-medium text-navy-100">orquestador</span></span>
            </div>
            {ORBIT.map(({ label, Icon }, i, arr) => {
              const ang = (i / arr.length) * Math.PI * 2 - Math.PI / 2;
              const x = 50 + Math.cos(ang) * 42;
              const y = 50 + Math.sin(ang) * 42;
              return (
                <span key={label} className="absolute flex -translate-x-1/2 -translate-y-1/2 items-center gap-1.5 whitespace-nowrap rounded-full border border-line bg-paper-raised px-3 py-1.5 text-sm font-semibold text-navy shadow-card" style={{ left: `${x}%`, top: `${y}%` }}>
                  <Icon size={15} strokeWidth={1.75} className="text-magenta" aria-hidden />{label}
                </span>
              );
            })}
          </div>
        </div>
      </section>

      {/* Lanzador: el pitch en 5 secciones */}
      <section aria-labelledby="caps" className="border-t border-line/70 py-12 sm:py-14">
        <div className="mb-6 sm:mb-8">
          <p className="eyebrow">La presentación</p>
          <h2 id="caps" className="mt-1 text-2xl font-semibold sm:text-3xl">Las 9 diapositivas</h2>
        </div>
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
          {SECTIONS.map((s) => (
            <button key={s.slug} type="button" onClick={() => nav(`/seccion/${s.slug}`)}
              className="card overflow-hidden text-left transition hover:-translate-y-0.5 hover:border-navy-300 hover:shadow-lift">
              <img src={`${import.meta.env.BASE_URL}brand/${s.cover}`} alt={s.title} className="aspect-video w-full border-b border-line object-cover" />
              <span className="flex items-center gap-2 px-3 py-2">
                <span className="font-mono text-xs text-magenta">{String(s.n).padStart(2, '0')}</span>
                <span className="truncate text-sm font-semibold text-navy">{s.title}</span>
              </span>
            </button>
          ))}
        </div>
      </section>
    </>
  );
}
