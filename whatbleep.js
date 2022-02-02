function callbleep() {
  var bleep = document.getElementById('bleepinput')

  var num = bleep.value

  // alert(bleep)
  if (num.length === 5) {
    const bleepnum = "teleprompt://011734" + num
    window.location = (bleepnum)
  } else {
    bleep.value = ""
    bleep.focus()
  }

}

function findbleep() {


  fetch("whatbleep.json").then(response => {
    return response.json();
  }).then(jsondata => {
    displayBleeps(jsondata)
  })
    .catch(err => { console.log('Error: ' + err) });

}

function displayBleeps(data) {
  var bleep = document.getElementById('bleepinput').value
  var topList = document.getElementById('bleeplist')
  var found = false


  if (bleep.length != 5) {
    topList.innerHTML = ""
  }

  // var i = 0
  // while (i < data.length) {
  for (i = 0; i < data.length; i++) {

    if (data[i].Number === bleep) {
      var myitem = document.createElement('h3')
      myitem.innerHTML = data[i].Location
      topList.appendChild(myitem)
      console.log(i);
      break
    }
    topList.innerHTML = ""

  }
}