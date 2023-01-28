import { PrismaClient } from "@prisma/client";
import { NextApiRequest, NextApiResponse } from "next";

var prisma = new PrismaClient();
export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  var requestbody = JSON.parse(req.body);
  var commentaries: string[] = requestbody.commentaries;
  var response: { [x: string]: any } = {};
  for (let id of commentaries.slice(0, 10)) {
    console.log(id);
    var commentariesForThisTrack = await prisma.trackCommentary.findMany({
      where: {
        playlistId: id,
      },
    });
    response[id] = commentariesForThisTrack;
  }
  console.log(requestbody.commentaries);

  res.status(200).json(response);
}
