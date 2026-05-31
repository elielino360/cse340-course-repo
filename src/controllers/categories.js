import {
    getAllCategories,
    getCategoryById,
    getProjectsByCategoryId,
    createCategory,
    updateCategory
} from '../models/categories.js';

import { getProjectDetails } from '../models/projects.js';
import {
    updateCategoryAssignments,
    getCategoriesByProjectId
} from '../models/categories.js';


// ============================
// SHOW ALL CATEGORIES
// ============================
const showCategoriesPage = async (req, res, next) => {

    const categories = await getAllCategories();

    res.render('categories', {
        title: 'Service Categories',
        categories
    });
};


// ============================
// SHOW SINGLE CATEGORY
// ============================
const showCategoryDetailsPage = async (req, res, next) => {

    const categoryId = req.params.id;

    const category = await getCategoryById(categoryId);

    if (!category) {
        const error = new Error('Category not found');
        error.status = 404;
        return next(error);
    }

    const projects = await getProjectsByCategoryId(categoryId);

    res.render('category', {
        title: category.cat_name,
        category,
        projects
    });
};


// ============================
// ASSIGN CATEGORIES PAGE
// ============================
const showAssignCategoriesForm = async (req, res) => {

    const projectId = req.params.projectId;

    const projectDetails = await getProjectDetails(projectId);
    const categories = await getAllCategories();
    const assignedCategories = await getCategoriesByProjectId(projectId);

    res.render('assign-categories', {
        title: 'Assign Categories to Project',
        projectId,
        projectDetails,
        categories,
        assignedCategories
    });
};


// ============================
// PROCESS CATEGORY ASSIGNMENT
// ============================
const processAssignCategoriesForm = async (req, res) => {

    const projectId = req.params.projectId;

    const selectedCategoryIds = req.body.categoryIds || [];

    const categoryIdsArray = Array.isArray(selectedCategoryIds)
        ? selectedCategoryIds
        : [selectedCategoryIds];

    await updateCategoryAssignments(projectId, categoryIdsArray);

    req.flash('success', 'Categories updated successfully');

    res.redirect(`/projects/${projectId}`);
};


// ============================
// SHOW CREATE CATEGORY FORM
// ============================
const showNewCategoryForm = (req, res) => {

    res.render('new-category', {
        title: 'Create Category'
    });
};


// ============================
// PROCESS CREATE CATEGORY
// ============================
const processNewCategoryForm = async (req, res) => {

    const { cat_name } = req.body;

    // validation
    if (!cat_name || cat_name.trim().length < 3 || cat_name.length > 100) {

        req.flash('error', 'Category must be between 3 and 100 characters');

        return res.redirect('/new-category');
    }

    try {

        const newCategoryId = await createCategory(cat_name);

        req.flash('success', 'Category created successfully');

        return res.redirect(`/categories/${newCategoryId}`);

    } catch (error) {

        req.flash('error', 'Failed to create category');

        return res.redirect('/new-category');
    }
};


// ============================
// SHOW EDIT CATEGORY FORM
// ============================
const showEditCategoryForm = async (req, res, next) => {

    const categoryId = req.params.id;

    const category = await getCategoryById(categoryId);

    if (!category) {
        const error = new Error('Category not found');
        error.status = 404;
        return next(error);
    }

    res.render('edit-category', {
        title: 'Edit Category',
        category
    });
};


// ============================
// PROCESS EDIT CATEGORY
// ============================
const processEditCategoryForm = async (req, res) => {

    const categoryId = req.params.id;
    const { cat_name } = req.body;

    // validation
    if (!cat_name || cat_name.trim().length < 3 || cat_name.length > 100) {

        req.flash('error', 'Category must be between 3 and 100 characters');

        return res.redirect(`/edit-category/${categoryId}`);
    }

    try {

        await updateCategory(categoryId, cat_name);

        req.flash('success', 'Category updated successfully');

        return res.redirect(`/categories/${categoryId}`);

    } catch (error) {

        req.flash('error', 'Failed to update category');

        return res.redirect(`/edit-category/${categoryId}`);
    }
};


// ============================
// EXPORTS
// ============================
export {
    showCategoriesPage,
    showCategoryDetailsPage,
    showAssignCategoriesForm,
    processAssignCategoriesForm,
    showNewCategoryForm,
    processNewCategoryForm,
    showEditCategoryForm,
    processEditCategoryForm
};