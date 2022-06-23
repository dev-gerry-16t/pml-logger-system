import React, { useState } from "react";
import styled from "styled-components";
import isEmpty from "lodash/isEmpty";
import isNil from "lodash/isNil";

const Logs = styled.div`
  width: 100%;
  background: #e8e8e8;
  border-radius: 1em;
  .header-log-info {
    cursor: pointer;
    display: flex;
    justify-content: space-between;
    padding: 1em 2em;
    font-size: 1.1em;
    color: black;
  }
`;

const InfoLog = styled.div`
  background: #f4f5fa;
  padding: ${(props) => (props.collapse === true ? "0px" : "1em")};
  overflow-y: scroll;
  max-height: ${(props) => (props.collapse === true ? "0px" : "700px")};
  transition: all 0.2s ease-out;
  h3 {
    margin: 0px;
  }
  textarea {
    background: #f2f1f1;
  }
  .item-1 {
    background: white;
    box-shadow: inset 2px 2px 2px 1px rgba(0, 0, 0, 0.2);
    padding: 1em;
    grid-area: paramsIn;
    min-height: 100px;
    max-height: 300px;
    overflow-y: scroll;
  }
  .item-2 {
    background: white;
    box-shadow: inset 2px 2px 2px 1px rgba(0, 0, 0, 0.2);
    padding: 1em;
    grid-area: paramsOut;
    min-height: 200px;
    max-height: 700px;
    overflow-y: scroll;
  }
  .item-3 {
    background: white;
    box-shadow: inset 2px 2px 2px 1px rgba(0, 0, 0, 0.2);
    padding: 1em;
    grid-area: errorInfo;
  }
  .item-4 {
    background: white;
    box-shadow: inset 2px 2px 2px 1px rgba(0, 0, 0, 0.2);
    padding: 1em;
    grid-area: backLocation;
  }

  .item-5 {
    padding: 1em;
    grid-area: actions;
    display: flex;
    justify-content: center;
    column-gap: 1em;
    button {
      padding: 1em;
      border-radius: 10px;
      border: none;
      font-weight: bold;
      cursor: pointer;
    }

    .copy-path-log {
    }
    .delete-log {
      background: red;
      color: white;
    }
  }

  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-template-rows: repeat(3, auto);
  row-gap: 1em;
  column-gap: 1em;
  grid-template-areas:
    "errorInfo backLocation"
    "paramsIn paramsOut"
    "actions actions";
`;

const LogInformation = (props) => {
  const {
    selectTypeLog,
    data,
    onChangeDelete,
    detail = false,
    selectEnvironment = "",
  } = props;
  const [collapseDetail, setCollapseDetail] = useState(
    detail === false ? true : false
  );

  const handlerParseMessage = (dataInfo) => {
    try {
      return JSON.parse(dataInfo);
    } catch (error) {
      return {};
    }
  };
  const messageParse =
    isEmpty(data.message) === false ? handlerParseMessage(data.message) : {};

  // const copyToClipBoard = () => {
  //   const content = document.getElementById(
  //     `copy-path-clipboard-${data["_id"]}`
  //   );

  //   content.select();
  //   document.execCommand("copy");
  //   alert("Copied!");
  // };

  const copiarAlPortapapeles = (text) => {
    const textArea = document.createElement("textarea");
    textArea.value = text;
    document.body.appendChild(textArea);
    textArea.focus();
    textArea.select();
    try {
      document.execCommand("copy");
      alert("Copied!");
    } catch (err) {}

    document.body.removeChild(textArea);
  };

  const copyTextToClipboard = (num) => {
    if (!navigator.clipboard) {
      copiarAlPortapapeles(num);
      return;
    }
    navigator.clipboard.writeText(num).then(
      () => {
        alert("Copied!");
      },
      (err) => {}
    );
  };

  return (
    <Logs>
      <div
        className="header-log-info"
        onClick={() => {
          setCollapseDetail(!collapseDetail);
        }}
      >
        <div>{messageParse.dateTime}</div>
        <strong
          style={{
            color: selectTypeLog === 1 ? "orange" : "red",
          }}
        >
          {selectTypeLog === 1 ? "Warning id" : "Error id"} {data["_id"]}
        </strong>
        <strong>[{messageParse.storeProcedure}]</strong>
      </div>
      <InfoLog collapse={collapseDetail}>
        <div className="item-1">
          <h3>Parámetros de entrada</h3>

          <textarea
            style={{
              minWidth: "100%",
              maxWidth: "100%",
              minHeight: "200px",
            }}
            defaultValue={
              isEmpty(messageParse.paramsIn) === false
                ? JSON.stringify(messageParse.paramsIn, null, 2)
                : ""
            }
          />
        </div>
        <div className="item-2">
          <h3>Parámetros de salida</h3>
          <p>
            <textarea
              style={{
                minWidth: "100%",
                maxWidth: "100%",
                minHeight: "200px",
              }}
              defaultValue={
                isEmpty(messageParse.paramsOut) === false
                  ? JSON.stringify(messageParse.paramsOut, null, 2)
                  : ""
              }
            />
          </p>
        </div>
        <div className="item-3">
          <h3>Error Info</h3>
          <p>{messageParse.errorMessage}</p>
          <p>
            <textarea
              style={{
                minWidth: "100%",
                maxWidth: "100%",
                minHeight: "200px",
              }}
              defaultValue={
                isEmpty(messageParse.errorSystem) === false
                  ? JSON.stringify(messageParse.errorSystem, null, 2)
                  : ""
              }
            />
          </p>
        </div>
        <div className="item-4">
          <h3>Localización</h3>
          <p>
            <textarea
              style={{
                minWidth: "100%",
                maxWidth: "100%",
                minHeight: "200px",
              }}
              defaultValue={
                isEmpty(messageParse.location) === false
                  ? JSON.stringify(messageParse.location, null, 2)
                  : ""
              }
            />
          </p>
        </div>
        <div className="item-5">
          {detail === false && (
            <button
              className="copy-path-log"
              onClick={() => {
                copyTextToClipboard(
                  `${window.location.href}${selectEnvironment}-${
                    selectTypeLog === 1 ? "warning" : "error"
                  }/${data["_id"]}`
                );
              }}
            >
              Copiar Url
            </button>
          )}
          <button
            className="delete-log"
            onClick={() => {
              onChangeDelete(data);
              setCollapseDetail(true);
            }}
          >
            Eliminar log
          </button>
        </div>
      </InfoLog>
    </Logs>
  );
};

export default LogInformation;
