
moment.locale('pl');
createMonthsList();
createYearsList();
const selectionOfYears = document.getElementById('selectYear');
const selectionOfMonths = document.getElementById('selectMonth');
const dayList = document.getElementById('selectDay');

let lastSelectedDay = 0;
daysInMonth();
setCurrentDate();
fillCardsContent();

/*const API_URL =  'http://to-do-list.eu-central-1.elasticbeanstalk.com/api';*/
const API_URL = 'http://localhost:8080/api';
const TODO_API_URL = `${API_URL}/todos`;


$('#selectDay, #selectMonth, #selectYear').on('change', fillCardsContent);

//Add new todo
(function () {

    $.each($('.card'), function () {
        const dayOfWeek = this.id;

        const addTodoButton = document.getElementById('addTodo-'.concat(dayOfWeek));
        const todoText = document.getElementById('todoText-'.concat(dayOfWeek));
        const dateOfDayString = $(this).children().children('.card-subtitle').html().toString();
        const dateOfDay = new Date(dateOfDayString);
        let dateString = formatDate(dateOfDay);

        addTodoButton.addEventListener('click', (event) => {
            event.preventDefault();
            fetch(TODO_API_URL, {
                method: 'POST',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },

                body: JSON.stringify({text: todoText.value, date: dateString})
            })
                .then(processOkResponse)
                .then(createNewTodo)
                .then(() => todoText.value = '')
                .catch(console.warn);
        });


    })
})();

//Create list of month names
function createMonthsList(){
    const arrayOfMonths = moment.months();
    const monthList = document.getElementById('selectMonth');

    arrayOfMonths.forEach(function (item, index) {
        const option = document.createElement('option');
        option.appendChild(document.createTextNode(item));
        option.value = (index).toString();
        monthList.appendChild(option);
    })
}

//Create list of years from 2010 until now
function createYearsList() {
    const yearList = document.getElementById('selectYear');
    const first = new Date(2010, 1, 1).getFullYear();
    const dateNow = new Date();
    const last = dateNow.getFullYear();

    const arrayOfYears = Array();

    for (let i = first; i <= last; i++) arrayOfYears.push(i);

    arrayOfYears.forEach(function (item, index) {
        const option = document.createElement('option');
        option.appendChild(document.createTextNode(item));
        option.value = (index + 1).toString();
        yearList.appendChild(option);
    })

}




//Create list of days in month
function daysInMonth() {

    const selectedYear = selectionOfYears.options[selectionOfYears.selectedIndex];
    const selectedMonth = selectionOfMonths.options[selectionOfMonths.selectedIndex];

    const timeZero = new Date(selectedYear.text, parseInt(selectedMonth.value) + 1, 0);
    const arrayOfDays = Array();

    for (let i = 1; i <= timeZero.getDate(); i++) arrayOfDays.push(i);

    //Delete all days from the previous month selected
    dayList.querySelectorAll('*').forEach(n => n.remove());


    arrayOfDays.forEach(function (item, index) {
        const option = document.createElement('option');
        option.appendChild(document.createTextNode(item));
        option.value = (index + 1).toString();
        dayList.appendChild(option);
    });

    dayList.selectedIndex = lastSelectedDay;

    if (dayList.selectedIndex == -1) {
        dayList.selectedIndex = dayList.childElementCount - 1;
    }

}



function setCurrentDate() {
    let currentDate = new Date();
    dayList.selectedIndex = currentDate.getDate()-1;
    selectionOfMonths.selectedIndex = currentDate.getMonth();
    selectionOfYears.selectedIndex = selectionOfYears.childElementCount - 1;
}





function fillCardsContent() {

    lastSelectedDay = dayList.selectedIndex;

    daysInMonth();


    document.querySelectorAll('[id^="allTodos-"]').forEach(s => $(s).empty());

    //Take note of the date that is selected and choose monday from that week
    var selectedDay = dayList.options[dayList.selectedIndex];
    var selectedYear = selectionOfYears.options[selectionOfYears.selectedIndex];
    var selectedMonth = selectionOfMonths.options[selectionOfMonths.selectedIndex];

    const chosenDay = parseInt(selectedDay.text);
    const chosenDate = new Date(selectedYear.text, selectedMonth.value, chosenDay);


    var clonedChosenDay = new Date(chosenDate.getTime());

    function addDays(date, days) {
        const copy = new Date(Number(date));
        copy.setDate(date.getDate() + days);
        return copy
    }

    let add;
    if (clonedChosenDay.getDay() == 0) {
        add = -6;
    } else {
        add = (-1) * (clonedChosenDay.getDay() - 1);
    }

    const firstDayOfWeek = addDays(clonedChosenDay, add);
    const lastDayOfWeek = addDays(new Date(firstDayOfWeek.getTime()), 6);


    $.each($('.card-subtitle'), function () {
        const arrayOfMonths = moment.months();
        let idString = this.id;
        let count = parseInt(idString.charAt(idString.length - 1)) - 1;
        let thisDate = addDays(firstDayOfWeek, count);
        this.innerHTML = (thisDate.getDate().toString()).concat(' ', arrayOfMonths[thisDate.getMonth()],
            ' ', thisDate.getFullYear().toString());
        const parentCard = this.parentElement.parentElement;
        if (thisDate.getTime() === chosenDate.getTime()) {
            parentCard.classList.add('current');
        } else {
            parentCard.classList.remove('current');
        }

    });

    const firstDayOfWeekMiliseconds = +firstDayOfWeek;

    /*const API_URL =  'http://to-do-list.eu-central-1.elasticbeanstalk.com/api';*/
    const API_URL = 'http://localhost:8080/api';
    const TODO_API_URL = `${API_URL}/todos`;

    fetch(`${TODO_API_URL}/${firstDayOfWeekMiliseconds}`)
        .then(processOkResponse)
        .then(todos => todos.forEach(createNewTodo));


}


function createNewTodo(todo) {
    const divForm = document.createElement('div');
    divForm.classList.add('form-check');
    divForm.classList.add('m-1');

    const label = document.createElement('label');
    label.classList.add('form-check-label');

    const checkbox = document.createElement('input');
    checkbox.classList.add('form-check-input');

    checkbox.type = 'checkbox';
    checkbox.checked = todo.done;
    if (checkbox.checked) {
        label.classList.add('done');
    }
    checkbox.addEventListener('click',
        (event) => {
            event.preventDefault();
            fetch(`${TODO_API_URL}/${todo.id}`, {method: 'PUT'})
                .then(processOkResponse)
                .then(updatedTodo => checkbox.checked = !!updatedTodo.done)
                .catch(console.warn);
            label.classList.toggle('done');
        });

    divForm.appendChild(checkbox);
    divForm.appendChild(label);
    label.appendChild(document.createTextNode(` ${todo.text}`));
    const dayOfTodo = new Date(todo.date).getDay();

    const arrayOfWeekDays = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    const nameOfDay = (arrayOfWeekDays[dayOfTodo]).toLowerCase();
    console.log(nameOfDay);
    document.getElementById('allTodos-'.concat(nameOfDay)).appendChild(divForm);

}



function processOkResponse(response = {}) {
    if (response.ok) {
        return response.json();
    }
    throw new Error(`Status not 200 (${response.status})`);
}


function formatDate(dateToFormat) {
    var dd = dateToFormat.getDate();
    var mm = dateToFormat.getMonth() + 1;
    var yyyy = dateToFormat.getFullYear();
    if (dd < 10) {
        dd = '0' + dd;
    }

    if (mm < 10) {
        mm = '0' + mm;
    }
    return (yyyy + '-' + mm + '-' + dd);
}

