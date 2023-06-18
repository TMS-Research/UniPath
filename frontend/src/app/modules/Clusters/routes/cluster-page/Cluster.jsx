import "./../../styles/index.scope.css";
// import { Steps } from "primereact/steps";
// import { Toast } from "primereact/toast";
import React, { useEffect, useState } from "react";
import { Button, Divider, message, Steps } from "antd";
import { Dropdown } from "primereact/dropdown";
import { Calendar } from 'primereact/calendar';
import {
  getCareerCluster,
  getRequiredSubjectDP,
  getSubjectDP,
  getTheCoosenSubject,
  postClusterProgramStepOne,
  postSubjectDPStepThree,
  postSubjectDPStepFour,
  postSubjectDPStepTwo,
  getSummary
} from "../../api/ClusterService";
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
  const [requireSubjectDP, setRequireSubjectDP] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [selectedSubjects, setSelectedSubjects] = useState([]);
  const [selectedSubjectsDP, setSelectedSubjectsDP] = useState([]);
  const [formID, setFormID] = useState(0);

  // select subjectDP
  const [languageLiterature, setLanguageLiterature] = useState(null);
  const [languageAcquistition, setLanguageAcquistition] = useState(null);
  const [mathematics, setMathematics] = useState(null);
  const [individualSocieties, setIndividualSocieties] = useState(null);
  const [science, setScience] = useState(null);
  const [arts, setArts] = useState(null);
  const [selectedTime, setSelectedTime] = useState(null);

  const [selectedPerson, setSelectedPerson] = useState(null);
  const [optionSubject, setOptionSubject] = useState(null);

  const [Summary, setSummary] = useState(null);
  const [checkboxValue, setCheckboxValues] = useState(
    Array.from({ length: 6 }, () => ({ "isGood": false, "isInterested": false, "isRequired": false }))
  );

  const handleCheckboxChange = (index, checkboxIndex, checked, subjectId) => {
    setCheckboxValues((prevState) => {
      const updateValues = [...prevState];
      let optioncheckbox = null;
      if (checkboxIndex == 0) {
        optioncheckbox = "isGood"
      } else if (checkboxIndex == 1) {
        optioncheckbox = "isInterested"
      } else {
        optioncheckbox = "isRequired"
      }
      updateValues[index] = {
        ...updateValues[index],
        [optioncheckbox]: checked,
        subject_id: subjectId.subject_id,
      };
      console.log(updateValues);
      return updateValues;
    });
  };

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
    }
    if (current === 1 && selectedSubjectsDP.some((subject) => subject === 0)) {
      Swal.fire({
        title: "there must be cluster option!",
        showClass: {
          popup: "animate__animated animate__shakeX",
        },
        icon: "warning",
        width: 700,
      });
      return;
    }
    if (current === 2 && checkboxValue.some((vall) => vall.isGood === false && vall.isInterested === false && vall.isRequired === false)) {
      Swal.fire({
        title: "please complete the form!",
        showClass: {
          popup: "animate__animated animate__shakeX",
        },
        icon: "warning",
        width: 700,
      });
      return;
    }
    if (current === 3 && selectedTime==null ||current === 3 && selectedPerson==null) {
      console.log(current)
      Swal.fire({
        title: "the form is required!",
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
        else if (current === 2) {
          await postData(current);
          setCurrent(current + 1);
        }
        else if (current === 3) {
          await postData(current);
          setCurrent(current + 1);
        }
      } else {
        setCurrent(current);
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
        await getSubjectDP(formIdStepOne)
          .then((res) => {
            setResponseData(res);
            setOptionSubject({ group_1: res.group_1, group_2: res.group_2 });
            setSelectedSubjectsDP([0, 0, 0, 0, 0, 0]);
            console.log(res);
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
      case 4:
        setIsLoading(true);
        await getSummary(formIdStepOne)
          .then(({ data }) => {
            setSummary(data);
            console.log(data);
          })
          .catch((err) => {
            throw err;
          });
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
            subjects: selectedSubjectsDP,
          });
          setSelectedCategories([]);
          setIsLoading(false);
          setFormID(dataStepTwo.data.id);
          getDataSubject(current + 1, dataStepTwo.data.id);
        } catch (error) {
          throw error;
        }
        break;
      case 2:
        setIsLoading(true);
        try {
          const dataStepThree = await postSubjectDPStepThree({
            form_id: formID,
            causes: checkboxValue,
          });
          console.log(checkboxValue);
          setSelectedCategories([]);
          setIsLoading(false);
        } catch (error) {
          throw error;
        }
        break;
      case 3:
        setIsLoading(true);
        try {
          const dataStepFour = await postSubjectDPStepFour({
            form_id: formID,
            meeting_person: selectedPerson.name,
            meeting_time: selectedTime
          });
          setIsLoading(false);
          getDataSubject(current + 1, formID);
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
                      {current === 0 &&
                        responseData?.map((data, idx) => (
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
                      {current === 1 && (
                        <>
                          <div className="cluster--wrapper-content-body--box-content-dropdown">
                            <label htmlFor="">Language & Literature</label>
                            <Dropdown
                              value={languageLiterature}
                              onChange={(e) => {
                                console.log(e.target.value);
                                const updatedSubjectsDP = [
                                  ...selectedSubjectsDP,
                                ];
                                updatedSubjectsDP[0] = e.target.value.id;
                                setSelectedSubjectsDP(updatedSubjectsDP);
                                setLanguageLiterature(e.value);
                                const updatedOptionSubject = {
                                  ...optionSubject,
                                }; // Membuat salinan objek optionSubject
                                const optionArray = [];
                                for (
                                  let i = 0;
                                  i < responseData.group_2.length;
                                  i++
                                ) {
                                  if (
                                    responseData.group_2[i].id !==
                                    e.target.value.id
                                  ) {
                                    optionArray.push(responseData.group_2[i]);
                                  }
                                }
                                updatedOptionSubject.group_2 = optionArray; // Mengganti nilai group1 dengan nilai baru
                                console.log(optionArray);
                                setOptionSubject(updatedOptionSubject);
                              }}
                              options={optionSubject.group_1}
                              optionLabel="name"
                              placeholder="Select Language & Literature"
                              className="dropdown--diploma-programmed"
                            />
                          </div>
                          <div className="cluster--wrapper-content-body--box-content-dropdown">
                            <label htmlFor="">Language Acquisition</label>
                            <Dropdown
                              value={languageAcquistition}
                              onChange={(e) => {
                                const updatedSubjectsDP = [
                                  ...selectedSubjectsDP,
                                ];
                                updatedSubjectsDP[1] = e.target.value.id;
                                setSelectedSubjectsDP(updatedSubjectsDP);
                                setLanguageAcquistition(e.value);
                                console.log(optionSubject);
                              }}
                              options={optionSubject.group_2}
                              optionLabel="name"
                              placeholder="Select Language Acquisition"
                              className="dropdown--diploma-programmed"
                            />
                          </div>
                          <div className="cluster--wrapper-content-body--box-content-dropdown">
                            <label htmlFor="">Mathematics</label>
                            <Dropdown
                              value={mathematics}
                              onChange={(e) => {
                                const updatedSubjectsDP = [
                                  ...selectedSubjectsDP,
                                ];
                                updatedSubjectsDP[2] = e.target.value.id;
                                setSelectedSubjectsDP(updatedSubjectsDP);
                                setMathematics(e.value);
                              }}
                              options={responseData.group_5}
                              optionLabel="name"
                              placeholder="Select Mathematics"
                              className="dropdown--diploma-programmed"
                            />
                          </div>
                          <div className="cluster--wrapper-content-body--box-content-dropdown">
                            <label htmlFor="">Individuals & Societies</label>
                            <Dropdown
                              value={individualSocieties}
                              onChange={(e) => {
                                const updatedSubjectsDP = [
                                  ...selectedSubjectsDP,
                                ];
                                updatedSubjectsDP[3] = e.target.value.id;
                                setSelectedSubjectsDP(updatedSubjectsDP);
                                setIndividualSocieties(e.value);
                              }}
                              options={responseData.group_3}
                              optionLabel="name"
                              placeholder="Select Individuals & Societies"
                              className="dropdown--diploma-programmed"
                            />
                          </div>
                          <div className="cluster--wrapper-content-body--box-content-dropdown">
                            <label htmlFor="">Science</label>
                            <Dropdown
                              value={science}
                              onChange={(e) => {
                                const updatedSubjectsDP = [
                                  ...selectedSubjectsDP,
                                ];
                                updatedSubjectsDP[4] = e.target.value.id;
                                setSelectedSubjectsDP(updatedSubjectsDP);
                                setScience(e.value);
                              }}
                              options={responseData.group_4}
                              optionLabel="name"
                              placeholder="Select Science"
                              className="dropdown--diploma-programmed"
                            />
                          </div>
                          <div className="cluster--wrapper-content-body--box-content-dropdown">
                            <label htmlFor="">Arts</label>
                            <Dropdown
                              value={arts}
                              onChange={(e) => {
                                const updatedSubjectsDP = [
                                  ...selectedSubjectsDP,
                                ];
                                updatedSubjectsDP[5] = e.target.value.id;
                                setSelectedSubjectsDP(updatedSubjectsDP);
                                setArts(e.value);
                              }}
                              options={responseData.group_6}
                              optionLabel="name"
                              placeholder="Select Arts"
                              className="dropdown--diploma-programmed"
                            />
                          </div>
                        </>
                      )}
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
                                <Checkbox
                                  value="isGood"
                                  checked={
                                    checkboxValue[idx] && checkboxValue[idx].isGood
                                  }
                                  onChange={(e) =>
                                    handleCheckboxChange(
                                      idx,
                                      0,
                                      e.checked,
                                      subject
                                    )
                                  }
                                />
                              </td>
                              <td style={{ textAlign: "center" }}>
                                <Checkbox
                                  value="isInterested"
                                  checked={
                                    checkboxValue[idx] && checkboxValue[idx].isInterested
                                  }
                                  onChange={(e) =>
                                    handleCheckboxChange(
                                      idx,
                                      1,
                                      e.checked,
                                      subject
                                    )
                                  }
                                />
                              </td>
                              <td style={{ textAlign: "center" }}>
                                <Checkbox
                                  value="isRequired"
                                  checked={
                                    checkboxValue[idx] && checkboxValue[idx].isRequired
                                  }
                                  onChange={(e) =>
                                    handleCheckboxChange(
                                      idx,
                                      2,
                                      e.checked,
                                      subject
                                    )
                                  }
                                />
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </div>
                )}
                {current === 3 && (
                  <div>
                    <div className="cluster--wrapper-content-body--box-slide4-dropdown">
                      <label htmlFor="">Select Teacher</label>
                      <Dropdown
                        value={selectedPerson}
                        onChange={(e) => {
                          setSelectedPerson(e.value);
                        }}
                        options={[{ "name": "Ms.Ellie" }, { "name": "Mr.Eric" }]}
                        optionLabel="name"
                        placeholder="Select Teacher"
                        className="dropdown--select-teacher"
                      />
                    </div>
                    <div className="cluster--wrapper-content-body--box-slide4-dropdown">
                      <label htmlFor="">Select Time</label>
                      <Calendar className="dropdown--select-time" placeholder="Select Meeting time" value={selectedTime} onChange={(e) => setSelectedTime(e.value)} showTime hourFormat="12" />
                    </div>
                  </div>
                )} {current === 4 && (
                  <div>
                    < table className="cluster--wrapper-content-body--box-content--wrapper--summary--table"
                        cellSpacing="30"
                        cellPadding="30">
                          <tbody>
                      <tr>
                        <td> Program</td>
                        <td>{Summary.programs.map((subject, idx) => (
                        <span key={idx}>{subject} {idx!=Summary.programs.length-1? ", " :""}</span>
                      ))}</td>
                      </tr>
                      <tr>
                        <td> Subjects</td>
                        <td>{Summary.subjects.map((subject, idx) => (
                        <span key={idx}>{subject} {idx!=Summary.subjects.length-1? ", " :""}</span>
                      ))}</td>
                      </tr>
                      <tr>
                        <td>Meeting teacher</td>
                        <td>{Summary.form.meeting_person}</td>
                      </tr>
                      <tr>
                        <td>Meeting time</td>
                        <td>{Summary.form.meeting_time}</td>
                      </tr>
                      </tbody>
                    </table>
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
