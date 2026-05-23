import express from 'express';

import { showHomePage } from './controllers/index.js';
import { showCategoriesPage } from './controllers/categories.js';
import { showOrganizationsPage } from './controllers/organizations.js';
import { projectsPage, projectDetailsPage } from './controllers/projects.js';
import { testErrorPage } from './controllers/errors.js';
import { showOrganizationDetailsPage } from './controllers/organizations.js';

const router = express.Router();

router.get ('/', showHomePage);
router.get ('/categories', showCategoriesPage);
router.get ('/organizations', showOrganizationsPage);
router.get ('/projects', projectsPage );
router.get ('/projects/:id', projectDetailsPage);
// Route for organization details page
router.get('/organizations/:id', showOrganizationDetailsPage);

// error-handling routes
router.get('/test-error', testErrorPage);

export default router;