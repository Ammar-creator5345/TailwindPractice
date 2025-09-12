import { Formik, Form, Field, ErrorMessage, FieldArray } from "formik";
import { CustomAccordion } from "../components/customAccordion";
import { hobbiesValidation } from "../components/validationSchema";
import { MdDeleteForever } from "react-icons/md";
import { useEffect, useState } from "react";
import SaveButton from "./rawComponents/saveButton";
import { deleteHobby, getHobbies, postHobby, putHobby } from "../apis/mainApi";
import ShowAlert from "../components/showSuccessFullMsg";

const Hobbies = ({ setAccordions, comingHobbies }) => {
  const [hobbies, setHobbies] = useState([]);
  const [showAlert, setShowAlert] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  useEffect(() => {
    const formattedHobbies = comingHobbies?.map((value) => ({
      id: value?.id || "",
      hobby: value?.title || "",
    }));
    setHobbies(formattedHobbies);
  }, [comingHobbies]);
  const initialValues = {
    hobbies: hobbies.length
      ? hobbies
      : [
          {
            id: "",
            hobby: "",
          },
        ],
  };
  const deleteAccordion = () => {
    setAccordions((prev) => prev.filter((acc) => acc !== "hobbies"));
  };
  const updateHobbies = async (values) => {
    setIsSaving(true);
    const allRequests = [];

    const previousHobbies = await getHobbies();
    const prevData = previousHobbies.data.data;

    const previousHobbiesIds = prevData.map((h) => h.id);
    const currentHobbiesIds = values.hobbies.map((h) => h.id).filter(Boolean);

    const idsForDeletion = previousHobbiesIds.filter(
      (id) => !currentHobbiesIds.includes(id)
    );
    idsForDeletion.forEach((id) => {
      allRequests.push(deleteHobby(id));
    });

    values.hobbies.forEach((hobby) => {
      const dataForSubmit = { title: hobby.hobby };

      if (!hobby.id) {
        allRequests.push(postHobby(dataForSubmit));
      } else {
        const oldHobby = prevData.find((h) => h.id === hobby.id);
        if (oldHobby && oldHobby.title !== hobby.hobby) {
          allRequests.push(putHobby(dataForSubmit, hobby.id));
        }
      }
    });

    Promise.all(allRequests)
      .then(() => {
        setShowAlert(true);
        setIsSaving(false);
      })
      .catch((err) => {
        setIsSaving(false);
        alert(err);
      });
  };

  return (
    <CustomAccordion
      title="Hobbies & Interests"
      deleteFeature={true}
      handleDeleteAccordion={deleteAccordion}
    >
      {showAlert && (
        <ShowAlert section="hobbies" onClose={() => setShowAlert(false)} />
      )}
      <Formik
        initialValues={initialValues}
        validationSchema={hobbiesValidation}
        enableReinitialize
        onSubmit={(values) => updateHobbies(values)}
      >
        {({ values }) => (
          <Form>
            <FieldArray name="hobbies">
              {({ push, remove }) => (
                <>
                  <div className="mb-4 flex flex-wrap gap-3">
                    {values?.hobbies?.map((value, index) => (
                      <>
                        <div className="flex flex-col">
                          <div className="border w-fit rounded-xl overflow-hidden flex items-center pr-2">
                            <Field
                              type="text"
                              name={`hobbies[${index}].hobby`}
                              placeholder="Hobby"
                              className="p-3 border-none outline-none"
                            />
                            <MdDeleteForever
                              onClick={() => remove(index)}
                              size={25}
                              color="gray"
                            />
                          </div>
                          <ErrorMessage
                            name={`hobbies[${index}].hobby`}
                            component="div"
                            className="text-[12px] text-[#e97979]"
                          />
                        </div>
                      </>
                    ))}
                  </div>
                  <div>
                    <button
                      type="button"
                      onClick={() =>
                        push({
                          id: "",
                          hobby: "",
                        })
                      }
                      className="flex items-center gap-2 my-4"
                    >
                      <span className="bg-green-400 px-3 pb-[7px] rounded-xl text-3xl">
                        +
                      </span>
                      <span>Add One More Hobby & Interest</span>
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

export default Hobbies;
