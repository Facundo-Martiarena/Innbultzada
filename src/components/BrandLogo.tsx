import { useState } from 'react';

/*
 * Logo de INNBULTZADA.
 * Deja los archivos en /public/brand/ (ver LEEME.txt):
 *   - logo-horizontal.png → cabecera · logo.png → versión completa
 *   - logo.gif → versión animada (Home)
 * Si no existen, se muestra el logotipo provisional.
 */
const BASE = import.meta.env.BASE_URL;
export const LOGO_STATIC = `${BASE}brand/logo-horizontal.png`;
export const LOGO_FULL = `${BASE}brand/logo.png`;
export const LOGO_ANIMATED = `${BASE}brand/logo.gif`;

function Mark({ size = 30 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 32 32" aria-hidden>
      <rect width="32" height="32" rx="9" fill="rgb(var(--navy))" />
      <path d="M8 22 L16 9 L24 22" stroke="rgb(var(--magenta))" strokeWidth="3.2" fill="none" strokeLinecap="round" strokeLinejoin="round" />
      <circle cx="16" cy="22" r="2.4" fill="rgb(var(--yellow))" />
    </svg>
  );
}

/** Logo de cabecera: imagen estática o, si falta, marca + wordmark provisional. */
export function BrandLogo() {
  const [failed, setFailed] = useState(false);
  if (!failed) {
    return <img src={LOGO_STATIC} alt="INNBULTZADA" className="h-9 w-auto present:h-10" onError={() => setFailed(true)} />;
  }
  return (
    <span className="flex items-center gap-2.5">
      <Mark />
      <span className="font-display text-lg font-bold tracking-tight text-navy">INNBULTZADA</span>
    </span>
  );
}

/** Logo animado de portada. Devuelve null si el GIF no existe (se muestra el título en texto). */
export function BrandHero({ onMissing }: { onMissing: () => void }) {
  const [failed, setFailed] = useState(false);
  if (failed) return null;
  return (
    <img src={LOGO_ANIMATED} alt="INNBULTZADA" className="h-32 w-auto max-w-full sm:h-[13rem] present:h-[17rem]"
      onError={() => { setFailed(true); onMissing(); }} />
  );
}
