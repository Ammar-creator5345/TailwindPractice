import { useFormikContext } from "formik";
import { Field, ErrorMessage } from "formik";

const FieldItem = ({ placeholder, type, name }) => {
  return (
    <div className="flex flex-col w-full">
      <Field
        className="input-style"
        type={type}
        name={name}
        placeholder={placeholder}
      />
      <ErrorMessage
        name={name}
        component="div"
        className="text-[12px] text-[#e97979]"
      />
    </div>
  );
};
export default FieldItem;
