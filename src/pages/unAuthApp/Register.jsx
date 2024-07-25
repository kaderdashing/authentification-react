import React from 'react';
import { useAsync } from '../../utils/hooks';
import { useAuth } from '../../context/auth-context.jsx';
import CardResgister from '../../components/CardResgister.jsx';
import { useState } from 'react';
import FullPageSpinner from '@/components/pageRendu/FullPageSpinner';

export default function Register() {
  const { isLoading, isError, error, run } = useAsync();
  const { register } = useAuth();
  const [customToPast, setCustomToPast] = useState(null);
  const onChangeSomeState = (newSomeState) => {
    setCustomToPast(newSomeState);
  };
  async function handleSubmit(event, CustID) {
    const { firstName, password, lastName, jobTitle, email } = { ...event };
    // la function run a besoin d'une promise pour passer du mode deconecter au mode connecter
    await run(
      register({
        email: email,
        password: password,
        customer_id: CustID,
        first_name: firstName,
        last_name: lastName,
        job_title: jobTitle,
        lang: 'fr'
      })
    );
  }
  if (isLoading)
    return (
      <>
        <>
          <div className="h-full">
            <CardResgister
              handleSubmit={handleSubmit}
              onChangeSomeState={onChangeSomeState}
              customClass=" justify-center "
            />
          </div>
          <FullPageSpinner />
        </>{' '}
      </>
    );
  if (isError)
    return (
      <>
        {error}
        <div>{error}</div>
      </>
    );
  return (
    <>
      <div className="h-full">
        <CardResgister
          handleSubmit={handleSubmit}
          onChangeSomeState={onChangeSomeState}
          customClass=" justify-center "
        />
      </div>
    </>
  );
}
