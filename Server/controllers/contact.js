const mailSender = require("../utils/mailSender")

exports.contactUsController = async (req, res) => {
    const { email, firstname, lastname, message, phoneNo, countrycode } = req?.body
    try {
        const emailRes = await mailSender(
            email,
            "Your Data send successfully",
            `<div>
      <h1>Hello ${firstname} ${lastname}, We got your message</h1>
      <p>Message : ${message}</p>
      <p>Ph No : ${countrycode} ${phoneNo}</p>
      <h2>We will get you soon</h2>
      </div>`
        )
        console.log("Email Res ", emailRes)
        return res.status(200).json({
            status: true,
            statusCode: 200,
            message: "Email send successfully",
        })
    } catch (error) {
        console.log("Error", error)
        console.log("Error message :", error.message)
        return res.status(500).json({
            status: false,
            statusCode: 500,
            message: "Something went wrong...",
        })
    }
}
