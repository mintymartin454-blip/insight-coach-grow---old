import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Insight } from '@/types/athlete';
import { AlertCircle, CheckCircle, Info, X } from 'lucide-react';

interface InsightNotificationProps {
  insight: Insight;
  onAcknowledge: (id: string) => void;
}

export const InsightNotification = ({ insight, onAcknowledge }: InsightNotificationProps) => {
  const getIcon = () => {
    switch (insight.type) {
      case 'warning':
        return <AlertCircle className="h-5 w-5 text-amber-500" />;
      case 'success':
        return <CheckCircle className="h-5 w-5 text-green-500" />;
      case 'info':
        return <Info className="h-5 w-5 text-blue-500" />;
    }
  };

  const getBorderColor = () => {
    switch (insight.type) {
      case 'warning':
        return 'border-amber-500';
      case 'success':
        return 'border-green-500';
      case 'info':
        return 'border-blue-500';
    }
  };

  return (
    <Card className={`border-l-4 ${getBorderColor()}`}>
      <CardContent className="p-4">
        <div className="flex items-start justify-between gap-4">
          <div className="flex items-start gap-3">
            {getIcon()}
            <div>
              <p className="text-sm font-medium">{insight.message}</p>
              <p className="text-xs text-muted-foreground mt-1">
                {new Date(insight.createdAt).toLocaleString()}
              </p>
            </div>
          </div>
          <Button
            variant="ghost"
            size="icon"
            onClick={() => onAcknowledge(insight.id)}
          >
            <X className="h-4 w-4" />
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};
