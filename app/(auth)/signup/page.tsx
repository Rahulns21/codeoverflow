'use client';
import AuthForm from "@/components/forms/AuthForm";
import { SignUpSchema } from "@/lib/validations";

const SignUp = () => {
  return (
    <AuthForm
      formType="SIGN_UP"
      schema={SignUpSchema}
      defaultValues={{ email: '', password: '', name: '', username: ''}}
      fields={[
        { name: 'email', label: 'Email Address', type: 'email' },
        { name: 'password', label: 'Password', type: 'password' },
        { name: 'name', label: 'Name', type: 'text' },
        { name: 'username', label: 'Username', type: 'text'}
      ]}
      onSubmit={(data) => Promise.resolve({ success: true,
      data })}
    />
  )
};

export default SignUp;