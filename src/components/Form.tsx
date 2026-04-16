import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { getCountryCodes } from "../hooks/useCountryCode";
import { validatePhoneNumber } from "../utils/helpers";

type PrefixType = {
  name: string;
  dial_code: string;
  code: string;
};

type InputTypes = {
  firstName: string;
  lastName: string;
  title: string;
  prefix: string;
  phoneNumber: string;
  email: string;
  message: string;
};

function Form() {
  const {
    register,
    handleSubmit,
    formState: { errors },
    setError,
    reset,
  } = useForm<InputTypes>();
  const [prefixes, setPrefixes] = useState<PrefixType[] | null>(null);

  useEffect(() => {
    async function getPrefixes() {
      const data = await getCountryCodes();
      const dataArr = [...data];
      setPrefixes(dataArr);
    }

    getPrefixes();
  }, []);

  async function onSubmit(data: InputTypes) {
    try {
      const { firstName, lastName, prefix, phoneNumber } = data;
      const combinedPhoneNumber = prefix.slice(1) + phoneNumber;
      const phoneNum = await validatePhoneNumber(combinedPhoneNumber);
      console.log(phoneNum);

      if (!phoneNum.is_valid) {
        setError("phoneNumber", {
          type: "manual",
          message: "Invalid phone number",
        });
        return;
      }

      const newData = {
        ...data,
        firstName:
          firstName.trim().split("").at(0)?.toUpperCase() + firstName.slice(1),
        lastName:
          lastName.trim().split("").at(0)?.toUpperCase() + lastName.slice(1),
        phoneNumber: combinedPhoneNumber,
      };
      console.log(
        `Hi ${newData.title} ${newData.firstName} ${newData.lastName}, Here is your data: 
        Phone Number: ${phoneNum.format_national},
        Location: ${phoneNum.country},
        Email: ${newData.email},
        Message: ${newData.message}
        `,
      );

      if (!phoneNum)
        throw new Error(
          "Something wrong with your connection. Please try again",
        );
    } catch (err) {
      console.error(err);
    } finally {
      reset();
    }
  }

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="text-sm text-black flex items-center justify-between flex-col gap-6 md:text-md w-full"
    >
      <h2 className="text-4xl font-bold">Contact Form</h2>
      {/* //---------------------------------------// */}
      <div className="w-full h-fit flex flex-col gap-1">
        <div className="flex flex-row items-center justify-around py-2 mb-3">
          <label
            htmlFor="firstName"
            className="w-6/12 tracking-wider font-bold lg:w-4/12"
          >
            First Name:{" "}
          </label>
          <div className="flex flex-col relative w-6/12 lg:w-8/12">
            <input
              type="text"
              id="firstName"
              className="border border-stone-300 outline-none px-5 py-2 tracking-widest h-8"
              {...register("firstName", {
                required: "*Firstname is required*",
              })}
            />
            {errors.firstName && (
              <span className="absolute top-8.5 left-1 text-brand-danger font-bold">
                {errors.firstName.message as string}
              </span>
            )}
          </div>
        </div>
        {/* //-------------------------------------// */}
        {/* //-------------------------------------// */}
        <div className="flex flex-row items-center justify-around py-2 w-full  mb-3">
          <label
            htmlFor="lastName"
            className="w-6/12 tracking-wider font-bold lg:w-4/12"
          >
            Last Name:{" "}
          </label>
          <div className="flex flex-col relative w-6/12 lg:w-8/12">
            <input
              type="text"
              id="lastName"
              className="border border-stone-300 outline-none px-5 py-2 tracking-widest h-8"
              {...register("lastName", {
                required: "*Lastname is required*",
              })}
            />
            {errors.lastName && (
              <span className="absolute top-8.5 left-1 text-brand-danger font-bold">
                {errors.lastName.message as string}
              </span>
            )}
          </div>
        </div>
        {/* //-------------------------------------// */}
        {/* //-------------------------------------// */}
        <div className="flex flex-row items-center py-2 w-full  mb-3">
          <label
            htmlFor=""
            className="w-6/12 tracking-wider font-bold lg:w-4/12"
          >
            Preferred Title:{" "}
          </label>

          <div className="flex flex-col relative w-6/12 lg:w-8/12">
            <div className="w-6/12 flex flex-col items-center justify-start sm:flex-row  md:gap-5 lg:w-8/12">
              <div className="flex gap-2">
                <input
                  type="radio"
                  id="mister"
                  value="Mr."
                  {...register("title", {
                    required: "*This field is required*",
                  })}
                />
                <label htmlFor="mister" className="tracking-widest">
                  Mr.
                </label>
              </div>
              <div className="flex gap-2">
                <input
                  type="radio"
                  id="miss"
                  value="Ms."
                  {...register("title", {
                    required: "*This field is required*",
                  })}
                />
                <label htmlFor="miss" className="tracking-widest">
                  Ms.
                </label>
              </div>
              <div className="flex gap-2">
                <input
                  type="radio"
                  id="mrs"
                  value="Mrs."
                  {...register("title", {
                    required: "*This field is required*",
                  })}
                />
                <label htmlFor="mrs" className="tracking-widest">
                  Mrs.
                </label>
              </div>
              {errors.title && (
                <span className="absolute top-7 left-1 text-brand-danger font-bold">
                  {errors.title.message as string}
                </span>
              )}
            </div>
          </div>
        </div>
        {/* //-------------------------------------// */}
        {/* //-------------------------------------// */}
        <div className="flex flex-row items-center justify-between py-2 w-full">
          <label htmlFor="contact" className="w-6/12 tracking-wider font-bold">
            Contact number:{" "}
          </label>
        </div>

        <div className="flex flex-row items-center justify-between py-2 w-full mb-3">
          <label htmlFor="prefix" className="text-black/65 lg:w-4/12">
            Prefix
          </label>
          <div className="lg:w-8/12 lg:flex lg:flex-start py-2 w-6/12 relative">
            <select
              {...register("prefix", { required: "*This field is required*" })}
              id="contact-prefix"
              className="border border-stone-300 outline-none px-5 py-2 w-6/12 max-w-46 tracking-widest"
            >
              {prefixes?.map((prefix) => (
                <option
                  key={prefix.name}
                  value={prefix.dial_code}
                  className="text-md"
                >
                  {String.fromCodePoint(
                    ...prefix.code
                      .toUpperCase()
                      .split("")
                      .map((c) => 127397 + c.charCodeAt(0)),
                  )}{" "}
                  ({prefix.dial_code})
                </option>
              ))}
            </select>
            {errors.prefix && (
              <span className="absolute top-12 left-1 text-brand-danger font-bold">
                {errors.prefix.message as string}
              </span>
            )}
          </div>
        </div>
        {/* //-------------------------------------// */}
        {/* //-------------------------------------// */}
        <div className="flex flex-row items-center justify-between py-2 w-full mb-3">
          <label htmlFor="phoneNumber" className="text-black/65 lg:w-4/12">
            Phone Number (10 digits):{" "}
          </label>
          <div className="flex flex-col relative w-6/12 lg:w-8/12">
            <input
              type="number"
              id="phoneNumber"
              className="border border-stone-300 outline-none px-5 py-2 tracking-widest h-8"
              {...register("phoneNumber", {
                required: "*This field is required*",
              })}
            />
            {errors.phoneNumber && (
              <span className="absolute top-8.5 left-1 text-brand-danger font-bold">
                {errors.phoneNumber.message as string}
              </span>
            )}
          </div>
        </div>
        {/* //-------------------------------------// */}
        {/* //-------------------------------------// */}
        <div className="flex flex-row items-center justify-between py-2 w-full mb-3">
          <label
            htmlFor="email"
            className="w-6/12 tracking-wider font-bold lg:w-4/12"
          >
            Email:{" "}
          </label>
          <div className="flex flex-col relative w-6/12 lg:w-8/12">
            <input
              type="email"
              id="email"
              className="border border-stone-300 outline-none px-5 py-2 tracking-widest h-8"
              {...register("email", {
                required: "*Email is required*",
                pattern: {
                  value: /^[^@ ]+@[^@ ]+\.[^@ ]+$/,
                  message: "Invalid email format",
                },
              })}
            />
            {errors.email && (
              <span className="absolute top-8.5 left-1 text-brand-danger font-bold">
                {errors.email.message as string}
              </span>
            )}
          </div>
        </div>
        {/* //-------------------------------------// */}
        {/* //-------------------------------------// */}
        <div className="flex flex-row items-center justify-between py-2 w-full mb-3">
          <label
            htmlFor="message"
            className="w-6/12 tracking-wider font-bold lg:w-4/12"
          >
            Message:
          </label>
          <div className="flex flex-col relative w-6/12 lg:w-8/12">
            <textarea
              id="message"
              placeholder="Write something here..."
              className="border border-stone-300 outline-none px-5 py-2 tracking-widest h-40 resize-none"
              spellCheck="false"
              {...register("message", { required: "*This field is required*" })}
            />
            {errors.message && (
              <span className="absolute top-41 left-1 text-brand-danger font-bold">
                {errors.message.message as string}
              </span>
            )}
          </div>
        </div>
        {/* //-------------------------------------// */}
        {/* //-------------------------------------// */}
        <div className="flex flex-row items-center justify-center py-2 w-full mt-3">
          <button className="bg-brand-submitBtn px-8 py-2 text-white rounded-md cursor-pointer 2xl:w-full 2xl:text-xl tracking-widest active:scale-99 transition-all duration-200 ease-in-out hover:bg-brand-submitBtn-hover">
            Submit
          </button>
        </div>
        {/* //-------------------------------------// */}
      </div>
    </form>
  );
}

export default Form;
