import { useFormikContext } from "formik";

const PreviewPage = () => {
  const dateFix = (date) => {
    return new Date(date).toLocaleDateString("en-US", {
      month: "short",
      year: "numeric",
    });
  };
  const { values } = useFormikContext();
  return (
    <div className="flex gap-5 p-4 shadowColor sticky top-0">
      <div className="w-[60%]">
        <div className="flex flex-wrap items-center gap-2">
          <h3 className="text-[21px] font-semibold">
            {values.firstName ? values.firstName : "[First Name]"}
          </h3>
          <h3 className="text-[21px] font-semibold">
            {values.lastName ? values.lastName : "[Last Name]"}
          </h3>
        </div>
        <p className="text-[12px] my-2">
          {values.jobTitle ? values.jobTitle : "[Your Professional Title]"}
        </p>
        <p className="text-[12px] my-2">
          {values.description
            ? values.description
            : "[Brief summary about yourself and professional background]"}
        </p>
        <hr className="my-3" />
        <h2 className="text-md my-5 ">WORK EXPERIENCE</h2>
        {values.work.map((value, index) => (
          <div key={index} className="mb-4">
            <div className="flex gap-[5px]">
              <h4 className="font-bold text-sm">
                {value.jobTitle ? value.jobTitle : "[Job Title]"}
              </h4>
              <p className="text-sm">
                {value.companyName
                  ? "/ " + value.companyName
                  : "/ [Company Name]"}
              </p>
            </div>
            <div className="flex items-center gap-1">
              <span className="text-[10px]">
                {value.startDate ? dateFix(value.startDate) : "[Start Date] "}
              </span>
              <span className="text-[10px]">
                {value.endDate ? "/ " + dateFix(value.endDate) : "- [End Date]"}
              </span>
            </div>
            <p className="text-[10px]">
              {value.description
                ? value.description
                : "[Brief description of your responsibilities and achievements]"}
            </p>
          </div>
        ))}
      </div>
      <div className="w-[40%]">
        <div className="flex flex-col justify-center items-center">
          <div className="flex justify-center items-center rounded-full w-[90px] h-[90px] bg-[#2b2929] overflow-hidden">
            {values.profilePhoto ? (
              <img src={values.profilePhoto} alt="somePic" />
            ) : (
              <p className="text-white text-[14px]">Profile Photo</p>
            )}
          </div>
          <p className="text-[10px]">
            {values.email ? values.email : "[Your Email]"}
          </p>
          <p className="text-[10px]">
            {values.mobileNumber ? values.mobileNumber : "[Your Phone]"}
          </p>
          <div className="flex ">
            <p className="text-[10px]">
              {values.location ? values.location : "[City]"}
            </p>
            <p className="text-[10px]">
              {values.country ? ", " + values.country.label : ", [Country]"}
            </p>
          </div>
        </div>
        <div className="my-10">
          <h1 className="text-[15px] text-center">EDUCATION</h1>
          <div className="flex flex-col justify-center items-center">
            {values?.education.map((value, index) => (
              <div key={index} className="flex flex-col items-center my-1">
                <h3 className="text-[12px]">
                  {value.degreeType ? value.degreeType : "[Degree]"}
                </h3>
                <div className="flex items-center gap-1">
                  <span className="text-[10px]">
                    {value.startYear ? value.startYear : "[Start Date] "}
                  </span>
                  <span className="text-[10px]">
                    {value.completionYear
                      ? "/ " + value.completionYear
                      : "- [End Date]"}
                  </span>
                </div>
                <span className="text-[10px]">
                  {value.schoolName ? value.schoolName : "[School/University]"}
                </span>
              </div>
            ))}
          </div>
        </div>
        <h1 className="text-[15px] text-center">Skills</h1>
        <div className="flex flex-col justify-center items-center">
          {!values.skills || values.skills.length === 0 ? (
            <div className="flex flex-col">
              <span className="text-[10px]">[skill 1]</span>
              <span className="text-[10px]">[skill 2]</span>
              <span className="text-[10px]">[skill 3]</span>
            </div>
          ) : (
            values?.skills.map((value, index) => (
              <div key={index} className="flex flex-col items-center">
                <span className="text-[10px]">{value.skill}</span>
              </div>
            ))
          )}
        </div>
        <h1 className="text-[15px] text-center mt-10">Languages</h1>
        <div className="flex flex-col justify-center items-center">
          {!values.languages || values.languages.length === 0 ? (
            <>
              <div className="flex">
                <span className="text-[10px]">[language]</span>
                <span className="text-[10px]">(proficiency)</span>
              </div>
              <div className="flex">
                <span className="text-[10px]">[language]</span>
                <span className="text-[10px]">(proficiency)</span>
              </div>
            </>
          ) : (
            values?.languages.map((value, index) => (
              <div key={index} className="flex flex-col items-center my-[2px]">
                <div className="flex">
                  <span className="text-[10px]">[{value.language}]</span>
                  <span className="text-[10px]">({value.proficiency})</span>
                </div>
              </div>
            ))
          )}
        </div>
        <h1 className="text-[15px] text-center mt-10">Social</h1>
        <div className="flex flex-col gap-1 items-center">
          <span className="text-[10px]">
            {values.linkedinLink ? values.linkedinLink : "[LinkedIn URL]"}
          </span>
          <span className="text-[10px]">
            {values.githubLink ? values.githubLink : "[GitHub URL]"}
          </span>
        </div>
      </div>
    </div>
  );
};

export default PreviewPage;
