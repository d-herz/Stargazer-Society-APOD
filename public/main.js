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
      // console.log(data)

      let dateOg = data.date.split('-') //original date format split into an array
      let newDate = [dateOg[1], dateOg[2], dateOg[0]] //reformatting dateOg into US convention
      newDate = newDate.join('/')

      let tryDate = new Date(dateOg[0], dateOg[1]-1, dateOg[2]) //eventually may try to parse weekday for display
      let dateInfo = tryDate.toLocaleDateString('en-US', {
        month: 'long',
        weekday: 'long',
      })
      
      if( data.media_type === "image"){
        if( document.querySelector('#apodImg').classList.contains('hiddenElement')){
          document.querySelector('#apodImg').classList.toggle('hiddenElement')
        }
        document.querySelector('iframe').classList.add('hiddenElement')
        document.querySelector('#apodImg').src = data.hdurl
        document.querySelector('#apodLink').href = data.url

      }else if(data.media_type === 'video'){
        if( document.querySelector('iframe').classList.contains('hiddenElement')){
          document.querySelector('iframe').classList.toggle('hiddenElement')
        }

        document.querySelector('#apodImg').classList.add('hiddenElement')
        document.querySelector('iframe').src = data.url
      }
      
      document.querySelector('#apodDate').innerText = `${newDate}`
      document.querySelector('#apodName').innerText = `"${data.title}"`
      document.querySelector('#apodDescription').innerText = data.explanation
    })
}


//function for fetching historical APOD's
function getDate(){

  let date = document.querySelector('input').value //for inserting input value into fetch request string
  date = "date=" + date

  fetch(`https://api.nasa.gov/planetary/apod?${date}&api_key=aYmOC1DdrReJnOfgEjvWUgf8Du8wXR1VATNKFiRj`)
    .then( res => res.json() )
    .then( data => {
      // console.log(data)

      let dateOg = data.date.split('-') //original date format split into an array
      let newDate = [dateOg[1], dateOg[2], dateOg[0]] //reformatting dateOg into US convention
      newDate = newDate.join('/')
      
      if( !data.media_type ){ 
        //if no media type, then given date is out of range, alert and load today's picture
        alert(data.msg)
        picOfDay()

      }else if( data.media_type === "image" ){
        
        if( document.querySelector('#apodImg').classList.contains('hiddenElement')){
          document.querySelector('#apodImg').classList.toggle('hiddenElement')
        }

        document.querySelector('#apodImg').src = data.hdurl
        document.querySelector('#apodLink').href = data.url
        document.querySelector('iframe').classList.add('hiddenElement')
        console.log(data.url)

      }else if(data.media_type === 'video'){

        if( document.querySelector('iframe').classList.contains('hiddenElement')){
          document.querySelector('iframe').classList.toggle('hiddenElement')
        }
        document.querySelector('iframe').src = data.url
        document.querySelector('#apodImg').classList.add('hiddenElement')

      }
      document.querySelector('#apodDate').innerText = `${newDate}`
      document.querySelector('#apodName').innerText = `"${data.title}"`
      document.querySelector('#apodDescription').innerText = data.explanation
    })
}

picOfDay()