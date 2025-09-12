import { useFormikContext } from "formik";
import { MdDeleteForever } from "react-icons/md";

const ProfilePhoto = ({ handleSectionSave, isSaving }) => {
  const { values, setFieldValue, setErrors, setFieldTouched, dirty } =
    useFormikContext();

  const handleFile = (e) => {
    const file = e.target.files[0];
    if (file) {
      setFieldValue("profilePhoto", URL.createObjectURL(file));
      setFieldValue("profilePhotoApi", file);
    }
  };

  const deleteImage = () => {
    setFieldValue("profilePhoto", null);
    setFieldValue("profilePhotoApi", null);
  };

  const handleSave = () => {
    console.log("Save button clicked"); // <-- should log
    handleSectionSave(
      "profilePhoto",
      values,
      setErrors,
      setFieldTouched,
      dirty
    );
  };

  return (
    <div>
      <div className="flex gap-3 items-center mt-3 sm:gap-5 md:gap-10">
        <div className="w-[100px] h-[100px] min-h-[100px] min-w-[100px] rounded-lg overflow-hidden">
          <img
            src={
              values.profilePhoto
                ? values.profilePhoto
                : `https://app.ziphire.hr/assets/img/avatar-male.png`
            }
            alt="Uploaded"
            className="object-cover"
          />
        </div>
        <div className="flex flex-col gap-5">
          <span>Edit Profile Photo</span>
          <div className="flex items-center gap-2 sm:gap-3 md:gap-4">
            <button
              type="button"
              onClick={deleteImage}
              className="bg-[#f8f6f6] transition-all p-2 rounded-2xl hover:border border-black"
            >
              <MdDeleteForever size={28} color="gray" />
            </button>
            <label
              htmlFor="fileType"
              type="button"
              className="bg-green-300 text-[13px] whitespace-nowrap cursor-pointer transition-transform rounded-xl px-4 py-2 hover:scale-[1.03] md:text-[16px]"
            >
              Upload New Photo
            </label>
            <input
              type="file"
              id="fileType"
              onChange={handleFile}
              className="hidden"
            />
          </div>
        </div>
      </div>

      <hr className="my-4" />
      <div className="flex justify-end">
        <button
          type="button"
          onClick={handleSave}
          className="bg-green-300 px-4 py-2 rounded-2xl hover:bg-green-400"
        >
          {!isSaving ? "Save" : "Saving..."}
        </button>
      </div>
    </div>
  );
};

export default ProfilePhoto;
