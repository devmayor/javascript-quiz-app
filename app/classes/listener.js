const senduseremail = require("../events/newuser/senduseremail");
const sendwelcomenotification = require("../events/newuser/sendwelcomenotification");

module.exports = {
  senduseremail: data => senduseremail.fire(data),
  sendwelcomenotification: data => sendwelcomenotification.fire(data)
};
