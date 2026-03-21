'use client';
import AuthForm from '@/components/forms/AuthForm';
import { SignInSchema } from '@/lib/validations';

const SignIn = () => {
  return (
    <AuthForm 
      formType="SIGN_IN"
      schema={SignInSchema}
      fields={[
        { name: 'email', label: 'Email Address', type: 'email' },
        { name: 'password', label: 'Password', type: 'password'}
      ]}
      defaultValues={{ email: '', password: ''}}
      onSubmit={(data) => Promise.resolve({ success: true,
      data })}
    />
  )
}

export default SignIn;