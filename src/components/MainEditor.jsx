import React, { useEffect, useState } from "react";
import Codemirror from "codemirror";
import "codemirror/lib/codemirror.css";
import "codemirror/theme/ayu-mirage.css";
import "codemirror/mode/javascript/javascript";
import "codemirror/addon/edit/closetag";
import "codemirror/addon/edit/closebrackets";

const MainEditor = () => {
  // initializing code editor

  async function init() {
    Codemirror.fromTextArea(document.getElementById("realEditor"), {
      //   Additional options
      mode: { name: "javascript", json: true },
      theme: "ayu-mirage",
      autoCloseTags: true,
      autoCloseBrackets: true,
      lineNumbers: true,
    });

    console.log("hello");
  }
  useEffect(() => {
    async function intitialize() {
      await init();
    }

    intitialize();
  }, []);
  return <textarea className="w-full h-full" id="realEditor"></textarea>;
};

export default MainEditor;
