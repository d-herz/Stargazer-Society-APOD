// https://api.nasa.gov/


//Set Date Field to Autopopulate with today's date
document.getElementById('dateField').valueAsDate = new Date();
//Event listener for calling getDate fn and retreiving APOD
document.querySelector('#mediaBtn').addEventListener('click', getDate)

//Function to be called on first page load, display today's media
function picOfDay(){
  fetch(`https://api.nasa.gov/planetary/apod?api_key=aYmOC1DdrReJnOfgEjvWUgf8Du8wXR1VATNKFiRj`)
    .then( res => res.json() )
    .then( data => {
      console.log(data)

      let dateOg = data.date.split('-') //original date format split into an array
      console.log(dateOg)

      let newDate = [dateOg[1], dateOg[2], dateOg[0]] //reformatting dateOg into US convention
      newDate = newDate.join('/')
      console.log( newDate)

      let tryDate = new Date(dateOg[0], dateOg[1]-1, dateOg[2]) //eventually may try to parse weekday for display
      let dateInfo = tryDate.toLocaleDateString('en-US', {
        month: 'long',
        weekday: 'long',
      })

      console.log(tryDate)
      
      
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
      
      document.querySelector('#apodDate').innerText = `${newDate}`
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
      console.log(date)
      
      if( !data.media_type ){ 
        //if no media type, then given date is out of range, alert and load today's picture
        alert(data.msg)
        picOfDay()

      }else if( data.media_type === "image" ){
        
        if( document.querySelector('#apodImg').classList.contains('hidden')){
          document.querySelector('#apodImg').classList.toggle('hidden')
        }

        document.querySelector('#apodImg').src = data.hdurl
        document.querySelector('#apodLink').href = data.url
        document.querySelector('iframe').classList.add('hidden')
        console.log(data.url)

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