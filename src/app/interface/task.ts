export interface Task {
  id: number;
  topic: string;
  description: string;
  hours: number;
  startingDate?: Date;
  endingDate?: Date;
}
