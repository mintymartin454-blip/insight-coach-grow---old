import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Athlete, SessionCompletion, TrainingPlan } from '@/types/athlete';
import { ArrowLeft, Target, Calendar, TrendingUp } from 'lucide-react';
import { useState } from 'react';

interface AthleteDetailViewProps {
  athlete: Athlete;
  trainingPlans: TrainingPlan[];
  sessions: SessionCompletion[];
  onBack: () => void;
  onAddPlan: (plan: TrainingPlan) => void;
  onCompleteSession: (session: SessionCompletion) => void;
}

export const AthleteDetailView = ({
  athlete,
  trainingPlans,
  sessions,
  onBack,
}: AthleteDetailViewProps) => {
  const [useMinPerKm, setUseMinPerKm] = useState(false);

  // Convert m/s to min/km
  const convertToMinPerKm = (metersPerSecond: number): string => {
    const secondsPerKm = 1000 / metersPerSecond;
    const minutes = Math.floor(secondsPerKm / 60);
    const seconds = Math.round(secondsPerKm % 60);
    return `${minutes}:${seconds.toString().padStart(2, '0')}`;
  };

  const formatVelocity = (velocity: number): string => {
    if (useMinPerKm) {
      return `${convertToMinPerKm(velocity)} min/km`;
    }
    return `${velocity.toFixed(2)} m/s`;
  };

  const getRAGColor = (status: string) => {
    switch (status) {
      case 'green':
        return 'bg-green-500';
      case 'amber':
        return 'bg-amber-500';
      case 'red':
        return 'bg-red-500';
      default:
        return 'bg-muted';
    }
  };

  const athletePlans = trainingPlans.filter(p => p.athleteId === athlete.id);
  const athleteSessions = sessions.filter(s => s.athleteId === athlete.id);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Button variant="outline" size="icon" onClick={onBack}>
            <ArrowLeft className="h-5 w-5" />
          </Button>
          <div>
            <div className="flex items-center gap-3">
              <h1 className="text-3xl font-bold">{athlete.name}</h1>
              <div className={`h-4 w-4 rounded-full ${getRAGColor(athlete.ragStatus)}`} />
            </div>
            <p className="text-muted-foreground">
              {athlete.age} years • {athlete.gender} • {athlete.sport}
            </p>
          </div>
        </div>
        <Button
          variant="outline"
          onClick={() => setUseMinPerKm(!useMinPerKm)}
        >
          Switch to {useMinPerKm ? 'm/s' : 'min/km'}
        </Button>
      </div>

      {/* Target Race Card */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Target className="h-5 w-5" />
            Target Race
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-muted-foreground">Event</span>
            <Badge variant="secondary" className="text-base">
              {athlete.targetRace}
            </Badge>
          </div>
          {athlete.targetRaceDate && (
            <div className="flex items-center justify-between">
              <span className="text-muted-foreground">Date</span>
              <div className="flex items-center gap-2">
                <Calendar className="h-4 w-4" />
                <span className="font-medium">
                  {new Date(athlete.targetRaceDate).toLocaleDateString()}
                </span>
              </div>
            </div>
          )}
          <div className="flex items-center justify-between">
            <span className="text-muted-foreground">Target Time</span>
            <span className="font-medium text-lg">{athlete.targetTime}</span>
          </div>
        </CardContent>
      </Card>

      {/* Running Metrics Card */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <TrendingUp className="h-5 w-5" />
            Running Metrics
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid md:grid-cols-2 gap-4">
            <div className="space-y-1">
              <span className="text-sm text-muted-foreground">VO2 Max Velocity</span>
              <p className="text-lg font-semibold">
                {formatVelocity(athlete.runningMetrics.vo2MaxVelocity)}
              </p>
            </div>
            <div className="space-y-1">
              <span className="text-sm text-muted-foreground">LT2 Velocity</span>
              <p className="text-lg font-semibold">
                {formatVelocity(athlete.runningMetrics.lt2Velocity)}
              </p>
            </div>
            <div className="space-y-1">
              <span className="text-sm text-muted-foreground">LT1 Velocity</span>
              <p className="text-lg font-semibold">
                {formatVelocity(athlete.runningMetrics.lt1Velocity)}
              </p>
            </div>
            <div className="space-y-1">
              <span className="text-sm text-muted-foreground">Max Sprint Speed</span>
              <p className="text-lg font-semibold">
                {formatVelocity(athlete.runningMetrics.maxSprintSpeed)}
              </p>
            </div>
            <div className="space-y-1">
              <span className="text-sm text-muted-foreground">LT Max</span>
              <p className="text-lg font-semibold">
                {athlete.runningMetrics.ltMax.toFixed(1)} mmol/L
              </p>
            </div>
            <div className="space-y-1">
              <span className="text-sm text-muted-foreground">Max Lactate</span>
              <p className="text-lg font-semibold">
                {athlete.runningMetrics.maxLactate.toFixed(1)} mmol/L
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Training Plans */}
      <Card>
        <CardHeader>
          <CardTitle>Training Plans ({athletePlans.length})</CardTitle>
        </CardHeader>
        <CardContent>
          {athletePlans.length === 0 ? (
            <p className="text-muted-foreground text-center py-4">
              No training plans yet
            </p>
          ) : (
            <div className="space-y-3">
              {athletePlans.map(plan => (
                <div
                  key={plan.id}
                  className="p-4 border rounded-lg space-y-2"
                >
                  <h4 className="font-semibold">{plan.name}</h4>
                  <p className="text-sm text-muted-foreground">{plan.description}</p>
                  <div className="flex gap-4 text-sm">
                    <span>
                      Start: {new Date(plan.startDate).toLocaleDateString()}
                    </span>
                    <span>
                      End: {new Date(plan.endDate).toLocaleDateString()}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>

      {/* Recent Sessions */}
      <Card>
        <CardHeader>
          <CardTitle>Recent Sessions ({athleteSessions.length})</CardTitle>
        </CardHeader>
        <CardContent>
          {athleteSessions.length === 0 ? (
            <p className="text-muted-foreground text-center py-4">
              No sessions completed yet
            </p>
          ) : (
            <div className="space-y-3">
              {athleteSessions.slice(-5).reverse().map(session => (
                <div
                  key={session.id}
                  className="p-4 border rounded-lg flex items-center justify-between"
                >
                  <div className="space-y-1">
                    <p className="font-medium">
                      {new Date(session.completedAt).toLocaleDateString()}
                    </p>
                    {session.notes && (
                      <p className="text-sm text-muted-foreground">{session.notes}</p>
                    )}
                  </div>
                  <div className={`h-3 w-3 rounded-full ${getRAGColor(session.ragStatus)}`} />
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};
