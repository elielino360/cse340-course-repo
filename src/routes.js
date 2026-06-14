import express from 'express';

import { showHomePage } from './controllers/index.js';
import { showOrganizationsPage,showNewOrganizationForm, showOrganizationDetailsPage,processNewOrganizationForm, organizationValidation, showEditOrganizationForm, processEditOrganizationForm  } from './controllers/organizations.js';
import { projectsPage, projectDetailsPage, showNewProjectForm, processNewProjectForm,projectValidation, showEditProjectForm, processEditProjectForm } from './controllers/projects.js';
import { testErrorPage } from './controllers/errors.js';
import { showCategoriesPage,showCategoryDetailsPage, showAssignCategoriesForm,processAssignCategoriesForm, showNewCategoryForm, processNewCategoryForm, showEditCategoryForm, processEditCategoryForm } from './controllers/categories.js';
import { showUserRegistrationForm, processUserRegistrationForm,showLoginForm ,processLoginForm ,processLogout, showDashboard,requireLogin,requireRole,showAllUsers } from './controllers/users.js';
import { volunteerAdder, userDashboard, volunteerRemover, userRequireLogin } from './controllers/volunteer.js';

const router = express.Router();

router.get ('/', showHomePage);
router.get('/categories', showCategoriesPage);
router.get('/categories/:id', showCategoryDetailsPage);
router.get ('/organizations', showOrganizationsPage);
router.get ('/projects', projectsPage );
router.get ('/projects/:id', projectDetailsPage);
// Route for organization details page
router.get('/organizations/:id', showOrganizationDetailsPage);
router.get('/new-organization', requireRole('admin'),showNewOrganizationForm);
router.post('/new-organization',requireRole('admin'), organizationValidation, processNewOrganizationForm);

// Route to display the edit organization form
router.get('/edit-organization/:id', requireRole('admin'), showEditOrganizationForm);

// Route to handle the edit organization form submission
router.post('/edit-organization/:id',requireRole('admin'), processEditOrganizationForm);
 //Route to handle the edit organization form submission
router.post('/edit-organization/:id', organizationValidation, processEditOrganizationForm);
// Route for new project page
router.get('/new-project',requireRole('admin'), showNewProjectForm);

// Route to handle new project form submission
router.post('/new-project', requireRole('admin'), projectValidation, processNewProjectForm);
// Routes to handle the assign categories to project form
router.get('/assign-categories/:projectId',requireRole('admin'), showAssignCategoriesForm);
router.post('/assign-categories/:projectId', requireRole('admin'), processAssignCategoriesForm);

router.get('/edit-project/:id', requireRole('admin'), showEditProjectForm);
router.post('/edit-project/:id', requireRole('admin'), processEditProjectForm);

router.get('/new-category', requireRole('admin'), showNewCategoryForm);

router.post('/new-category', requireRole('admin'), processNewCategoryForm);

router.get('/edit-category/:id', requireRole('admin'), showEditCategoryForm);

router.post('/edit-category/:id', requireRole('admin'),  processEditCategoryForm);
router.get('/register', showUserRegistrationForm);
router.post('/register', processUserRegistrationForm);
// User login routes
router.get('/login', showLoginForm);
router.post('/login', processLoginForm);
router.get('/logout', processLogout);

router.get('/dashboard', requireLogin, showDashboard);
router.get('/all-users', requireRole('admin'), showAllUsers);

router.post('/volunteer/:projectId', userRequireLogin, volunteerAdder);
router.post('/unvolunteer/:projectId', userRequireLogin, volunteerRemover);
router.get('/dashboard', userRequireLogin, userDashboard);

// error-handling routes
router.get('/test-error', testErrorPage);

export default router;