import Head from "next/head";

import ContactForm from "@/components/contact/contact-form";
export default function ContactPage() {
  return (
    <>
      <Head>
        <title>메세지</title>
      </Head>
      <ContactForm />
    </>
  );
}
