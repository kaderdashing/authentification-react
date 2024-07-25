import React from 'react';
import { useAsync } from '../../utils/hooks';
import { useAuth } from '../../context/auth-context.jsx';
import CardLogin from '../../components/CardLogin.jsx';
import Toast from '@/core/Toast/Toast';
import { useState } from 'react';

export default function Login() {
  const { isLoading, isError, error, run } = useAsync();
  const { login } = useAuth();
  const [toastVisible, setToastVisible] = useState(true);
  async function handleSubmit(event) {
    event.preventDefault();
    const { email, password } = event.target.elements;
    await run(
      login({
        email: email.value,
        password: password.value
      })
    );
  }

  const handleCloseToast = () => {
    setToastVisible(false);
  };
  if (isLoading) {
    return (
      <div className="w-full h-full">
        <div className="flex justify-center items-center">
          <div className="w-16 h-16 border-4 border-dashed rounded-full animate-spin border-blue-500"></div>
        </div>{' '}
      </div>
    );
  }

  return (
    <div>
      {isError && toastVisible && (
        <div>
          <Toast
            message="Incorrect email or password."
            duration={5000}
            onClose={handleCloseToast}
          />
        </div>
      )}
      <CardLogin
        handleSubmit={handleSubmit}
        customClass="lg:justify-end justify-center "
        errorMessage={isError ? 'errorMessage' : ''}
      />
    </div>
  );
}
