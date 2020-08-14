import { IUserType, IResendConfirmation } from "../../types/schema";
import { ResolverMap } from "../../types/graphql-util";
import { User } from "../../entity/User";
import * as yup from "yup";
import { formatYupError } from "../../util/formatYupError";
import { CreateConfirmationLink } from "../../util/createConfirmation/createConfirmationLink";
import { sendConfirmationEmail } from "../../util/sendConfirmationEmail/sendEmail";
import { emailValidator, passwordValidator } from "../../util/yup";
import { basicApiMessage } from "../../util/constants";

const validationSchema = yup.object().shape({
  email: emailValidator,
  password: passwordValidator,
  name: yup.string().required().min(2),
  agency: yup.string().required().min(2),
  role: yup.string().required().min(2),
});

const resendValidationSchema = yup.object().shape({
  email: emailValidator,
});

export const resolvers: ResolverMap = {
  Query: {
    bye: async () => {
      return "hello";
    },
  },
  Mutation: {
    register: async (parent: any, args: IUserType, { redis_client, url }) => {
      try {
        await validationSchema.validate(args, { abortEarly: false });
      } catch (errors) {
        return {
          __typename: "FieldErrors",
          errors: formatYupError(errors),
        };
      }

      const { email, password, name, agency, role } = args;

      //try to find a user with passed in email
      const userAlreadyExists = await User.findOne({
        where: { email },
        select: ["email", "verified"],
      });

      if (userAlreadyExists && !userAlreadyExists.verified) {
        return {
          __typename: "UserAlreadyExistsError",
          message: `The user has been created, but the email is yet to be verified. Please check ${userAlreadyExists.email} for a confirmation link`,
          path: "email",
        };
      }

      if (userAlreadyExists) {
        return {
          __typename: "UserAlreadyExistsError",
          message: `The user with email ${email} already exists`,
          path: "email",
        };
      }

      //password is hashed in database
      const user = User.create({ email, password, name, agency, role });

      //need to do user.save() to add to database.
      await user.save();
      const confirmationLink = await CreateConfirmationLink(
        url,
        user.id,
        redis_client
      );

      //email the user the link using notify
      await sendConfirmationEmail(email, name, confirmationLink);

      console.log(confirmationLink);

      return basicApiMessage("UserRegistered", "User created");
    },
    resendConfirmationEmail: async (
      parent: any,
      args: IResendConfirmation,
      { redis_client, url }
    ) => {
      //check valid email passed in
      try {
        await resendValidationSchema.validate(args, { abortEarly: false });
      } catch (errors) {
        return {
          __typename: "FieldErrors",
          errors: formatYupError(errors),
        };
      }

      const { email } = args;
      const userExists = await User.findOne({
        where: { email },
        select: ["id", "email", "verified", "name"],
      });

      //Check if user exists in data
      if (userExists && !userExists.verified) {
        const newConfirmationlink = await CreateConfirmationLink(
          url,
          userExists.id,
          redis_client
        );
        const name = userExists.name;
        console.log(newConfirmationlink);

        await sendConfirmationEmail(email, name, newConfirmationlink);

        //Resend confirmation link
        return {
          __typename: "ConfirmationEmailSent",
          message: `Confirmation email sent to ${userExists.email}, if it exists`,
        };
      }
      return {
        __typename: "EmailNotSentError",
        path: "email",
        message: "There was an error sending the email",
      };
    },
  },
};
