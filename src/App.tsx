import { HashRouter, Navigate, Route, Routes } from 'react-router-dom';
import { AppShell } from './components/AppShell';
import { DemoProvider } from './state/DemoContext';
import Applications from './pages/Applications';
import Apply from './pages/Apply';
import Chapter from './pages/Chapter';
import Section from './pages/Section';
import Call from './pages/Call';
import Evaluation from './pages/Evaluation';
import Explore from './pages/Explore';
import Diagnostic from './pages/Diagnostic';
import Access from './pages/Access';
import Idea from './pages/Idea';
import Tracking from './pages/Tracking';
import Ecosystem from './pages/Ecosystem';
import Prioritize from './pages/Prioritize';
import ProgramSheet from './pages/ProgramSheet';
import Decision from './pages/Decision';
import Home from './pages/Home';
import HowItWorks from './pages/HowItWorks';
import Pilot from './pages/Pilot';
import Project from './pages/Project';
import Scale from './pages/Scale';
import Validate from './pages/Validate';

/* HashRouter: funciona sin configuración de servidor (ideal para demo/offline). */
export default function App() {
  return (
    <DemoProvider>
      <HashRouter future={{ v7_startTransition: true, v7_relativeSplatPath: true }}>
        <AppShell>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/seccion/:slug" element={<Section />} />
            <Route path="/seccion" element={<Navigate to="/seccion/flujo" replace />} />
            <Route path="/capitulo/:slug" element={<Chapter />} />
            <Route path="/capitulo" element={<Navigate to="/capitulo/reto" replace />} />
            <Route path="/como-funciona" element={<HowItWorks />} />
            <Route path="/programa" element={<ProgramSheet />} />
            <Route path="/ecosistema" element={<Ecosystem />} />
            <Route path="/laboral-kutxa/diagnostico" element={<Diagnostic />} />
            <Route path="/laboral-kutxa/votacion" element={<Prioritize />} />
            <Route path="/startup/acceso" element={<Access />} />
            <Route path="/startup/retos" element={<Explore />} />
            <Route path="/startup/idea" element={<Idea />} />
            <Route path="/startup/seguimiento" element={<Tracking />} />
            <Route path="/retos" element={<Navigate to="/laboral-kutxa/votacion" replace />} />
            <Route path="/reto/:id/convocatoria" element={<Call />} />
            <Route path="/reto/:id/postular" element={<Apply />} />
            <Route path="/reto/:id/candidaturas" element={<Applications />} />
            <Route path="/reto/:id/evaluacion" element={<Evaluation />} />
            <Route path="/reto/:id/proyecto" element={<Project />} />
            <Route path="/reto/:id/validar" element={<Validate />} />
            <Route path="/reto/:id/piloto" element={<Pilot />} />
            <Route path="/reto/:id/decision" element={<Decision />} />
            <Route path="/reto/:id/escalar" element={<Scale />} />
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </AppShell>
      </HashRouter>
    </DemoProvider>
  );
}
