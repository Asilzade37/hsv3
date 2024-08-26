import React from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { register } from '../services/api';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import '../styles/Register.scss';

const RegisterSchema = Yup.object().shape({
  firstName: Yup.string().required('İsim gerekli'),
  lastName: Yup.string().required('Soyisim gerekli'),
  email: Yup.string().email('Geçerli bir e-posta adresi girin').required('E-posta gerekli'),
  password: Yup.string().min(6, 'Şifre en az 6 karakter olmalı').required('Şifre gerekli'),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref('password'), null], 'Şifreler eşleşmiyor')
    .required('Şifre onayı gerekli'),
});

const Register = () => {
  const navigate = useNavigate();

  return (
    <div className="register">
      <h1>Üye Ol</h1>
      <Formik
        initialValues={{ firstName: '', lastName: '', email: '', password: '', confirmPassword: '' }}
        validationSchema={RegisterSchema}
        onSubmit={async (values, { setSubmitting, setFieldError }) => {
          try {
            const response = await register(values);
            console.log('Kayıt başarılı:', response.data);
            toast.success('Kaydınız oluşturuldu. Giriş yapabilirsiniz.', {
              onClose: () => navigate('/login')
            });
          } catch (error) {
            console.error('Kayıt hatası:', error);
            if (error.response && error.response.data) {
              setFieldError('email', error.response.data.msg);
              toast.error(error.response.data.msg);
            } else {
              setFieldError('email', 'Kayıt sırasında bir hata oluştu');
              toast.error('Kayıt sırasında bir hata oluştu');
            }
          }
          setSubmitting(false);
        }}
      >
        {({ isSubmitting }) => (
          <Form>
            <div className="form-group">
              <label htmlFor="firstName">İsim</label>
              <Field type="text" name="firstName" />
              <ErrorMessage name="firstName" component="div" className="error" />
            </div>

            <div className="form-group">
              <label htmlFor="lastName">Soyisim</label>
              <Field type="text" name="lastName" />
              <ErrorMessage name="lastName" component="div" className="error" />
            </div>

            <div className="form-group">
              <label htmlFor="email">E-posta</label>
              <Field type="email" name="email" />
              <ErrorMessage name="email" component="div" className="error" />
            </div>

            <div className="form-group">
              <label htmlFor="password">Şifre</label>
              <Field type="password" name="password" />
              <ErrorMessage name="password" component="div" className="error" />
            </div>

            <div className="form-group">
              <label htmlFor="confirmPassword">Şifre Onayı</label>
              <Field type="password" name="confirmPassword" />
              <ErrorMessage name="confirmPassword" component="div" className="error" />
            </div>

            <button type="submit" disabled={isSubmitting}>
              {isSubmitting ? 'Kaydediliyor...' : 'Üye Ol'}
            </button>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default Register;