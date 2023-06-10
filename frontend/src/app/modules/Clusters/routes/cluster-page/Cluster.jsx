import "./../../styles/index.scope.css";
// import { Steps } from "primereact/steps";
// import { Toast } from "primereact/toast";
import React, { useEffect, useState } from "react";
import { Button, message, Steps } from "antd";
import { getCareerCluster, getSubjectDP } from "../../api/ClusterService";
import LoadComponent from "../../../../components/loaders/LoadComponent";
import { Checkbox } from "primereact/checkbox";

import Swal from "sweetalert2";

const steps = [
  {
    title: "Career Clusters",
    content: "program_name",
  },
  {
    title: "Diploma Programmed",
    content: "subject_name",
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
  const [isLoading, setIsLoading] = useState(false);
  const [selectedCategories, setSelectedCategories] = useState([]);

  const next = () => {
    Swal.fire({
      title: "Are you sure?",
      text: "Do you want to proceed to the next step?",
      icon: "question",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes!",
    }).then((result) => {
      if (result.isConfirmed) {
        setCurrent(current + 1);
        getDataSubject(current + 1);
        return;
      } else {
        setCurrent(current);
        // getDataSubject(current);
        return;
      }
    });
  };

  const getDataSubject = async (current) => {
    switch (current) {
      case 0:
        setIsLoading(true);
        await getCareerCluster()
          .then(({ data }) => {
            setResponseData(data);
          })
          .catch((err) => {
            throw err;
          })
          .finally(() => {
            setIsLoading(false);
          });
        break;
      case 1:
        setIsLoading(true);
        await getSubjectDP()
          .then(({ data }) => {
            setResponseData(data);
          })
          .catch((err) => {
            throw err;
          })
          .finally(() => {
            setIsLoading(false);
          });
        break;
      default:
        break;
    }
  };

  const onCategoryChange = (e) => {
    let _selectedCategories = [...selectedCategories];

    if (e.checked) _selectedCategories.push(e.value);
    else
      _selectedCategories = _selectedCategories.filter(
        (category) => category.key !== e.value.key
      );

    setSelectedCategories(_selectedCategories);
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
            {isLoading ? (
              <LoadComponent />
            ) : (
              responseData?.map((data, idx) => (
                <div key={idx} className="d-flex align-items-center gap-5">
                  <Checkbox
                    inputId={data.id}
                    name="data"
                    value={data}
                    onChange={onCategoryChange}
                    checked={selectedCategories.some(
                      (item) => item.id === data.id
                    )}
                  />
                  <label htmlFor={data.id} className="ml-2">
                    {data.name}
                  </label>
                </div>
              ))
            )}
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
