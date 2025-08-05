import { GoogleOAuthProvider, GoogleLogin } from '@react-oauth/google';

function SignInWithGoogle() {
  const handleSuccess = async (credentialResponse) => {
    // Send credentialResponse.credential to your backend for verification and JWT/session creation
    console.log('Google login successful:', credentialResponse);
  };
  const handleError = () => {
    alert('Google login failed');
  };

  return (
    <GoogleLogin 
      onSuccess={handleSuccess}
      onError={handleError}
      theme="filled_black"
      width="300px"
    />
  );
}

// At your app root
<GoogleOAuthProvider clientId={process.env.REACT_APP_GOOGLE_CLIENT_ID}>
  <SignInWithGoogle />
</GoogleOAuthProvider>
