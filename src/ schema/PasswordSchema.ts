// this is regegx for password and confirm password for register
import { object, string, ref, boolean } from 'yup';
export const passwordSchema = object({
  password: string()
    .required('Please enter a password')
    .min(8, 'Password must have at least 8 characters'),
  confirmPassword: string()
    .required('Please re-type your password')
    .oneOf([ref('password')], 'Passwords does not match'),
  firstName: string().max(40, 'Must be 40 characters or less').required('Required'),
  lastName: string().max(40, 'Must be 40 characters or less').required('Required'),
  jobTitle: string().max(40, 'Must be 40 characters or less').required('Required'),
  email: string().email('Invalid email address').required('Required')
});
