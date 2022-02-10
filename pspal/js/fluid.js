function fluidselected() {
  // This functions: updates when a fluid type is selected from the dropdwon

  let fluidtype = document.getElementById('select-fluid').value

  let maintenance = document.getElementById('maintenance')
  maintenance.disabled = "disabled" //disable custom maintenance box 

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
  let fluidtype = document.getElementById('select-fluid').value

  let totvol = 0
  let rate = ""
  let desc = ""
  let temp = 0
  const max_vol = 2000

  // console.log(weight);
  if (weight < 1) {
    clearresults()
    return console.log("Weight limit not valid")
  }

  switch (fluidtype) {
    case "bolus":
      totvol = weight * 20
      rate = "Push over 30mins or 1 hour"
      desc = "0.9% NaCl"
      result = totvol
      break
    case "py":
      totvol = weight * 150
      result = totvol
      temp = result / 24
      rate = temp.toString() + " mls per hour"
      desc = '0.9% NaCl + 10mmol KCL <br><small>Also add replacements ml for ml</small>'
      break
    default:
      if (weight > 40) {
        totvol = max_vol
      } else if (weight <= 10) {
        totvol = weight * 100
      } else if (weight <= 20) {
        totvol = 1000 + ((weight - 10) * 50)
      } else {
        totvol = 1500 + ((weight - 20) * 20)
      }
      result = totvol * (maintenance / 100)
      temp = Math.round(result / 24)
      rate = temp.toString() + " mls per hour"
      desc = 'Plasmalyte in 5% Dextrose'
  }
  result = Math.round(result)
  showresult(result, rate, desc)

}



function showresult(result, rate, desc) {
  let result_text = result.toString() + " mls"

  clearresults()

  let result_element = document.getElementById('fluidresult')

  let answer = document.createElement('div')
  answer.innerHTML = '<span>Total Volume/24hrs: ' + result_text + '</span>' + '<br>' +
    '<span class="">Rate: ' + rate + '</span>' + '<br>' +
    '<span class="">Fluid type: ' + desc + '</span>'

    result_element.appendChild(answer)
}

function clearresults() {
  let resultel = document.getElementById('fluidresult')
  // let resultel = document.getElementById('clearfluidresult')
  resultel.innerHTML = '<span class="font-size-12 text-muted">Results shown below (expand for notes).</span>'

}