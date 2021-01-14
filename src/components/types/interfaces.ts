export type AppState = {
  tasks: ITask[];
};
export type AppProps = {};

export interface ITask {
  isCompleted: boolean;
  isEditing: boolean;
  text: string;
  timeOfCreation: Date;
  id: string;
}
