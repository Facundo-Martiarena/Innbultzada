import { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { challengeById, journeyFor } from '../data/challenges';
import { useDemo } from '../state/DemoContext';

/** Sincroniza el reto de la URL con el estado de la demo y marca la etapa alcanzada. */
export function useRouteChallenge(stageReached: number) {
  const { id } = useParams();
  const demo = useDemo();
  const challenge = challengeById(id);
  useEffect(() => {
    if (challenge) demo.setChallengeId(challenge.id);
  }, [challenge?.id]); // eslint-disable-line react-hooks/exhaustive-deps
  useEffect(() => {
    if (challenge) demo.reach(stageReached);
  }, [challenge?.id, stageReached]); // eslint-disable-line react-hooks/exhaustive-deps
  return { challenge, journey: challenge ? journeyFor(challenge) : null, ...demo };
}
