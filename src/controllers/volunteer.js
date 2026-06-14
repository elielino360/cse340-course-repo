import {addVolunteer, removeVolunteer, getVolunteerProjects} from '../models/volunteer.js';

const volunteerAdder = async (req, res) => {
    const userId = req.session.user.user_id;
    const projectId = req.params.projectId;

    await addVolunteer(userId, projectId);

    req.flash('success', 'You have successfully volunteered for this project!');
    res.redirect(`/projects/${projectId}`);         

};  

const userDashboard = async (req, res) => {

    const user = req.session.user;

    const userId = user.user_id;

    const projects = await getVolunteerProjects(userId);

    res.render('dashboard', {
        title: 'Dashboard',
        name: user.name,
        email: user.email,
        user,
        projects
    });
};

const volunteerRemover = async (req, res) => {
    const userId = req.session.user.user_id;
    const projectId = req.params.projectId; 
    
    await removeVolunteer(userId, projectId);

    req.flash('success', 'You have successfully removed your volunteer status for this project.');
    res.redirect(`/dashboard`);         
};

const userRequireLogin = (req, res, next) => {
    if (!req.session.user) {
        req.flash('error', 'You must be logged in to access this page.');
        return res.redirect('/login');
    }
    next();
};

export { volunteerAdder, userDashboard, volunteerRemover, userRequireLogin };