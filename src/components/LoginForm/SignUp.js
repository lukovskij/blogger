import React from 'react'
import { Link } from 'react-router-dom'
import { IonContent, IonItem, IonButton, IonList } from '@ionic/react'
import { sendDataHandler, validateEmail, validatePassword, validateUsername } from './utils'
import { Formik, Form, Field } from 'formik'

export default function SignUp(props) {
  return (
    <>
      <IonContent padding>
        <Formik
          initialValues={{ email: '', password: '' }}
          onSubmit={({ email, password }) => {
            console.log(email, password, props)
            sendDataHandler({ email, password }, props)()
          }}
        >
          {({ errors, touched, isValidating }) => (
            <IonList>
              <Form>
                <IonItem>
                  <Field name="email" validate={validateEmail} />
                  {errors.email && touched.email && <div>{errors.email}</div>}
                </IonItem>
                <IonItem>
                  <Field name="password" type="password" validate={validateUsername} />
                  {errors.username && touched.password && <div>{errors.username}</div>}
                </IonItem>
                <IonItem>
                  <Field name="password" type="password" validate={validatePassword} />
                  {errors.password && touched.password && <div>{errors.password}</div>}
                </IonItem>
                <IonButton type="submit" color="primary" disabled={!isValidating}>
                  Sign Up
                </IonButton>
                <IonButton color="success">
                  <Link to="/auth/signin">Login</Link>
                </IonButton>
              </Form>
            </IonList>
          )}
        </Formik>
      </IonContent>
    </>
  )
}
