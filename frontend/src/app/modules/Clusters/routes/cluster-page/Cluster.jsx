import "./../../styles/index.scope.css";
// import { Steps } from "primereact/steps";
// import { Toast } from "primereact/toast";
import React, { useEffect, useState } from "react";
import { Button, message, Steps } from "antd";
import { getCareerCluster } from "../../api/ClusterService";

const steps = [
  {
    title: "Career Clusters",
    content: "Career Clusters",
  },
  {
    title: "Diploma Programmed",
    content: "Diploma Programmed",
  },
  {
    title: "Subject Because",
    content: "Subject Because",
  },
  {
    title: "Meeting Schedule",
    content: "Meeting Schedule",
  },
  {
    title: "Summary",
    content: "Summary",
  },
];

const Cluster = () => {
  const [current, setCurrent] = useState(0);
  const [responseData, setResponseData] = useState([]);

  const next = () => {
    setCurrent(current + 1);
  };

  const getDataSubject = async (current) => {
    switch (current) {
      case 0:
        await getCareerCluster()
          .then(({ data }) => {
            setResponseData(data);
          })
          .catch((err) => {
            throw err;
          });
        break;
      default:
        break;
    }
  };

  const items = steps.map((item) => ({ key: item.title, title: item.title }));

  useEffect(() => {
    getDataSubject(current);
  }, []);

  console.log(responseData);

  return (
    <div className="cluster--container">
      <div className="cluster--wrapper cluster--wrapper-content">
        <div className="cluster--wrapper-content-header">
          <span>{steps[current].title}</span>
        </div>
        <div className="cluster--wrapper-content-body">
          <div className="cluster--wrapper-content-body--box-content">
            {responseData?.map((item, idx) => (
              <span key={idx}>{item.program_name  }</span>
            ))}
          </div>
        </div>
        <div className="cluster--wrapper-content-footer">
          {current < steps.length - 1 && (
            <Button type="primary" onClick={() => next()}>
              Next
            </Button>
          )}
          {current === steps.length - 1 && (
            <Button
              type="primary"
              onClick={() => message.success("Processing complete!")}
            >
              Done
            </Button>
          )}
        </div>
      </div>
      <div className="cluster--wrapper cluster--steps">
        <Steps
          className="cluster--steps-item"
          direction="vertical"
          current={current}
          items={items}
        />
        {/* <Toast ref={toast}></Toast>
        <Steps
          model={[
            {
              label: "Personal",
              command: (event) => {
                toast.current.show({
                  severity: "info",
                  summary: "First Step",
                  detail: event.item.label,
                });
              },
            },
            {
              label: "Seat",
              command: (event) => {
                toast.current.show({
                  severity: "info",
                  summary: "Second Step",
                  detail: event.item.label,
                });
              },
            },
            {
              label: "Payment",
              command: (event) => {
                toast.current.show({
                  severity: "info",
                  summary: "Third Step",
                  detail: event.item.label,
                });
              },
            },
            {
              label: "Confirmation",
              command: (event) => {
                toast.current.show({
                  severity: "info",
                  summary: "Last Step",
                  detail: event.item.label,
                });
              },
            },
          ]}
          activeIndex={activeIndex}
          onSelect={(e) => setActiveIndex(e.index)}
          readOnly={false}
        /> */}
      </div>
    </div>
  );
};

export default Cluster;
