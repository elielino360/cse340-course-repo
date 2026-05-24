import {
    getAllProjects,
    getUpcomingProjects,
    getProjectDetails
} from '../models/projects.js';

import { getCategoriesByProjectId } from '../models/categories.js';


const NUMBER_OF_UPCOMING_PROJECTS = 5;


// Projects list page
const projectsPage = async (req, res) => {

    const upcomingProjects = await getUpcomingProjects(NUMBER_OF_UPCOMING_PROJECTS);

    const title = 'Upcoming Service Projects';

    res.render('projects', {
        title,
        upcomingProjects
    });
};


// Project details page (UPDATED)
const projectDetailsPage = async (req, res, next) => {

    const projectId = req.params.id;

    const project = await getProjectDetails(projectId);

    // Handle missing project
    if (!project) {
        const error = new Error('Project not found');
        error.status = 404;
        return next(error);
    }

    // Get categories for this project (assignment requirement)
    const categories = await getCategoriesByProjectId(projectId);

    const title = 'Service Project Details';

    res.render('project', {
        title,
        project,
        categories
    });
};


// Export
export {
    projectsPage,
    projectDetailsPage
};