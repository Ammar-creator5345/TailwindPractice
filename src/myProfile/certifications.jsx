import { Formik, Form, Field, ErrorMessage, FieldArray } from "formik";
import { CustomAccordion } from "../components/customAccordion";
import { certificatesValidation } from "../components/validationSchema";
import SaveButton from "./rawComponents/saveButton";
import { TextField } from "@mui/material";
import FieldItem from "./rawComponents/fieldItem";
import { MdDeleteForever } from "react-icons/md";
import { useEffect, useState } from "react";
import {
  deleteCertificate,
  getCertificates,
  postCertificate,
  putCertificate,
} from "../apis/mainApi";
import ShowAlert from "../components/showSuccessFullMsg";

const Certificates = ({ setAccordions, comingCertificates }) => {
  const [certificates, setCertificates] = useState([]);
  const [showAlert, setShowAlert] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  useEffect(() => {
    const formattedCertificates = comingCertificates?.map((value) => ({
      id: value?.id || "",
      certificateTitle: value?.title || "",
      dateAwarded: value?.date_awarded || "",
      organizationName: value?.organization || "",
      description: value?.description || "",
    }));
    setCertificates(formattedCertificates);
  }, [comingCertificates]);

  const initialValues = {
    certificates: certificates.length
      ? certificates
      : [
          {
            id: "",
            certificateTitle: "",
            dateAwarded: "",
            organizationName: "",
            description: "",
          },
        ],
  };
  const deleteAccordion = () => {
    setAccordions((prev) => prev.filter((acc) => acc !== "certificates"));
  };
  const textField_style = {
    "& .MuiOutlinedInput-root": {
      borderRadius: "15px",
      "& fieldset": {
        borderColor: "#e2e8f0",
      },
      "&:hover fieldset": {
        borderColor: "#e2e8f0",
      },
      "&.Mui-focused fieldset": {
        borderColor: "#e2e8f0",
      },
    },
    "& .MuiFormHelperText-root": {
      color: "#e97979",
      margin: "10px 0 0 0",
    },
  };

  const updateCertificates = async (values) => {
    setIsSaving(true);
    const allRequests = [];
    const previosCertificates = await getCertificates();
    const previosCertificatesIds = previosCertificates?.data?.data.map(
      (certificate) => certificate.id
    );
    const currentCertificatesIds = values.certificates
      .map((certificate) => certificate.id)
      .filter(Boolean);
    const idsForDeletion = previosCertificatesIds.filter(
      (id) => !currentCertificatesIds.includes(id)
    );
    idsForDeletion.forEach((id) => {
      allRequests.push(deleteCertificate(id));
    });
    values?.certificates.map((certificate) => {
      const dataForSubmit = {
        title: certificate.certificateTitle,
        description: certificate.description,
        date_awarded: certificate.dateAwarded,
        organization: certificate.organizationName,
      };
      if (certificate.id) {
        allRequests.push(putCertificate(dataForSubmit, certificate.id));
      } else {
        allRequests.push(postCertificate(dataForSubmit));
      }
    });
    Promise.all(allRequests)
      .then(() => {
        setShowAlert(true);
        setIsSaving(false);
      })
      .catch((err) => {
        alert(err);
      });
  };
  return (
    <CustomAccordion
      title="Certificates"
      deleteFeature={true}
      handleDeleteAccordion={deleteAccordion}
    >
      {showAlert && (
        <ShowAlert section="certificates" onClose={() => setShowAlert(false)} />
      )}
      <Formik
        initialValues={initialValues}
        validationSchema={certificatesValidation}
        enableReinitialize
        onSubmit={(values) => updateCertificates(values)}
      >
        {({ values, setFieldTouched, setFieldValue, errors, touched }) => (
          <Form>
            <FieldArray name="certificates">
              {({ push, remove }) => (
                <>
                  {values?.certificates.map((value, index) => (
                    <div className="mb-4" key={index}>
                      <div className="flex items-center gap-2">
                        <span>{index + 1}.</span>
                        <MdDeleteForever
                          onClick={() => remove(index)}
                          size={25}
                          color="gray"
                        />
                      </div>
                      <FieldItem
                        type="text"
                        placeholder="Certificate Title"
                        name={`certificates[${index}].certificateTitle`}
                      />{" "}
                      <div className="w-full flex gap-2 items-center flex-1 sm:gap-3 md:gap-4">
                        <TextField
                          type="date"
                          placeholder="Date Awarded"
                          label=""
                          slotProps={{ shrink: false }}
                          sx={{ width: "90%", ...textField_style }}
                          value={values.certificates[index].dateAwarded}
                          onBlur={() =>
                            setFieldTouched(
                              `certificates[${index}].dateAwarded`,
                              true
                            )
                          }
                          onChange={(e) =>
                            setFieldValue(
                              `certificates[${index}].dateAwarded`,
                              e.target.value
                            )
                          }
                          helperText={
                            touched.certificates?.[index]?.dateAwarded &&
                            errors.certificates?.[index]?.dateAwarded
                          }
                        />
                        <FieldItem
                          type="text"
                          placeholder="Organization Name"
                          name={`certificates[${index}].organizationName`}
                        />
                      </div>
                      <div className="relative">
                        <Field
                          name={`certificates[${index}].description`}
                          as="textarea"
                          className="textarea-style"
                          placeholder="Start Typing -  ZAKI AI will take it from here"
                        />
                        <ErrorMessage
                          name={`certificates[${index}].description`}
                          component="div"
                          className="text-[12px] text-red-400"
                        />
                        <img
                          src="https://app.ziphire.hr/assets/img/zaki_ai_image.jpeg"
                          alt="some pic"
                          className="w-[30px] h-[30px] rounded-[50%] cursor-pointer absolute bottom-6 right-3"
                        />
                      </div>
                    </div>
                  ))}
                  <div>
                    <button
                      type="button"
                      onClick={() =>
                        push({
                          id: "",
                          certificateTitle: "",
                          dateAwarded: "",
                          organizationName: "",
                          description: "",
                        })
                      }
                      className="flex items-center gap-2 my-4"
                    >
                      <span className="bg-green-400 px-3 pb-[7px] rounded-xl text-3xl">
                        +
                      </span>
                      <span>Add Certificate</span>
                    </button>
                  </div>
                  <SaveButton isSaving={isSaving} />
                </>
              )}
            </FieldArray>
          </Form>
        )}
      </Formik>
    </CustomAccordion>
  );
};

export default Certificates;
