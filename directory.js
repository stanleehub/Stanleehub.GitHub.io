function loadDirs() {
  var alldirs = ["theatre", "external"]

  alldirs.forEach(function (item, index, array) {


    var fname = item + '.json'

    console.log(fname)
    fetch(fname).then(response => {
      return response.json();
    }).then(jsondata => {
      var element_id = item

      console.log(item);
      loadDirectory(jsondata, element_id)
    })
      .catch(err => { console.log('Error: ' + err) });

  })


}


function loadDirectory(data, elid) {
  var i = 0;

  data.sort(getorderAZ("Location"))

  function getorderAZ(prop) {
    return function (a, b) {
      if (a[prop] > b[prop]) {
        return 1
      } else if (a[prop] < b[prop]) {
        return -1
      }
      return 0
    }
  }


  var div = document.getElementById(elid)


  for (i = 0; i < data.length; i++) {

    dir = document.createElement('div')
    dir.id = elid   //"

    var dirContent = data[i].Location + data[i].Number

    dir.className = "directory col-12 col-md-3 col-xl-3"
    dir.innerHTML = '<div class="directoryCard">' +
      '<div class="title text-wrap searchme">' + data[i].Location + '</div>' +
      '<div class="details" style="padding-left: 10px">' + data[i].Number + '</div>' +
      '</div>'


    div.appendChild(dir)


    linka = document.createElement('a')
    linka.className = "callbutton fas fa-phone-square"
    linka.innerHTML = ""
    linka.href = 'telprompt://' + data[i].Number
    linka.id = data[i].Number

    // document.getElementById("dir").appendChild(node)
    dir.lastChild.appendChild(linka);

  }

}
