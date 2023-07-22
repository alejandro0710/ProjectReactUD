import React, { useState } from "react";
import {
  BrowserRouter as Router,
  Route,
  Link,
  Routes,
  useParams,
  useNavigate,
} from "react-router-dom";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import "./App.css";

interface FormValues {
  step1: string;
  step2: string;
  step3: string;
  step4: string;
  step5: string;
}

const initialValues: FormValues = {
  step1: "",
  step2: "",
  step3: "",
  step4: "",
  step5: "",
};

const validationSchema = Yup.object({
  step1: Yup.string().required("Este campo es obligatorio"),
  step2: Yup.string().required("Este campo es obligatorio"),
  step3: Yup.string().required("Este campo es obligatorio"),
  step4: Yup.string().required("Este campo es obligatorio"),
  step5: Yup.string().required("Este campo es obligatorio"),
});

interface StepIndicatorProps {
  currentStep: number;
}

const StepIndicator: React.FC<StepIndicatorProps> = ({ currentStep }) => {
  return (
    <div>
      {[1, 2, 3, 4, 5].map((step) => (
        <span
          key={step}
          style={{
            margin: "0.5rem",
            padding: "0.5rem",
            border: "1px solid",
            borderRadius: "20%",
            background:
              step === currentStep
                ? "gray"
                : step < currentStep
                ? "green"
                : step > currentStep
                ? "red"
                : "transparent",
          }}
        >
          {step}
        </span>
      ))}
    </div>
  );
};

interface SummaryProps {
  values: FormValues | null;
}

const Summary: React.FC<SummaryProps> = ({ values }) => {
  return (
    <div>
      <h2>Resumen</h2>
      <p>Step 1: {values?.step1}</p>
      <p>Step 2: {values?.step2}</p>
      <p>Step 3: {values?.step3}</p>
      <p>Step 4: {values?.step4}</p>
      <p>Step 5: {values?.step5}</p>
    </div>
  );
};

interface StepFormProps {
  setFormValues: (values: FormValues) => void;
}

const StepForm: React.FC<StepFormProps> = ({ setFormValues }) => {
  const { step } = useParams<{ step: string | undefined }>();
  const history = useNavigate();
  const currentStep = parseInt(step || "1", 10);

  return (
    <div className="contentForm">
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={(values, { setSubmitting }) => {
          setTimeout(() => {
            if (currentStep < 5) {
              const nextStep = currentStep + 1;
              history(`/form/${nextStep}`);
            } else {
              console.log("Form submitted", values);
              setFormValues(values);
              history("/summary");
            }
            setSubmitting(false);
          }, 400);
        }}
      >
        {({ values, setFieldValue, isSubmitting }) => (
          <Form>
            <StepIndicator currentStep={currentStep} />
            <div>
              <h2>Información</h2>
              <Field type="text" name={`step${currentStep}`} required />
              <ErrorMessage name={`step${currentStep}`} component="div" />
              {currentStep < 5 ? (
                <button
                  type="button"
                  onClick={() => history(`/form/${currentStep + 1}`)}
                  disabled={
                    isSubmitting || !values[`step${currentStep}`].trim()
                  }
                >
                  Siguente
                </button>
              ) : (
                <button type="submit" disabled={isSubmitting}>
                  Enviar
                </button>
              )}
            </div>
            {currentStep > 1 && (
              <button
                type="button"
                onClick={() => {
                  const prevStep = currentStep - 1;
                  setFieldValue(
                    `step${currentStep}`,
                    values[`step${prevStep}`]
                  );
                  history(`/form/${prevStep}`);
                }}
              >
                Previous
              </button>
            )}
          </Form>
        )}
      </Formik>
    </div>
  );
};

const Main: React.FC = () => {
  const [formValues, setFormValues] = useState<FormValues | null>(null);

  return (
    <Router>
      <div className="App">
        <nav className="barNav">
          <Link className="liBarNav" to="/">
            Inicio
          </Link>
          <Link className="liBarNav" to="/form/1">
            Formulario
          </Link>
          <Link className="liBarNav" to="/login">
            Extra
          </Link>
        </nav>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route
            path="/form/:step"
            element={<StepForm setFormValues={setFormValues} />}
          />
          <Route path="/summary" element={<Summary values={formValues} />} />
        </Routes>
      </div>
    </Router>
  );
};

const Home: React.FC = () => {
  return (
    <div className="contentSection">
      <h3>Descripcion del Proyecto</h3>
      <p>
        Este proyecto es una aplicación web desarrollada en React con TypeScript
        y React Router. La aplicación guía al usuario a través de un formulario
        de varios pasos, donde cada paso requiere el llenado de un campo
        obligatorio. Los datos ingresados en el formulario se validan utilizando
        el esquema de validación de Yup. Al completar todos los pasos, se
        muestra un resumen de los datos ingresados antes de enviarlos. La
        aplicación también cuenta con una página de inicio y una página de
        inicio de sesión, implementadas utilizando React Router para la
        navegación entre diferentes rutas.
      </p>
    </div>
  );
};

const Login: React.FC = () => {
  return (
    <div className="contentSection">
      <h3>Nota</h3>
      <p>
        Agradezco tu comprensión y te aseguro que tomaré esta experiencia como
        una oportunidad para mejorar mis habilidades y conocimientos en el
        desarrollo de proyectos más sofisticados y completos. Si tienes alguna
        otra solicitud o proyecto en el futuro, estaré encantado de trabajar en
        ello para ofrecer un producto más satisfactorio.
      </p>
    </div>
  );
};

export default Main;
