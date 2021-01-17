export type AppState = {
  tasks: ITask[];
  filter: number;
};
export type AppProps = {};

export interface ITask {
  isCompleted: boolean;
  isEditing: boolean;
  text: string;
  timeOfCreation: Date;
  id: string;
  timerValue: number;
  startTime: Date;
  timerIsActive: boolean;
}

export type TaskProps = {
  editTask: (id: string) => void;
  text: string;
  id: string;
  isCompleted: boolean;
  timeOfCreation: Date;
  timerValue: number;
  startTime: Date;
  timerIsActive: boolean;
};

export type TaskFilterProps = {
  filter: number;
  changeFilter: (filter: number) => void;
};

export type TaskListProps = {
  tasks: ITask[];
  editTask: (id: string) => void;
};

export type FooterProps = {
  deleteCompletedTasks: () => void;
  tasksLeft: number;
  filter: number;
  changeFilter: (filter: number) => void;
};
