import express from 'express';

import { showHomePage } from './controllers/index.js';
import { showOrganizationsPage,showNewOrganizationForm, showOrganizationDetailsPage,processNewOrganizationForm, organizationValidation, showEditOrganizationForm, processEditOrganizationForm  } from './controllers/organizations.js';
import { projectsPage, projectDetailsPage, showNewProjectForm, processNewProjectForm,projectValidation, showEditProjectForm, processEditProjectForm } from './controllers/projects.js';
import { testErrorPage } from './controllers/errors.js';
import { showCategoriesPage,showCategoryDetailsPage, showAssignCategoriesForm,processAssignCategoriesForm, showNewCategoryForm, processNewCategoryForm, showEditCategoryForm, processEditCategoryForm } from './controllers/categories.js';

const router = express.Router();

router.get ('/', showHomePage);
router.get('/categories', showCategoriesPage);
router.get('/categories/:id', showCategoryDetailsPage);
router.get ('/organizations', showOrganizationsPage);
router.get ('/projects', projectsPage );
router.get ('/projects/:id', projectDetailsPage);
// Route for organization details page
router.get('/organizations/:id', showOrganizationDetailsPage);
router.get('/new-organization', showNewOrganizationForm);
router.post('/new-organization', organizationValidation, processNewOrganizationForm);

// Route to display the edit organization form
router.get('/edit-organization/:id', showEditOrganizationForm);

// Route to handle the edit organization form submission
router.post('/edit-organization/:id', processEditOrganizationForm);
 //Route to handle the edit organization form submission
router.post('/edit-organization/:id', organizationValidation, processEditOrganizationForm);
// Route for new project page
router.get('/new-project', showNewProjectForm);

// Route to handle new project form submission
router.post('/new-project', projectValidation, processNewProjectForm);
// Routes to handle the assign categories to project form
router.get('/assign-categories/:projectId', showAssignCategoriesForm);
router.post('/assign-categories/:projectId', processAssignCategoriesForm);

router.get('/edit-project/:id', showEditProjectForm);
router.post('/edit-project/:id', processEditProjectForm);

router.get('/new-category', showNewCategoryForm);

router.post('/new-category', processNewCategoryForm);

router.get('/edit-category/:id', showEditCategoryForm);

router.post('/edit-category/:id', processEditCategoryForm);

// error-handling routes
router.get('/test-error', testErrorPage);

export default router;