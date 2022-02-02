function loadDirs() {
  var alldirs = ["theatre", "external", "ward", "imaging", "lab", "referral", "myteam"]

  alldirs.forEach(function (item, index, array) {


    var fname = item + '.json'

    // console.log(fname)
    fetch(fname).then(response => {
      return response.json();
    }).then(jsondata => {
      var element_id = item

      // console.log(item);
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
  let searchbox = document.getElementById('page-search-results')

  for (i = 0; i < data.length; i++) {

    dir = document.createElement('div')
    dir.id = elid   //"

    var dirContent = data[i].Location + data[i].Number

    dir.className = "directory col-12 col-md-3 col-xl-3 blurme"
    dir.innerHTML = '<div class="directoryCard">' +
      '<div class="title text-wrap w-200 searchme"><span><i class="lar la-address-book text-primary"></i></span>' +
      data[i].Location + '<br><small class="text-muted text-capitalize">' + data[i].Notes + '</small></div>' +
      '<div class="details font-weight-bold pr-10">' + data[i].Number + '</div>' +
      '</div>'
    div.appendChild(dir)


    var action = data[i].Tag

    if (action === 'cancall') {
      // console.log(action);
      linka = document.createElement('a')
      linka.className = "callbutton las la-phone text-success" //fas fa-phone"
      linka.innerHTML = ""
      linka.href = 'telprompt://011734' + data[i].Number
      linka.id = data[i].Number

      dir.lastChild.appendChild(linka);

    } else if (action === '') {
      var linkb = document.createElement('i')
      linkb.className = "las la-tty"
      linkb.style = "font-size:32px;"
      linkb.innerHTML = ""
      linkb.id = data[i].Number
      dir.lastChild.appendChild(linkb)
      // console.log(action);
    }

    // duplicate this item and add to search box
    let searchitem = dir.cloneNode(true)
    // add to search box as well
    searchbox.appendChild(searchitem)


  }

}
