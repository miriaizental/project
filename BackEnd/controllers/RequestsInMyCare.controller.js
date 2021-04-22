const dal = require("../dal/dal.js")
const sendemail = require("../functions/sendemail")
const { successResponse, failureResponse } = require("../common/service.js")


//הצגת כל הבקשות שלקח על עצמו המתנדב

async function GetVolunteerRequests(request, response) {
    const query = `select Users_tbl.userName,Users_tbl.email,Users_tbl.phone,AsksForHelp_tbl.requestDetails,
    AsksForHelp_tbl.requestNumber from AsksForHelp_tbl 
    join Users_tbl on AsksForHelp_tbl.password=Users_tbl.password
    where AsksForHelp_tbl.volunteerpassword='${request.query.password}'`
    await dal.executeAsync(query, request.body, response).then((data) => {

        response.send(data)

    }, (err) => console.log('err from GetVolunteerRequests: ' + err))
        .catch((err) => console.log('err from catch: ' + err))
}

//בדיקה האם המתנדב ביצע את הבקשות שלקח על עצמו

async function CheckMyRequests(request, response, table) {

    let query = `select u.userName,v.email from AsksForHelp_tbl a 
    join ${table} v on v.password=a.volunteerpassword
    join Users_tbl u on u.password=a.password
    where time='מיידי' and DATEDIFF(dd,a.responseDate,GETDATE())>1`
    await dal.executeAsync(query, request.body, response).then((data) => {

        var subject = 'תזכורת'
        data.forEach(element => {


            var html = `<div>מתנדב יקר,<br>נענית לבקשתו של ${element.userName}  אתמול והבקשה עדיין לא טופלה,<br> נשמח אם תוכל לבצע זאת בהקדם האפשרי. <br>תודה לך על תרומתך לקהילה:)</div>`

            sendemail.sendemail(element.email, subject, html)
        });


    }, (err) => console.log('err from CheckMyRequests: ' + err))
        .catch((err) => console.log('err from catch: ' + err))

    /////////////////////////////////
    query = `select u.userName,v.email from AsksForHelp_tbl a 
    join ${table} v on v.password=a.volunteerpassword
    join Users_tbl u on u.password=a.password
    where time='גמיש' and DATEDIFF(dd,a.responseDate,GETDATE())>3`
    await dal.executeAsync(query, request.body, response).then((data) => {

        var subject = 'תזכורת'
        data.forEach(element => {


            // var html = `<h1>${element.userName}  מחכה לעזרתך</h1><h3>א עשה זאת בהקדם האפשרני</h3>`
            var html = `<div>מתנדב יקר,<br>נענית לבקשתו של ${element.userName}  לפני 3 ימים והבקשה עדיין לא טופלה,<br> נשמח אם תוכל לבצע זאת בהקדם האפשרי. <br>תודה לך על תרומתך לקהילה:)</div>`

            sendemail.sendemail(element.email, subject, html)
        });


    }, (err) => console.log('err from CheckMyRequests: ' + err))
        .catch((err) => console.log('err from catch: ' + err))
}
async function ReturnRequest(request, response) {

    const query = `update AsksForHelp_tbl set requestGranted=0,requestDate=null,volunteerpassword=null,
    responseDate=null where requestNumber=${request.body.requestnumber}`
    await dal.executeAsync(query, request.body, response).then((result) => {
        successResponse('העדכון התבצע', result, response).send()
    }, (err) => failureResponse('ארעה שגיאה', err, response).send())
        .catch((err) => console.log('err from catch: ' + err))

}


module.exports = {
    GetVolunteerRequests,
    CheckMyRequests,
    ReturnRequest
}