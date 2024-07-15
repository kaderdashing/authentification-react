// this is regegx for password and confirm password for register
import { object, string, ref, boolean } from 'yup';

const getCharacterValidationError = (str: string) => {
  return `Your password must have at least 1 ${str} character`;
};
export const passwordSchema = object({
  password: string()
    .required('Please enter a password')
    // check minimum characters
    .min(8, 'Password must have at least 8 characters')
    // different error messages for different requirements
    .matches(/[0-9]/, getCharacterValidationError('digit'))
    .matches(/[a-z]/, getCharacterValidationError('lowercase'))
    .matches(/[A-Z]/, getCharacterValidationError('uppercase')),
  confirmPassword: string()
    .required('Please re-type your password')
    // use oneOf to match one of the values inside the array.
    // use "ref" to get the value of passwrod.
    .oneOf([ref('password')], 'Passwords does not match'),
  firstName: string().max(40, 'Must be 40 characters or less').required('Required'),
  lastName: string().max(40, 'Must be 40 characters or less').required('Required'),
  jobTitle: string().max(40, 'Must be 40 characters or less').required('Required'),

  email: string().email('Invalid email address').required('Required'),
  acceptedTerms: boolean()
    .required('Required')
    .oneOf([true], 'You must accept the terms and conditions.'),
  country: string()
    .oneOf(['designer', 'development', 'product', 'other'], 'Invalid Job Type')
    .required('Required')
});
