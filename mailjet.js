const https = require('http')

const mailjet = require ('node-mailjet')
.connect('8fc5c30f0207143f6b1ede0285f94939', 'f3488bbc49a42523f63e215b6da8e353')

  const url = "http://localhost:5000/filterData"
  const apiData = [
    {
      state: 'Gujrat',
      totalLoanAmount: 10000000,
      totalAmountPaid: 5000000
    },{
      state: "Madhya Pradesh",
      totalLoanAmount: 49999998,
      totalAmountPaid: 1999998
      },
      {
      state: "UP",
      totalLoanAmount: 99999999,
      totalAmountPaid: 9999999
      }
  ];
  

const getDataFromApi = () => {
  let result = '<table>' ;
  
  console.log(apiData,"my API DATA");
  result += '<tr><th>State</th><th>Total Loan Amount</th><th>Total Amount Paid</th></tr>';
  apiData.forEach(element => {
    result += '<tr>';
    result += '<td>' + element.state + '</td>';
    result += '<td>' + element.totalLoanAmount + '</td>';
    result += '<td>' + element.totalAmountPaid + '</td>';
    result += '</tr>';
  });
  result += '</table>';
  return result
}
console.log(getDataFromApi())
const request = mailjet
.post("send", {'version': 'v3.1'})
.request({
  "Messages":[
    {
      "From": {
        "Email": "harshdeep205@gmail.com",
        "Name": "Harshdeep"
      },
      "To": [
        {
          "Email": "harshdeep205@gmail.com",
          "Name": "Harshdeep Yadav"
        }
      ],
      "Subject": "Greetings from Mailjet.",
      "TextPart": "My first Mailjet email",
      "HTMLPart": getDataFromApi(),
      "CustomID": "AppGettingStartedTest"
    }
  ]
})
request
  .then((result) => {
    console.log(result.body)
  })
  .catch((err) => {
    console.log(err.statusCode)
  })
