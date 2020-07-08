console.log('Client side javascript file loaded!');

const weatherForm = document.querySelector('form');
const searchInput = document.querySelector('input');
const displayMessage_1 = document.querySelector('#message-1');
const displayMessage_2 = document.querySelector('#message-2');

weatherForm.addEventListener('submit', (e) => {
    //we are calling this method to avoid browser refresh
    //as part of form submit event. e -> event
    e.preventDefault();
    displayMessage_1.textContent = '';
    displayMessage_2.textContent = '';
    const location = searchInput.value;
    if (location == null || location == undefined || location.trim() === '') {
        console.log('Location is Empty!!');
        displayMessage_1.textContent = 'Location is Empty';
    } else {
        console.log('Location: ' + location);
        const url = '/weather?address=' + location;
        fetch(url).then((response) => {
            response.json().then((data) => {
            if (data.errorMessage) {
                console.log('Error: ' + data.errorMessage);
                displayMessage_1.textContent = data.errorMessage;
            } else {
                console.log('Weather Forecast: ' + data.weather);
                console.log('Location: ' + data.location);
                displayMessage_1.textContent = 'Location : ' + data.location;
                displayMessage_2.textContent = 'Forecast : ' + data.weather;



            }
    })
});
    }
    
});