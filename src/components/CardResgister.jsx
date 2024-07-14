import React, { useState, useEffect } from 'react';
import { Formik, Form, useField } from 'formik';
import * as Yup from 'yup';
import CardShadow from './CardShadow';
import MyTextInput from '../core/MyTextInput';
import MySelect from '../core/MySelect';
import SimpleWhiteCard from '../core/Card/SimpleWhiteCard';
import { useDebouncedValue } from '@/Hook/useDebouncedValue';
import { getCustomerId } from '@/utils/callingapi';
import ModalTailwind from '@/core/modal/ModalTailwind';
import { useQuery } from 'react-query';
import FullPageSpinner from './pageRendu/FullPageSpinner';
import { passwordSchema } from '@/ schema/PasswordSchema';
// export default function CardResgister({ handleSubmit, customClass }) {
//   const [errorcustomer, setErrorcustomer] = useState(0);
//   const [inputValue, setInputValue] = useState('');
//   const [customerId, setCustomerId] = useState({});
//   const [company, setCompany] = useState({});

//   const debouncedValue = useDebouncedValue(inputValue, 500);

//   useEffect(() => {
//     const fetchCustomerId = async () => {
//       if (debouncedValue) {
//         try {
//           const data = { id: debouncedValue };
//           const customerId = await getCustomerId(data);
//           setCustomerId(customerId);
//           setCompany(customerId.customer[0]);
//         } catch (error) {
//           console.error('Failed to fetch customer ID:', error);
//           setErrorcustomer(1);
//         }
//       }
//     };
//     fetchCustomerId();
//   }, [debouncedValue]);
export default function CardRegister({ handleSubmit, customClass }) {
  const [errorCustomer, setErrorCustomer] = useState(0);
  const [inputValue, setInputValue] = useState('');
  const [customerId, setCustomerId] = useState({});
  const [company, setCompany] = useState({});
  const [password, setPassword] = useState('');
  const [confirmedPassword, setConfirmedPassword] = useState('');
  const [validation, setValidation] = useState(true);

  const getCharacterValidationError = (str) => {
    return `Your password must have at least 1 ${str} character`;
  };
  const debouncedValue = useDebouncedValue(inputValue, 1000);
  //here we will recover data (Adresse .. city ......) from the CustumerID with debounced value

  const fetchCustomerId = async () => {
    const data = { id: debouncedValue };
    const customerId = await getCustomerId(data);
    return customerId;
  };
  const { data, error, isLoading } = useQuery(['customerId', debouncedValue], fetchCustomerId, {
    enabled: !!debouncedValue,
    retry: false,
    onSuccess: (data) => {
      setCustomerId(data);
      data.customer.length > 0 ? setCompany(data.customer[0]) : setCompany(null);
    },
    onError: () => {
      console.error('Failed to fetch customer ID:', error);
      setErrorCustomer(1);
    }
  });

  useEffect(() => {
    if (!debouncedValue) {
      setCustomerId({});
      setCompany({});
      setErrorCustomer(0);
    }
  }, [debouncedValue]);

  return (
    <div className="flex justify-center items-center" style={{ height: '95%' }}>
      {isLoading ? (
        <FullPageSpinner />
      ) : customerId && customerId.customer && customerId.customer.length > 0 ? (
        <></>
      ) : (
        <>
          {customerId && debouncedValue && (
            <ModalTailwind ModalTitle="Error" body="erreur id non valide" />
          )}
        </>
      )}

      <Formik
        initialValues={{
          //Business Information
          customerId: '',
          companyName: '',
          companyPhone: '',
          //personelle Information
          firstName: '',
          lastName: '',
          email: '',
          jobTitle: '',
          password: '',
          confirmPassword: '',

          // Business Address
          firstAdresse: '',
          secondAdresse: '',
          thirdAdresse: '',
          city: '',
          prov: '',
          zip: '',

          acceptedTerms: true, // added for our checkbox
          country: '' // added for our select
        }}
        validationSchema={Yup.object({
          firstName: Yup.string().max(40, 'Must be 40 characters or less').required('Required'),
          kader: Yup.string().max(40, 'Must be 40 characters or less').required('Required'),

          lastName: Yup.string().max(40, 'Must be 40 characters or less').required('Required'),
          jobTitle: Yup.string().max(40, 'Must be 40 characters or less').required('Required'),
          email: Yup.string().email('Invalid email address').required('Required'),
          password: Yup.string()
            .required('Please enter a password')
            .min(8, 'Password must have at least 8 characters')
            .matches(/[0-9]/, getCharacterValidationError('digit'))
            .matches(/[a-z]/, getCharacterValidationError('lowercase'))
            .matches(/[A-Z]/, getCharacterValidationError('uppercase')),
          confirmPassword: Yup.string()
            .required('Please re-type your password')
            .oneOf([Yup.ref('password')], 'Passwords do not match'),
          acceptedTerms: Yup.boolean()
            .required('Required')
            .oneOf([true], 'You must accept the terms and conditions.'),
          country: Yup.string()
            .oneOf(['designer', 'development', 'product', 'other'], 'Invalid Job Type')
            .required('Required')
        })}
        onSubmit={(values, { setSubmitting }) => {
          console.log(values);
          setSubmitting(false);
        }}>
        {({ isSubmitting, isValid, dirty }) => (
          <Form className="h-full w-full" onSubmit={handleSubmit}>
            <div className={`flex justify-center items-center h-full ${customClass} `}>
              <CardShadow
                customClass={` w-11/12  p-4 h-max shadow-md bg-white bg-opacity-60 flex flex-col lg:flex-row lg:space-x-4 gap-3 `}>
                <div className=" h-full text-white p-4 lg:w-5/12">
                  <SimpleWhiteCard title="Business Information">
                    <MyTextInput
                      label="Customer ID"
                      name="id"
                      type="number"
                      placeholder="9348219"
                      autoFocus
                      onChange={(e) => setInputValue(e.target.value)}
                      // onChange={(e) => console.log(e.target.value)}
                    />
                    <MyTextInput
                      label="Company Name"
                      name="companyName"
                      type="text"
                      placeholder="Meta"
                      value={company?.name || ''}
                      onChange={(e) => setCompany(e.target.value)}
                    />
                    <MyTextInput
                      label="Company Number"
                      name="companyPhone"
                      type="number"
                      placeholder="1 234 432 235"
                      value={company?.num || ''}
                      onChange={(e) => setCompany(e.target.value)}
                    />
                  </SimpleWhiteCard>
                  <SimpleWhiteCard title="personelle Information">
                    <div className="flex space-x-4">
                      <MyTextInput
                        label="First Name"
                        name="firstName"
                        type="text"
                        placeholder="Jane"
                      />
                      <MyTextInput
                        label="Last Name"
                        name="lastName"
                        type="text"
                        placeholder="Doe"
                      />
                    </div>

                    <MyTextInput
                      label="Email"
                      name="email"
                      type="email"
                      placeholder="jane@formik.com"
                    />
                    <MyTextInput label="job Title" name="jobTitle" type="text" placeholder="RH" />
                    <MyTextInput
                      label="password"
                      name="password"
                      type="password"
                      placeholder="password"
                      // value={password}
                      // onChange={(e) => setPassword(e.target.value)}
                    />

                    <MyTextInput
                      label="comfirmed password"
                      name="confirmPassword"
                      type="password"
                      placeholder="confirmPassword"
                      // value={confirmedPassword}
                      // onChange={(e) => setConfirmedPassword(e.target.value)}
                    />
                  </SimpleWhiteCard>{' '}
                </div>
                <div className=" h-full  p-4 lg:w-7/12">
                  <SimpleWhiteCard title="Business Address">
                    <MyTextInput
                      label="Adresse"
                      name="firstAdresse"
                      type="text"
                      placeholder="Jane123 Rue Maple Ville-de-Québec, QC G1X 3X9"
                    />

                    <MyTextInput
                      label="Adresse 2"
                      name="secondAdresse"
                      type="text"
                      placeholder="optional"
                    />

                    <MyTextInput
                      label="Adresse 3"
                      name="thirdAdresse"
                      type="text"
                      placeholder="optional"
                    />
                    <MyTextInput
                      label="City"
                      name="city"
                      type="text"
                      placeholder="Plateau-Mont-Royal"
                    />
                    <div className="lg:flex lg:flex-row justify-between w-full lg:space-x-6">
                      {' '}
                      <MyTextInput
                        label="Province / State"
                        name="prov"
                        type="text"
                        placeholder="Québec"
                      />
                      <MyTextInput
                        label="Postal / ZIP"
                        name="zip"
                        type="text"
                        placeholder="H2X 1Y6"
                      />
                    </div>
                    <MySelect label="country" name="country">
                      <option value="">Select a country</option>
                      <option value="designer">Designer</option>
                      <option value="development">Developer</option>
                      <option value="product">Product Manager</option>
                      <option value="other">Other</option>
                    </MySelect>
                  </SimpleWhiteCard>{' '}
                  <div className="h-max flex lg:flex-row flex-col items-center justify-center px-4 py-4 lg:py-8 lg:space-y-0 space-y-4 lg:space-x-8">
                    <h1 className="w-max font-medium text-lg">
                      {' '}
                      Is the information correct? If yes, then{' '}
                    </h1>

                    <button
                      type="submit"
                      disabled={isSubmitting || !isValid}
                      className={`w-full px-4 py-2 rounded-md focus:outline-none ${
                        !isValid
                          ? 'bg-gray-400 cursor-not-allowed'
                          : 'bg-green-800 text-white hover:bg-green-700 focus:bg-green-700'
                      }`}>
                      Register now
                    </button>
                  </div>
                </div>
              </CardShadow>
            </div>
          </Form>
        )}
      </Formik>
    </div>
  );
}
