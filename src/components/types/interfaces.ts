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
  min: string;
  sec: string;
}

export type TaskProps = {
  editTask: (id: string) => void;
  text: string;
  id: string;
  isCompleted: boolean;
  timeOfCreation: Date;
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
