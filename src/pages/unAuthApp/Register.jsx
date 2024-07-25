import React from 'react';
import { useAsync } from '../../utils/hooks';
import { useAuth } from '../../context/auth-context.jsx';
import CardResgister from '../../components/CardResgister.jsx';
import { useState } from 'react';

export default function Register() {
  const { isLoading, isError, error, run } = useAsync();
  const { register } = useAuth();
  const [customToPast, setCustomToPast] = useState(null);
  const onChangeSomeState = (newSomeState) => {
    setCustomToPast(newSomeState);
  };
  function handleSubmit(event, CustID) {
    // event.preventDefault();
    // console.log({ ...event });
    // console.log({ someOne: someOne });
    const { firstName, password, lastName, jobTitle, email } = { ...event };
    // console.log({
    //   firstName: firstName,
    //   password: password,
    //   lastName: lastName,
    //   jobTitle: jobTitle,
    //   customerId: CustID,
    //   email: email
    // });
    // la function run a besoin d'une promise pour passer du mode deconecter au mode connecter
    run(
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
        loading ...... <div> ........loading</div>
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
    <div className="h-full">
      <CardResgister
        handleSubmit={handleSubmit}
        onChangeSomeState={onChangeSomeState}
        customClass=" justify-center "
      />
    </div>
  );
}
