import Form from "./Form";

function ContactForm() {
  return (
    <div className="w-dvw h-full flex items-center justify-center">
      <div className="w-[80%] flex flex-col items-center justify-center gap-10 bg-brand-bg py-10 px-15 max-w-190 2xl:flex-row 2xl:max-w-7xl rounded-xl">
        <img
          src="contact-image.svg"
          alt="customer representative"
          className="object-contain w-full max-w-md h-auto md:w-120"
        />
        <Form />
      </div>
    </div>
  );
}

export default ContactForm;
