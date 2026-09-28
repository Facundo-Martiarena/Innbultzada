import { BookOpenCheck, Building2, Menu, Presentation, Rocket, X } from 'lucide-react';
import { useEffect, useState, type ReactNode } from 'react';
import { Link, NavLink, matchPath, useLocation, useNavigate } from 'react-router-dom';
import { MILESTONES } from '../data/model';
import { journeyFor, challengeById } from '../data/challenges';
import { FLOW } from '../lib/flow';
import { useDemo } from '../state/DemoContext';
import { milestoneStatus } from './Passport';
import { StageStepper } from './StageStepper';
import { BrandLogo } from './BrandLogo';

function Logo() {
  return (
    <Link to="/" className="flex items-center" aria-label="INNBULTZADA, inicio">
      <BrandLogo />
    </Link>
  );
}

export function useCurrentStep() {
  const { pathname } = useLocation();
  return FLOW.find((s) => matchPath({ path: s.path(':id'), end: true }, pathname)) ?? null;
}

const LINKS = [
  { to: '/', label: 'Inicio', end: true },
  { to: '/ecosistema', label: 'Ecosistema' },
  { to: '/laboral-kutxa/diagnostico', label: 'LABORAL Kutxa' },
  { to: '/startup/acceso', label: 'Startups' },
  { to: '/programa', label: 'Programa' },
  { to: '/como-funciona', label: 'Preguntas' },
];

