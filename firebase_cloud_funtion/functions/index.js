const functions = require("firebase-functions");
const admin = require("firebase-admin");
const nodemailer = require("nodemailer");
// const cors = require("cors")({ origin: true });
admin.initializeApp();

// // Create and Deploy Your First Cloud Functions
// // https://firebase.google.com/docs/functions/write-firebase-functions
//
// exports.onFileChange = functions.storage.object().onFinalize(event => {
// 	console.log(event);
// 	return;
// });

let transporter = nodemailer.createTransport({
	service: "gmail",
	auth: {
		user: "iamnamananand2@gmail.com",
		pass: "Me@naman1993"
	}
});

exports.dataAdded = functions.firestore
	.document("formData/{userId}")
	.onCreate((snap, context) => {
		// Get an object representing the document
		// e.g. {'name': 'Marie', 'age': 66}
		const newValue = snap.data();

		// access a particular field as you would any JS property
		const name = newValue.name;

		console.log(name);

		const mailOptions = {
			from: "Your Account Name <iamnamananand2@gmail.com>", // Something like: Jane Doe <janedoe@gmail.com>
			to: "iamnamananand3@gmail.com",
			subject: "Admit Card Review", // email subject
			html: `
		<div style="text-align: center;">
			<h1 style="font-family: Arial, Helvetica, sans-serif;">
				Hello ${name}
			</h1>
			<p style="font-style: oblique;">
				Your Admit Card is genrated, Please Click the Link to Downlaod
			</p>
			<br />
			<img
				src="https://recruitmentindia.in/wp-content/uploads/2018/07/admit-card-content-image.png"
			/>
		</div>
	`
			// email content in HTML
		};

		// console.log(mailOptions);

		transporter.sendMail(mailOptions, (erro, info) => {
			console.log(info);
			if (erro) {
				console.log("err");
				console.log(erro.toString());
			} else {
				console.log("Sended");
			}
		});
	});
