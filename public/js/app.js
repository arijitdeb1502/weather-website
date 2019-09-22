

const weatherForm=document.querySelector('form');
const search =document.querySelector('input');
const message1 = document.querySelector('#message1');
const message2 = document.querySelector('#message2');
const message3 = document.querySelector('#message3');
const message4 = document.querySelector('#message4');

weatherForm.addEventListener('submit',(e)=>{

    e.preventDefault();
    message1.textContent='';
    message2.textContent='';
    message3.textContent='';
    message4.textContent='';
    const location=search.value;
    fetch(`http://localhost:3000/weather?address=${location}`).then((response)=>{
    response.json().then((data)=>{
        if(data.error){
            message1.textContent=data.error;
        }else{
            message1.textContent=data.location;
            message2.textContent=data.temperature;
            message3.textContent=data.precipProbability;
            message4.textContent=data.summary;
        }
    })
})
})