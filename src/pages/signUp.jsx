import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { NavLink } from "react-router-dom";
import useCountries, { countries } from "../rawData/countries";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";

const SignUp = () => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [contact, setContact] = useState("");
  const [password, setPassword] = useState("");
  const { countries } = useCountries();
  const [country, setCountry] = useState(null);
  const [countryCode, setCountryCode] = useState(null);
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault(); 
    console.log("clicked");
    axios
      .post(
        "https://api.ziphire.hr/v2/developer/signup2",
        {
          country: country.id,
          phone_number_country:countryCode.id,
          email: email,
          first_name: firstName,
          last_name: lastName,
          mobile: contact,
          password: password,
        },
        {
          headers: {
            Accept: "application/json; version=1.0",
            "x-api-key":
              "unLP5l.HUEPcrsrCMzAwVUb36pWhvUikOcxnZiq8OcJQqK9fns9S1",
          },
        }
      )
      .then((res) => {
        console.log("Successfully signUp", res);
        navigate("/verify",{state:{email}});
      })
      .catch((err) => {
        console.log("could not signup", err);
      });
  };
  return (
    <div className="flex justify-center mt-10">
      <div className="bg-rose-50 w-[40%] border-2 border-black rounded-lg py-20 px-10">
        <h1 className="text-4xl font-bold my-4 text-center">Sign Up</h1>
        <form onSubmit={handleSubmit}>
          <div className="flex gap-4 justify-center">
            <input
              className="border-2 border-black p-2 rounded-lg  "
              type="text"
              placeholder="First Name"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
            />
            <input
              className="border-2  border-black p-2 rounded-lg  "
              type="text"
              placeholder="Last Name"
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
            />
          </div>
          <input
            className="border-2 w-full border-black p-2 rounded-lg m-4 "
            type="text"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <fieldset>
            <Autocomplete
              id="country-select-demo"
              sx={{ width: 200 }}
              options={countries}
              autoHighlight
              value={countryCode}
              onChange={(event, newValue) => setCountryCode(newValue)}
              getOptionLabel={(option) => `${option.label} +${option.phone}`}
              renderOption={(props, option) => (
                <Box
                  component="li"
                  sx={{ "& > span": { mr: 2, flexShrink: 0 } }}
                  {...props}
                >
                  {option.label} ({option.code}) +{option.phone}
                </Box>
              )}
              renderInput={(params) => (
                <TextField
                  {...params}
                  label="Country Code"
                  inputProps={{
                    ...params.inputProps,
                    autoComplete: "new-password", 
                  }}
                />
              )}
            />
          </fieldset>
          <div className="flex items-center justify-center ">
            <fieldset>
              <Autocomplete
                id="country-select-demo"
                sx={{ width: 200 }}
                options={countries}
                autoHighlight
                value={country}
                onChange={(event, newValue) => setCountry(newValue)}
                getOptionLabel={(option) => `${option.label} +${option.phone}`}
                renderOption={(props, option) => (
                  <Box
                    component="li"
                    sx={{ "& > span": { mr: 2, flexShrink: 0 } }}
                    {...props}
                  >
                    {option.label} ({option.code}) +{option.phone}
                  </Box>
                )}
                renderInput={(params) => (
                  <TextField
                    {...params}
                    label="Country"
                    inputProps={{
                      ...params.inputProps,
                      autoComplete: "new-password", // disable autocomplete and autofill
                    }}
                  />
                )}
              />
            </fieldset>
            <input
              className="border-2 border-black px-2 py-[14px] rounded-lg m-4 "
              type="text"
              placeholder="Contact"
              value={contact}
              onChange={(e) => setContact(e.target.value)}
            />
          </div>
          <input
            className="border-2 w-full border-black px-2 py-[14px] rounded-lg m-4 "
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <button
            type="submit"
            className="border-2 border-green-950 block m-auto mb-1 py-2 px-2 rounded-lg hover:bg-slate-600 hover:text-white transition"
          >
            Sign Up
          </button>
          <div className="flex justify-center mt-3">
            <span>
              Already have an Account?{" "}
              <NavLink to="/login" className="text-blue-950 hover:underline">
                Log In
              </NavLink>
            </span>
          </div>
        </form>
      </div>
    </div>
  );
};

export default SignUp;
