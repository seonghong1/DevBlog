import classes from "./contact-form.module.css";
import { useState, useEffect } from "react";
import Notification from "../ui/notification";
import Error from "next/error";

async function sendContactData(newMessage) {
  const response = await fetch("/api/contact", {
    method: "POST",
    body: JSON.stringify(newMessage),
    headers: {
      "Content-Type": "application/json",
    },
  });
  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || "error");
  }
}

function ContactForm() {
  const [enteredEmail, setEnteredEmail] = useState("");
  const [enteredName, setEnteredName] = useState("");
  const [enteredMessage, setEnteredMessage] = useState("");

  const [requestStatus, setRequetStatus] = useState();

  useEffect(() => {
    if (requestStatus === "success" || requestStatus == "error") {
      const timer = setTimeout(() => {
        setRequetStatus(null);
      }, 2000);
      return () => clearTimeout(timer);
    }
  }, [requestStatus]);

  async function sendMessageHandler(e) {
    e.preventDefault();
    const newMessage = {
      email: enteredEmail,
      name: enteredName,
      message: enteredMessage,
    };
    setRequetStatus("pending");
    try {
      await sendContactData(newMessage);
      setRequetStatus("success");
    } catch (err) {
      setRequetStatus("error");
    }
  }
  let notification;
  if (requestStatus === "pending") {
    notification = {
      status: "pending",
      title: "메세지 전송중 😁",
      message: "메세지가 전송중이에요. 잠시만 기다려주세요.",
    };
  }
  if (requestStatus === "success") {
    notification = {
      status: "success",
      title: "메세지 전송 완료 😆",
      message: "메세지 전송이 완료되었어요.",
    };
  }
  if (requestStatus === "error") {
    notification = {
      status: "error",
      title: "메세지 전송 에러 😅",
      message: "메세지 전송에 실패했어요.",
    };
  }

  return (
    <section className={classes.contact}>
      <h1>
        프로젝트에 대한 피드백, <br />
        개발 관련 질문, 언제나 환영입니다.😁
        <br />
      </h1>
      <form onSubmit={sendMessageHandler} className={classes.form}>
        <div className={classes.controls}>
          <div className={classes.control}>
            <label htmlFor="email">이메일</label>
            <input
              type="email"
              id="email"
              value={enteredEmail}
              onChange={(e) => setEnteredEmail(e.target.value)}
            />
          </div>
          <div className={classes.control}>
            <label htmlFor="name">이름</label>
            <input
              type="text"
              id="name"
              value={enteredName}
              onChange={(e) => setEnteredName(e.target.value)}
            />
          </div>
        </div>
        <div className={classes.control}>
          <label htmlFor="message">메세지</label>
          <textarea
            name=""
            id="message"
            rows="5"
            value={enteredMessage}
            onChange={(e) => setEnteredMessage(e.target.value)}
          ></textarea>
        </div>
        <div className={classes.actions}>
          <button>전송하기</button>
        </div>
      </form>
      {notification && <Notification notification={notification} />}
    </section>
  );
}
export default ContactForm;
