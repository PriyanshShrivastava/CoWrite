import React, { useEffect, useRef, useState } from "react";
import Codemirror from "codemirror";
import "codemirror/lib/codemirror.css";
import "codemirror/theme/ayu-mirage.css";
import "codemirror/mode/javascript/javascript";
import "codemirror/addon/edit/closetag";
import "codemirror/addon/edit/closebrackets";

const MainEditor = () => {
  const editorRef = useRef(null);
  // initializing code editor

  async function init() {
    editorRef.current = Codemirror.fromTextArea(
      document.getElementById("realEditor"),
      {
        //   Additional options
        mode: { name: "javascript", json: true },
        theme: "ayu-mirage",
        autoCloseTags: true,
        autoCloseBrackets: true,
        lineNumbers: true,
      }
    );
    editorRef.current.on("change", (instance, changes) => {
      const { origin } = changes;
      const text = instance.getValue();

      // checking for already set values
    });

    console.log("hello");
  }
  useEffect(() => {
    async function intitialize() {
      await init();
    }

    intitialize();
  }, []);
  return (
    <>
      <textarea className="w-full h-full" id="realEditor"></textarea>;
    </>
  );
};

export default MainEditor;
