import React, { useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import axios from "axios";
import styles from "./ChatBot.module.css";

export default function ChatBot() {
  const [chatHistory, setChatHistory] = useState([]);
  const [isLoading, setisLoading] = useState(false);
  const [error, setError] = useState("");

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
      userMessage: "",
    },
    validationSchema,
    onSubmit: callChatBot,
  });

  return (
    <div className="container">
      <div className={styles.chat_container}>
        <div className={styles.chat_history}>
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
