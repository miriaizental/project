const dal = require("../dal/dal.js")
const sendemail = require("../functions/sendemail")
const { successResponse, failureResponse } = require("../common/service.js")


//הצגת כל הבקשות שלקח על עצמו המתנדב

async function GetVolunteerRequests(request, response) {
    console.log(request.query.password);
    const query = `select Users_tbl.userName,AsksForHelp_tbl.requestDetails from AsksForHelp_tbl 
    join Users_tbl on AsksForHelp_tbl.password=Users_tbl.password
    where AsksForHelp_tbl.volunteerpassword='${request.query.password}'`
    console.log(query);
    await dal.executeAsync(query, request.body, response).then((data) => {

        response.send(data)

    }, (err) => console.log('err from GetVolunteerRequests: ' + err))
        .catch((err) => console.log('err from catch: ' + err))
}

//בדיקה האם המתנדב ביצע את הבקשות שלקח על עצמו

async function CheckMyRequests(request, response,table) {

    const query = `select u.userName,v.email from AsksForHelp_tbl a 
    join ${table} v on v.password=a.volunteerpassword
    join Users_tbl u on u.password=a.password
    where DATEDIFF(dd,a.responseDate,GETDATE())>7`
    await dal.executeAsync(query, request.body, response).then((data) => {

        var subject = 'תזכורת'
        for (var i = 0; i < data.length; i++) {
            var html = `<h1>${data[i].userName}  מחכה לעזרתך</h1><h3>נא עשה זאת בהקדם האפשרי</h3>`
            sendemail.sendemail(data[i].email, subject, html)
        }
        

    }, (err) => console.log('err from CheckMyRequests: ' + err))
        .catch((err) => console.log('err from catch: ' + err))
}

    

module.exports = {
    GetVolunteerRequests,
    CheckMyRequests,

}