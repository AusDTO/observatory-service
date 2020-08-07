import { Request, Response } from "express";
import { User } from "../entity/User";
import { Redis } from "ioredis";

export const confirmEmail = async (
  req: Request,
  res: Response,
  redis_client: Redis
) => {
  const { id } = req.params;

  const userID = await redis_client.get(id);

  if (userID !== null) {
    User.update({ id: userID }, { verified: true });
    res.send("OKAY");

    //delete redis key once it has been used
    await redis_client.del(id);
  } else res.send("Link has expired or no longer exists");
};