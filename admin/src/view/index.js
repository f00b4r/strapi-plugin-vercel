import React, { useState, useEffect } from "react";
import { request } from "strapi-helper-plugin";
import { Table, Padded, Flex, Button } from "@buffetjs/core";
import { LoadingBar } from "@buffetjs/styles";
import moment from 'moment';
import { Block } from "./components";

const Deployments = () => {
  const { error, isLoading, deployments } = useDeployments();

  if (isLoading) {
    return (
      <Padded bottom size="md">
        <LoadingBar />
      </Padded>
    );
  };

  if (error) return (<Block>Error occured during fetching deployments</Block>)

  const latestDeploy = deployments.shift();

  return (
    <>
      <DeploymentLast deployment={latestDeploy} />
      <DeploymentList deployments={deployments} />
    </>
  );
};

const DeploymentList = (props) => {
  const { deployments } = props;

  if (!deployments || deployments.length === 0) {
    return (
      <Padded bottom size="md">
        <p>No deployments, make your first deploy</p>;
      </Padded>
    );
  }

  const headers = [
    {
      name: "Date",
      value: "created",
      cellFormatter(name, row) {
        return moment(row.created).format('DD.MM.YYYY HH:mm:SS');
      }
    },
    {
      name: "URL",
      value: "url",
    },
    {
      name: "Sate",
      value: "state",
    },
    {
      name: "Target",
      value: "target",
    },
  ];

  return (
    <>
      <Padded bottom size="md">
        <Table
          headers={headers}
          rows={deployments}
          onClickRow={(e, data) => {
            window.open(urlize(data.url), '_blank');
          }} />
      </Padded>
    </>
  );
};

const DeploymentLast = (props) => {
  const { deployment: deploy } = props;

  if (!deploy) return (<Block>No last deployment found</Block>);

  const { error, isLoading, deployment } = useDeployment({ id: deploy.uid });

  if (isLoading) {
    return (
      <Padded bottom size="md">
        <LoadingBar />
      </Padded>
    );
  };

  if (error) return (<Block>Error occured during fetching last deployment</Block>);

  return (
    <Block>
      <Flex alignItems="center">
        <div className="mr-4">
          {deployment.readyState === 'READY' ?
            (
              <a href={urlize(deployment.url)} target="_blank" style={{ width: '400px', height: '250px', display: 'block' }}>
                <img height="250" title={deployment.url} alt={deployment.url} src={`https://api.microlink.io?url=${urlize(deployment.url)}&screenshot=true&meta=false&embed=screenshot.url`} />
              </a>
            ) : (
              <div className="waiting">Waiting for deployment to finish...</div>
            )}
        </div>
        <div>
          <div className="mb-4">
            <div className="label">DEPLOYMENT</div>
            <div><a href={urlize(deployment.url)} target="_blank">{deployment.url}</a></div>
          </div>
          <div className="mb-4">
            <div className="label">DOMAINS</div>
            <div>
              {deployment.alias.map(alias => (
                <div key={alias}><a href={urlize(alias)} target="_blank">{alias}</a></div>
              ))}
            </div>
          </div>
          <div className="mb-4">
            <div className="label">STATE</div>
            <div>{deployment.readyState}</div>
          </div>
          <div className="mb-4">
            <div className="label">CREATED</div>
            <div>{moment(deployment.created).format('DD.MM.YYYY HH:mm:SS')}</div>
          </div>
          <div>
            <div className="label">TARGET</div>
            <div>{deployment.target}</div>
          </div>
        </div>
      </Flex>
    </Block>
  );
};

const DeployButton = () => {
  const [state, setState] = useState({
    loading: false,
  });

  const onClick = async () => {
    setState({ loading: true });
    await deploy('production');
    setImmediate(() => window.location.reload());
  };

  return (
    <Button color="success" type="submit" isLoading={state.loading} onClick={onClick}>Deploy</Button>
  )
}

const useDeployments = () => {
  const [state, setState] = useState({
    error: null,
    isLoading: true,
    deployments: [],
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const { deployments } = await request("/vercel/deployments", {
          method: "GET",
        });
        setState({ isLoading: false, deployments, error: null });
      } catch (e) {
        strapi.notification.error("notification.error");
        setState({ isLoading: false, error: e, deployments: [] });
      }
    };

    fetchData();
  }, []);

  return state;
};

const useDeployment = (props) => {
  const { id } = props;
  const [state, setState] = useState({
    error: null,
    isLoading: true,
    deployment: null,
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await request(`/vercel/deployments/${id}`, {
          method: "GET",
        });
        setState({ isLoading: false, deployment: data, error: null });
      } catch (e) {
        strapi.notification.error("notification.error");
        setState({ isLoading: false, error: e, deployment: null });
      }
    };

    fetchData();
  }, []);

  return state;
};

const deploy = async (target) => {
  try {
    const data = await request(`/vercel/deploy/${target}`, {
      method: "POST",
    });
    return data;
  } catch (e) {
    strapi.notification.error("notification.error");
  }
}

const urlize = (url) => {
  return `https://${url}`;
};


export { Deployments, DeployButton };
