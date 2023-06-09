import React, { useEffect } from "react";

function Chatbot() {
  useEffect(() => {
    if (typeof window.kommunicate !== "undefined") {
      return; // Script already loaded, do nothing
    }
    (function (d, m) {
      var kommunicateSettings = {
        appId: "3c085b02d95a465061692dd334a7e497e",
        popupWidget: true,
        automaticChatOpenOnNavigation: true,
      };
      var s = document.createElement("script");
      s.type = "text/javascript";
      s.async = true;
      s.src = "https://widget.kommunicate.io/v2/kommunicate.app";
      var h = document.getElementsByTagName("head")[0];
      h.appendChild(s);
      window.kommunicate = m;
      m._globals = kommunicateSettings;
    })(document, window.kommunicate || {});
  }, []);
  return <div></div>;
}

export default Chatbot;
