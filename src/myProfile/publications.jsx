import { Formik, Form, Field, ErrorMessage, FieldArray } from "formik";
import { CustomAccordion } from "../components/customAccordion";
import FieldItem from "./rawComponents/fieldItem";
import SaveButton from "./rawComponents/saveButton";
import { MdDeleteForever } from "react-icons/md";
import TextField from "@mui/material/TextField";
import { publicationsValidation } from "../components/validationSchema";
import { useEffect, useState } from "react";
import {
  deletePublication,
  getPublications,
  postPublication,
  putPublication,
} from "../apis/mainApi";
import ShowAlert from "../components/showSuccessFullMsg";

const Publications = ({ setAccordions, comingPublications }) => {
  const [publications, setPublications] = useState([]);
  const [showAlert, setShowAlert] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  useEffect(() => {
    const formattedPublications = comingPublications?.map((value) => ({
      id: value?.id || "",
      title: value?.title || "",
      journal: value?.journal || "",
      date: value?.publication_date || "",
      link: value?.url || "",
      description: value?.abstract || "",
    }));
    setPublications(formattedPublications);
  }, [comingPublications]);

  const initialValues = {
    publications: publications.length
      ? publications
      : [
          {
            id: "",
            title: "",
            journal: "",
            date: "",
            link: "",
            description: "",
          },
        ],
  };
  const deleteAccordion = () => {
    setAccordions((prev) => prev.filter((acc) => acc !== "publications"));
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
  const updatePublications = async (values) => {
    setIsSaving(true);
    const allRequests = [];
    const previosPublications = await getPublications();
    const previosIds = previosPublications.data.data.map((value) => value.id);
    const currentIds = values.publications
      .map((value) => value.id)
      .filter(Boolean);
    const idsForDeletion = previosIds.filter((id) => !currentIds.includes(id));
    idsForDeletion.forEach((id) => {
      allRequests.push(deletePublication(id));
    });
    values.publications.map((value) => {
      const dataForSubmit = {
        title: value.title,
        journal: value.journal,
        publication_date: value.date,
        url: value.link,
        abstract: value.description,
      };
      if (value.id) {
        allRequests.push(putPublication(dataForSubmit, value.id));
      } else {
        allRequests.push(postPublication(dataForSubmit));
      }
    });
    Promise.all(allRequests)
      .then(() => {
        setIsSaving(false);
        setShowAlert(true);
      })
      .catch((err) => {
        alert(err);
      });
  };
  return (
    <CustomAccordion
      title="Publications"
      deleteFeature={true}
      handleDeleteAccordion={deleteAccordion}
    >
      {showAlert && (
        <ShowAlert section="publications" onClose={() => setShowAlert(false)} />
      )}
      <Formik
        initialValues={initialValues}
        validationSchema={publicationsValidation}
        enableReinitialize
        onSubmit={(values) => updatePublications(values)}
      >
        {({ values, setFieldTouched, setFieldValue, errors, touched }) => (
          <Form>
            <FieldArray name="publications">
              {({ push, remove }) => (
                <>
                  {values.publications.map((value, index) => (
                    <div className="mb-4" key={index}>
                      <div className="flex items-center gap-2">
                        <span>{index + 1}.</span>
                        <MdDeleteForever
                          onClick={() => remove(index)}
                          size={25}
                          color="gray"
                        />
                      </div>
                      <div className="flex flex-col items-center gap-0 md:flex-row md:gap-4">
                        <FieldItem
                          type="text"
                          name={`publications[${index}].title`}
                          placeholder="Publication Title"
                        />
                        <FieldItem
                          type="text"
                          name={`publications[${index}].journal`}
                          placeholder="Journal"
                        />
                      </div>
                      <div className="flex flex-col items-center gap-0 md:flex-row md:gap-4">
                        <TextField
                          type="date"
                          placeholder="Publication Date"
                          label=""
                          slotProps={{ shrink: false }}
                          sx={{ width: "100%", ...textField_style }}
                          value={values.publications[index].date}
                          onBlur={() =>
                            setFieldTouched(`publications[${index}].date`, true)
                          }
                          onChange={(e) =>
                            setFieldValue(
                              `publications[${index}].date`,
                              e.target.value
                            )
                          }
                          helperText={
                            touched.publications?.[index]?.date &&
                            errors.publications?.[index]?.date
                          }
                        />
                        <FieldItem
                          type="text"
                          name={`publications[${index}].link`}
                          placeholder="Publication Link(URL)"
                        />
                      </div>
                      <div className="relative">
                        <Field
                          name={`publications[${index}].description`}
                          as="textarea"
                          className="textarea-style"
                          placeholder="Start Typing -  ZAKI AI will take it from here"
                        />

                        <img
                          src="https://app.ziphire.hr/assets/img/zaki_ai_image.jpeg"
                          alt="some pic"
                          className="w-[30px] h-[30px] rounded-[50%] cursor-pointer absolute bottom-6 right-3"
                        />
                      </div>
                    </div>
                  ))}
                  <button
                    type="button"
                    onClick={() =>
                      push({
                        id: "",
                        title: "",
                        journal: "",
                        date: "",
                        link: "",
                        description: "",
                      })
                    }
                    className="flex items-center gap-2 my-4"
                  >
                    <span className="bg-green-400 px-3 pb-[7px] rounded-xl text-3xl">
                      +
                    </span>
                    <span>Add Publication</span>
                  </button>
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

export default Publications;
