import express from 'express';

import { showHomePage } from './controllers/index.js';
import { showOrganizationsPage,showNewOrganizationForm, showOrganizationDetailsPage,processNewOrganizationForm } from './controllers/organizations.js';
import { projectsPage, projectDetailsPage } from './controllers/projects.js';
import { testErrorPage } from './controllers/errors.js';
import { showCategoriesPage,showCategoryDetailsPage} from './controllers/categories.js';

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
router.post('/new-organization', processNewOrganizationForm);

// error-handling routes
router.get('/test-error', testErrorPage);

export default router;