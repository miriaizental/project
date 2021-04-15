const dal = require("../dal/dal.js")
const sendemail = require("../functions/sendemail")
const { successResponse, failureResponse } = require("../common/service.js")
var query, subject, html = ''

//יצירת קשר בין המתנדב למשתמש

async function ContactUs(request, response) {
    let tableName = '';
    if (request.query.type == 'manager') {
        tableName = 'Manager_tbl'

    }
    else {
        if (request.query.type == 'volunteer') {
            tableName = 'Volunteers_tbl'
        }
        if (request.query.type == 'user') {
            tableName = 'Users_tbl'
        }
    }

    query = `select email from ${tableName} where password='${request.query.password}'`
    await dal.executeAsync(query, request.body, response).then((data) => {

        subject = ' בקשתך מעניינת את אחד מהמתנדבים'
        html = `<h1>נא צור איתו קשר במייל הבא:</h1><p>${data[0].email}</p>`

    }, (err) => console.log('err from ContactUs: ' + err))
        .catch((err) => console.log('err from catch: ' + err))


    query = `select email from Users_tbl where password='${request.query.pass}'`
    await dal.executeAsync(query, request.body, response).then((data) => {

        sendemail.sendemail(data[0].email, subject, html)

    }, (err) => console.log('err from ContactUs: ' + err))
        .catch((err) => console.log('err from catch: ' + err))


    //console.log('password: ', request.query.password, 'email: ', request.query.email);

}

module.exports = {
    ContactUs

}