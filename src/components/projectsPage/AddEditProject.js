import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";

import * as projectsActions from "../../redux/actionCreators/projectsActionCreators.js";
import * as addEditProjectActions from "../../redux/actionCreators/addEditProjectActionCreators.js";

import styles from "./AddEditProject.module.css";

export default function AddEditProject() {
  const dispatch = useDispatch();

  const mode = useSelector((state) => state.addEditProject.mode);
  const projectId = useSelector((state) => state.addEditProject.projectId);
  const project = useSelector((state) => (projectId ? state.projects[projectId] : null));

  const [formData, setFormData] = useState({
    deadlineEnabled: false,
    deadline: "2022-01-01",
    hourGoalEnabled: false,
    hourGoal: 0,
    title: "Untitled Project",
    background: "",
    projectTheme: "#57FF3D",
  });

  useEffect(() => {
    mode === "edit" &&
      setFormData(() => ({
        deadlineEnabled: !!project.deadline,
        deadline: project.deadline,
        hourGoalEnabled: !!project.hourGoal,
        hourGoal: project.hourGoal,
        title: project.title,
        background: project.bannerImage,
        projectTheme: project.themeColor,
      }));
  }, [projectId, mode]);

  function setFormToDefault() {
    setFormData({
      deadlineEnabled: false,
      deadline: "2022-01-01",
      hourGoalEnabled: false,
      hourGoal: 0,
      title: "Untitled Project",
      background: "",
      projectTheme: "#57FF3D",
    });
  }

  function addProject(event) {
    event.preventDefault();

    dispatch(
      projectsActions.addProject(
        formData.title,
        formData.projectTheme,
        formData.background,
        formData.deadlineEnabled ? formData.deadline : null,
        formData.hourGoalEnabled ? formData.hourGoal : null
      )
    );

    setFormToDefault();
  }

  function editProject(event) {
    event.preventDefault();

    projectId &&
      dispatch(
        projectsActions.editProject(
          projectId,
          formData.title,
          formData.projectTheme,
          formData.background,
          formData.deadlineEnabled ? formData.deadline : null,
          formData.hourGoalEnabled ? formData.hourGoal : null
        )
      );

    dispatch(addEditProjectActions.setMode("add"));
    dispatch(addEditProjectActions.setProject(null));

    setFormToDefault();
  }

  function updateForm(event) {
    const { value, checked, type, name } = event.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  }

  function cancelEdit() {
    dispatch(addEditProjectActions.setMode("add"));
    setFormToDefault();
  }

  return (
    <div className={styles.container}>
      <h1 className={styles.mainText}>{mode === "edit" ? "Edit Project" : "Add Project"}</h1>
      <form onSubmit={mode === "edit" ? editProject : addProject} className={styles.form}>
        <div className={styles.form__checkboxContainer}>
          <input
            type="checkbox"
            name="deadlineEnabled"
            checked={formData.deadlineEnabled}
            onChange={updateForm}
          />
					<span className={styles.form__checkbox}></span>
        </div>

        <label>
          Deadline
          <input
            type="date"
            name="deadline"
            value={formData.deadline || "2022-01-01"}
            onChange={updateForm}
          />
        </label>

        <div className={styles.form__checkboxContainer}>
          <input
            type="checkbox"
            name="hourGoalEnabled"
            checked={formData.hourGoalEnabled}
            onChange={updateForm}
          />
          <span className={styles.form__checkbox}></span>
        </div>

        <label>
          Hour goal
          <input type="number" name="hourGoal" value={formData.hourGoal || 0} onChange={updateForm} />
        </label>

        <label>Title</label>
        <input type="text" name="title" value={formData.title} onChange={updateForm} />

        <label>Background</label>
        <input type="file" name="background" value={formData.background} onChange={updateForm} />

        <label>Project theme</label>
        <input type="color" name="projectTheme" value={formData.projectTheme} onChange={updateForm} />

        <button>{mode === "edit" ? "Save" : "Add"}</button>
        {mode === "edit" && <button onClick={cancelEdit}>Cancel</button>}
      </form>
    </div>
  );
}
