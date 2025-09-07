import { useFormikContext } from "formik";

const Page1_temp_2 = () => {
  const dateFix = (date) => {
    return new Date(date).toLocaleDateString("en-US", {
      month: "short",
      year: "numeric",
    });
  };
  const { values } = useFormikContext();
  return (
    <div className="shadowColor">
      <div className="bg-[#FAFAFA] lg:w-[482px]">
        <div className="flex gap-4 px-4 pt-4">
          <div className="w-[65%] border-b pb-4">
            <div className="flex gap-3 truncate">
              <div className="w-[60px] h-[65px] min-w-[60px] min-h-[65px] rounded-[50%] overflow-hidden">
                {!values.profilePhoto ? (
                  <div className="w-full h-full bg-[#302d2d] flex justify-center items-center">
                    <span className="text-white text-center text-[14px]">
                      Profile Photo
                    </span>
                  </div>
                ) : (
                  <img
                    src={values.profilePhoto}
                    alt="somepic"
                    className="w-full h-full object-cover"
                  />
                )}
              </div>
              <div className="flex flex-col">
                <div className="flex gap-1 items-center flex-wrap">
                  <span className="text-[18px] font-bold sm:text-[23px] md:text-[28px] ">
                    {values.firstName ? values.firstName : "[First Name]"}
                  </span>
                  <span className="text-[18px] font-bold sm:text-[23px] md:text-[28px]">
                    {values.lastName ? values.lastName : "[Last Name]"}
                  </span>
                </div>
                <h1 className="text-[23px] font-bold text-[#312f2f] md:text-[25px]">
                  {values.jobTitle
                    ? values.jobTitle
                    : "[Your Professional Title]"}
                </h1>
              </div>
            </div>
            <span className="text-[14px]">
              {values.description
                ? values.description
                : "[Brief summary about yourself and professional background]"}
            </span>
          </div>
          <div className="w-[35%] pt-2">
            <h4 className="text-sm font-semibold">Email</h4>
            <h4 className="text-sm truncate">
              {values.email ? values.email : "[Your Email]"}
            </h4>
            <h4 className="text-sm font-semibold">LinkedIn</h4>
            <h4 className="text-sm truncate">
              {values.linkedinLink ? values.linkedinLink : "[Your LinkedIn]"}
            </h4>
            <h4 className="text-sm font-semibold">Phone</h4>
            <h4 className="text-sm truncate">
              {values.mobileNumber ? values.mobileNumber : "[Your Mobile]"}
            </h4>
          </div>
        </div>
      </div>
      <div className="flex gap-4 py-8 px-4">
        <div className="w-[70%]">
          <div>
            <h2 className="text-[12px] font-bold mb-4 ">WORK EXPERIENCE</h2>
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
                    {value.startDate
                      ? dateFix(value.startDate)
                      : "[Start Date] "}
                  </span>
                  <span className="text-[10px]">
                    {value.endDate
                      ? "/ " + dateFix(value.endDate)
                      : "- [End Date]"}
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
        </div>
        <div className="w-[30%]">
          <div className="my-10">
            <h1 className="text-[13px] font-bold">EDUCATION</h1>
            <div className="flex flex-col">
              {values?.education.map((value, index) => (
                <div key={index} className="flex flex-col my-1">
                  <h3 className="text-[12px]">
                    {value.degreeType ? value.degreeType : "[Degree]"}
                  </h3>
                  <div className="flex items-center justify-start text-start gap-1">
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
                    {value.schoolName
                      ? value.schoolName
                      : "[School/University]"}
                  </span>
                </div>
              ))}
            </div>
          </div>
          <div>
            <h1 className="text-[13px] font-bold">SKILLS</h1>
            <div className="flex flex-col">
              {!values.skills || values.skills.length === 0 ? (
                <div className="flex flex-col">
                  <span className="text-[10px]">[skill 1]</span>
                  <span className="text-[10px]">[skill 2]</span>
                  <span className="text-[10px]">[skill 3]</span>
                </div>
              ) : (
                values?.skills.map((value, index) => (
                  <div key={index} className="flex flex-col">
                    <span className="text-[10px]">{value.skill}</span>
                  </div>
                ))
              )}
            </div>
          </div>
          <div>
            <h1 className="text-[13px] font-bold mt-10">LANGUAGES</h1>
            <div className="flex flex-col">
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
                  <div key={index} className="flex flex-col my-[2px]">
                    <div className="flex gap-1">
                      <span className="text-[10px]">
                        {value.language ? value.language : "[Language]"}
                      </span>
                      <span className="text-[10px]">
                        {value.proficiency
                          ? `(${value.proficiency})`
                          : "([Proficiency])"}
                      </span>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>
          <div>
            <h1 className="text-[13px] font-bold mt-10">SOCIAL</h1>
            <div className="flex flex-col gap-1 break-words">
              <span className="text-[10px]">
                {values.linkedinLink ? values.linkedinLink : "[LinkedIn URL]"}
              </span>
              <span className="text-[10px]">
                {values.githubLink ? values.githubLink : "[GitHub URL]"}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Page1_temp_2;
