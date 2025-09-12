import { Formik, Form, Field, ErrorMessage } from "formik";
import { CustomAccordion } from "../components/customAccordion";
import FieldItem from "./rawComponents/fieldItem";
import * as Yup from "yup";
import SaveButton from "./rawComponents/saveButton";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";
import { useEffect, useState } from "react";
import { getAllCities, postPersonalInfo } from "../apis/mainApi";
import ShowAlert from "../components/showSuccessFullMsg";

const PersonalInfo = ({ profileDataApi }) => {
  const [countryDigit, setCountryDigit] = useState("");
  const [cities, setCities] = useState([]);
  const [showAlert, setShowAlert] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const initialValues = profileDataApi
    ? profileDataApi
    : {
        jobTitle: "",
        firstName: "",
        lastName: "",
        countryCode: "",
        phoneNumber: "",
        city: "",
        email: "",
        linkedinLink: "",
        gitHubLink: "",
        countryDigit: "",
      };
  useEffect(() => {
    if (profileDataApi?.countryDigit) {
      setCountryDigit(profileDataApi.countryDigit.toUpperCase());
      getAllCities(profileDataApi.countryDigit.toUpperCase()).then((res) => {
        setCities(res.data);
      });
    }
  }, [profileDataApi?.countryDigit]);

  useEffect(() => {
    if (countryDigit) {
      getAllCities(countryDigit).then((res) => {
        console.log(res.data);
        setCities(res.data);
      });
    }
  }, [countryDigit]);
  const updatePersonalInfo = (values) => {
    setIsSaving(true)
    const dataForSubmit = {
      first_name: values.firstName,
      last_name: values.lastName,
      dev_title: values.jobTitle,
      country: values.countryCode,
      mobile: values.phoneNumber,
      email: values.email,
      city: values.city,
      github_url: values.gitHubLink,
      linkedin_url: values.linkedinLink,
    };
    postPersonalInfo(dataForSubmit)
      .then((res) => {
        setShowAlert(true);
        setIsSaving(false);
      })
      .catch((err) => {
        alert(err);
        setIsSaving(false);
      });
  };

  const validationSchema = Yup.object({
    jobTitle: Yup.string().required("Job Title is required"),
    firstName: Yup.string().required("First name is required"),
    lastName: Yup.string().required("Last name is required"),
    phoneNumber: Yup.string().required("Phone number is required"),
    city: Yup.string().required("City is required"),
    email: Yup.string().email().required("Email is required"),
  });

  return (
    <CustomAccordion title="Personal Info">
      {showAlert && (
        <ShowAlert section="personalInfo" onClose={() => setShowAlert(false)} />
      )}
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        enableReinitialize
        onSubmit={(values) => updatePersonalInfo(values)}
      >
        {({ values, setFieldValue }) => (
          <Form>
            <div>
              <FieldItem type="text" name="jobTitle" placeholder="Job Title" />

              <div className="flex gap-4">
                <FieldItem
                  type="text"
                  name="firstName"
                  placeholder="First name"
                />
                <FieldItem
                  type="text"
                  name="lastName"
                  placeholder="Last name"
                />
              </div>
              <PhoneInput
                country={"bh"}
                value={values.phoneNumber}
                onChange={(phone, phoneObject, event) => {
                  setFieldValue("countryCode", phoneObject.dialCode);
                  setFieldValue("phoneNumber", phone);
                  setCountryDigit(phoneObject.countryCode.toUpperCase());
                }}
                placeholder="Enter phone number"
                className="country-selector-style"
                inputStyle={{
                  fontSize: "15px",
                  border: "none",
                  width: "100%",
                }}
                buttonStyle={{
                  backgroundColor: "yellow",
                  border: "none",
                  background: "transparent",
                }}
              />
              <ErrorMessage
                name="phoneNumber"
                component="div"
                className="text-[12px] text-[#e97979] mt-1"
              />

              <div className="flex gap-4 items-center">
                <div className="flex flex-col w-1/2">
                  <Field
                    as="select"
                    name="city"
                    className="border rounded-xl p-3 text-gray-900 "
                  >
                    <option value="" disabled hidden className="text-gray-200">
                      City
                    </option>
                    {cities?.map((city) => (
                      <option key={city.id} value={city.name}>
                        {city.name}
                      </option>
                    ))}
                  </Field>
                  <ErrorMessage
                    name="city"
                    component="div"
                    className="text-[12px] text-[#e97979] mt-1"
                  />
                </div>

                <FieldItem type="email" name="email" placeholder="Email" />
              </div>
              <h3 className="text-[15px] font-bold mt-4 mx-1">Links</h3>
              <FieldItem
                type="text"
                name="linkedinLink"
                placeholder="LinkedIn URL"
              />
              <FieldItem
                type="text"
                name="gitHubLink"
                placeholder="GitHub URL"
              />
              <SaveButton isSaving={isSaving} />
            </div>
          </Form>
        )}
      </Formik>
    </CustomAccordion>
  );
};

export default PersonalInfo;