export function AppShell({ children }: { children: ReactNode }) {
  const { presentation, togglePresentation, challengeId, reached } = useDemo();
  const step = useCurrentStep();
  const nav = useNavigate();
  const [menuOpen, setMenuOpen] = useState(false);
  const deckPath = useLocation().pathname;
  const onChapter = deckPath.startsWith('/capitulo') || deckPath.startsWith('/seccion');
  const inProject = step && ['proyecto', 'validar', 'piloto', 'decision', 'escalar'].includes(step.key);
  const ch = challengeById(challengeId)!;
  const done = MILESTONES.filter((m) => milestoneStatus(m, reached) === 'done').length;

  // Atajos globales: P = modo presentación, Esc = salir.
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      const t = e.target as HTMLElement;
      if (t.closest('input, textarea, select') || e.metaKey || e.ctrlKey || e.altKey) return;
      if (e.key.toLowerCase() === 'p') togglePresentation();
      if (e.key === 'Escape') togglePresentation(false);
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [togglePresentation]);

  useEffect(() => {
    window.scrollTo({ top: 0 });
  }, [step?.key]);

  // Modo presentación a pantalla completa (como PowerPoint)
  useEffect(() => {
    if (presentation && !document.fullscreenElement) {
      document.documentElement.requestFullscreen?.().catch(() => {});
    } else if (!presentation && document.fullscreenElement) {
      document.exitFullscreen?.().catch(() => {});
    }
  }, [presentation]);

  // Si el usuario sale de pantalla completa (Esc/F11), también sale del modo presentación
  useEffect(() => {
    const onFs = () => { if (!document.fullscreenElement && presentation) togglePresentation(false); };
    document.addEventListener('fullscreenchange', onFs);
    return () => document.removeEventListener('fullscreenchange', onFs);
  }, [presentation, togglePresentation]);

  const navCls = ({ isActive }: { isActive: boolean }) =>
    `whitespace-nowrap rounded-full px-3 py-2 text-sm font-semibold transition ${isActive ? 'bg-navy-50 text-navy' : 'text-ink-soft hover:text-navy'}`;

  return (
    <div className="flex min-h-screen flex-col">
      <a href="#main" className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-50 focus:rounded-lg focus:bg-navy focus:px-4 focus:py-2 focus:text-white">Saltar al contenido</a>
      <header className="sticky top-0 z-40 border-b border-line bg-paper/90 backdrop-blur">
        <div className="mx-auto flex h-16 max-w-[1320px] items-center gap-3 px-4 sm:gap-6 sm:px-8">
          <Logo />
          <nav aria-label="Principal" className="ml-2 hidden gap-0.5 present:hidden md:flex">
            {LINKS.map((l) => <NavLink key={l.to} to={l.to} end={l.end} className={navCls}>{l.label}</NavLink>)}
          </nav>
          <div className="ml-auto flex items-center gap-2">
            {inProject && (
              <button type="button" onClick={() => nav(`/reto/${challengeId}/proyecto`)} className="chip min-h-[36px] whitespace-nowrap border border-line bg-paper-raised px-3 text-navy hover:border-navy-300 max-sm:hidden" title="Ver Pasaporte INNBULTZADA">
                <BookOpenCheck size={15} className="text-impact-600" aria-hidden />
                Pasaporte · {done}/{MILESTONES.length} hitos
                <span className="sr-only"> de {journeyFor(ch).ventureName}</span>
              </button>
            )}
            <button
              type="button"
              aria-pressed={presentation}
              onClick={() => togglePresentation()}
              title="Modo presentación (P)"
              className={`btn min-h-[40px] whitespace-nowrap px-3 text-sm sm:px-4 ${presentation ? 'bg-magenta text-white hover:bg-magenta-600' : 'border border-line bg-paper-raised text-navy hover:bg-navy-50'}`}
            >
              {presentation ? <X size={16} aria-hidden /> : <Presentation size={16} aria-hidden />}
              <span className="max-sm:sr-only">{presentation ? 'Salir' : 'Presentar'}</span>
              <kbd className="rounded border border-current/30 px-1 font-mono text-[0.65rem] opacity-70 max-sm:hidden">P</kbd>
            </button>
            <button type="button" aria-expanded={menuOpen} aria-label="Menú"
              onClick={() => setMenuOpen((o) => !o)}
              className="btn min-h-[40px] border border-line bg-paper-raised px-3 text-navy hover:bg-navy-50 present:hidden md:hidden">
              {menuOpen ? <X size={18} aria-hidden /> : <Menu size={18} aria-hidden />}
            </button>
          </div>
        </div>
        {menuOpen && (
          <nav aria-label="Menú móvil" className="border-t border-line px-4 py-2 present:hidden md:hidden">
            {LINKS.map((l) => (
              <NavLink key={l.to} to={l.to} end={l.end} onClick={() => setMenuOpen(false)}
                className={({ isActive }) => `block rounded-xl px-3 py-2.5 text-sm font-semibold ${isActive ? 'bg-navy-50 text-navy' : 'text-ink-soft'}`}>
                {l.label}
              </NavLink>
            ))}
          </nav>
        )}
        {step?.stage && (
          <div className="border-t border-line/70">
            <div className="mx-auto flex h-11 max-w-[1320px] items-center gap-4 px-4 sm:px-8">
              {step.role && (
                <span className={`chip ${step.role === 'lk' ? 'bg-navy text-white' : 'bg-opportunity text-navy'}`}>
                  {step.role === 'lk' ? <Building2 size={13} aria-hidden /> : <Rocket size={13} aria-hidden />}
                  {step.role === 'lk' ? 'Perfil LABORAL Kutxa' : 'Perfil startup'}
                </span>
              )}
              {step.scoped && (
                <span className="truncate text-xs font-semibold text-ink-muted present:hidden">
                  {ch.code} · <span className="text-navy">{ch.title}</span>
                </span>
              )}
              <div className="ml-auto present:mx-auto max-md:hidden"><StageStepper current={step.stage} /></div>
            </div>
          </div>
        )}
      </header>

      <main id="main" className="mx-auto w-full max-w-[1320px] flex-1 px-4 sm:px-8">{children}</main>

      <footer className={`border-t border-line py-5 text-center text-xs text-ink-muted present:hidden ${onChapter ? 'hidden' : ''}`}>
        Prototipo conceptual de INNBULTZADA para presentación · Contenidos marcados como <em>Dato demostrativo</em>, <em>Ejemplo ficticio</em> o <em>Reto Demo</em> ·
        Instituciones citadas como actores conceptuales, sin atribuirles decisiones ni compromisos · Paleta propuesta, no es manual de marca.
      </footer>
    </div>
  );
}
