import { FieldArray } from "formik";
import { MdDeleteForever } from "react-icons/md";
import { TextField } from "@mui/material";

const Projects = ({
  FieldItem,
  textField_style,
  ZakiAiPortion,
  handleSectionSave,
  isSaving,
}) => {
  return (
    <FieldArray name="projects">
      {({
        push,
        remove,
        form: {
          values,
          touched,
          setFieldTouched,
          setFieldValue,
          errors,
          setErrors,
          dirty,
        },
      }) => (
        <>
          {values?.projects.map((value, index) => (
            <div className="mb-4">
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
                placeholder="Project Name"
                name={`projects[${index}].projectName`}
              />{" "}
              <div className="w-full flex gap-2 items-center flex-1 sm:gap-3 md:gap-4">
                <TextField
                  type="date"
                  placeholder="Start Date"
                  label=""
                  slotProps={{ shrink: false }}
                  sx={{ width: "48%", ...textField_style }}
                  value={values.projects[index].startDate}
                  onBlur={() =>
                    setFieldTouched(`projects[${index}].startDate`, true)
                  }
                  onChange={(e) =>
                    setFieldValue(
                      `projects[${index}].startDate`,
                      e.target.value
                    )
                  }
                  error={
                    touched.projects?.[index]?.startDate &&
                    Boolean(errors.projects?.[index]?.startDate)
                  }
                  helperText={
                    touched.projects?.[index]?.startDate &&
                    errors.projects?.[index]?.startDate
                  }
                />
                <TextField
                  type="date"
                  placeholder="End Date"
                  label=""
                  slotProps={{ shrink: false }}
                  sx={{ width: "48%", ...textField_style }}
                  value={values.projects[index].endDate}
                  onBlur={() =>
                    setFieldTouched(`projects[${index}].endDate`, true)
                  }
                  onChange={(e) =>
                    setFieldValue(`projects[${index}].endDate`, e.target.value)
                  }
                  error={
                    touched.projects?.[index]?.endDate &&
                    Boolean(errors.projects?.[index]?.endDate)
                  }
                  helperText={
                    touched.projects?.[index]?.endDate &&
                    errors.projects?.[index]?.endDate
                  }
                />
              </div>
              <ZakiAiPortion title={`projects[${index}].description`} />
            </div>
          ))}
          <div>
            <button
              type="button"
              onClick={() =>
                push({
                  id: "",
                  projectName: "",
                  startDate: "",
                  endDate: "",
                  description: "",
                })
              }
              className="flex items-center gap-2 my-4"
            >
              <span className="bg-green-400 px-3 pb-[7px] rounded-xl text-3xl">
                +
              </span>
              <span>Add One More Project</span>
            </button>
          </div>
          <div>
            <hr className="my-4" />
            <div className="flex justify-end">
              <button
                type="button"
                onClick={() =>
                  handleSectionSave(
                    "projects",
                    values,
                    setErrors,
                    setFieldTouched,
                    dirty
                  )
                }
                className="bg-green-300 px-4 py-2 rounded-2xl hover:bg-green-400"
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

export default Projects;
