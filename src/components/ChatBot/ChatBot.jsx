import React, { useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import axios from "axios";
import styles from "./ChatBot.module.css";

export default function ChatBot() {
  const [chatHistory, setChatHistory] = useState([]);
  const [isLoading, setisLoading] = useState(false);
  const [error, setError] = useState("");
  const [msg, setMsg] = useState("");

  async function callChatBot(reqBody) {
    setError("");
    setisLoading(true);

    setChatHistory((prevChatHistory) => [
      ...prevChatHistory,
      { sender: "user", message: reqBody.userMessage },
    ]);

    try {
      const response = await axios.post(
        `http://127.0.0.1:8000/api/product/getResponse/`,
        reqBody
      );

      const botResponse = response.data.response;
      setChatHistory((prevChatHistory) => [
        ...prevChatHistory,
        { sender: "bot", message: botResponse },
      ]);
      setisLoading(false);
      // Reset form values after receiving bot response
      ChatBotForm.resetForm();
    } catch (error) {
      setError(error.response.data.error);
      setisLoading(false);
      console.error("Error during Forget:", error.response.data.error);
    }
  }

  const validationSchema = Yup.object({
    userMessage: Yup.string().required("userMessage is Required"),
  });

  const ChatBotForm = useFormik({
    initialValues: {
      // userMessage: "",
      userMessage: msg,
    },
    validationSchema,
    onSubmit: callChatBot,
  });
  function handleMsg(text) {
    ChatBotForm.setFieldValue("userMessage", text);
  }

  return (
    <div className="container">
      <div className={styles.chat_container}>
        <div className={styles.chat_history}>
          <div className={`${styles.question}`}>
            <h2>
              Some Question
            </h2>
            <p onClick={() => handleMsg("Hello")}>Hello</p>
            <p
              onClick={() =>
                handleMsg("Is this website secure for making transactions?")
              }
            >
              Is this website secure for making transactions?
            </p>
            <p onClick={() => handleMsg("What payment methods are accepted?")}>
              What payment methods are accepted?
            </p>
            <p
              onClick={() => handleMsg("How long does shipping usually take?")}
            >
              How long does shipping usually take?
            </p>
            <p
              onClick={() =>
                handleMsg("What if I'm not satisfied with my purchase?")
              }
            >
              What if I'm not satisfied with my purchase?
            </p>
            <p
              onClick={() =>
                handleMsg("Are there any discounts or promotions available?")
              }
            >
              Are there any discounts or promotions available?
            </p>
            <p
              onClick={() =>
                handleMsg("How can I track my order?")
              }
            >
             How can I track my order?
            </p>
            <p
              onClick={() =>
                handleMsg("Do you offer international shipping?")
              }
            >
             Do you offer international shipping?
            </p>
            <p
              onClick={() =>
                handleMsg("Can I cancel my order?")
              }
            >
             Can I cancel my order?
            </p>
            <p
              onClick={() =>
                handleMsg("What if the product I want is out of stock?")
              }
            >
             What if the product I want is out of stock?
            </p>
            <hr />
          </div>

          {chatHistory.map((entry, index) => (
            <div
              key={index}
              className={`${styles["chat-entry"]} ${styles[entry.sender]} `}
            >
              <span
                className={`${styles.icon} ${
                  entry.sender === "user" ? styles.user_icon : styles.bot_icon
                }`}
              >
                {entry.sender === "user" ? (
                  <>
                    <i className="far fa-user mx-2 fs-5"></i>
                    <span className={`${styles.message}`}>{entry.message}</span>
                  </>
                ) : (
                  <>
                    <span className={`${styles.message}`}>{entry.message}</span>
                    <i className="fas fa-robot mx-2 fs-5"></i>
                  </>
                )}
              </span>
            </div>
          ))}
        </div>
        {error && <div className="alert alert-danger">{error}</div>}
        <form onSubmit={ChatBotForm.handleSubmit} className={styles.chat_form}>
          <input
            type="text"
            id="userMessage"
            value={ChatBotForm.values.userMessage}
            name="userMessage"
            placeholder="Enter your message..."
            onChange={ChatBotForm.handleChange}
            onBlur={ChatBotForm.handleBlur}
          />
          <button
            type="submit"
            className={styles.send_message}
            disabled={!(ChatBotForm.isValid && ChatBotForm.dirty)}
          >
            {isLoading ? (
              <i className="fa fa-spinner fa-spin"></i>
            ) : (
              <i className="fa-regular fa-paper-plane"></i>
            )}
          </button>
        </form>
      </div>
    </div>
  );
}
