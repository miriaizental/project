const dal = require("../dal/dal.js")
const sendemail = require("../functions/sendemail")

const { successResponse, failureResponse } = require("../common/service.js")



async function ContactUs(request, response) {
    const query = `select email from Volunteers_tbl where password='${request.query.password}'`
    await dal.executeAsync(query, request.body, response).then((data) => {


        var subject = ' בקשתך מעניינת את אחד מהמתנדבים'
        var html = `<h1>נא צור איתו קשר במייל הבא:</h1><p>${data[0].email}</p>`
        sendemail.sendemail(request.query.email, subject, html)


    }, (err) => console.log('err from CheckMyRequests: ' + err))
        .catch((err) => console.log('err from catch: ' + err))


    console.log('password: ', request.query.password, 'email: ', request.query.email);


}

module.exports = {
    ContactUs

}