INSERT INTO department (name) 
VALUES
('Sales'),
('Engineering'),
('Finance'),
('Legal');

INSERT INTO role (title, salary, department_id)
VALUES 
('Salesperson', 80000, 1),
('Engineer', 120000, 2),
('Accountant', 125000, 3),
('Legal Team Lead', 250000, 4),
('Lawyer', 190000, 4),
('Lead Engineer', 150000, 2),
('Accountant Manager', 150000, 3);

INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES
('Billy', 'Jean', 1, null),
('Bobby', 'Brown', 2, 6),
('Sally', 'Smith', 3, 7),
('Sue', 'Jones', 4, null),
('Sam', 'Johnson', 5, 4),
('Sara', 'Jackson', 6, null),
('Steve', 'Jenkins', 7, null);