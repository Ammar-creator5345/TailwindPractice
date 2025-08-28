import { FieldArray, Form, Formik, Field, ErrorMessage } from "formik";
import { MdDeleteForever } from "react-icons/md";

const Hobbies = () => {
  return (
    <FieldArray name="hobbies">
      {({ push, remove, form: { values } }) => (
        <>
          <div className="mb-4 flex flex-wrap gap-4">
            {values.hobbies.map((value, index) => (
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
          <div>
            <hr className="my-4" />
            <div className="flex justify-end">
              <button
                type="submit"
                className="bg-green-300 px-4 py-2 rounded-2xl hover:bg-green-400"
              >
                Save
              </button>
            </div>
          </div>
        </>
      )}
    </FieldArray>
  );
};

export default Hobbies;
