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
        from: '"MedicTeeths Hospital " <dao.tan19082k1@gmail.com>', // sender address
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
        <p>Bạn nhận được Mail này vì đã đặt lịch Online trên MedicTeeths. </p>  
        <p>Thông tin đặt lịch online: </p>
        <div><b> >>>> Thời gian: ${dataSend.time} <<<< </b></div>
        <div><b> **** Bác sĩ: ${dataSend.doctorName} **** </b></div>

        <p>Nếu bạn đã kiểm tra trên thông tin trên là đúng, vui lòng click vào đường link dưới để
            xác nhận và hoàn tất thủ tục đặt lịch online.
        </p>
        <div>
        <a href=${dataSend.redirectLink} target="_blank" > Click here</a>
        </div>

        <div> Xin chân thành cảm ơn vì bạn đã tin tưởng MedicTeeths !</div>
          
        `
    }
    if (dataSend.language === 'en') {
        result =
            `
        <h3>Dear ${dataSend.patientName} !</h3>
        <p>You received this email because you booked an online appointment on MedicTeeths. </p>  
        <p>Online Booking Information: </p>
        <div><b> >>>> Time: ${dataSend.time} <<<< </b></div>
        <div><b> **** Doctor: ${dataSend.doctorName} **** </b></div>

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
        <p>Thông tin Hóa đơn được gửi trong file đính kèm: </p>
        <div>Xin chân thành cảm ơn bạn vì đã tin tưởng MedicTeeths !</b></div>
        `
    }
    if (dataSend.language === 'en') {
        result =
            `
        <h3>Xin chào ${dataSend.patientName} !</h3>
        <p>You received this email because you booked an online appointment on MedicTeeths. </p>  
        <p>Prescription information is sent in the attached file: </p>
        <div>Sincerely thank !</b></div>
        `
    }
    return result;
}

let getBodyHTMLEmailCancel = (dataSend) => {
    let result = ''
    if (dataSend.language === 'vi') {
        result =
            `
        <h3>Xin chào ${dataSend.patientName} !</h3>
        <p>Bạn nhận được Mail này vì lịch hẹn Online của bạn đã bị hủy trên MedicTeeths. </p>  
        <div><b>Bác sĩ hoặc Dịch vụ mà bạn đã chọn không may gặp sự cố ngoài ý muốn trong thời gian bạn đã đặt lịch ! </b></div>
        <p>Chúng tôi vô cùng xin lỗi Qúy khách và sẽ liên lạc lại vối quý khách trong thời gian sớm nhất: </p>
        <div>Mong Qúy khách thông cảm và Xin chân thành cảm ơn bạn vì đã tin tưởng MedicTeeths !</b></div>
        `
    }
    if (dataSend.language === 'en') {
        result =
            `
        <h3>Xin chào ${dataSend.patientName} !</h3>
        <p>You received this email because you booked an online appointment on MedicTeeths. </p>  
        <p>Prescription information is sent in the attached file: </p>
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
                from: '"MedicTeeths Hospital " <dao.tan19082k1@gmail.com>', // sender address
                to: dataSend.email, // list of receivers
                subject: "Kết quả đặt lịch Online của bạn ✔", // Subject line
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

let sendAttachment2 = async (dataSend) => {
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
                from: '"MedicTeeths Hospital " <dao.tan19082k1@gmail.com>', // sender address
                to: dataSend.email, // list of receivers
                subject: "Thông báo Hủy hẹn đặt lịch Online của bạn ✔", // Subject line
                html: getBodyHTMLEmailCancel(dataSend),

            });

            resolve(true)

        } catch (e) {
            reject(e)
        }
    })
}


module.exports = {
    sendSimpleEmail: sendSimpleEmail,
    sendAttachment: sendAttachment,
    sendAttachment2: sendAttachment2
}