// https://api.nasa.gov/


//Set Date Field to Autopopulate with today's date
document.getElementById('dateField').valueAsDate = new Date();
//Event listener for calling getDate fn and retreiving APOD
document.querySelector('#mediaBtn').addEventListener('click', getDate)

//Set Pic of Day as today's pic on page load
function picOfDay(){
  fetch(`https://api.nasa.gov/planetary/apod?api_key=aYmOC1DdrReJnOfgEjvWUgf8Du8wXR1VATNKFiRj`)
    .then( res => res.json() )
    .then( data => {
      console.log(data)
      
      if( data.media_type === "image"){
        if( document.querySelector('#apodImg').classList.contains('hidden')){
          document.querySelector('#apodImg').classList.toggle('hidden')
        }
        document.querySelector('#apodImg').src = data.hdurl
        document.querySelector('#apodLink').href = data.url
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


//function for fetching historical APOD's
function getDate(){

  let date = document.querySelector('input').value
  date = "date=" + date

  fetch(`https://api.nasa.gov/planetary/apod?${date}&api_key=aYmOC1DdrReJnOfgEjvWUgf8Du8wXR1VATNKFiRj`)
    .then( res => res.json() )
    .then( data => {
      console.log(data)
      
      if( data.media_type === "image"){
        if( document.querySelector('#apodImg').classList.contains('hidden')){
          document.querySelector('#apodImg').classList.toggle('hidden')
        }

        document.querySelector('#apodImg').src = data.hdurl
        document.querySelector('#apodLink').href = data.url
        console.log(data.url)
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