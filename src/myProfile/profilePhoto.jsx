import { useState } from "react";
import { CustomAccordion } from "../components/customAccordion";
import { MdDeleteForever } from "react-icons/md";
import { Form, Formik, useFormikContext } from "formik";
import { deleteProfileImage, postProfileImage } from "../apis/mainApi";
import ShowAlert from "../components/showSuccessFullMsg";
import SaveButton from "./rawComponents/saveButton";

const ProfilePhoto = ({ profileData }) => {
  const [showAlert, setShowAlert] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const initialValues = {
    profilePhoto: profileData?.user?.profile_img || null,
    profilePhotoApi: null,
  };

  const handleFile = (e, setFieldValue) => {
    const file = e.target.files[0];
    if (file) {
      setFieldValue("profilePhoto", URL.createObjectURL(file));
      setFieldValue("profilePhotoApi", file);
    }
  };

  const deleteImage = (setFieldValue) => {
    setShowAlert(true);
    deleteProfileImage().then((res) => {
      setFieldValue("profilePhoto", null);
      setFieldValue("profilePhotoApi", null);
    });
  };
  const UploadProfilePhoto = (values) => {
    setIsSaving(true);
    const formData = new FormData();
    if (values.profilePhotoApi) {
      formData.append("profile_img", values.profilePhotoApi);
      postProfileImage(formData).then((res) => {
        setShowAlert(true);
        setIsSaving(false);
      });
    }
  };

  return (
    <CustomAccordion title="Profile Photo">
      {showAlert && (
        <ShowAlert section="profilePhoto" onClose={() => setShowAlert(false)} />
      )}
      <Formik
        enableReinitialize
        initialValues={initialValues}
        onSubmit={(values) => UploadProfilePhoto(values)}
      >
        {({ values, setFieldValue }) => (
          <Form>
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
                      onClick={() => deleteImage(setFieldValue)}
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
                      onChange={(e) => handleFile(e, setFieldValue)}
                      className="hidden"
                    />
                  </div>
                </div>
              </div>

              <SaveButton isSaving={isSaving} />
            </div>
          </Form>
        )}
      </Formik>
    </CustomAccordion>
  );
};

export default ProfilePhoto;
