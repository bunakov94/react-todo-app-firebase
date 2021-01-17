import firebase from '../../firebase';

export const addTask = (event: any, textInput: string, timerValue: number) => {
  event.preventDefault();
  if (textInput !== '') {
    firebase.firestore().collection('tasks').add({
      text: textInput,
      timerValue,
      isCompleted: false,
      isEditing: false,
      timeOfCreation: new Date(),
      timerIsActive: false,
      startTime: 0,
    });
    event.target.reset();
  }
};

export const toggleComplete = (event: React.ChangeEvent<HTMLInputElement>, isCompleted: boolean, id: string) => {
  event.preventDefault();
  firebase.firestore().collection('tasks').doc(id).update({
    isCompleted: !isCompleted,
  });
};

export const deleteTask = (id: string) => {
  firebase.firestore().collection('tasks').doc(id).delete();
};

export const updateTodo = (event: React.FormEvent<HTMLFormElement>, id: string, text: string) => {
  event.preventDefault();
  firebase.firestore().collection('tasks').doc(id).update({
    isEditing: false,
    text,
  });
};

export const onStart = (id: string) => {
  firebase.firestore().collection('tasks').doc(id).update({
    timerIsActive: true,
    startTime: Date.now(),
  });
};

export const onStop = (id: string, label: number) => {
  firebase.firestore().collection('tasks').doc(id).update({
    timerValue: label,
    timerIsActive: false,
  });
};
