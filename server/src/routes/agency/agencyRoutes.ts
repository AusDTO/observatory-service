import * as express from "express";
import * as yup from "yup";
import { Request, Response, NextFunction } from "express";
import { Agency } from "../../entity/Agency";
import * as _ from "lodash";
import { IAgency } from "../../types/other";
import { validateReqUUID } from "../../util/middleware/validReqUuid";

const agencyRouter = express.Router();

const agencyFieldSchema = yup.object().shape({
  name: yup
    .string()
    .required()
    .test({
      name: "Unique agency",
      message: "Agency already exists",
      test: async function (this, value) {
        const agencyExists = await Agency.findOne({ where: { name: value } });
        return agencyExists === undefined
          ? true
          : this.createError({
              message: `Agency *${value}* already exists. The data was not posted successfully`,
              path: "Agency name", // Fieldname
            });
      },
    }),
  emailHosts: yup
    .array()
    .of(
      yup
        .string()
        .required()
        .matches(
          /^@.*gov.au$/,
          "Only government emails are allowed to to be added as hosts. Make sure you write in the form of @example.gov.au."
        )
    )
    .required()
    .test({
      name: "Email host unique",
      message: "Email host you entered have already been assigned to an agency",
      test: async function (this, value) {
        //FIX:URGENT List of email hosts should have it's own table or field, and be validated against that.
        const agencies = await Agency.find();
        const emailHostsToPush = value as Array<string>;

        const emailHosts: Array<string> = [];

        agencies.forEach(async (agency) => {
          emailHosts.push(...agency.emailHosts);
        });

        const intersection = _.intersection(emailHostsToPush, emailHosts);
        if (intersection.length > 0) {
          return false;
        } else return true;
      },
    }),
});

const agencyArraySchema = yup.array().of(agencyFieldSchema);

/**
 * Accepts Array<IAgency>
 * E.g. [{"name": "DTA"}, {"name":"ATO"}]
 */
agencyRouter.post(
  "/",
  async (req: Request, res: Response, next: NextFunction) => {
    const data = req.body as Array<IAgency>;

    //takes out duplicated items in array
    //FIX could use middleware for next two code blocks
    const uniqueData = _.uniqBy(data, "name");
    if (uniqueData.length < 1) {
      return res.status(400).json({
        statusCode: 400,
        message:
          "There were no unique items found in the data you have posted.",
      });
    }

    try {
      await agencyArraySchema.validate(uniqueData, { abortEarly: false });
    } catch (errors) {
      return res
        .status(400)
        .json({ fieldErrors: errors.errors, statusCode: 400 });
    }

    const agencies = uniqueData as Array<IAgency>;

    // let errors;
    agencies.forEach(async (agency) => {
      const { name, emailHosts } = agency;
      const agencyToInsert = Agency.create({
        name,
        emailHosts,
      });
      await agencyToInsert.save();
    });

    res.status(200).json({
      statusCode: 200,
      message: `${agencies.length} entries for agency data added successfully`,
    });
  }
);

agencyRouter.get(
  "/:name?",
  async (req: Request, res: Response, next: NextFunction) => {
    const { name } = req.params;
    if (name) {
      const agency = await Agency.findOne({ where: { name } });

      if (agency) {
        return res.status(200).json(agency);
      } else {
        return res.status(404).json({
          statusCode: 404,
          message: `Agency with name ${name} not found`,
        });
      }
    }
    const allAgencies = await Agency.find();
    return res.status(200).json(allAgencies);
  }
);

agencyRouter.delete(
  "/:id",
  validateReqUUID,
  async (req: Request, res: Response, next: NextFunction) => {
    const { id } = req.params;

    const agencyExists = await Agency.findOne({ where: { id } });

    if (!agencyExists) {
      return res.status(404).json({
        statusCode: 404,
        message: "Agency with that ID doesn't exist",
      });
    }

    await Agency.delete({ id });

    return res.status(200).json({
      statusCode: 200,
      message: `Deleted agency ${agencyExists.name}`,
    });
  }
);

agencyRouter.put(
  "/:id",
  validateReqUUID,
  (req: Request, res: Response, next: NextFunction) => {
    res.send("valid uuid");
  }
);

export default agencyRouter;
