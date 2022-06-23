import React from "react";
import styled from "styled-components";
import isEmpty from "lodash/isEmpty";
import isNil from "lodash/isNil";
import LogInformation from "../../components/LogInformation";

const ContainerLogs = styled.div`
  width: 100%;
  margin-top: 2em;
  display: flex;
  flex-direction: column;
  row-gap: 1em;
`;

const LogTestError = ({ data }) => {
  return (
    <div>
      <ContainerLogs>
        <LogInformation
          detail
          onChangeDelete={async (data) => {}}
          data={data}
          selectTypeLog={2}
        />
      </ContainerLogs>
    </div>
  );
};

export async function getServerSideProps(context) {
  const { params } = context;
  const response = await fetch(`${process.env.HOST}api/test-errors`, {
    method: "POST",
    body: JSON.stringify({
      _id: params.pid,
    }),
    headers: {
      "content-type": "application/json",
    },
  });
  const responseResult = await response.json();
  const data =
    isEmpty(responseResult) === false &&
    isEmpty(responseResult.result) === false &&
    isNil(responseResult.result[0]) === false &&
    isEmpty(responseResult.result[0]) === false
      ? responseResult.result[0]
      : {};
  return {
    props: {
      data,
    },
  };
}

export default LogTestError;
