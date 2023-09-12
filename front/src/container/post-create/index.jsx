import "./index.css";

import Flex from "../../component/flex";
import FieldForm from "../../component/field-form";
import { useState } from "react";

import { LOAD_STATUS, Alert, Loader } from "../../component/load";

function PostCreate({ onCreate, placeholder, button, id = null }) {
  const [status, setStatus] = useState(null);
  const [message, setMessage] = useState("");

  const handleSubmit = (value) => {
    return sendData(value);
  };

  const sendData = async (dataToSend) => {
    setStatus(LOAD_STATUS.PROGRESS);

    try {
      const res = await fetch("http://localhost:4000/post-create", {
        method: "POST",
        headers: {
          "content-type": "application/json",
        },
        body: convertData(dataToSend),
      });

      const data = await res.json();

      if (res.ok) {
        setStatus(null);

        if (onCreate) onCreate();
      } else {
        setMessage(data.message);
        setStatus(LOAD_STATUS.ERROR);
      }
    } catch (err) {
      setMessage(err.message);
      setStatus(LOAD_STATUS.ERROR);
    }
  };

  const convertData = (value) => {
    return JSON.stringify({
      text: value,
      userName: "user",
      postId: id,
    });
  };

  return (
    <Flex>
      <FieldForm
        placeholder={placeholder}
        button={button}
        onSubmit={handleSubmit}
      />
      {status === LOAD_STATUS.ERROR && (
        <Alert status={status} message={message} />
      )}

      {status === LOAD_STATUS.PROGRESS && <Loader />}
    </Flex>
  );
}

export default PostCreate;
