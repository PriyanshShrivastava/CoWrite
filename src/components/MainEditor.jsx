import React, { useEffect, useRef, useState } from "react";
import Codemirror from "codemirror";
import "codemirror/lib/codemirror.css";
import "codemirror/theme/ayu-mirage.css";
import "codemirror/mode/javascript/javascript";
import "codemirror/addon/edit/closetag";
import "codemirror/addon/edit/closebrackets";
import Actions from "../EventActions";

const MainEditor = ({ socketRef, id, textChange }) => {
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

      textChange(text);

      // checking for already set values
      if (origin !== "setValue") {
        socketRef.current.emit(Actions.CODE_CHANGE, {
          id,
          text,
        });
      }
    });
  }

  useEffect(() => {
    if (socketRef.current) {
      socketRef.current.on(Actions.CODE_CHANGE, ({ text }) => {
        if (text !== null) {
          editorRef.current.setValue(text);
        }
      });
    }

    return () => {
      socketRef.current.off(Actions.CODE_CHANGE);
    };
  }, [socketRef.current]);

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
