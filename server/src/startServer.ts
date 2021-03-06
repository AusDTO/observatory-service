import { loadFilesSync } from "@graphql-tools/load-files";
import { mergeResolvers, mergeTypeDefs } from "@graphql-tools/merge";
import { ApolloServer, makeExecutableSchema } from "apollo-server-express";
import * as bodyParser from "body-parser";
import * as connect_redis from "connect-redis";
import "dotenv/config";
import * as express from "express";
import * as session from "express-session";
import { DocumentNode } from "graphql";
import Redis from "ioredis";
import * as path from "path";
import "reflect-metadata";
import * as swaggerUi from "swagger-ui-express";
import loginAdminRouter from "./routes/adminLogin/loginAdmin";
import agencyRouter from "./routes/agency/agencyRoutes";
import { confirmEmail } from "./routes/confirmEmail";
import dataOutputRouter from "./routes/dataOutputs/dataRoutes";
import propertyRouter from "./routes/properties/propertyRoutes";
import {
  CORS_OPTIONS,
  ENVIRONMENT,
  REDIS_PREFIX,
  RESOLVER_FILE_TYPE,
  sessionSecret,
  swaggerOptions,
} from "./util/constants";
import { connection } from "./util/createConnection";
import { verifyToken } from "./util/verifyToken/verifyToken";
var cfenv = require("cfenv");
const swaggerDocument = require("./swagger.json");

const PORT = process.env.PORT || 4000;
const REDIS_PORT = 6379;

let appEnv: any;
if (ENVIRONMENT == "production") {
  appEnv = cfenv.getAppEnv();
}

const { url } =
  ENVIRONMENT === "production" && appEnv.services["redis"][0].credentials; //redis connection url

const RedisStore = connect_redis(session);

export const startServer = async () => {
  const redis_client =
    ENVIRONMENT === "production"
      ? new Redis(url)
      : new Redis({ port: REDIS_PORT });

  const typesArray = loadFilesSync(path.join(__dirname, "./modules"), {
    extensions: ["graphql"],
  });

  const typeDefs: DocumentNode = mergeTypeDefs(typesArray);

  // Find and get all resolvers
  const resolversArray = loadFilesSync(
    path.join(__dirname, `./modules/**/*.resolvers.${RESOLVER_FILE_TYPE}`)
  );

  const resolvers: any = await mergeResolvers(resolversArray);

  const schema = makeExecutableSchema({
    typeDefs,
    resolvers,
    resolverValidationOptions: { requireResolversForResolveType: false },
  });

  // generate apollo server
  const server = new ApolloServer({
    introspection: true,
    playground: true,
    schema,
    context: ({ req, res }) => ({
      redis_client,
      url: req.protocol + "://" + req.get("host"),
      session: req.session,
      req: req,
      res,
    }),
  });

  const app = express();
  app.set("trust proxy", 1);
  app.use(bodyParser.json());

  app.use(
    session({
      name: "sid",
      store: new RedisStore({ client: redis_client, prefix: REDIS_PREFIX }),
      secret: sessionSecret,
      resave: false,
      saveUninitialized: false, //Don't create cookie until we store data on the user
      cookie: {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        maxAge: 1000 * 60 * 60 * 24 * 7, //1000 * 60 * 60 * 24 * 7,  7 days
      },
    })
  );

  // app.use(limiter);

  server.applyMiddleware({
    app,
    cors: { origin: CORS_OPTIONS, credentials: true },
  });

  await connection.create();

  app.use(
    "/api/docs",
    swaggerUi.serve,
    swaggerUi.setup(swaggerDocument, swaggerOptions)
  );

  app.get("/api/confirm/:id", (req, res, next) =>
    confirmEmail(req, res, next, redis_client)
  );

  app.use("/api/admin", loginAdminRouter);

  //Error handling middleware

  app.use("/api/agencies", verifyToken, agencyRouter);
  app.use("/api/output", verifyToken, dataOutputRouter);
  app.use("/api/properties", verifyToken, propertyRouter);

  app.listen(PORT, () =>
    console.log(`🚀 Server ready at port http:localhost:${PORT}/api`)
  );
};
