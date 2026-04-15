import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { getCountryCodes } from "../hooks/useCountryCode";

type PrefixType = {
  name: string;
  dial_code: string;
  code: string;
};

function Form() {
  const { register, handleSubmit } = useForm();
  const [data, setData] = useState("");
  const [prefixes, setPrefixes] = useState<PrefixType[] | null>(null);

  useEffect(() => {
    async function getPrefixes() {
      const data = await getCountryCodes();
      const dataArr = [...data];
      setPrefixes(dataArr);
    }

    getPrefixes();
  }, []);

  console.log(prefixes);

  return (
    <form
      onSubmit={handleSubmit((data) => setData(JSON.stringify(data)))}
      className="text-lg text-black flex items-center justify-between flex-col gap-6 md:text-xl w-full"
    >
      <h2 className="text-4xl font-bold">Contact Form</h2>
      {/* //---------------------------------------// */}
      <div className="w-full h-fit">
        <div className="flex flex-row items-center justify-around py-2">
          <label
            htmlFor="firstName"
            className="w-6/12 tracking-wider font-bold lg:w-4/12"
          >
            First Name:{" "}
          </label>
          <input
            type="text"
            id="firstName"
            className="border border-stone-300 outline-none px-5 py-2 w-6/12 lg:w-8/12 tracking-widest"
          />
        </div>
        {/* //-------------------------------------// */}
        {/* //-------------------------------------// */}
        <div className="flex flex-row items-center justify-around py-2 w-full">
          <label
            htmlFor="lastName"
            className="w-6/12 tracking-wider font-bold lg:w-4/12"
          >
            Last Name:{" "}
          </label>
          <input
            type="text"
            id="lastName"
            className="border border-stone-300 outline-none px-5 py-2 w-6/12 lg:w-8/12 tracking-widest"
          />
        </div>
        {/* //-------------------------------------// */}
        {/* //-------------------------------------// */}
        <div className="flex flex-row items-center justify-between py-2 w-full">
          <label
            htmlFor=""
            className="w-6/12 tracking-wider font-bold lg:w-4/12"
          >
            Preferred Title:{" "}
          </label>

          <div className="w-6/12 flex flex-col sm:flex-row lg:gap-10 md:gap-5 ">
            <div className="flex gap-2">
              <input type="radio" id="mister" name="title" />
              <label htmlFor="mister" className="tracking-widest">
                Mr.
              </label>
            </div>
            <div className="flex gap-2">
              <input type="radio" id="miss" name="title" />
              <label htmlFor="miss" className="tracking-widest">
                Ms.
              </label>
            </div>
            <div className="flex gap-2">
              <input type="radio" id="mrs" name="title" />
              <label htmlFor="mrs" className="tracking-widest">
                Mrs.
              </label>
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

        <div className="flex flex-row items-center justify-between py-2 w-full">
          <label htmlFor="prefix" className="text-black/65 lg:w-4/12">
            Prefix
          </label>
          <div className="lg:w-8/12 lg:flex lg:flex-start py-2 w-6/12">
            <select
              {...register("prefix")}
              id="contact-prefix"
              className="border border-stone-300 outline-none px-5 py-2 w-6/12 max-w-36 tracking-widest"
            >
              {prefixes?.map((prefix) => (
                <option
                  key={prefix.code}
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
          </div>
        </div>
        {/* //-------------------------------------// */}
        {/* //-------------------------------------// */}
        <div className="flex flex-row items-center justify-between py-2 w-full">
          <label htmlFor="phoneNumber" className="text-black/65 lg:w-4/12">
            Phone Number:{" "}
          </label>
          <input
            type="number"
            id="phoneNumber"
            className="border border-stone-300 outline-none px-5 py-2 w-6/12 lg:w-8/12 tracking-widest"
          />
        </div>
        {/* //-------------------------------------// */}
        {/* //-------------------------------------// */}
        <div className="flex flex-row items-center justify-between py-2 w-full">
          <label
            htmlFor="email"
            className="w-6/12 tracking-wider font-bold lg:w-4/12"
          >
            Email:{" "}
          </label>
          <input
            type="text"
            id="email"
            className="border border-stone-300 outline-none px-5 py-2 w-6/12 lg:w-8/12 tracking-widest"
          />
        </div>
        {/* //-------------------------------------// */}
        {/* //-------------------------------------// */}
        <div className="flex flex-row items-center justify-between py-2 w-full">
          <label
            htmlFor="message"
            className="w-6/12 tracking-wider font-bold lg:w-4/12"
          >
            Message:
          </label>
          <textarea
            name="message"
            id="message"
            placeholder="Write something here..."
            className="border border-stone-300 outline-none px-5 py-2 w-6/12 h-40 lg:w-8/12 tracking-widest"
            spellCheck="false"
          ></textarea>
        </div>
        {/* //-------------------------------------// */}
        {/* //-------------------------------------// */}
        <div className="flex flex-row items-center justify-center py-2 w-full mt-10">
          <button className="bg-brand-submitBtn px-8 py-2 text-white rounded-md cursor-pointer 2xl:w-full 2xl:text-xl tracking-widest">
            Submit
          </button>
        </div>
        {/* //-------------------------------------// */}
      </div>
    </form>
  );
}

export default Form;
