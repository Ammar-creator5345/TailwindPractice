import { useEffect, useState } from "react";
import axios from "axios";

const useRecommendedSkills = (uploadedResume) => {
  const [skills, setSkills] = useState([]);
  const token = localStorage.getItem("token");
  const [loading, setLoading] = useState(false);
  const [excludedIds, setExcludedIds] = useState([]);
 
  useEffect(() => {
    const fetchSkills = async () => {
      if (!uploadedResume?.id) {
        return;
      }
      setLoading(true);
      try {
        await axios
          .get(
            `https://api.ziphire.hr/v2/developer/get-recommended-skills?exclude_skills=${excludedIds.join(",")}&resume_id=${uploadedResume?.id}`,
            {
              headers: {
                accept: "application/json; version=1.0",
                authorization: `Token ${token}`,
                "x-api-key":
                  "unLP5l.HUEPcrsrCMzAwVUb36pWhvUikOcxnZiq8OcJQqK9fns9S1",
              },
            }
          )
          .then((res) => {
            setSkills(res.data);
            console.log(res.data);
          });
      } catch (err) {
        console.log(err);
      } finally {
        setLoading(false);
      }
    };
    fetchSkills();
  }, [uploadedResume?.id, excludedIds]);

  return { skills, setSkills, loading, excludedIds, setExcludedIds };
};

export default useRecommendedSkills;
