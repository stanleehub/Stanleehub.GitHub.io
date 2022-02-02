function fluidselected() {
  console.log(document.getElementById('select-fluid').value);
  //  = option.value;
  let fluidtype = document.getElementById('select-fluid').value

  let maintenance = document.getElementById('maintenance')
  maintenance.disabled = "disabled"

  clearresults
  // 
  switch (fluidtype) {
    case "custom":
      maintenance.value = ""
      maintenance.disabled = false;
      maintenance.focus()

      break
    case "full":
      maintenance.value = "100"
      break
    case "postop":
      maintenance.value = "80"
      break
    case "py":
      maintenance.value = "150"
      break
    case "bolus":
      maintenance.value = "0"
      // maintenance.disabled = "disabled"
      break
  }

  calculatefluid()
}

function calculatefluid() {

  let weight = Number(document.getElementById('weight').value)
  let maintenancetype = document.getElementById('select-fluid').value
  let maintenance = Number(document.getElementById('maintenance').value)

  let result = 0

  let fluidtype = document.getElementById('select-fluid').value

  if (weight > 0) {
    if (fluidtype === "bolus") {
      result = weight * 20
      showresult(result, fluidtype)
    }
    result = weight * (maintenance / 100)
    showresult(result, fluidtype)
    console.log(weight, maintenancetype, maintenance);
  } else {
    console.log('not a number');
  }
}

function showresult(result, ftype) {


  let show = result.toString() + " mls"
  let desc = ""

  clearresults()

  let resultel = document.getElementById('fluidresult')

  switch (ftype) {
    case "bolus":
      desc = "Give bolus over 30mins or 1hour"
      console.log(show, desc);
      break
  }

  let answer = document.createElement('div')
  // answer.className = "text-primary text-center"
  answer.innerHTML = '<strong>Rate to give: <span class="text-success">' + show + '</span></strong>' +
  '<br>'+
    + desc

  //   <div>
  //   <strong>Title</strong>
  //   <br>
  //   Amazing
  //   <br>
  //   dsds
  // </div>
  resultel.appendChild(answer)
}

function clearresults() {
  let resultel = document.getElementById('fluidresult')
  resultel.innerHTML = ""
}