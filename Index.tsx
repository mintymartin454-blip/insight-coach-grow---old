import { AddAthleteDialog } from '@/components/AddAthleteDialog';
import { AthleteCard } from '@/components/AthleteCard';
import { AthleteDetailView } from '@/components/AthleteDetailView';
import { InsightNotification } from '@/components/InsightNotification';
import { Button } from '@/components/ui/button';
import { Athlete, Insight, SessionCompletion, TrainingPlan } from '@/types/athlete';
import { generateInsights } from '@/utils/insightEngine';
import { Activity, Bell } from 'lucide-react';
import { useEffect, useState } from 'react';
import { toast } from 'sonner';

const Index = () => {
  const [athletes, setAthletes] = useState<Athlete[]>([]);
  const [insights, setInsights] = useState<Insight[]>([]);
  const [trainingPlans, setTrainingPlans] = useState<TrainingPlan[]>([]);
  const [sessions, setSessions] = useState<SessionCompletion[]>([]);
  const [selectedAthlete, setSelectedAthlete] = useState<Athlete | null>(null);
  const [showInsights, setShowInsights] = useState(false);

  // Generate insights whenever athletes data changes
  useEffect(() => {
    const newInsights: Insight[] = [];
    athletes.forEach(athlete => {
      const athleteInsights = generateInsights(athlete);
      newInsights.push(...athleteInsights);
    });
    setInsights(newInsights.filter(i => !i.acknowledged));
  }, [athletes]);

  const handleAddAthlete = (athlete: Athlete) => {
    setAthletes([...athletes, athlete]);
    toast.success(`${athlete.name} added successfully`);
  };

  const handleAcknowledgeInsight = (id: string) => {
    setInsights(insights.filter(i => i.id !== id));
  };

  const handleAddPlan = (plan: TrainingPlan) => {
    setTrainingPlans([...trainingPlans, plan]);
    toast.success('Training plan created');
  };

  const handleCompleteSession = (session: SessionCompletion) => {
    setSessions([...sessions, session]);
    
    // Update athlete RAG status and session count
    setAthletes(athletes.map(a => 
      a.id === session.athleteId
        ? {
            ...a,
            ragStatus: session.ragStatus,
            recentSessions: a.recentSessions + 1,
            lastSessionDate: session.completedAt,
          }
        : a
    ));

    toast.success('Session completed successfully', {
      description: `Performance rated as ${session.ragStatus.toUpperCase()}`,
    });
  };

  const unacknowledgedCount = insights.filter(i => !i.acknowledged).length;

  if (selectedAthlete) {
    return (
      <div className="min-h-screen bg-background p-6">
        <div className="max-w-7xl mx-auto">
          <AthleteDetailView
            athlete={selectedAthlete}
            trainingPlans={trainingPlans}
            sessions={sessions}
            onBack={() => setSelectedAthlete(null)}
            onAddPlan={handleAddPlan}
            onCompleteSession={handleCompleteSession}
          />
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b bg-card">
        <div className="max-w-7xl mx-auto px-6 py-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="h-12 w-12 rounded-lg bg-gradient-performance flex items-center justify-center">
                <Activity className="h-6 w-6 text-primary-foreground" />
              </div>
              <div>
                <h1 className="text-2xl font-bold">Training Insights</h1>
                <p className="text-sm text-muted-foreground">Performance coaching platform</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <Button
                variant="outline"
                size="lg"
                className="gap-2 relative"
                onClick={() => setShowInsights(!showInsights)}
              >
                <Bell className="h-5 w-5" />
                {unacknowledgedCount > 0 && (
                  <span className="absolute -top-1 -right-1 h-5 w-5 rounded-full bg-destructive text-destructive-foreground text-xs flex items-center justify-center">
                    {unacknowledgedCount}
                  </span>
                )}
              </Button>
              <AddAthleteDialog onAddAthlete={handleAddAthlete} />
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-6 py-8">
        {/* Insights Section */}
        {showInsights && insights.length > 0 && (
          <div className="mb-8 space-y-4">
            <h2 className="text-lg font-semibold">Active Insights</h2>
            <div className="space-y-3">
              {insights.map(insight => (
                <InsightNotification
                  key={insight.id}
                  insight={insight}
                  onAcknowledge={handleAcknowledgeInsight}
                />
              ))}
            </div>
          </div>
        )}

        {/* Athletes Grid */}
        {athletes.length === 0 ? (
          <div className="text-center py-16">
            <div className="h-20 w-20 rounded-full bg-gradient-performance flex items-center justify-center mx-auto mb-6">
              <Activity className="h-10 w-10 text-primary-foreground" />
            </div>
            <h2 className="text-2xl font-bold mb-2">No Athletes Yet</h2>
            <p className="text-muted-foreground mb-6">
              Start by adding your first athlete to begin tracking their performance
            </p>
            <AddAthleteDialog onAddAthlete={handleAddAthlete} />
          </div>
        ) : (
          <>
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-semibold">Athletes ({athletes.length})</h2>
            </div>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {athletes.map(athlete => (
                <AthleteCard
                  key={athlete.id}
                  athlete={athlete}
                  onClick={() => setSelectedAthlete(athlete)}
                />
              ))}
            </div>
          </>
        )}
      </main>
    </div>
  );
};

export default Index;
