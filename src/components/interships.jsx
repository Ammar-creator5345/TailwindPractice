import { FieldArray } from "formik";
import { MdDeleteForever } from "react-icons/md";
import { TextField } from "@mui/material";

const Internships = ({ FieldItem, textField_style, ZakiAiPortion }) => {
  return (
    <FieldArray name="internships">
      {({
        push,
        remove,
        form: { values, setFieldTouched, setFieldValue, touched, errors },
      }) => (
        <>
          {values?.internships?.map((value, index) => (
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
                placeholder="Company Name"
                name={`internships[${index}].companyName`}
              />{" "}
              <div className="w-full flex gap-4 items-center flex-1">
                <TextField
                  type="date"
                  placeholder="Start Date"
                  label=""
                  slotProps={{ shrink: false }}
                  sx={{ width: "48%", ...textField_style }}
                  value={values.internships[index].startDate}
                  onBlur={() =>
                    setFieldTouched(`internships[${index}].startDate`, true)
                  }
                  onChange={(e) =>
                    setFieldValue(
                      `internships[${index}].startDate`,
                      e.target.value
                    )
                  }
                  error={
                    touched.internships?.[index]?.startDate &&
                    Boolean(errors.internships?.[index]?.startDate)
                  }
                  helperText={
                    touched.internships?.[index]?.startDate &&
                    errors.internships?.[index]?.startDate
                  }
                />
                <TextField
                  type="date"
                  placeholder="End Date"
                  label=""
                  slotProps={{ shrink: false }}
                  sx={{ width: "48%", ...textField_style }}
                  value={values.internships[index].endDate}
                  onBlur={() =>
                    setFieldTouched(`internships[${index}].endDate`, true)
                  }
                  onChange={(e) =>
                    setFieldValue(
                      `internships[${index}].endDate`,
                      e.target.value
                    )
                  }
                  error={
                    touched.internships?.[index]?.endDate &&
                    Boolean(errors.internships?.[index]?.endDate)
                  }
                  helperText={
                    touched.internships?.[index]?.endDate &&
                    errors.internships?.[index]?.endDate
                  }
                />
              </div>
              <ZakiAiPortion title={`internships[${index}].description`} />
            </div>
          ))}
          <div>
            <button
              type="button"
              onClick={() =>
                push({
                  companyName: "",
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
              <span>Add One More internship</span>
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

export default Internships;
