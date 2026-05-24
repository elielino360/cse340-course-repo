Create Table organization(
organization_id SERIAL PRIMARY KEY,
name VARCHAR (150) NOT NULL,
description TEXT not null,
contact_email VARCHAR(255) NOT NULL,
logo_filename VARCHAR(255) NOT NULL
);


-- ========================================
-- Insert sample data into: Organizations
-- ========================================

Insert into organization (name, description, contact_email, logo_filename)
VALUES
('BrightFuture Builders','A nonprofit focused on improving community infrastructure through sustainable construction projects','info@brightfuturebuilders.org','brightfuture-logo.png'),
('GreenHarvest Growers', ' An urban farming collective promoting food sustainability and education in local neighborhoods.','contact@greenharvest.org','greenharvest-logo.png'),
('UnityServe Volunteers','A volunteer coordination group supporting local charities and service initiatives.','hello@unityserve.org','unityserve-logo.png');

--Project table SQL

CREATE TABLE project (
    project_id SERIAL PRIMARY KEY,
	organization_id INT REFERENCES organization(organization_id),
    title VARCHAR(150) NOT NULL,
    description TEXT NOT NULL,
    location VARCHAR(255) NOT NULL,
    date DATE NOT NULL
);

-- Insert sample data into: project
INSERT INTO project (organization_id, title, description, location, date)
VALUES 

-- BrightFuture Builders Projects
(1, 'Community Playground Renovation',
'A project focused on rebuilding and modernizing a local children playground with safer equipment and improved accessibility.',
'Ibadan, Oyo State',
TO_DATE('15/06/2026', 'DD/MM/YYYY')),

(1, 'Affordable Housing Repair Initiative',
'Volunteers and contractors work together to repair damaged homes for low-income families in underserved communities.',
'Lagos, Lagos State',
TO_DATE('28/06/2026', 'DD/MM/YYYY')),

(1, 'Clean Water Pipeline Installation',
'Installation of sustainable water pipelines to improve access to clean drinking water in rural areas.',
'Abeokuta, Ogun State',
TO_DATE('10/07/2026', 'DD/MM/YYYY')),

(1, 'Community Health Center Expansion',
'Expansion of a local health center to include additional treatment rooms and modern facilities.',
'Akure, Ondo State',
TO_DATE('22/07/2026', 'DD/MM/YYYY')),

(1, 'Public School Classroom Renovation',
'Renovation of deteriorating classrooms to create a better learning environment for students.',
'Ilorin, Kwara State',
TO_DATE('05/08/2026', 'DD/MM/YYYY')),

-- GreenHarvest Growers Projects
(2, 'Urban Garden Training Program',
'A hands-on farming education project teaching residents how to grow vegetables in small urban spaces.',
'Ibadan, Oyo State',
TO_DATE('18/06/2026', 'DD/MM/YYYY')),

(2, 'Community Composting Initiative',
'A sustainability project encouraging households to recycle food waste into organic compost for farming.',
'Lagos, Lagos State',
TO_DATE('02/07/2026', 'DD/MM/YYYY')),

(2, 'School Farming Outreach',
'Volunteers introduce farming techniques and sustainability education to secondary school students.',
'Osogbo, Osun State',
TO_DATE('14/07/2026', 'DD/MM/YYYY')),

(2, 'Neighborhood Tree Planting Campaign',
'A large-scale environmental project focused on planting trees in urban communities.',
'Benin City, Edo State',
TO_DATE('30/07/2026', 'DD/MM/YYYY')),

(2, 'Youth Greenhouse Development',
'Construction of a greenhouse facility for youth agricultural training and food production.',
'Ado-Ekiti, Ekiti State',
TO_DATE('12/08/2026', 'DD/MM/YYYY')),

-- UnityServe Volunteers Projects
(3, 'Food Distribution Drive',
'Volunteers distribute food packages and essential supplies to vulnerable families and elderly residents.',
'Ibadan, Oyo State',
TO_DATE('20/06/2026', 'DD/MM/YYYY')),

(3, 'Charity Medical Outreach',
'A volunteer-led medical outreach providing free health screenings and consultations.',
'Lagos, Lagos State',
TO_DATE('08/07/2026', 'DD/MM/YYYY')),

(3, 'Community Cleanup Exercise',
'Residents and volunteers collaborate to clean streets, drainage systems, and public spaces.',
'Port Harcourt, Rivers State',
TO_DATE('19/07/2026', 'DD/MM/YYYY')),

(3, 'Back-to-School Donation Program',
'Collection and distribution of educational supplies for children returning to school.',
'Enugu, Enugu State',
TO_DATE('03/08/2026', 'DD/MM/YYYY')),

(3, 'Senior Citizen Support Program',
'A volunteer support initiative focused on assisting elderly residents with daily needs and companionship.',
'Abuja, FCT',
TO_DATE('17/08/2026', 'DD/MM/YYYY'));

-- Categories database creation

Create Table categories (
category_id serial primary key,
cat_name VARCHAR(150) NOT NULL
);
CREATE TABLE project_categories (
    project_id INT REFERENCES project(project_id),
    category_id INT REFERENCES categories(category_id),

    PRIMARY KEY (project_id, category_id)
);


--- Insertion of data into category database

INSERT INTO categories( cat_name)
VALUES ( 'Environmental'),
('Educational'),
('Health Care'),
('Community Services');

INSERT INTO project_categories (project_id, category_id)
VALUES(17,1),
(16,2),
(22,3),
(20,1),
(18,1),
(20,2),
(21,4),
(22,2),
(23,3),
(24,4),
(25,4),
(26,4),
(27,4),
(29,2),
(28,4),
(30,1);

UPDATE categories
SET cat_name = 'Advance Educational Services'
WHERE category_id = 2;

UPDATE categories
SET cat_name = 'Public Speaking'
WHERE category_id = 4;


