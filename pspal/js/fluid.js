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
  let result_text = '<span class="font-weight-bold text-success">' + result.toString() + '</span>' + ' mls'
  rate = '<span class="font-weight-bold text-success">' + rate + '</span>'
  clearresults()

  let result_element = document.getElementById('fluid-result')
  let answer = document.createElement('div')
  answer.innerHTML = '<span>Total Volume in 24hrs: ' + result_text + '</span>' + '<br>' +
    '<span class="">Rate: ' + rate + '</span>' + '<br>' +
    '<span class="">Fluid type: ' + desc + '</span>'

  result_element.appendChild(answer)
}

function clearresults() {
  let fr = document.getElementById('fluid-result')
  let wr = document.getElementById('weight-result')
  let dr = document.getElementById('drug-result')


  fr.innerHTML = '<span class="font-size-12 text-muted">Fluid result shown below (expand for notes).</span>'
  wr.innerHTML = '<span class="font-size-12 text-muted">Weight result shown below (expand for notes).</span>'
  dr.innerHTML = '<span class="font-size-12 text-muted">Drug results shown below (expand for notes).</span>'

}

function getAge() {
  // from: https://codedec.com/tutorials/how-to-calculate-age-by-date-of-birth-in-javascript/
  var userinput = document.getElementById("dob").value;
  var dob = new Date(userinput);

  if (userinput == null || userinput == '') {
    return false;
  }


  var mdate = userinput.toString();
  var dobYear = parseInt(mdate.substring(0, 4), 10);
  var dobMonth = parseInt(mdate.substring(5, 7), 10);
  var dobDate = parseInt(mdate.substring(8, 10), 10);

  var today = new Date();
  // var birthday = new Date(dobYear, dobMonth - 1, dobDate);

  var diffInMillisecond = today.valueOf() - birthday.valueOf();
  var year_age = Math.floor(diffInMillisecond / 31536000000);
  var day_age = Math.floor((diffInMillisecond % 31536000000) / 86400000);

  // if ((today.getMonth() == birthday.getMonth()) && (today.getDate() == birthday.getDate())) {
  //   alert("Happy Birthday!");
  // }

  var month_age = Math.floor(day_age / 30);
  day_ageday_age = day_age % 30;

  var tMnt = (month_age + (year_age * 12));
  var tDays = (tMnt * 30) + day_age;

  // console.log(year_age + " years " + month_age + " months " + day_age + " days")

  showAge(year_age, month_age, day_age)
}

function showAge(years, months, days) {
  clearresults()

  let result_element = document.getElementById('weight-result')
  let answer = document.createElement('div')
  answer.innerHTML = '<span>Age: ' + years + " years " + months + " months " + days + " days" + '</span>' + '<br>' +
    // '<span class="">Rate: ' + rate + '</span>' + '<br>' +
    // '<span class="">Fluid type: ' + desc + '</span>'

    result_element.appendChild(answer)

}