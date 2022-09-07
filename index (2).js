const tasks = [
    {
        id: '1138465078061',
        completed: false,
        text: 'Посмотреть новый урок по JavaScript',
    },
    {
        id: '1138465078062',
        completed: false,
        text: 'Выполнить тест после урока',
    },
    {
        id: '1138465078063',
        completed: false,
        text: 'Выполнить ДЗ после урока',
    },
]

const createTaskItem = (taskId, taskText) => {
    const taskItem = document.createElement('div');
    taskItem.className = 'task-item';
    taskItem.dataset.taskId = taskId;

    const taskItemMainContainer = document.createElement('div');
    taskItemMainContainer.className = 'task-item__main-container';

    const taskItemMainContent = document.createElement('div');
    taskItemMainContent.className = 'task-item__main-content';

    taskItem.append(taskItemMainContainer);
    taskItemMainContainer.append(taskItemMainContent);

    const checkboxForm = document.createElement('form');
    checkboxForm.className = 'checkbox-form';

    const inputCheckbox = document.createElement('input');
    inputCheckbox.type = 'checkbox';
    inputCheckbox.className = 'checkbox-form__checkbox';
    const inputId = `task-${taskId}`;
    inputCheckbox.id = inputId;

    const labelCheckbox = document.createElement('label');
    labelCheckbox.htmlFor = inputId;

    const taskItemText = document.createElement('span');
    taskItemText.className = 'task-item__text';
    taskItemText.innerText = taskText;

    const deleteButton = document.createElement('button');
    deleteButton.className = 'task-item__delete-button default-button delete-button';
    deleteButton.innerText = 'Удалить';

    taskItemMainContent.append(checkboxForm, taskItemText);
    checkboxForm.append(inputCheckbox, labelCheckbox);
    taskItemMainContainer.append(deleteButton);

    return taskItem;
}

const tasksListContainer = document.querySelector('.tasks-list');
tasks.forEach((task) => {
    const taskItem = createTaskItem(task.id, task.text);
    tasksListContainer.append(taskItem);
});


const isTaskExist = (text) => {
    var myBullean = false;
tasks.forEach((task) => {
    if (task.text === text) {
        
        myBullean = true;
    
    }})
  return myBullean;

}

const form = document.querySelector(".create-task-block")

const errorText = document.createElement('span');
errorText.className = 'error-message-block';
const myButton = document.querySelector('.create-task-block')
myButton.append(errorText)

form.addEventListener('submit', (event) => {
event.preventDefault();

const newText = event.target.taskName.value;
const existOrNot = isTaskExist(newText);



if (newText && (!existOrNot)){
    const newTasktoList = createTaskItem(Date.now() , newText);
    const newTask = {
        id: Date.now().toString(),
        text: newText,
      }
tasks.push(newTask);
tasksListContainer.append(newTasktoList);
errorText.innerText = ''
}
else if (newText === '') {
    errorText.innerText = ''
    errorText.innerText = 'Название задачи не должно быть пустым';
    
}

else if (existOrNot) {
    errorText.innerText = ''
    errorText.innerText ='Задача с таким названием уже существует.'
}
console.log(tasks);

event.target.taskName.value = ''
})

//создаем модальное окно
const myBody = document.querySelector('body')

const modal = document.createElement('div');
modal.className = 'modal-overlay_hidden';
modal.classList.add('modal-overlay')
myBody.prepend(modal)

const son1 =document.createElement('div');
son1.className = 'delete-modal';
modal.prepend(son1);

const son2 = document.createElement('h3');
son2.className = 'delete-modal__question';
son2.innerText = 'Вы действительно хотите удалить эту задачу?'
son1.prepend(son2);

const son22  = document.createElement('div');
son22.classList.add ('delete-modal__buttons');
son1.append(son22);

const son31 = document.createElement('button');
son31.classList.add('delete-modal__button')
son31.classList.add('delete-modal__cancel-button')
son31.innerText = ('Отмена')
son22.append(son31)

const son32 = document.createElement('button');
son32.classList.add('delete-modal__button')
son32.classList.add('delete-modal__confirm-button')
son32.innerText = ('Удалить')
son22.append(son32)


const TList = document.querySelector('.tasks-list')

let taskToDelete = null;

TList.addEventListener('click', (event) => {

    if (event.target.classList.contains('delete-button')){
        modal.classList.remove('modal-overlay_hidden')

        console.log(event.target);
}

    let closestBut = event.target.closest('.task-item__delete-button');
    if (closestBut) { 
        let closestItem = closestBut.closest('.task-item')
        if (closestItem) { 
           
    taskToDelete = closestItem;}}
}

)

var myModal = document.querySelector('.modal-overlay')
myModal.addEventListener('click', (event)=> {
    if (event.target.classList.contains('delete-modal__cancel-button')){
        myModal.classList.add('modal-overlay_hidden')
    }

if (event.target.classList.contains('delete-modal__confirm-button')){
    myModal.classList.add('modal-overlay_hidden');

    // вычленяем айди задачи
    let taskId = String(taskToDelete.dataset.taskId);
    

    // удаляем задачу из списка объектов tasks (нужен индекс)

    let delIndex = tasks.findIndex((el) => {return el.id === taskId})
    
    if (delIndex>=0){
    tasks.splice(delIndex, 1)
    console.log(tasks)
}

    //удаляем задачу с самой формы

    let tagDelete = document.querySelector(`[data-task-id="${taskId}"]`);
    tagDelete.remove();

    }

})

let isDark = false;

const changeTheme = ({
    bodyBackground,
    taskItemTextColor,
    buttonBorder,
}) => {
    document.body.style.background = bodyBackground;
    document.querySelectorAll('.task-item').forEach((taskItem) => {
        taskItem.style.color = taskItemTextColor;
    });
    document.querySelectorAll('button').forEach((button) => {
        button.style.border = buttonBorder;
    });
}

window.addEventListener('keydown', (event) => {
    const { code } = event;
    if (code === 'Tab') {
        event.preventDefault();
        isDark = !isDark;
        if (isDark) {
            changeTheme({
                bodyBackground: '#24292E',
                taskItemTextColor: '#ffffff',
                buttonBorder: '1px solid #ffffff',
            });
        } else {
            changeTheme({
                bodyBackground: 'initial',
                taskItemTextColor: 'initial',
                buttonBorder: 'none',
            });
        }
    }
}
)


const newButton = document.createElement('button')
newButton.innerText = 'Сменить тему';
newButton.className = 'my-button';
myBody.prepend(newButton)

newButton.addEventListener('click', (event) => {
   console.log('клик сработал');
   event.preventDefault();
   isDark = !isDark;
    if (isDark) {
    changeTheme({
        bodyBackground: '#24292E',
        taskItemTextColor: '#ffffff',
        buttonBorder: '1px solid #ffffff',
    });
} else {
    changeTheme({
        bodyBackground: 'initial',
        taskItemTextColor: 'initial',
        buttonBorder: 'none',
    });
}})