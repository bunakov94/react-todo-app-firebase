import React, { Component } from 'react';
import firebase from './firebase';
import { AppState, AppProps, ITask } from './components/types/interfaces';

import TaskList from './components/blocks/TaskList';
import './App.scss';
import Header from './components/layout/Header';
import Footer from './components/layout/Footer';

export default class App extends Component<AppProps, AppState> {
  constructor(props: AppProps) {
    super(props);
    this.state = {
      tasks: [],
    };
  }

  componentDidMount() {
    firebase
      .firestore()
      .collection('tasks')
      .onSnapshot((snapshot) => {
        const tasks = snapshot.docs.map(
          (doc) =>
            ({
              id: doc.id,
              ...doc.data(),
            } as ITask),
        );
        this.setState({ tasks });
      });
  }

  render() {
    const { tasks } = this.state;

    return (
      <section className="todoapp">
        <Header />
        <section className="main">
          <TaskList tasks={tasks} />
          <Footer />
        </section>
      </section>
    );
  }
}
