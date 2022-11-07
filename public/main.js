//The user will enter a date. Use that date to get the NASA picture of the day from that date! https://api.nasa.gov/

//Leon Class 27 about 1:20 minutes or so

document.getElementById('dateField').valueAsDate = new Date();

document.querySelector('#mediaBtn').addEventListener('click', getDate)

// https://api.nasa.gov/planetary/apod?api_key=aYmOC1DdrReJnOfgEjvWUgf8Du8wXR1VATNKFiRj

function picOfDay(){
  fetch(`https://api.nasa.gov/planetary/apod?api_key=aYmOC1DdrReJnOfgEjvWUgf8Du8wXR1VATNKFiRj`)
    .then( res => res.json() )
    .then( data => {
      console.log(data)
      
      if( data.media_type === "image"){
        document.querySelector('img').src = data.hdurl
      }else if(data.media_type === 'video'){
        document.querySelector('iframe').src = data.url
      }
      
      document.querySelector('#apodName').innerText = `"${data.title}"`
      document.querySelector('#apodDescription').innerText = data.explanation
    })

}


function getDate () {

  let date = document.querySelector('input').value
  date = "date=" + date
  //notice the ? in the URL with query params after (date, API key, etc. )
  fetch(`https://api.nasa.gov/planetary/apod?${date}&api_key=aYmOC1DdrReJnOfgEjvWUgf8Du8wXR1VATNKFiRj`)
    .then( res => res.json() )
    .then( data => {
      console.log(data)
      
      if( data.media_type === "image"){
        if( document.querySelector('#apodImg').classList.contains('hidden')){
          document.querySelector('#apodImg').classList.toggle('hidden')
        }

        document.querySelector('#apodImg').src = data.hdurl
        document.querySelector('iframe').classList.add('hidden')

      }else if(data.media_type === 'video'){

        if( document.querySelector('iframe').classList.contains('hidden')){
          document.querySelector('iframe').classList.toggle('hidden')
        }

        document.querySelector('iframe').src = data.url
        document.querySelector('#apodImg').classList.add('hidden')
      }
      
      document.querySelector('#apodName').innerText = `"${data.title}"`
      document.querySelector('#apodDescription').innerText = data.explanation
    })

}



picOfDay()