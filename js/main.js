//The user will enter a date. Use that date to get the NASA picture of the day from that date! https://api.nasa.gov/

//Leon Class 27 about 1:20 minutes or so

document.querySelector('button').addEventListener('click', getDate)

function getDate () {

  let date = document.querySelector('input').value
  date = "date=" + date
//notice the ? in the URL with query params after (date, API key, etc. )
  fetch(`https://api.nasa.gov/planetary/apod?${date}&api_key=aYmOC1DdrReJnOfgEjvWUgf8Du8wXR1VATNKFiRj`)
    .then( res => res.json() )
    .then( data => {
      console.log(data)
      
      if( data.media_type === "image"){
        document.querySelector('img').src = data.hdurl
      }else if(data.media_type === 'video'){
        document.querySelector('iframe').src = data.url
      }
      
      document.querySelector('span').innerText = data.copyright
      document.querySelector('p').innerText = data.explanation
    })

}

