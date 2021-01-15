import firebase from '../../firebase';
// TODO: Event type?
export const addTask = (event: any, textInput: string, minInput: string, secInput: string) => {
  event.preventDefault();
  if (textInput !== '') {
    firebase
      .firestore()
      .collection('tasks')
      .add({
        text: textInput,
        min: minInput || 0,
        sec: secInput || 0,
        isCompleted: false,
        isEditing: false,
        timeOfCreation: new Date(),
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
    // text: event.currentTarget.editText.value,
  });
};
