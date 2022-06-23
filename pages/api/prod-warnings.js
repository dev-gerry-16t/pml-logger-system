import ViewProdWarningSchema from "../../models/modelsProdLogWarningDb";
import dbConnect from "../../lib/dbConnect";

export default async function handlerGetViewLogProdWarningSchema(req, res) {
  await dbConnect();

  const method = req.method;
  try {
    if (method === "GET") {
      const result = await ViewProdWarningSchema.find({});
      return res.status(200).json({ result });
    } else if (method === "PUT") {
      const body = req.body;
      await ViewProdWarningSchema.find({ _id: body["_id"] }).deleteOne().exec();
      return res.status(200).json({ message: "delete ok", id: body["_id"] });
    } else if (method === "POST") {
      const body = req.body;
      const result = await ViewProdWarningSchema.find({ _id: body["_id"] });
      return res.status(200).json({ result });
    }
  } catch (error) {
    res.status(500).json({
      result: {
        message: "error connect",
      },
    });
  }
}
