import React, { useState, useEffect } from 'react';
import { Formik, Form, useField, Field, ErrorMessage } from 'formik';
import { useDebouncedValue } from '@/Hook/useDebouncedValue';
import { getCustomerInfo } from '@/utils/callingapi';
import { useQuery } from 'react-query';
import { parseMessage } from '@/Hook/parseMessage';
import { validationShema } from './ValidationSchema';
import CardShadow from '@/components/CardShadow';
import MyTextInput from '@/core/MyTextInput';
import MySelect from '@/core/MySelect';
import SimpleWhiteCard from '@/core/Card/SimpleWhiteCard';
import FullPageSpinner from '@/components/pageRendu/FullPageSpinner';
import ModalTailwind from '@/core/modal/ModalTailwind';

export default function CardRegister({ handleSubmit, customClass }) {
  const [errorCustomer, setErrorCustomer] = useState(false);
  const [inputValue, setInputValue] = useState('');
  const [customerId, setCustomerId] = useState({});
  const [company, setCompany] = useState({});
  const [customerInfo, setCustomerInfo] = useState(null);

  const debouncedValue = useDebouncedValue(inputValue, 1000);

  const fetchCustomerId = async () => {
    try {
      const customerValue = await getCustomerInfo(debouncedValue);
      return customerValue;
    } catch (err) {
      throw new Error('Failed to fetch customer ID');
    }
  };

  const { data, error, isLoading } = useQuery(['customerId', debouncedValue], fetchCustomerId, {
    enabled: !!debouncedValue,
    retry: false,
    onSuccess: (data) => {
      setCustomerId(data);
      setCompany(data);
      const parsedMessage = parseMessage(data);
      setCustomerInfo(parsedMessage);
      setErrorCustomer(false);
    },
    onError: (error) => {
      setErrorCustomer(true);
    }
  });

  useEffect(() => {
    if (customerInfo === null && debouncedValue) {
      setErrorCustomer(true);
    }
  }, [customerInfo, debouncedValue]);

  useEffect(() => {
    if (!debouncedValue) {
      setCustomerId({});
      setCompany({});
      setCustomerInfo(null);
      setErrorCustomer(false);
    }
  }, [debouncedValue]);

  return (
    <div className="flex justify-center items-center" style={{ height: '95%' }}>
      {isLoading ? (
        <FullPageSpinner />
      ) : (
        <>
          {errorCustomer && debouncedValue && (
            <ModalTailwind ModalTitle="Error" body="Erreur ID non valide" />
          )}
        </>
      )}

      <Formik
        initialValues={{
          customerId: '',
          companyName: '',
          companyPhone: '',
          firstName: '',
          lastName: '',
          email: '',
          jobTitle: '',
          password: '',
          confirmPassword: '',
          firstAdresse: '',
          secondAdresse: '',
          thirdAdresse: '',
          city: '',
          prov: '',
          zip: '',
          acceptedTerms: true,
          country: ''
        }}
        validationSchema={validationShema}
        onSubmit={(values, { setSubmitting }) => {
          console.log(values);
          setSubmitting(false);
        }}>
        {({ isSubmitting, isValid }) => (
          <Form className="h-full w-full">
            <div className={`flex justify-center items-center h-full ${customClass}`}>
              <CardShadow
                customClass={`w-11/12 p-4 h-max shadow-md bg-white bg-opacity-60 flex flex-col lg:flex-row lg:space-x-4 gap-3`}>
                <div className="h-full text-white p-4 lg:w-5/12">
                  <SimpleWhiteCard title="Business Information">
                    <MyTextInput
                      label="Customer ID"
                      name="customerId"
                      type="text"
                      placeholder="9348219"
                      autoFocus
                      value={inputValue}
                      onChange={(e) => setInputValue(e.target.value)}
                    />
                    <MyTextInput
                      label="Company Name"
                      name="companyName"
                      type="text"
                      placeholder="Meta"
                      value={customerInfo?.Name || ''}
                      onChange={(e) => setCompany(e.target.value)}
                    />
                    <MyTextInput
                      label="Company Number"
                      name="companyPhone"
                      type="number"
                      placeholder="1 234 432 235"
                      value={customerInfo?.Company || ''}
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
                    />
                    <MyTextInput
                      label="confirm password"
                      name="confirmPassword"
                      type="password"
                      placeholder="confirm password"
                    />
                  </SimpleWhiteCard>
                </div>
                <div className="h-full p-4 lg:w-7/12">
                  <SimpleWhiteCard title="Business Address">
                    <MyTextInput
                      label="Adresse"
                      name="firstAdresse"
                      type="text"
                      placeholder="123 Rue Maple"
                      value={customerInfo?.Address1 || ''}
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
                    <div className="lg:flex lg:flex-row justify-between w-full lg:space-x-6">
                      <MyTextInput
                        label="City"
                        name="city"
                        type="text"
                        placeholder="Plateau-Mont-Royal"
                        value={customerInfo?.City || ''}
                      />
                      <MyTextInput
                        label="Phone"
                        name="PhoneNum"
                        type="text"
                        placeholder="Phone Number"
                        value={customerInfo?.PhoneNum || ''}
                      />
                    </div>
                    <div className="lg:flex lg:flex-row justify-between w-full lg:space-x-6">
                      <MyTextInput
                        label="Province / State"
                        name="prov"
                        type="text"
                        placeholder="Québec"
                        value={customerInfo?.State || ''}
                      />
                      <MyTextInput
                        label="Postal / ZIP"
                        name="zip"
                        type="text"
                        placeholder="H2X 1Y6"
                      />
                    </div>
                    <MySelect label="country" name="country">
                      <option value={customerInfo?.Country || ''}>
                        {customerInfo?.Country || 'Select a country'}
                      </option>
                      <option value="USA">USA</option>
                      <option value="ALLEMAGENE">ALLEMAGENE</option>
                      <option value="FRANCE">FRANCE</option>
                      <option value="CANADA">CANADA</option>
                      <option value="other">Other</option>
                    </MySelect>
                  </SimpleWhiteCard>
                  <div className="h-max flex lg:flex-row flex-col items-center justify-center px-4 py-4 lg:py-8 lg:space-y-0 space-y-4 lg:space-x-8">
                    <h1 className="w-max font-medium text-lg">
                      Is the information correct? If yes, then
                    </h1>
                    <button
                      type="submit"
                      disabled={isSubmitting || !isValid}
                      className={`w-full px-4 py-2 rounded-md focus:outline-none ${!isValid || isSubmitting ? 'bg-gray-400 cursor-not-allowed' : 'bg-green-800 text-white hover:bg-green-700 focus:bg-green-700'}`}>
                      {isSubmitting} -- {isValid}
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
