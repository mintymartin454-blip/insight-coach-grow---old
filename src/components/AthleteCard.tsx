import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Athlete } from '@/types/athlete';
import { Calendar, Target } from 'lucide-react';

interface AthleteCardProps {
  athlete: Athlete;
  onClick: () => void;
}

export const AthleteCard = ({ athlete, onClick }: AthleteCardProps) => {
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

  return (
    <Card
      className="cursor-pointer hover:shadow-lg transition-shadow"
      onClick={onClick}
    >
      <CardHeader className="flex flex-row items-start justify-between space-y-0 pb-2">
        <div className="space-y-1">
          <h3 className="font-semibold text-lg">{athlete.name}</h3>
          <p className="text-sm text-muted-foreground">
            {athlete.age} years • {athlete.gender}
          </p>
        </div>
        <div className={`h-3 w-3 rounded-full ${getRAGColor(athlete.ragStatus)}`} />
      </CardHeader>
      <CardContent className="space-y-3">
        <div className="flex items-center gap-2 text-sm">
          <Target className="h-4 w-4 text-muted-foreground" />
          <span className="font-medium">{athlete.targetRace}</span>
          <span className="text-muted-foreground">• {athlete.targetTime}</span>
        </div>
        {athlete.targetRaceDate && (
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <Calendar className="h-4 w-4" />
            <span>{new Date(athlete.targetRaceDate).toLocaleDateString()}</span>
          </div>
        )}
        <div className="pt-2 flex items-center justify-between">
          <span className="text-sm text-muted-foreground">Recent sessions</span>
          <Badge variant="secondary">{athlete.recentSessions}</Badge>
        </div>
      </CardContent>
    </Card>
  );
};
