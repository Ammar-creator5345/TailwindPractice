import axios from "axios";
import React from "react";
import { useNavigate, NavLink } from "react-router-dom";
import { Formik, Form, Field, ErrorMessage, FieldArray } from "formik";

export default function HomePage({ setToken }) {
  const token = localStorage.getItem("token");
  const navigate = useNavigate();
  const logOut = () => {
    console.log(token);
    axios
      .get("https://api.ziphire.hr/v2/logout", {
        headers: {
          Accept: "application/json; version=1.0",
          "x-api-key": "unLP5l.HUEPcrsrCMzAwVUb36pWhvUikOcxnZiq8OcJQqK9fns9S1",
          Authorization: `Token ${token}`,
        },
      })
      .then(() => {
        localStorage.removeItem("token");
        setToken(null);
        navigate("/login");
      });
  };
  return (
    <>
      <div className="bg-red-400 flex flex-col md:flex-row justify-between items-center p-4">
        <div className="flex flex-wrap justify-center md:justify-start">
          <NavLink to="/" className="p-4 m-1 bg-slate-100">
            Home
          </NavLink>
          <NavLink to="/resumes" className="p-4 m-1 bg-slate-100">
            Resumes
          </NavLink>
        </div>
        <div className="w-full md:w-auto mt-2 md:mt-0">
          <input
            type="text"
            placeholder="Search..."
            className="p-2 border border-gray-300 rounded w-full md:w-64"
          />
          <button
            className="border-2 p-2 text-white bg-slate-950 ml-1 rounded-md hover:bg-slate-700"
            onClick={logOut}
          >
            Log out
          </button>
        </div>
      </div>
      <div>
        <Formik
          onSubmit={(values) => console.log(values)}
          initialValues={{
            infos: [
              {
                name: "",
                email: "",
              },
            ],
          }}
        >
          {({ values, touched }) => (
            <Form>
              <FieldArray name="infos">
                {({ remove, push }) => (
                  <>
                    {values.infos.map((info, index) => (
                      <div key={index}>
                        <Field
                          name={`infos[${index}].name`}
                          className="border border-black rounded-lg p-2"
                          type="text"
                          placeholder="Name"
                        />
                        <Field
                          name={`infos[${index}].email`}
                          className="border border-black rounded-lg p-2"
                          type="text"
                          placeholder="Email"
                        />
                        <button
                          className="border border-black rounded-md p-2"
                          type="button"
                          onClick={() => remove(index)}
                        >
                          delete
                        </button>
                      </div>
                    ))}
                    <div className="m-3 flex gap-3">
                      <button
                        className="border border-black rounded-md p-2"
                        type="button"
                        onClick={() => push({ name: "", email: "" })}
                      >
                        add more info
                      </button>
                      <button
                        className="border border-black rounded-md p-2"
                        type="submit"
                      >
                        submit
                      </button>
                    </div>
                  </>
                )}
              </FieldArray>
            </Form>
          )}
        </Formik>
      </div>
    </>
  );
}
