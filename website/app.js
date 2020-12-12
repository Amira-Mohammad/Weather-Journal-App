/* Global Variables */

// Create a new date instance dynamically with JS
let d = new Date();
let newDate = d.getMonth() + '.' + d.getDate() + '.' + d.getFullYear();


const baseUrl = 'http://api.openweathermap.org/data/2.5/forecast?zip=';
const apiKey = '&appid=d514d52dd8af83d35eec2c62c17d1e6a&units=imperial';
const apiUrl = "http://localhost:8000/";
const zipCode = document.getElementById('zip');
const feelings = document.getElementById('feelings');
const temp = document.getElementById('temp');
const content = document.getElementById('content');
const date = document.getElementById('date');
const catchError = (error) => console.error('Some ErrorHas Been => ', error);

document.getElementById('generate').addEventListener('click', performGenerateAction);


function performGenerateAction() {
    let data = {
        zipCode: zipCode.value,
        content: feelings.value,
        date: d
    };

      //Post Data To Api For Get Zip Code Information
      getZipCodeInformation(data.zipCode).then(zipInfo => {
        //Return And Show Alert If City Is Not Found
        if (zipInfo.cod != 200)
            return alert(zipInfo.message)

        //Now Post Data To Server For Saving And Display In Holder Section
        data.temp = zipInfo.list[0].main.temp;
        postDateToServer(data);
    }).catch(catchError);
}


async function getZipCodeInformation(zipCode) {
    return await (await fetch(`${baseUrl}${zipCode}${apiKey}`)).json()
}

async function postDateToServer(data) {
    let response = await fetch(`${apiUrl}postData`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
    });
    try {
        if (!response.ok) {
            alert('Process Not Successfuly');
            return;
        }
       
        response.json().then(data => {
            if (response.ok)
                updateUI();//Update UI Now
            else
                alert('Process Not Successfuly');
        }).catch(catchError);

    } catch (error) {
        catchError(error);
    }
}

async function updateUI() {
    let response = await fetch(`${apiUrl}getAll`);
    try {
        response.json().then(data => {
            date.innerHTML = `Date Is: ${data.date}`;
            temp.innerHTML = `Temp Is: ${data.temp}`;
            content.innerHTML = `My Feelings Is: ${data.content}`;
        }).catch(catchError);
    } catch (error) {
        catchError(error);
    }
}