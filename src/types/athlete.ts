export type Gender = 'male' | 'female' | 'other';

export type RAGStatus = 'red' | 'amber' | 'green';

export type TargetRace = '800m' | '1500m' | '3k' | '5k' | '10k' | 'Half Marathon' | 'Marathon';

export interface RunningMetrics {
  vo2MaxVelocity: number; // m/s
  lt2Velocity: number; // m/s
  ltMax: number; // mmol/L
  lt1Velocity: number; // m/s
  maxSprintSpeed: number; // m/s
  maxLactate: number; // mmol/L
}

export interface Athlete {
  id: string;
  name: string;
  age: number;
  gender: Gender;
  sport: string;
  ragStatus: RAGStatus;
  recentSessions: number;
  lastSessionDate?: Date;
  runningMetrics: RunningMetrics;
  targetRace: TargetRace;
  targetRaceDate?: Date;
  targetTime: string;
}

export interface Insight {
  id: string;
  athleteId: string;
  type: 'warning' | 'success' | 'info';
  message: string;
  acknowledged: boolean;
  createdAt: Date;
}

export interface TrainingPlan {
  id: string;
  athleteId: string;
  name: string;
  startDate: Date;
  endDate: Date;
  description: string;
}

export interface SessionCompletion {
  id: string;
  athleteId: string;
  completedAt: Date;
  ragStatus: RAGStatus;
  notes?: string;
}
