import { PrismaClient } from "@prisma/client";
import { NextApiRequest, NextApiResponse } from "next";

var prisma = new PrismaClient();
export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  var requestbody = JSON.parse(req.body);
  var commentaries: string[] = requestbody.ids;
  var response: { [x: string]: any } = {};
  for (let id of commentaries.slice(0, 10)) {
    var dbCollections = await prisma.objectCollection.findFirst({
      where: {
        objectSource: "Spotify",
        objectSourceId: id,
      },
    });
    if (dbCollections) response[dbCollections.id] = dbCollections;
  }
  console.log(requestbody.commentaries);

  res.status(200).json(response);
}
