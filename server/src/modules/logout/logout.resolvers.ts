import { ResolverMap } from "../../types/graphql-util";
import { removeSessions } from "../../util/removeAllUserSessions";

export const resolvers: ResolverMap = {
  Query: {
    dummy: async (parent, args, { redis_client, url }) => {
      return "hello";
    },
  },
  Mutation: {
    logout: async (_, __, { session, redis_client }) => {
      const { userId } = session;
      if (userId) {
        //remove all sessions associated with this userId
        await removeSessions(userId, redis_client);
        return true;
      } else return false;
    },
  },
};
