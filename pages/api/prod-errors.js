import ViewProdErrorSchema from "../../models/modelsProdLogErrorDb";
import dbConnect from "../../lib/dbConnect";

export default async function handlerGetViewLogProdErrorSchema(req, res) {
  await dbConnect();

  const method = req.method;
  try {
    if (method === "GET") {
      const result = await ViewProdErrorSchema.find({});
      return res.status(200).json({ result });
    } else if (method === "PUT") {
      const body = req.body;
      await ViewProdErrorSchema.find({ _id: body["_id"] }).deleteOne().exec();
      return res.status(200).json({ message: "delete ok", id: body["_id"] });
    }
  } catch (error) {
    res.status(500).json({
      result: {
        message: "error connect",
      },
    });
  }
}
