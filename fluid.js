function fluidselected() {
  console.log(document.getElementById('select-fluid').value);
  //  = option.value;
  let fluidtype = document.getElementById('select-fluid').value

  let maintenance = document.getElementById('maintenance')
  maintenance.disabled = "disabled"
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
    } else

      console.log(weight, maintenancetype, maintenance);
  } else {
    console.log('not a number');
  }
}

function showresult(result, ftype) {


  let show = result.toString() + "mls"
  let desc = ""

  clearresults()

  let resultel = document.getElementById('fluidresult')

  switch (ftype) {
    case "bolus":
      desc = "Give bolus over 30mins or 1hour"
      console.log(show, desc);
      break
  }

  let answer = document.createElement('h4')
  answer.innerHTML = show + "<br>" + "<h5>" + desc + "</h5>"

  resultel.appendChild(answer)
}

function clearresults() {
  let resultel = document.getElementById('fluidresult')
  resultel.innerHTML = ""
}