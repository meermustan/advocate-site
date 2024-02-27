import { User } from "../../../models/index.js";
import { errorHelper, getText } from "../../../utils/index.js";

export default async (req, res) => {
  let onlyVerifiedLawyers = req?.query?.onlyVerifiedLawyers;
  let lawyers;
  if(onlyVerifiedLawyers === "true"){
    console.log("running for verfied users only!");
    lawyers = await User.find({ type: "lawyer", verified_by_admin: true })
    .populate({
      path: "profile",
      populate: {
        path: "reviews",
        match: { type: "client" },
        populate: {
          path: "client",
        },
      },
    })
    .exec()
    .catch((err) => {
      return res.status(500).json(errorHelper("00088", req, err.message));
    });
  }else{
    console.log("running for every user");
    lawyers = await User.find({ type: "lawyer"})
      .populate({
        path: "profile",
        populate: {
          path: "reviews",
          match: { type: "client" },
          populate: {
            path: "client",
          },
        },
      })
      .exec()
      .catch((err) => {
        return res.status(500).json(errorHelper("00088", req, err.message));
      });
  }

  return res.status(200).json({
    resultMessage: { en: getText("en", "00089"), ur: getText("ur", "00089") },
    resultCode: "00089",
    lawyers,
  });
};
