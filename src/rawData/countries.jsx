import axios from "axios";
import { useEffect } from "react";
import { useState } from "react";

export default function useCountries() {
  const [countries, setCountries] = useState([])

  useEffect(() => {
    axios
      .get("https://api.ziphire.hr/v2/countries?ordering=label",{
        headers:{
          accept:"application/json; version=1.0",
          "x-api-key":"unLP5l.HUEPcrsrCMzAwVUb36pWhvUikOcxnZiq8OcJQqK9fns9S1",
        }
      })
      .then((res) => {
        console.log(res.data.data);
        setCountries(res.data.data)
        const formatted = res?.data?.data.map((country) => (
          {
            label:country.label,
            code:country.code,
            phone:country.phone_code,
            id:country.id
          }
        ))
        setCountries(formatted)
      })
      .catch((err) => {
        console.log("error is coming", err);
      });
  }, []);
  return {countries} ;
}
