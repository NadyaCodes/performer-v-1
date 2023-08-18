import ContactComponent from "@component/components/Contact/ContactComponent";
import Menu from "@component/components/Menu/Menu";
import React from "react";
import SenderScript from "@component/components/Contact/SenderScript";

export default function Contact() {
  return (
    <>
      {/* <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `
        (function (s, e, n, d, er) {
          s['Sender'] = er;
          s[er] = s[er] || function () {
            (s[er].q = s[er].q || []).push(arguments)
          }, s[er].l = 1 * new Date();
          var a = e.createElement(n),
              m = e.getElementsByTagName(n)[0];
          a.async = 1;
          a.src = d;
          m.parentNode.insertBefore(a, m)
        })(window, document, 'script', 'https://cdn.sender.net/accounts_resources/universal.js', 'sender');
        sender('2fab698c039070');
        `,
          }}
        />
      </head> */}
      <div className="bg-cyan-50 bg-opacity-80">
        <Menu />
        <SenderScript />
        <ContactComponent />
      </div>
    </>
  );
}
