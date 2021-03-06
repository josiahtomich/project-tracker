import ProjectList from "../components/projectsPage/ProjectList.js";
import AddEditProject from "../components/projectsPage/AddEditProject.js";

import tempLogo from "../assets/images/temp_logo.png";

export default function ProjectsPage() {
	return (
		<div>
			<div>
				<img src={tempLogo} alt="" style={{width: "70px"}}/>
				<h3>Temp_User</h3>
			</div>

			<h1>Your Projects</h1>

			<AddEditProject />

			<ProjectList />
		</div>
	);
}