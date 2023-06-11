import "./../../styles/index.scope.css";
// import { Steps } from "primereact/steps";
// import { Toast } from "primereact/toast";
import React, { useEffect, useState } from "react";
import { Button, Divider, message, Steps } from "antd";
import {
  getCareerCluster,
  getRequiredSubjectDP,
  getSubjectDP,
  getTheCoosenSubject,
  postClusterProgramStepOne,
  postSubjectDPStepTwo,
} from "../../api/ClusterService";
import LoadComponent from "../../../../components/loaders/LoadComponent";
import { Checkbox } from "primereact/checkbox";

import Swal from "sweetalert2";
import { all } from "axios";

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
  const [requireSubjectDP, setRequireSubjectDP] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [selectedSubjects, setSelectedSubjects] = useState([]);
  const [formID, setFormID] = useState(0);

  const next = () => {
    if (
      current === 0 &&
      (selectedCategories.length === 0 || selectedCategories.length > 3)
    ) {
      Swal.fire({
        title:
          "There must be a cluster option or You can only choose a maximum of three options!!",
        showClass: {
          popup: "animate__animated animate__shakeX",
        },
        icon: "warning",
        width: 700,
      });
      console.log(selectedCategories);
      return;
    } else if (
      current === 1 &&
      (selectedCategories.length === 0 || selectedCategories.length < 6)
    ) {
      Swal.fire({
        title: "There must be a cluster option!!",
        showClass: {
          popup: "animate__animated animate__shakeX",
        },
        icon: "warning",
        width: 700,
      });
      return;
    }
    Swal.fire({
      title: "Are you sure?",
      text: "Do you want to proceed to the next step?",
      icon: "question",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes!",
    }).then(async (result) => {
      if (result.isConfirmed) {
        if (current === 0) {
          await postData(current);
          setCurrent(current + 1);
        } else if (current === 1) {
          await postData(current);
          setCurrent(current + 1);
        }
      } else {
        setCurrent(current);
        // getDataSubject(current);
      }
    });
  };

  const getDataSubject = async (current, formIdStepOne = 0) => {
    switch (current) {
      case 0:
        setIsLoading(true);
        await getCareerCluster()
          .then(({ data }) => {
            setResponseData(data);
          })
          .catch((err) => {
            throw err;
          });
        setIsLoading(false);
        setSelectedCategories([]);
        break;
      case 1:
        setIsLoading(true);
        await getSubjectDP()
          .then(({ data }) => {
            setResponseData(data);
          })
          .catch((err) => {
            throw err;
          });
        await getRequiredSubjectDP(formIdStepOne)
          .then(({ data }) => {
            setRequireSubjectDP(data);
          })
          .catch((err) => {
            throw err;
          });
        setSelectedCategories([]);
        setIsLoading(false);
        break;
      case 2:
        setIsLoading(true);
        await getTheCoosenSubject(formIdStepOne)
          .then(({ data }) => {
            setSelectedSubjects(data);
          })
          .catch((err) => {
            throw err;
          });
        setSelectedCategories([]);
        setIsLoading(false);
        break;
      default:
        break;
    }
  };

  const postData = async (current) => {
    switch (current) {
      case 0:
        setIsLoading(true);
        try {
          const dataStepOne = await postClusterProgramStepOne({
            programs: selectedCategories,
          });
          setSelectedCategories([]);
          setIsLoading(false);
          setFormID(dataStepOne.data.id);
          getDataSubject(current + 1, dataStepOne.data.id);
        } catch (error) {
          throw error;
        }
        break;
      case 1:
        setIsLoading(true);
        try {
          const dataStepTwo = await postSubjectDPStepTwo({
            form_id: formID,
            subjects: selectedCategories,
          });
          setSelectedCategories([]);
          setIsLoading(false);
          setFormID(dataStepTwo.data.id);
          getDataSubject(current + 1, dataStepTwo.data.id);
        } catch (error) {
          throw error;
        }
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
        (category) => category !== e.value
      );

    setSelectedCategories(_selectedCategories);
  };

  const items = steps.map((item) => ({ key: item.title, title: item.title }));

  useEffect(() => {
    getDataSubject(current);
  }, []);
  // console.log(formIdStepOne);

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
              <>
                {requireSubjectDP.length !== 0 && current === 1 && (
                  <>
                    <div className="cluster--wrapper-content-body--box-content--wrapper-steptwo">
                      <div className="cluster--wrapper-content-body--box-content--wrapper-steptwo--header">
                        <span>Required Subjects</span>
                      </div>
                      <Divider
                        style={{
                          margin: 0,
                        }}
                      />
                      {requireSubjectDP.map((subject, idx) => (
                        <span key={idx}>{subject}</span>
                      ))}
                    </div>
                    <Divider
                      type="vertical"
                      style={{
                        margin: 0,
                        height: "100%",
                      }}
                    />
                  </>
                )}
                {current === 0 || current === 1 ? (
                  <div className="cluster--wrapper-content-body--box-content--wrapper">
                    {current === 0 || current === 1 ? (
                      <>
                        <div className="cluster--wrapper-content-body--box-content--wrapper-header">
                          <span>
                            {current === 0
                              ? "Select Your Career Cluster"
                              : "Select Your DP Subject"}
                          </span>
                        </div>
                        <Divider
                          style={{
                            margin: 0,
                          }}
                        />
                      </>
                    ) : (
                      ""
                    )}
                    <div className="cluster--wrapper-content-body--box-content--wrapper-body">
                      {responseData?.map((data, idx) => (
                        <div
                          key={data.id}
                          className="cluster--wrapper-content-body--box-content-checkbox"
                        >
                          <Checkbox
                            inputId={data.id}
                            name="data"
                            value={data.id}
                            onChange={onCategoryChange}
                            checked={selectedCategories.some(
                              (item) => item === data.id
                            )}
                          />
                          <label
                            htmlFor={data.id}
                            className="ml-2 cursor-pointer"
                          >
                            {data.name}
                          </label>
                        </div>
                      ))}
                    </div>
                  </div>
                ) : (
                  ""
                )}
                {current === 2 && (
                  <div className="cluster--wrapper-content-body--box-content--wrapper">
                    <div className="cluster--wrapper-content-body--box-content--wrapper-header">
                      <span>I Select the Subject because : </span>
                    </div>
                    <Divider
                      style={{
                        margin: 0,
                      }}
                    />
                    <div className="cluster--wrapper-content-body--box-content--wrapper--subject-because">
                      <table
                        className="cluster--wrapper-content-body--box-content--wrapper--subject-because--table"
                        cellSpacing="10"
                        cellPadding="10"
                      >
                        <thead>
                          <tr>
                            <th width="30">No</th>
                            <th width="200">Summary of Subjects</th>
                            <th style={{ textAlign: "center" }} width="70">
                              I am good it
                            </th>
                            <th style={{ textAlign: "center" }} width="90">
                              I am interested it
                            </th>
                            <th style={{ textAlign: "center" }} width="70">
                              It's required
                            </th>
                          </tr>
                        </thead>
                        <tbody>
                          {selectedSubjects?.map((subject, idx) => (
                            <tr key={idx}>
                              <td>{idx + 1}</td>
                              <td>{subject.name}</td>
                              <td style={{ textAlign: "center" }}>
                                <Checkbox />
                              </td>
                              <td style={{ textAlign: "center" }}>
                                <Checkbox />
                              </td>
                              <td style={{ textAlign: "center" }}>
                                <Checkbox />
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </div>
                )}
              </>
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
        <Steps current={current} items={items} direction="vertical" />
      </div>
    </div>
  );
};

export default Cluster;