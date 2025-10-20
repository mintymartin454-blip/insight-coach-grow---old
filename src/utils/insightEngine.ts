import { Athlete, Insight } from '@/types/athlete';

export const generateInsights = (athlete: Athlete): Insight[] => {
  const insights: Insight[] = [];

  // Check for inactivity
  if (athlete.recentSessions === 0) {
    insights.push({
      id: `${athlete.id}-no-sessions`,
      athleteId: athlete.id,
      type: 'info',
      message: `${athlete.name} hasn't logged any training sessions yet.`,
      acknowledged: false,
      createdAt: new Date(),
    });
  }

  // Check for red RAG status
  if (athlete.ragStatus === 'red') {
    insights.push({
      id: `${athlete.id}-red-status`,
      athleteId: athlete.id,
      type: 'warning',
      message: `${athlete.name} is showing red performance indicators. Review recent sessions.`,
      acknowledged: false,
      createdAt: new Date(),
    });
  }

  // Check if target race date is approaching (within 30 days)
  if (athlete.targetRaceDate) {
    const daysUntilRace = Math.ceil(
      (new Date(athlete.targetRaceDate).getTime() - new Date().getTime()) / (1000 * 60 * 60 * 24)
    );
    if (daysUntilRace > 0 && daysUntilRace <= 30) {
      insights.push({
        id: `${athlete.id}-race-approaching`,
        athleteId: athlete.id,
        type: 'info',
        message: `${athlete.name}'s ${athlete.targetRace} is in ${daysUntilRace} days!`,
        acknowledged: false,
        createdAt: new Date(),
      });
    }
  }

  return insights;
};
