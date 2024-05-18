firebase.initializeApp({
   // Your web app's Firebase configuration

    apiKey: "AIzaSyA0EqStWXzJkILwoylRmxXEfSMIPUiueFA",
    authDomain: "plp-apps-282cb.firebaseapp.com",
    projectId: "plp-apps-282cb",
    storageBucket: "plp-apps-282cb.appspot.com",
    messagingSenderId: "669517750571",
    appId: "1:669517750571:web:2276df478bfb167ba7e56e"
  
});

const db = firebase.firestore();

//function to add tasks
function addTask(){
    const taskInput = document.getElementById("task-input");
    const task = taskInput.value.trim();
    if(task !== ""){
        
        db.collection("tasks").add({
            task: task,
            timestamp: firebase.firestore.FieldValue.serverTimestamp(),
          });
          taskInput.value = "";
          console.log("Task added.");
        }
      }
      
// Function to render tasks
function renderTasks(doc) {
    const taskList = document.getElementById("task-list");
    const taskItem = document.createElement("li");
    taskItem.className = "task-item";
    taskItem.innerHTML = `
      <span>${doc.data().task}</span>
      <button onclick="deleteTask('${doc.id}')">Delete</button>
    `;
    taskList.appendChild(taskItem);
  }
  
  // Real-time listener for tasks
  db.collection("tasks")
    .orderBy("timestamp", "desc")
    .onSnapshot(snapshot => {
      const changes = snapshot.docChanges();
      changes.forEach(change => {
        if (change.type === "added") {
          renderTasks(change.doc);
        }
      });
    });
  
  // Function to delete a task
  function deleteTask(id) {
    db.collection("tasks").doc(id).delete();
  }
  