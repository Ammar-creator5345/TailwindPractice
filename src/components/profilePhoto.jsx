import { useFormikContext } from "formik";
import { MdDeleteForever } from "react-icons/md";

const ProfilePhoto = ({ InputButtonForSubmit }) => {
  const { values, setFieldValue } = useFormikContext();
  const handleFile = (e) => {
    const file = e.target.files[0];
    if (file) {
      setFieldValue("profilePhoto", URL.createObjectURL(file));
    }
  };
  const deleteImage = () => {
    setFieldValue("profilePhoto", null);
  };
  return (
    <>
      <div className="flex gap-10 items-center mt-3">
        <div className="w-[100px] h-[100px] rounded-lg overflow-hidden">
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
          <div className="flex items-center gap-4">
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
              className="bg-green-300 cursor-pointer transition-transform rounded-xl px-4 py-2 hover:scale-[1.03]"
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
      {InputButtonForSubmit}
    </>
  );
};

export default ProfilePhoto;
