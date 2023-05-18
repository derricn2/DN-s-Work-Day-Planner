const localeSettings = {};
dayjs.locale(localeSettings);


$(function () {

  // current hour using Day.js library
  const currentHour = dayjs().format('H');

  // changes the color of each time block according to the appropriate time of day relative to current hour
  function hourlyColor() {
    $('.time-block').each(function() {
      const blockHour = parseInt(this.id);
      $(this).toggleClass('past', blockHour < currentHour);
      $(this).toggleClass('present', blockHour == currentHour);
      $(this).toggleClass('future', blockHour > currentHour);
    });
  }

  hourlyColor();

  // saves user input into localStorage
  function textEntry() {
    $('.saveBtn').on('click', function() {
      const key = $(this).parent().attr('id');
      const value = $(this).siblings('.description').val();
      localStorage.setItem(key, value);
    });
  }

  textEntry();

  // allows for texts to remain after user inputs data and refreshes page
  $('.time-block').each(function() {
    const key = $(this).attr('id');
    const value = localStorage.getItem(key);
    $(this).children('.description').val(value);
  });

  // displays current date and time
  function updateTime() {
    const dateElement = $('#date');
    const timeElement = $('#time');
    const currentDate = dayjs().format('ddd, MMMM D, YYYY');
    const currentTime = dayjs().format('hh:mm:ss A');
    dateElement.text(currentDate);
    timeElement.text(currentTime);
  }

  setInterval(updateTime, 1000);
});
