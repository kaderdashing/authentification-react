import React from 'react';
import { useAsync } from '../../utils/hooks';
import { useAuth } from '../../context/auth-context.jsx';
import CardResgister from '../../components/CardResgister.jsx';

export default function Register() {
  const { isLoading, isError, error, run } = useAsync();
  const { register } = useAuth();

  function handleSubmit(event) {
    console.log('je suis la function de handel submit du register et je marche ');
    event.preventDefault();
    const { firstName, password } = event.target.elements;
    console.log({ firstName: firstName.value, password: password.value });
    // la function run a besoin d'une promise pour passer du mode deconecter au mode connecter
    run(
      register({
        username: firstName.value,
        password: password.value
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
      <CardResgister handleSubmit={handleSubmit} customClass=" justify-center " />
    </div>
  );
}
