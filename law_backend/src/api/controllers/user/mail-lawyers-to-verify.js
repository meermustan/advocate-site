import { User, Verification } from "../../../models/index.js";
import { errorHelper, getText } from "../../../utils/index.js";
import inviteLawyerToVerifyEmail from "./verification/inviteLawyerToVerify/invite-lawyer-to-verify-mail.js";

export default async (req, res) => {
    

    if (req.user?.type !== "admin") {
        return res.status(401).json({
            resultMessage: {
                en: "Unauthorized operation!",
                ur: "Unauthorized operation!",
            },
            resultCode: "",
        });
    }
    
    let nonVerifiedLawyers = await User.find({type: 'lawyer', verified_by_admin: false});

    var sendMail;
    for (let index = 0; index < nonVerifiedLawyers?.length; index++) {
        const element = nonVerifiedLawyers[index];
        sendMail = await inviteLawyerToVerifyEmail({userName: element.name, email: element.email, subject: "Invitation for verify you account"});
    }


    return res.status(200).json({
        resultMessage: { en: getText("en", "00700"), ur: getText("ur", "00700") },
        resultCode: "00700",
    });
};
