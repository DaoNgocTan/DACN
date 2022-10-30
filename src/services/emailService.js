require('dotenv').config();
import nodemailer from 'nodemailer'

let sendSimpleEmail = async (dataSend) => {
    // create reusable transporter object using the default SMTP transport
    let transporter = nodemailer.createTransport({
        host: "smtp.gmail.com",
        port: 587,
        secure: false, // true for 465, false for other ports
        auth: {
            user: process.env.EMAIL_APP, // generated ethereal user
            pass: process.env.EMAIL_APP_PASSWORD, // generated ethereal password
        },
    });

    // send mail with defined transport object  
    let info = await transporter.sendMail({
        from: '"MedicTeeths Hospital 👻" <dao.tan19082k1@gmail.com>', // sender address
        to: dataSend.receiverEmail, // list of receivers
        subject: "Thông tin đặt lịch từ khách hàng ✔", // Subject line
        html: getBodyHTMLEmail(dataSend),
    });

}

let getBodyHTMLEmail = (dataSend) => {
    let result = ''
    if (dataSend.language === 'vi') {
        result =
            `
        <h3>Xin chào ${dataSend.patientName} !</h3>
        <p>Bạn nhận được Mail này vì đã đặt lịch online trên MedicTeeths. </p>  
        <p>Thông tin đặt lịch online: </p>
        <div><b>Thời gian: ${dataSend.time}</b></div>
        <div><b>Bác sĩ: ${dataSend.doctorName}</b></div>

        <p>Nếu bạn đã kiểm tra trên thông tin trên là đúng, vui lòng click vào đường link dưới để
            xác nhận và hoàn tất thủ tục đặt lịch online.
        </p>
        <div>
        <a href=${dataSend.redirectLink} target="_blank" > Click here</a>
        </div>

        <div> Xin chân thành cảm ơn !</div>
          
        `
    }
    if (dataSend.language === 'en') {
        result =
            `
        <h3>Dear ${dataSend.patientName} !</h3>
        <p>You received this email because you booked an online appointment on MedicTeeths. </p>  
        <p>Online Booking Information: </p>
        <div><b>Time: ${dataSend.time}</b></div>
        <div><b>Doctor: ${dataSend.doctorName}</b></div>

        <p>If you have checked the above information is correct, please click on the link below to
        Confirm and complete the online booking procedure.
        </p>
        <div>
        <a href=${dataSend.redirectLink} target="_blank" > Click here</a>
        </div>

        <div> Sincerely thank !</div>
          
        `
    }

    return result

}

let getBodyHTMLEmailRemedy = (dataSend) => {
    let result = ''
    if (dataSend.language === 'vi') {
        result =
            `
        <h3>Xin chào ${dataSend.patientName} !</h3>
        <p>Bạn nhận được Mail này vì đã đặt lịch online trên MedicTeeths. </p>  
        <p>Thông tin đơn thuốc/ Hóa đơn được gửi trong file đính kèm: </p>
        <div>Xin chân thành cảm ơn !</b></div>
        `
    }
    if (dataSend.language === 'en') {
        result =
            `
        <h3>Xin chào ${dataSend.patientName} !</h3>
        <p>You received this email because you booked an online appointment on MedicTeeths. </p>  
        <p>Prescription information / Invoice is sent in the attached file: </p>
        <div>Sincerely thank !</b></div>
        `
    }
    return result;
}

let sendAttachment = async (dataSend) => {
    return new Promise(async (resolve, reject) => {
        try {
            let transporter = nodemailer.createTransport({
                host: "smtp.gmail.com",
                port: 587,
                secure: false,
                auth: {
                    user: process.env.EMAIL_APP,
                    pass: process.env.EMAIL_APP_PASSWORD,
                }
            });

            //send email with defined transport object
            let info = await transporter.sendMail({
                from: '"MedicTeeths Hospital 👻" <dao.tan19082k1@gmail.com>', // sender address
                to: dataSend.email, // list of receivers
                subject: "Kết quả đặt lịch Online ✔", // Subject line
                html: getBodyHTMLEmailRemedy(dataSend),
                attachments: [
                    {
                        filename: `remedy-${dataSend.patientId}-${new Date().getTime()}.png`,
                        content: dataSend.imgBase64.split("base64,")[1],
                        encoding: 'base64'
                    },
                ],
            });

            resolve(true)

        } catch (e) {
            reject(e)
        }
    })
}


module.exports = {
    sendSimpleEmail: sendSimpleEmail,
    sendAttachment: sendAttachment
}