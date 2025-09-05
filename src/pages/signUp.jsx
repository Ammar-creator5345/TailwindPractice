import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate, NavLink } from "react-router-dom";
import useCountries from "../rawData/countries";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";

const inputStyle = {
  "& .MuiOutlinedInput-root": {
    borderRadius: "8px",
    backgroundColor: "white",
    "& fieldset": {
      border: "2px solid black",
    },
    "&:hover fieldset": {
      border: "2px solid green",
    },
    "&.Mui-focused fieldset": {
      border: "2px solid blue",
    },
  },
  "& .MuiInputLabel-root": {
    fontSize: "14px",
    color: "gray",
  },
  "& .MuiInputLabel-root.Mui-focused": {
    color: "blue",
  },
};

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
    console.log({
      country: country?.id,
      phone_number_country: countryCode?.id,
      email: email,
      first_name: firstName,
      last_name: lastName,
      mobile: contact,
      password: password,
    });
    // axios
    //   .post(
    //     "https://api.ziphire.hr/v2/developer/signup2",
    //     {
    //       country: country?.id,
    //       phone_number_country: countryCode?.id,
    //       email: email,
    //       first_name: firstName,
    //       last_name: lastName,
    //       mobile: contact,
    //       password: password,
    //     },
    //     {
    //       headers: {
    //         Accept: "application/json; version=1.0",
    //         "x-api-key":
    //           "unLP5l.HUEPcrsrCMzAwVUb36pWhvUikOcxnZiq8OcJQqK9fns9S1",
    //       },
    //     }
    //   )
    //   .then((res) => {
    //     console.log("Successfully signUp", res);
    //     navigate("/verify", { state: { email } });
    //   })
    //   .catch((err) => {
    //     console.log("could not signup", err);
    //   });
  };
  useEffect(() => {
    console.log(countries);
  }, []);

  return (
    <div className="flex justify-center mt-10">
      <div className="bg-rose-50 w-[60%] border-2 border-black rounded-lg py-5 px-5 md:w-[40%] md:px-6 md:py-10">
        <h1 className="text-4xl font-bold my-4 text-center">Sign Up</h1>
        <form onSubmit={handleSubmit}>
          <div className="flex gap-1 justify-center flex-wrap md:flex-nowrap md:gap-2">
            <TextField
              fullWidth
              label="First Name"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
              sx={inputStyle}
              required
            />
            <TextField
              fullWidth
              label="Last Name"
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
              sx={inputStyle}
              required
            />
          </div>

          <div className="flex justify-center mt-2">
            <TextField
              fullWidth
              label="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              sx={inputStyle}
              required
            />
          </div>

          <fieldset className="border-none mt-2" required>
            <Autocomplete
              required
              id="country-code-select"
              options={countries}
              autoHighlight
              value={countryCode}
              onChange={(event, newValue) => setCountryCode(newValue)}
              getOptionLabel={(option) =>
                option ? `${option.label} +${option.phone}` : ""
              }
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
                <TextField {...params} label="Country Code" sx={inputStyle} />
              )}
            />
          </fieldset>

          <div className="flex items-center justify-center gap-2 my-2 flex-wrap md:flex-nowrap">
            <fieldset className="w-full" required>
              <Autocomplete
                required
                id="country-select"
                options={countries}
                autoHighlight
                value={country}
                onChange={(event, newValue) => setCountry(newValue)}
                getOptionLabel={(option) =>
                  option ? `${option.label}` : ""
                }
                renderOption={(props, option) => (
                  <Box
                    component="li"
                    sx={{ "& > span": { mr: 2, flexShrink: 0 } }}
                    {...props}
                  >
                    {option.label}
                  </Box>
                )}
                renderInput={(params) => (
                  <TextField {...params} label="Country" sx={inputStyle} />
                )}
              />
            </fieldset>

            <TextField
              fullWidth
              label="Contact"
              value={contact}
              onChange={(e) => setContact(e.target.value)}
              sx={inputStyle}
              required
            />
          </div>

          <div className="flex justify-center">
            <TextField
              fullWidth
              type="password"
              label="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              sx={inputStyle}
              required
            />
          </div>

          <button
            type="submit"
            className="border-2 border-green-950 block m-auto mt-3 mb-2 px-4 py-2 text-sm rounded-lg hover:bg-slate-600 hover:text-white transition md:text-[18px]"
          >
            Sign Up
          </button>

          <div className="flex justify-center mt-3">
            <span className="text-center text-sm md:text-[18px] ">
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
