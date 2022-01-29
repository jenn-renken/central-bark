import React, { useState } from 'react';
import { useMutation } from '@apollo/client';
import { LOGIN_USER } from '../utils/mutations';
import Auth from '../utils/auth';

const Login = (props) => {
  const [formState, setFormState] = useState({ email: '', password: '' });

const [login, { error }] = useMutation(LOGIN_USER);

  // update state based on form input changes
  const handleChange = (event) => {
    const { name, value } = event.target;

    setFormState({
      ...formState,
      [name]: value,
    });
  };

  // submit form
  const handleFormSubmit = async (event) => {
    event.preventDefault();

    try {
      const { data } = await login({
        variables: { ...formState }
      });
      Auth.login(data.login.token);
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <main className='flex-row justify-center mb-4'>
        <div className='section'>
          <h4 className='title is-3'>Login</h4>
            <form onSubmit={handleFormSubmit}>
              <div className='field'>
                <input
                  className='input'
                  placeholder='Your email'
                  name='email'
                  type='email'
                  id='email'
                  value={formState.email}
                  onChange={handleChange}
                />
              </div>
              <div className='field'>
                <input
                  className='input'
                  placeholder='Password'
                  name='password'
                  type='password'
                  id='password'
                  value={formState.password}
                  onChange={handleChange}
                />
              </div>
              <button className='button is-primary' type='submit'>
                Submit
              </button>
            </form>
            {error && <div>Login failed</div>}
        </div>
    </main>
  );
};

export default Login;
