import { X, type LucideIcon } from 'lucide-react';

interface Props {
  eyebrow: string;
  cardTitle: string;
  cardSub: string;
  rightStamp: string;
  RightIcon: LucideIcon;
}

/*
 * Mini-visual compacto del swipe: una tarjeta que se desliza sola a la derecha y
 * muestra el sello, con los dos botones (pasar / aceptar). Solo ilustrativo.
 */
export function SwipeCardMini({ eyebrow, cardTitle, cardSub, rightStamp, RightIcon }: Props) {
  return (
    <div className="flex flex-col items-center gap-2" aria-hidden>
      <div className="relative h-[82px] w-[136px]">
        <div className="absolute inset-x-2 top-1.5 bottom-0 rounded-lg border border-line bg-paper-sunk/50" />
        <div className="absolute inset-0 origin-bottom animate-swipeHint overflow-hidden rounded-lg border border-line bg-paper-raised shadow-lift">
          <div className="bg-navy px-2 py-1 text-white">
            <p className="font-mono text-[0.48rem] leading-tight tracking-wide text-navy-100">{eyebrow}</p>
            <p className="text-[0.66rem] font-semibold leading-tight">{cardTitle}</p>
          </div>
          <div className="px-2 py-1">
            <p className="text-[0.56rem] leading-tight text-ink-soft">{cardSub}</p>
          </div>
          <span className="animate-stampIn absolute left-1.5 top-1.5 rounded border-2 border-impact px-1 font-display text-[0.6rem] font-bold text-impact">{rightStamp}</span>
        </div>
      </div>
      <div className="flex items-center gap-2.5">
        <span className="grid h-7 w-7 place-items-center rounded-full border-2 border-magenta/30 bg-paper-raised text-magenta"><X size={13} strokeWidth={2.5} /></span>
        <span className="grid h-7 w-7 place-items-center rounded-full bg-impact text-white shadow-card"><RightIcon size={13} strokeWidth={2.5} /></span>
      </div>
    </div>
  );
}
