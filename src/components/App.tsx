import React, { Component } from 'react';
import firebase from '../firebase';
// import { formatDistanceToNow } from 'date-fns';
import { AppState, AppProps, ITask } from './types/interfaces';

import TaskList from './layout/TaskList';
import './App.scss';
import Header from './layout/Header';
import Footer from './layout/Footer';
import FilterTypes from './types/filterTypes';

export default class App extends Component<AppProps, AppState> {
  timerID?: number;

  constructor(props: AppProps) {
    super(props);
    this.state = {
      tasks: [],
      filter: FilterTypes.ALL,
      isLoading: true,
    };
  }

  componentDidMount() {
    firebase
      .firestore()
      .collection('tasks')
      .onSnapshot((snapshot) => {
        const tasks = snapshot.docs.map((doc) => {
          const data = doc.data();
          return {
            id: doc.id,
            text: data.text,
            timeOfCreation: data.timeOfCreation.toDate(),
            isCompleted: data.isCompleted,
            isEditing: data.isEditing,
            timerValue: data.timerValue,
            startTime: data.startTime,
            timerIsActive: data.timerIsActive,
          } as ITask;
        });
        this.setState({ tasks });
        this.setState({ isLoading: false });
      });
  }

  editTask = (id: string) => {
    this.setState(({ tasks: oldTasks }) => {
      const tasks = [...oldTasks];
      const taskIndex = tasks.findIndex((task) => task.id === id);
      tasks[taskIndex].isEditing = true;
      return { tasks };
    });
  };

  deleteCompletedTasks = () => {
    const { tasks } = this.state;
    tasks
      .filter((task) => task.isCompleted)
      .reduce((acc: string[], el: ITask) => {
        acc.push(el.id);
        return acc;
      }, [])
      .forEach((element: string) => {
        firebase.firestore().collection('tasks').doc(element).delete();
      });
  };

  changeFilter = (filter: number) => {
    this.setState({ filter });
  };

  filterTasks = (tasks: ITask[], filter: number) => {
    if (filter === FilterTypes.UNCOMPLETED) {
      return tasks.filter((item) => !item.isCompleted);
    }
    if (filter === FilterTypes.COMPLETED) {
      return tasks.filter((item) => item.isCompleted);
    }
    return tasks;
  };

  render() {
    const { tasks, filter, isLoading } = this.state;
    const tasksLeft = tasks.reduce((acc, el) => (el.isCompleted ? acc : acc + 1), 0);
    const filteredTasks = this.filterTasks(tasks, filter).sort(
      (first, second) => +second.timeOfCreation - +first.timeOfCreation,
    );

    return (
      <section className="todoapp">
        <Header />
        <section className="main">
          <TaskList tasks={filteredTasks} editTask={this.editTask} isLoading={isLoading} />
          <Footer
            deleteCompletedTasks={this.deleteCompletedTasks}
            tasksLeft={tasksLeft}
            filter={filter}
            changeFilter={this.changeFilter}
          />
        </section>
      </section>
    );
  }
}
