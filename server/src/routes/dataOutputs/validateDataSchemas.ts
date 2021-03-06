import { Request, Response, NextFunction, response } from "express";
import {
  ArrayExecDataDaily,
  ArrayExecDataHourly,
  ArrayExecDataWeekly,
  dataTypeSchema,
} from "./outputSchemas";

export const ValidateDataOutputType = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const type = req.query.type ? req.query.type : req.body.type;

  try {
    await dataTypeSchema.validate(type, { abortEarly: true });
  } catch (errors) {
    return res.status(400).json({
      statusCode: 400,
      fieldErrors: errors.errors,
    });
  }
  next();
};

export const ValidateDataOutput = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { output } = req.body;
  const type = req.query.type ? req.query.type : req.body.type;

  let dataValidator;
  switch (type) {
    case "exec_weekly":
      dataValidator = ArrayExecDataWeekly;
      break;
    case "exec_daily":
      dataValidator = ArrayExecDataDaily;
      break;
    case "exec_hourly":
      dataValidator = ArrayExecDataHourly;
      break;
    default:
      dataValidator = null;
      return res
        .status(400)
        .json({ statusCode: 400, message: "There was an unexpected error" });
  }

  try {
    await dataValidator.validate(output, { abortEarly: true, strict: true });
  } catch (errors) {
    return res.status(400).json({
      statusCode: 400,
      fieldErrors: errors.errors,
    });
  }
  next();
};
