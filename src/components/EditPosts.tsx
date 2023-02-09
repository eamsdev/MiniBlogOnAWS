import { AmplifyProvider, Authenticator } from '@aws-amplify/ui-react';
import '@aws-amplify/ui-react/styles.css';
import { API } from 'aws-amplify';
import { useState } from 'react';

export const EditPosts = () => {
  // API.get('apia4e440b0', '/posts', {})
  //   .then((result) => {
  //     console.log(result.data);
  //   })
  //   .catch((err) => {
  //     console.error(err);
  //   });

  // API.post('apia4e440b0', '/posts', {
  //   body: {
  //     id: 'todo-1',
  //   },
  // })
  //   .then((result) => {
  //     console.log(result);
  //   })
  //   .catch((err) => {
  //     console.error(err);
  //   });
  return (
    <AmplifyProvider>
      <Authenticator hideSignUp loginMechanisms={['email']}>
        {({ signOut, user }) => (
          <>
            <h1>Hello {user.username}</h1>
            <button onClick={signOut}>Sign out</button>
          </>
        )}
      </Authenticator>
    </AmplifyProvider>
  );
};
