import React, { useState } from "react";
import isEmpty from "lodash/isEmpty";
import isNil from "lodash/isNil";
import styled from "styled-components";
import LogInformation from "../components/LogInformation";
import LoaderProcess from "../components/loaderFullProcess";

const MainContainer = styled.div`
  font-size: 16px;
  height: 100vh;
  overflow-y: scroll;
`;

const DivButton = styled.div`
  margin-top: 1em;
  display: flex;
  justify-content: space-around;
  width: 100%;
  button {
    padding: 10px 20px;
    border: none;
    border-radius: 1em;
    cursor: pointer;
    font-size: 1em;
  }
  .warning-log {
    background: orange;
    color: white;
    font-weight: bold;
  }
  .error-log {
    background: red;
    color: white;
    font-weight: bold;
  }
`;

const ContainerLogs = styled.div`
  width: 100%;
  margin-top: 2em;
  display: flex;
  flex-direction: column;
  row-gap: 1em;
`;

const CenterLog = styled.div`
  display: flex;
  justify-content: center;
  padding: 2em;
`;

export default function Home() {
  const [selectEnvironment, setSelectEnvironment] = useState("none");
  const [selectTypeLog, setSelectTypeLog] = useState(null);
  const [dataFetch, setDataFetch] = useState([]);
  const [loadApi, setLoadApi] = useState(false);

  const handlerGetLogsSelect = async (path) => {
    try {
      setLoadApi(true);
      const response = await fetch(`${window.location.href}api/${path}`, {
        method: "GET",
        headers: {
          "content-type": "application/json",
        },
      });
      const responseResult = await response.json();
      const responseArray =
        isEmpty(responseResult) === false &&
        isNil(responseResult.result) === false &&
        isEmpty(responseResult.result) === false
          ? responseResult.result
          : [];
      setDataFetch(responseArray);
      setLoadApi(false);
    } catch (error) {
      setLoadApi(false);
    }
  };

  const handlerDeleteLogsSelect = async (path, id) => {
    try {
      setLoadApi(true);
      await fetch(`${window.location.href}api/${path}`, {
        method: "PUT",
        body: JSON.stringify({
          _id: id,
        }),
        headers: {
          "content-type": "application/json",
        },
      });
      setLoadApi(false);
    } catch (error) {
      setLoadApi(false);
    }
  };

  return (
    <div>
      {loadApi && <LoaderProcess />}
      <MainContainer>
        <div>
          <h1>LOGS SYSTEM</h1>
        </div>
        <div>
          <select
            name="select environment"
            id="environment-select"
            onChange={(e) => {
              setSelectEnvironment(e.target.value);
              setDataFetch([]);
              setSelectTypeLog(null);
            }}
            value={selectEnvironment}
          >
            <option disabled value="none">
              Selecciona un entorno
            </option>
            <option value="test">Test</option>
            <option value="prod">Producción</option>
          </select>
        </div>
        {selectEnvironment !== "none" && (
          <>
            <DivButton>
              <button
                className={selectTypeLog === 1 ? "warning-log" : ""}
                onClick={() => {
                  if (selectTypeLog !== 1) {
                    const path = `${selectEnvironment}-warnings`;
                    handlerGetLogsSelect(path);
                    setSelectTypeLog(1);
                  }
                }}
              >
                Warnings
              </button>
              <button
                className={selectTypeLog === 2 ? "error-log" : ""}
                onClick={() => {
                  if (selectTypeLog !== 2) {
                    const path = `${selectEnvironment}-errors`;
                    handlerGetLogsSelect(path);
                    setSelectTypeLog(2);
                  }
                }}
              >
                Errors
              </button>
            </DivButton>
            <ContainerLogs>
              {isEmpty(dataFetch) === false &&
                loadApi === false &&
                dataFetch.map((row) => {
                  return (
                    <LogInformation
                      key={row["_id"]}
                      onChangeDelete={async (data) => {
                        const path = `${selectEnvironment}-${
                          selectTypeLog === 1 ? "warnings" : "errors"
                        }`;
                        await handlerDeleteLogsSelect(path, data["_id"]);
                        await handlerGetLogsSelect(path);
                      }}
                      data={row}
                      selectTypeLog={selectTypeLog}
                      selectEnvironment={selectEnvironment}
                    />
                  );
                })}
              {isEmpty(dataFetch) === true && (
                <CenterLog>
                  <h3>No se encontraron logs en {selectEnvironment}</h3>
                </CenterLog>
              )}
            </ContainerLogs>
          </>
        )}
      </MainContainer>
    </div>
  );
}
