import type { NextPage } from "next";
import Head from "next/head";
import dynamic from "next/dynamic";

const Menu = dynamic(() => import("@component/components/Menu/Menu"), {
  ssr: true,
});

const FooterComponent = dynamic(
  () => import("@component/components/Footer/FooterComponent"),
  {
    ssr: true,
  }
);

const Terms: NextPage = () => {
  return (
    <>
      <Head>
        <title>Terms and Conditions ~ Act. Sing. Dance. Repeat.</title>
        <meta name="description" content="Terms and Conditions" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main>
        <div className="bg-slate-800 text-cyan-50">
          <Menu />
          <div className="mx-10 mt-10">
            <h1 className="mb-5 text-center text-3xl font-bold">
              Terms and Conditions for Act. Sing. Dance. Repeat.
            </h1>

            <h2 className="mb-1 font-bold">Introduction</h2>

            <p className="mb-2">
              These Website Standard Terms and Conditions written on this
              webpage shall manage your use of our website, Act. Sing. Dance.
              Repeat. accessible at https://www.actsingdancerepeat.com.
            </p>

            <p className="mb-5">
              These Terms will be applied fully and affect to your use of this
              Website. By using this Website, you agreed to accept all terms and
              conditions written in here. You must not use this Website if you
              disagree with any of these Website Standard Terms and Conditions.
              These Terms and Conditions have been generated with the help of
              the{" "}
              <a href="https://www.termsandcondiitionssample.com">
                Terms And Conditiions Sample Generator
              </a>
              .
            </p>

            <h2 className="mb-1 font-bold">Intellectual Property Rights</h2>

            <p className="mb-1">
              Other than the content you own, under these Terms, Act. Sing.
              Dance. Repeat. and/or its licensors own all the intellectual
              property rights and materials contained in this Website.
            </p>

            <p className="mb-5">
              You are granted limited license only for purposes of viewing the
              material contained on this Website.
            </p>

            <h2 className="mb-1 font-bold">Restrictions</h2>

            <p className="mb-2">
              You are specifically restricted from all of the following:
            </p>

            <ul className="mb-2 ml-1 list-inside list-disc">
              <li>publishing any Website material in any other media;</li>
              <li>
                selling, sublicensing and/or otherwise commercializing any
                Website material;
              </li>
              <li>publicly performing and/or showing any Website material;</li>
              <li>
                using this Website in any way that is or may be damaging to this
                Website;
              </li>
              <li>
                using this Website in any way that impacts user access to this
                Website;
              </li>
              <li>
                using this Website contrary to applicable laws and regulations,
                or in any way may cause harm to the Website, or to any person or
                business entity;
              </li>
              <li>
                engaging in any data mining, data harvesting, data extracting or
                any other similar activity in relation to this Website;
              </li>
              <li>
                using this Website to engage in any advertising or marketing.
              </li>
            </ul>

            <p className="mb-5">
              Certain areas of this Website are restricted from being access by
              you and Act. Sing. Dance. Repeat. may further restrict access by
              you to any areas of this Website, at any time, in absolute
              discretion. Any user ID and password you may have for this Website
              are confidential and you must maintain confidentiality as well.
            </p>

            <h2 className="mb-1 font-bold">Your Content</h2>

            <p className="mb-2">
              In these Website Standard Terms and Conditions, &quot;Your
              Content&quot; shall mean any audio, video text, images or other
              material you choose to display on this Website. By displaying Your
              Content, you grant Act. Sing. Dance. Repeat. a non-exclusive,
              worldwide irrevocable, sub licensable license to use, reproduce,
              adapt, publish, translate and distribute it in any and all media.
            </p>

            <p className="mb-5">
              Your Content must be your own and must not be invading any
              third-party&apos;s rights. Act. Sing. Dance. Repeat. reserves the
              right to remove any of Your Content from this Website at any time
              without notice.
            </p>

            <h2 className="mb-1 font-bold">No Warranties</h2>

            <p className="mb-5">
              This Website is provided &quot;as is,&quot; with all faults, and
              Act. Sing. Dance. Repeat. express no representations or
              warranties, of any kind related to this Website or the materials
              contained on this Website. Also, nothing contained on this Website
              shall be interpreted as advising you.
            </p>

            <h2 className="mb-1 font-bold">Limitation of liability</h2>

            <p className="mb-5">
              In no event shall Act. Sing. Dance. Repeat., nor any of its
              officers, directors and employees, shall be held liable for
              anything arising out of or in any way connected with your use of
              this Website whether such liability is under contract. Act. Sing.
              Dance. Repeat., including its officers, directors and employees
              shall not be held liable for any indirect, consequential or
              special liability arising out of or in any way related to your use
              of this Website.
            </p>

            <h2 className="mb-1 font-bold">Indemnification</h2>

            <p className="mb-5">
              You hereby indemnify to the fullest extent Act. Sing. Dance.
              Repeat. from and against any and/or all liabilities, costs,
              demands, causes of action, damages and expenses arising in any way
              related to your breach of any of the provisions of these Terms.
            </p>

            <h2 className="mb-1 font-bold">Severability</h2>

            <p className="mb-5">
              If any provision of these Terms is found to be invalid under any
              applicable law, such provisions shall be deleted without affecting
              the remaining provisions herein.
            </p>

            <h2 className="mb-1 font-bold">Variation of Terms</h2>

            <p className="mb-5">
              Act. Sing. Dance. Repeat. is permitted to revise these Terms at
              any time as it sees fit, and by using this Website you are
              expected to review these Terms on a regular basis.
            </p>

            <h2 className="mb-1 font-bold">Assignment</h2>

            <p className="mb-5">
              The Act. Sing. Dance. Repeat. is allowed to assign, transfer, and
              subcontract its rights and/or obligations under these Terms
              without any notification. However, you are not allowed to assign,
              transfer, or subcontract any of your rights and/or obligations
              under these Terms.
            </p>

            <h2 className="mb-1 font-bold">Entire Agreement</h2>

            <p className="mb-5">
              These Terms constitute the entire agreement between Act. Sing.
              Dance. Repeat. and you in relation to your use of this Website,
              and supersede all prior agreements and understandings.
            </p>

            <h2 className="font-bold">Governing Law & Jurisdiction</h2>

            <p className="pb-10">
              These Terms will be governed by and interpreted in accordance with
              the laws of the Province of Ontario, and you submit to the
              non-exclusive jurisdiction of the state and federal courts located
              in Ontario for the resolution of any disputes.
            </p>
          </div>
          <FooterComponent bgColor="bg-slate-800" />
        </div>
      </main>
    </>
  );
};

export default Terms;
