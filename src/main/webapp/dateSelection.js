//Create list of months
moment.locale('en'); // sets words language (optional if current locale is to be used)
const arrayOfMonths = moment.months();

const monthList = document.getElementById('selectMonth');

arrayOfMonths.forEach(function (item, index) {
    const option = document.createElement('option');
    option.appendChild(document.createTextNode(item));
    option.value = (index + 1).toString();
    monthList.appendChild(option);
});


//Create list of years from 2010 until now
const yearList = document.getElementById('selectYear');
first = new Date(2010, 1, 1).getFullYear();
dateNow = new Date();
second = dateNow.getFullYear();

arrayOfYears = Array();

for (let i = first; i <= second; i++) arrayOfYears.push(i);

arrayOfYears.forEach(function (item, index) {
    const option = document.createElement('option');
    option.appendChild(document.createTextNode(item));
    option.value = (index + 1).toString();
    yearList.appendChild(option);
});

const selectionOfYears = document.getElementById('selectYear');
const selectionOfMonths = document.getElementById('selectMonth');
const selectionOfDays = document.getElementById('selectDay');


//Create list of days in month
const dayList = document.getElementById('selectDay');

function daysInMonth() {


    var selectedYear = selectionOfYears.options[selectionOfYears.selectedIndex];
    var selectedMonth = selectionOfMonths.options[selectionOfMonths.selectedIndex];

    const timeZero = new Date(selectedYear.text, selectedMonth.value, 0);

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


    //Take note of the date that is selected and choose monday from that week
    var selectedDay = selectionOfDays.options[selectionOfDays.selectedIndex];

    console.log(selectedDay, selectedMonth, selectedYear);

}

daysInMonth();


$('#selectMonth').on('change', function () {
        daysInMonth()
    alert('msg')
    }
);
