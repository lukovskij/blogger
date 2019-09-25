import React, { useState } from 'react'
import { IonContent, IonItem, IonButton, IonList } from '@ionic/react'
import { Link } from 'react-router-dom'
import { sendDataHandler, validateEmail, validatePassword } from './utils'
import { Formik, Form, Field } from 'formik'

export default function SignIn(props) {
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
                  <Field name="password" type="password" validate={validatePassword} />
                  {errors.password && touched.password && <div>{errors.password}</div>}
                </IonItem>
                <IonButton disabled={!isValidating} type={'submit'} color={'warning'}>
                  Sign In
                </IonButton>
                <IonButton color="success">
                  <Link to={`/auth/signup`}>Registration</Link>
                </IonButton>
              </Form>
            </IonList>
          )}
        </Formik>
      </IonContent>
    </>
  )
}
