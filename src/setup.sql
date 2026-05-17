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
(1, 'placeholder', 'placeholder description', 'placeholder location', TO_DATE('01-01-1990', 'DD/MM/YYYY')),
(1, 'placeholder', 'placeholder description', 'placeholder location', TO_DATE('01-01-1990', 'DD/MM/YYYY')),
(1, 'placeholder', 'placeholder description', 'placeholder location', TO_DATE('01-01-1990', 'DD/MM/YYYY')),
(1, 'placeholder', 'placeholder description', 'placeholder location', TO_DATE('01-01-1990', 'DD/MM/YYYY')),
(1, 'placeholder', 'placeholder description', 'placeholder location', TO_DATE('01-01-1990', 'DD/MM/YYYY')),
(2, 'placeholder', 'placeholder description', 'placeholder location', TO_DATE('01-01-1990', 'DD/MM/YYYY')),
(2, 'placeholder', 'placeholder description', 'placeholder location', TO_DATE('01-01-1990', 'DD/MM/YYYY')),
(2, 'placeholder', 'placeholder description', 'placeholder location', TO_DATE('01-01-1990', 'DD/MM/YYYY')),
(2, 'placeholder', 'placeholder description', 'placeholder location', TO_DATE('01-01-1990', 'DD/MM/YYYY')),
(2, 'placeholder', 'placeholder description', 'placeholder location', TO_DATE('01-01-1990', 'DD/MM/YYYY')),
(3, 'placeholder', 'placeholder description', 'placeholder location', TO_DATE('01-01-1990', 'DD/MM/YYYY')),
(3, 'placeholder', 'placeholder description', 'placeholder location', TO_DATE('01-01-1990', 'DD/MM/YYYY')),
(3, 'placeholder', 'placeholder description', 'placeholder location', TO_DATE('01-01-1990', 'DD/MM/YYYY')),
(3, 'placeholder', 'placeholder description', 'placeholder location', TO_DATE('01-01-1990', 'DD/MM/YYYY')),
(3, 'placeholder', 'placeholder description', 'placeholder location', TO_DATE('01-01-1990', 'DD/MM/YYYY'));


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
VALUES(1,1),
(1,2),
(1,3),
(2,1),
(4,1),
(4,2),
(1,4),
(2,2),
(2,3),
(5,4),
(3,4),
(4,4),
(11,4),
(12,2),
(8,4),
(14,1);

UPDATE categories
SET cat_name = 'Advance Educational Services'
WHERE category_id = 2;

UPDATE categories
SET cat_name = 'Public Speaking'
WHERE category_id = 4;


