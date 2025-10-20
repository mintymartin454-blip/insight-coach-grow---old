import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Athlete, Gender, TargetRace } from '@/types/athlete';
import { UserPlus } from 'lucide-react';
import { useState } from 'react';

interface AddAthleteDialogProps {
  onAddAthlete: (athlete: Athlete) => void;
}

export const AddAthleteDialog = ({ onAddAthlete }: AddAthleteDialogProps) => {
  const [open, setOpen] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    age: '',
    gender: 'male' as Gender,
    vo2MaxVelocity: '',
    lt2Velocity: '',
    ltMax: '',
    lt1Velocity: '',
    maxSprintSpeed: '',
    maxLactate: '',
    targetRace: '5k' as TargetRace,
    targetRaceDate: '',
    targetTime: '',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const newAthlete: Athlete = {
      id: crypto.randomUUID(),
      name: formData.name,
      age: parseInt(formData.age),
      gender: formData.gender,
      sport: 'Running',
      ragStatus: 'green',
      recentSessions: 0,
      runningMetrics: {
        vo2MaxVelocity: parseFloat(formData.vo2MaxVelocity),
        lt2Velocity: parseFloat(formData.lt2Velocity),
        ltMax: parseFloat(formData.ltMax),
        lt1Velocity: parseFloat(formData.lt1Velocity),
        maxSprintSpeed: parseFloat(formData.maxSprintSpeed),
        maxLactate: parseFloat(formData.maxLactate),
      },
      targetRace: formData.targetRace,
      targetRaceDate: formData.targetRaceDate ? new Date(formData.targetRaceDate) : undefined,
      targetTime: formData.targetTime,
    };

    onAddAthlete(newAthlete);
    setOpen(false);
    setFormData({
      name: '',
      age: '',
      gender: 'male',
      vo2MaxVelocity: '',
      lt2Velocity: '',
      ltMax: '',
      lt1Velocity: '',
      maxSprintSpeed: '',
      maxLactate: '',
      targetRace: '5k',
      targetRaceDate: '',
      targetTime: '',
    });
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button size="lg" className="gap-2">
          <UserPlus className="h-5 w-5" />
          Add Athlete
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Add New Athlete</DialogTitle>
          <DialogDescription>
            Enter athlete details and running metrics
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="name">Name</Label>
              <Input
                id="name"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="age">Age</Label>
              <Input
                id="age"
                type="number"
                value={formData.age}
                onChange={(e) => setFormData({ ...formData, age: e.target.value })}
                required
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="gender">Gender</Label>
            <Select
              value={formData.gender}
              onValueChange={(value: Gender) => setFormData({ ...formData, gender: value })}
            >
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="male">Male</SelectItem>
                <SelectItem value="female">Female</SelectItem>
                <SelectItem value="other">Other</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-4">
            <h3 className="font-semibold">Running Metrics</h3>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="vo2MaxVelocity">VO2 Max Velocity (m/s)</Label>
                <Input
                  id="vo2MaxVelocity"
                  type="number"
                  step="0.01"
                  value={formData.vo2MaxVelocity}
                  onChange={(e) => setFormData({ ...formData, vo2MaxVelocity: e.target.value })}
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="lt2Velocity">LT2 Velocity (m/s)</Label>
                <Input
                  id="lt2Velocity"
                  type="number"
                  step="0.01"
                  value={formData.lt2Velocity}
                  onChange={(e) => setFormData({ ...formData, lt2Velocity: e.target.value })}
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="ltMax">LT Max (mmol/L)</Label>
                <Input
                  id="ltMax"
                  type="number"
                  step="0.1"
                  value={formData.ltMax}
                  onChange={(e) => setFormData({ ...formData, ltMax: e.target.value })}
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="lt1Velocity">LT1 Velocity (m/s)</Label>
                <Input
                  id="lt1Velocity"
                  type="number"
                  step="0.01"
                  value={formData.lt1Velocity}
                  onChange={(e) => setFormData({ ...formData, lt1Velocity: e.target.value })}
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="maxSprintSpeed">Max Sprint Speed (m/s)</Label>
                <Input
                  id="maxSprintSpeed"
                  type="number"
                  step="0.01"
                  value={formData.maxSprintSpeed}
                  onChange={(e) => setFormData({ ...formData, maxSprintSpeed: e.target.value })}
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="maxLactate">Max Lactate (mmol/L)</Label>
                <Input
                  id="maxLactate"
                  type="number"
                  step="0.1"
                  value={formData.maxLactate}
                  onChange={(e) => setFormData({ ...formData, maxLactate: e.target.value })}
                  required
                />
              </div>
            </div>
          </div>

          <div className="space-y-4">
            <h3 className="font-semibold">Target Race</h3>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="targetRace">Event</Label>
                <Select
                  value={formData.targetRace}
                  onValueChange={(value: TargetRace) => setFormData({ ...formData, targetRace: value })}
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="800m">800m</SelectItem>
                    <SelectItem value="1500m">1500m</SelectItem>
                    <SelectItem value="3k">3k</SelectItem>
                    <SelectItem value="5k">5k</SelectItem>
                    <SelectItem value="10k">10k</SelectItem>
                    <SelectItem value="Half Marathon">Half Marathon</SelectItem>
                    <SelectItem value="Marathon">Marathon</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="targetRaceDate">Date</Label>
                <Input
                  id="targetRaceDate"
                  type="date"
                  value={formData.targetRaceDate}
                  onChange={(e) => setFormData({ ...formData, targetRaceDate: e.target.value })}
                />
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="targetTime">Target Time (e.g., 15:30)</Label>
              <Input
                id="targetTime"
                value={formData.targetTime}
                onChange={(e) => setFormData({ ...formData, targetTime: e.target.value })}
                placeholder="MM:SS or HH:MM:SS"
                required
              />
            </div>
          </div>

          <Button type="submit" className="w-full">
            Add Athlete
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
};
