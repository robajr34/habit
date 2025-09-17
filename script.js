// ===== Displays =====
const displays = {
   first: document.getElementById("firstDisplay"),
   addTask: document.getElementById("addTaskDisplay"),
   allTasks: document.getElementById("allTasksDisplay"),
   chart: document.getElementById("chartDisplay"),
   profile: document.getElementById("profileDisplay"),
   completedList: document.getElementById("completedList")
 };
 
 // ===== Bottom Navigation Buttons =====
 const navBtns = {
   home: document.getElementById("homeBtn"),
   task: document.getElementById("taskBtn"),
   addTask: document.getElementById("addTaskBtn"),
   chart: document.getElementById("chartBtn"),
   profile: document.getElementById("profileBtn")
 };
 
 // ===== Task Controls =====
 const taskControls = {
   seeAll: document.getElementById("seeAllBtn"),
   saveTask: document.getElementById("saveTaskBtn"),
   leftArrow: document.querySelectorAll("#leftArrow"),
   backBtn: document.querySelectorAll("#backBtn"),
   allBtn: document.getElementById("allBtn"),
   completedBtn: document.getElementById("completedBtn"),
 };
 
 // ===== Progress Info =====
 const progress = {
   percent: document.getElementById("progressPercent"),
   text: document.getElementById("progressText"),
   todayNumber: document.getElementById("todayTaskNumber"),
   todayTasks: document.getElementById("todayTasks")
 };
 
 // ===== Inputs =====
 const inputs = {
   date: document.getElementById("dateInput"),
   time: document.getElementById("startTime"),
   category: document.getElementById("category"),
   title: document.getElementById("taskNameInput")
 };
 const ul = document.getElementById('ul');
 const ul2 = document.getElementById('ul2');
 
 // ===== Task Lists =====
 const taskLists = {
   allTasks: document.querySelectorAll("#allTasks"),
   checkboxes: document.querySelectorAll("#checkbox"),
   deleteBtns: document.querySelectorAll(".deleteBtn")
 };

 function changeDisplay(){
  navBtns.addTask.addEventListener('click', ()=>{
    displays.allTasks.style.display = 'none';
    displays.first.style.display = 'none';
    displays.chart.style.display = 'none';
    displays.profile.style.display = 'none';
    displays.addTask.style.display = 'flex';
  });
  navBtns.task.addEventListener('click', ()=>{
    displays.allTasks.style.display = 'flex';
    displays.first.style.display = 'none';
    displays.chart.style.display = 'none';
    displays.profile.style.display = 'none';
    displays.addTask.style.display = 'none';
  });
  navBtns.home.addEventListener('click', ()=>{
    displays.allTasks.style.display = 'none';
    displays.first.style.display = 'flex';
    displays.chart.style.display = 'none';
    displays.profile.style.display = 'none';
    displays.addTask.style.display = 'none';
  });
  navBtns.chart.addEventListener('click', ()=>{
    displays.allTasks.style.display = 'none';
    displays.first.style.display = 'none';
    displays.chart.style.display = 'flex';
    displays.profile.style.display = 'none';
    displays.addTask.style.display = 'none';
  });
  navBtns.profile.addEventListener('click', ()=>{
    displays.allTasks.style.display = 'none';
    displays.first.style.display = 'none';
    displays.chart.style.display = 'none';
    displays.profile.style.display = 'flex';
    displays.addTask.style.display = 'none';
  });
  for (let btn of taskControls.backBtn){
    btn.addEventListener('click', ()=>{
      displays.allTasks.style.display = 'none';
        displays.first.style.display = 'flex';
        displays.chart.style.display = 'none';
        displays.profile.style.display = 'none';
        displays.addTask.style.display = 'none';
    })
  }
  taskControls.seeAll.addEventListener('click', ()=>{
    displays.allTasks.style.display = 'flex';
    displays.first.style.display = 'none';
    displays.chart.style.display = 'none';
    displays.profile.style.display = 'none';
    displays.addTask.style.display = 'none';
  });
  for (let btn of taskControls.leftArrow){
    btn.addEventListener('click', ()=>{
      displays.allTasks.style.display = 'none';
        displays.first.style.display = 'flex';
        displays.chart.style.display = 'none';
        displays.profile.style.display = 'none';
        displays.addTask.style.display = 'none';
    })
  }
  taskControls.allBtn.addEventListener('click', ()=>{
    ul.style.display = 'flex';
    displays.completedList.style.display = 'none';
  });
  taskControls.completedBtn.addEventListener('click', ()=>{
    ul.style.display = 'none';
    displays.completedList.style.display = 'flex';
  })
}
 changeDisplay();
 
 let habits = JSON.parse(localStorage.getItem('habits'))||[];

 taskControls.saveTask.addEventListener('click', ()=>{
    saveTask()
 });

 function createTask() {
  ul.innerHTML = ''; 
  ul2.innerHTML = '';
  displays.completedList.innerHTML = '';

  habits.forEach((habit) => {
    let div = document.createElement('div');
    div.className = 'list1';
    div.innerHTML = `
      <li class="lists">  
              <div class ='status'>${habit.completed ? "Done": ""}</div>                           
              <div class ='rows'>
                <i class="fa-regular fa-square checkbox" id='checkbox'></i>
              <span class="taskName">${habit.name}</span>
              <button class="deleteBtn">
                  <i class="fa-regular fa-circle-xmark"></i>
              </button>
              </div>                                         
          </li>
          <div class="bottom">
              <span class="date">${habit.date}</span>
              <span class="time">${habit.time}</span>
          </div>
    `;

    
    div.addEventListener("click", (e) => {
      if (!e.target.classList.contains("deleteBtn") && !e.target.closest(".deleteBtn")) {
        habit.completed = true; 
        localStorage.setItem("habits", JSON.stringify(habits));
        createTask(); 
        displayStatus();
      }
    });

   
    div.querySelector('.deleteBtn').addEventListener('click', (e) => {
      e.stopPropagation(); 
      habits = habits.filter(h => h !== habit);
      saveTask();
      displayStatus();
    });

    
    if (habit.completed) {
      displays.completedList.appendChild(div);
    } else {
      ul.appendChild(div);
    }

    // ✅ clone for "all tasks" list (ul2)
    const cloneDiv = div.cloneNode(true);
    ul2.appendChild(cloneDiv);
  });

  localStorage.setItem('habits', JSON.stringify(habits));
}



 function saveTask(){
  let name = inputs.title.value.trim();
  let date = inputs.date.value.trim();
  let time = inputs.time.value.trim();
  if(name === ''|| date === ''|| time === ''){
    inputs.title.style.border = '1px solid red';
    inputs.date.style.border = '1px solid red';
    inputs.time.style.border = '1px solid red';
    setTimeout(()=>{
      inputs.title.style.border = 'none';
      inputs.date.style.border = 'none';
      inputs.time.style.border = 'none';
    }, 1000)
  }
  if(name && date && time){
    const exists = habits.some(h => h.name === name && h.date === date && h.time === time);
        if(!exists) {
            habits.push({
                name: name,
                date: date,
                time: time,
                completed: false
            });
    localStorage.setItem('habits', JSON.stringify(habits));
        displays.allTasks.style.display = 'none';
        displays.first.style.display = 'flex';
        displays.chart.style.display = 'none';
        displays.profile.style.display = 'none';
        displays.addTask.style.display = 'none';
  }
  let today = new Date().toISOString().split("T")[0]; // YYYY-MM-DD
  let todayTasks = habits.filter(h => h.date === today);
  progress.todayNumber.innerText = todayTasks.length;
  createTask();
  displayStatus();
  inputs.title.value = '';
  inputs.date.value = '';
  inputs.time.value = '';
 }
 }
 function displayStatus(){
    let currentDoneTasks = habits.filter(habit => habit.completed).length;
    if(currentDoneTasks === 0){
      progress.percent.innerHTML = "0%";
      progress.text.innerHTML = "No tasks for today.";
      return;
    }
    let totalTasks = habits.length;
    let progressPercent = (currentDoneTasks/totalTasks * 100).toFixed(0)
    progress.percent.innerHTML = `${progressPercent}%`;

  switch (true) {
    case (progressPercent >= 0 && progressPercent < 15):
      progress.text.innerHTML = "You are just starting today!";
      break;
    case (progressPercent >= 15 && progressPercent < 30):
      progress.text.innerHTML = "Making some progress!";
      break;
    case (progressPercent >= 30 && progressPercent < 45):
      progress.text.innerHTML = "Getting there!";
      break;
    case (progressPercent >= 45 && progressPercent < 60):
      progress.text.innerHTML = "Almost halfway done!";
      break;
    case (progressPercent >= 60 && progressPercent < 75):
      progress.text.innerHTML = "More than halfway!";
      break;
    case (progressPercent >= 75 && progressPercent < 90):
      progress.text.innerHTML = "Almost done!";
      break;
    case (progressPercent >= 90 && progressPercent <= 100):
      progress.text.innerHTML = "Great job! You finished most of your tasks!";
      break;
    default:
      progress.text.innerHTML = "No tasks for today.";
  }
  
 }

createTask();
displayStatus();