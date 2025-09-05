import { FieldArray } from "formik";
import { MdDeleteForever } from "react-icons/md";
import { TextField } from "@mui/material";

const Certificates = ({
  FieldItem,
  textField_style,
  ZakiAiPortion,
  handleSectionSave,
  isSaving,
}) => {
  return (
    <FieldArray name="certificates">
      {({
        push,
        remove,
        form: {
          values,
          setFieldTouched,
          setFieldValue,
          touched,
          errors,
          setErrors,
          dirty,
        },
      }) => (
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
                    setFieldTouched(`certificates[${index}].dateAwarded`, true)
                  }
                  onChange={(e) =>
                    setFieldValue(
                      `certificates[${index}].dateAwarded`,
                      e.target.value
                    )
                  }
                  error={
                    touched.certificates?.[index]?.dateAwarded &&
                    Boolean(errors.certificates?.[index]?.dateAwarded)
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
              <ZakiAiPortion title={`certificates[${index}].description`} />
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
              <span>Add One More Certificate</span>
            </button>
          </div>
          <div>
            <hr className="my-4" />
            <div className="flex justify-end">
              <button
                type="button"
                className="bg-green-300 px-4 py-2 rounded-2xl hover:bg-green-400"
                onClick={() =>
                  handleSectionSave(
                    "certificates",
                    values,
                    setErrors,
                    setFieldTouched,
                    dirty
                  )
                }
              >
                {!isSaving ? "Save" : "Saving..."}
              </button>
            </div>
          </div>
        </>
      )}
    </FieldArray>
  );
};

export default Certificates;
