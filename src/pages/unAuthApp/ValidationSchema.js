import * as Yup from 'yup';

export const validationShema = Yup.object().shape({
  customerId: Yup.string().required('Required'),
  companyName: Yup.string().required('Required'),
  companyPhone: Yup.string().required('Required'),
  firstName: Yup.string().required('Required'),
  lastName: Yup.string().required('Required'),
  email: Yup.string().email('Invalid email').required('Required'),
  jobTitle: Yup.string().required('Required'),
  password: Yup.string().min(6, 'Password too short').required('Required'),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref('password'), null], 'Passwords must match')
    .required('Required'),
  firstAdresse: Yup.string().required('Required'),
  secondAdresse: Yup.string(),
  thirdAdresse: Yup.string(),
  city: Yup.string().required('Required'),
  prov: Yup.string().required('Required'),
  zip: Yup.string().required('Required'),
  acceptedTerms: Yup.bool().oneOf([true], 'Must accept terms'),
  country: Yup.string().required('Required')
});
