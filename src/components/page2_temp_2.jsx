import { useFormikContext } from "formik";
const Page2_temp_2 = () => {
  const { values } = useFormikContext();
  const dateFormatter = (value) => {
    return new Date(value).toLocaleDateString("en-Us", {
      month: "short",
      year: "numeric",
    });
  };
  return (
    <div className="py-12 px-5 shadowColor">
      <div className="flex gap-4">
        <div className="w-[70%]">
          <div>
            <h3 className="text-[14px] font-bold mb-3">PROJECTS</h3>
            {values.projects.map((project, index) => (
              <div key={index} className="mb-5">
                <h1 className="text-[14px] font-semibold">
                  {project.projectName
                    ? project.projectName
                    : "[Project Title]"}
                </h1>
                <div className="text-[10px] flex">
                  <span>
                    {project.startDate
                      ? dateFormatter(project.startDate)
                      : "[startDate]"}
                  </span>
                  <span className="mx-1">-</span>
                  <span>
                    {project.endDate
                      ? dateFormatter(project.endDate)
                      : "[EndDate]"}
                  </span>
                </div>
                <span className="text-[10px]">
                  {project.description ? project.description : "[Description]"}
                </span>
              </div>
            ))}
          </div>
          <div>
            <h3 className="text-[14px] font-bold mb-3">INTERNSHIPS</h3>
            {values.internships.map((internship, index) => (
              <div key={index} className="mb-5">
                <h1 className="text-[14px] font-semibold">
                  {internship.companyName
                    ? internship.companyName
                    : "[Internship Title]"}
                </h1>
                <div className="text-[10px] flex">
                  <span>
                    {internship.startDate
                      ? dateFormatter(internship.startDate)
                      : "[startDate]"}
                  </span>
                  <span className="mx-1">-</span>
                  <span>
                    {internship.endDate
                      ? dateFormatter(internship.endDate)
                      : "[EndDate]"}
                  </span>
                </div>
                <span className="text-[10px]">
                  {internship.description
                    ? internship.description
                    : "[Description]"}
                </span>
              </div>
            ))}
          </div>
          <div>
            <h3 className="text-[14px] font-bold mb-3">CERTIFICATES</h3>
            {values.certificates.map((certificate, index) => (
              <div key={index} className="mb-5">
                <div className="flex items-center">
                  <h1 className="text-[14px] font-semibold">
                    {certificate.certificateTitle
                      ? certificate.certificateTitle
                      : "[Certificate Title]"}
                  </h1>
                  <span className="mx-[2px]">/</span>
                  <span className="text-[12px]">
                    {certificate.organizationName
                      ? certificate.organizationName
                      : "[Organization]"}
                  </span>
                </div>
                <span className="text-[10px] block">
                  {certificate.dateAwarded
                    ? dateFormatter(certificate.dateAwarded)
                    : "[DateAwarded]"}
                </span>

                <span className="text-[10px]">
                  {certificate.description
                    ? certificate.description
                    : "[Description]"}
                </span>
              </div>
            ))}
          </div>
          <div>
            <h3 className="text-[14px] font-bold mb-3">COURSES</h3>
            {values.courses.map((course, index) => (
              <div key={index} className="mb-5">
                <div className="flex items-center">
                  <h1 className="text-[14px] font-semibold">
                    {course.courseName ? course.courseName : "[Course Title]"}
                  </h1>
                  <span className="mx-[2px]">/</span>
                  <span className="text-[12px]">
                    {course.organizationName
                      ? course.organizationName
                      : "[Organization]"}
                  </span>
                </div>
                <span className="text-[10px] block">
                  {course.dateAwarded
                    ? dateFormatter(course.dateAwarded)
                    : "[DateAwarded]"}
                </span>

                <span className="text-[10px]">
                  {course.description ? course.description : "[Description]"}
                </span>
              </div>
            ))}
          </div>
        </div>
        <div>
          <h3 className="text-[14px] font-bold mb-1">HOBBIES</h3>
          {values.hobbies.map((hobby) => (
            <p className="text-[12px]">
              {hobby.hobby ? hobby.hobby : "[hobby]"}
            </p>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Page2_temp_2;
