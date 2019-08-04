var daysOfCurrentMonth = [];
var now = new Date();
var currentDay = now.getDate();
var currentMonth = now.getMonth();
var daysOfWeek = ['Воскресенье', 'Понедельник', 'Вторник', 'Среда', 'Четверг', 'Пятница', 'Суббота'];
var monthsOfYear = ['января', 'февраля', 'марта', 'апреля', 'мая', 'июня', 'июля', 'августа', 'сентября', 'октября', 'ноября', 'декабря'];
var cards = document.querySelector('.cards');
var sunnyImg = 'https://sun9-8.userapi.com/c851036/v851036409/17ae9d/Tvbg_8W56Qw.jpg';
var cloudyImg = 'https://img.pngio.com/cloudy-day-png-1-png-image-cloudy-day-png-256_256.png';

for (var i = 0; i < days.length; i++) {
    var day = days[i];
    var date = new Date(day.date);
    var month = date.getMonth();

    if (month === currentMonth) {
        daysOfCurrentMonth.push(day);
    }
}

if (daysOfCurrentMonth.length < currentDay) {
    alert('Нет данных для отображения!');

} else {
    var offset = now.getDate() - 1;

    var leftArrow = document.querySelector('.left.arrow');
    leftArrow.addEventListener('click', function () {
        offset--;
        makeCards(daysOfCurrentMonth, offset);
    });

    var rightArrow = document.querySelector('.right.arrow');
    rightArrow.addEventListener('click', function () {
        offset++;
        makeCards(daysOfCurrentMonth, offset);
    });

    makeCards(daysOfCurrentMonth, offset);

    function updateArrows() {
        if (offset === 0) {
            leftArrow.style.display = 'none';
        } else {
            leftArrow.style.display = 'block';
        }

        if (offset === daysOfCurrentMonth.length - 3) {
            rightArrow.style.display = 'none';
        } else {
            rightArrow.style.display = 'block';
        }
    }

    function makeCards(days, offset) {
        cards.innerHTML = '';

        var cardDays = days.slice(offset, offset + 3);

        for (var i = 0; i < cardDays.length; i++) {
            var card = document.createElement('div');
            card.className = 'card';

            var day = cardDays[i];
            var date = new Date(day.date);
            var dayOfWeek = daysOfWeek[date.getDay()];
            var dayOfMonth = date.getDate();
            var month = monthsOfYear[date.getMonth()];

            var isSnow = day.snow;
            var isRainy = day.rain;
            var infoStr;

            if (isSnow) {
                infoStr = 'снег';
            } else if (isRainy) {
                infoStr = 'дождь';
            } else {
                infoStr = 'без осадков';
            }

            var img;

            if (day.cloudiness === 'Облачно') {
                img = cloudyImg;
            } else {
                img = sunnyImg;
            }

            card.innerHTML = `
                <div class="card__dayname">
                    ${dayOfWeek}
                </div>
                <div class="card__date">
                    ${dayOfMonth}, ${month}
                </div>
                <div class="card__photo">
                    <img src="${img}">
                </div>
                <div class="card__daytemperature">
                    днем ${day.temperature.day}C
                </div>
                <div class="card__nighttemperatue">
                    ${day.temperature.night}C
                </div>
                <div class="card__shortinfo">
                    ${day.cloudiness}, <br> ${infoStr}
                </div>
        `;

            cards.appendChild(card);
        }

        updateArrows();
    }
}