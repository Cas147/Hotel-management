import {FC, useState} from 'react'
import { useRouter } from 'next/router'

// Redux & Actions
import { useAppDispatch } from "@/utility/hooks"
import {handleLogin} from '@/src/redux/slices/user';

import styles from  '@/styles/login.module.css'

// Third Party
import { Formik, Form, Field } from 'formik';
import * as Yup from 'yup';
import {Facebook, GitHub, Instagram} from 'react-feather';


interface PageProps {}

const Page: FC<PageProps> = ({}) => {
  const router = useRouter()
  const dispatch = useAppDispatch()

  const [isLogin, setIsLogin] = useState<boolean>(false)

  const DisplayingErrorMessagesSchema = Yup.object().shape({
   hotelName: Yup.string()
     .min(2, 'Too Short!')
     .max(50, 'Too Long!')
     .required('Required'),
    email: Yup.string().email('Invalid email').required('Required'),
    password: Yup.string()
     .min(2, 'Too Short!')
     .required('Required'),
  });

  const DisplayingErrorMessagesSchemaNormal = Yup.object().shape({
    email: Yup.string().email('Invalid email').required('Required'),
    password: Yup.string()
     .min(2, 'Too Short!')
     .required('Required'),
  });


  return (
    <div className={styles.loginContainer}>
      <div className={`${styles.Container} ${isLogin ? styles.rightPanelActive : ""}`} id="container">
        <div className={`${styles.mainFormContainer} ${styles.signUpContainer}`}>
          <div  className={styles.formContainer}>
            <h1 className={styles.title}>Create Account</h1>
            <div className={styles.socialContainer}>
              <a href="https://github.com/Cas147"  target='_blank' className={styles.social}><GitHub/></a>
              <a href="#" className={styles.social}><Facebook/></a>
              <a href="#" className={styles.social}><Instagram/></a>
            </div>
            <span className={styles.textContent}>or use your email for registration</span>

            <Formik
              initialValues={{
                hotelName: '',
                email: '',
                password: "",
              }}
              validationSchema={DisplayingErrorMessagesSchema}
              onSubmit={values => {
                dispatch(handleLogin({
                  id: 2,
                  email: values.email,
                  loginType: 1,
                  userName: values.hotelName
                }))
                router.push('/Home')
              }}
            >
              {({ errors, touched }) => (
                <Form style={{width: "100%"}}>
                  <Field
                    className={styles.inputContainer} 
                    type="text" 
                    placeholder="Hotel name" 
                    name="hotelName"
                  />
                  {errors.hotelName && touched.hotelName && <p className='text-red-500'>{errors.hotelName}</p>}

                  <Field
                    className={styles.inputContainer} 
                    type="email" 
                    placeholder="Email" 
                    name="email"
                  />
                  {errors.email && touched.email && <p className='text-red-500'>{errors.email}</p>}

                  <Field
                    className={styles.inputContainer} 
                    type="password" 
                    placeholder="password" 
                    name="password"
                  />
                  {errors.password && touched.password && <p className='text-red-500'>{errors.password}</p>}

                  <button 
                    className={styles.mainButton}
                    type="submit"
                    >
                      Sign In
                  </button>
                </Form>
              )}
            </Formik>
          </div>
        </div>
        <div className={`${styles.mainFormContainer} ${styles.signInContainer}`}>
          <div className={styles.formContainer} >
            <h1 className={styles.title}>Sign in</h1>
            <div className={styles.socialContainer}>
              <a href="https://github.com/Cas147"  target='_blank' className={styles.social}><GitHub/></a>
              <a href="#" className={styles.social}><Facebook/></a>
              <a href="#" className={styles.social}><Instagram/></a>
            </div>
            <span className={styles.textContent}>or use your account</span>
            <Formik
              initialValues={{
                email: '',
                password: "",
              }}
              validationSchema={DisplayingErrorMessagesSchemaNormal}
              onSubmit={values => {
                dispatch(handleLogin({
                  id: 1,
                  email: values.email,
                  loginType: 0
                }))
                router.push('/Home')
              }}
            >
              {({ errors, touched }) => (
                <Form style={{width: "100%"}}>
                  <Field
                    className={styles.inputContainer} 
                    type="email" 
                    placeholder="Email" 
                    name="email"
                  />
                  {errors.email && touched.email && <p className='text-red-500'>{errors.email}</p>}

                  <Field
                    className={styles.inputContainer} 
                    type="password" 
                    placeholder="password" 
                    name="password"
                  />
                  {errors.password && touched.password && <p className='text-red-500'>{errors.password}</p>}

                  <button 
                    className={styles.mainButton}
                    type="submit"
                    >
                      Sign In
                  </button>
                </Form>
              )}
            </Formik>
            <a className={styles.forgotPassword} href="#">Forgot your password?</a>
          </div>
        </div>
        <div className={styles.overlayContainer}>
          <div className={styles.overlay}>
            <div className={`${styles.overlaPanel} ${styles.overlayLeft}`}>
              <h1 className={styles.title}>Welcome Back Traveler!</h1>
              <p className={styles.paragraph}>To discover new amazing places enter your personal details</p>
              <button 
                className={`${styles.mainButton} ${styles.ghost}`}
                id="signIn"
                onClick={() => setIsLogin(false)}
                >
                  Sign In as a traveler
                </button>
            </div>
            <div className={`${styles.overlaPanel} ${styles.overlayRight}`}>
              <h1 className={styles.title}>Hello</h1>
              <p className={styles.paragraph}>Enter your Hotel details and keep conected with your guests</p>
              <button 
                className={`${styles.mainButton} ${styles.ghost}`}
                id="signUp"
                onClick={() => setIsLogin(true)}
                >
                  Sign in as an Hotel
                </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Page
