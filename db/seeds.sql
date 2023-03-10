INSERT INTO department (department_name)
VALUES ('Sales'),
       ('Engineering'),
       ('Finance'),
       ('Legal');

INSERT INTO roles (title, salary, department_id)
VALUES ('Sales lead', 100000, 1),
       ('Salesperson', 80000, 1),
       ('Lead Engineer', 150000, 2),
       ('Software Engineer', 120000, 2),
       ('Account Manager', 160000, 3),
       ('Accountant', 120000, 3),
       ('Legal Team Lead', 250000, 4),
       ('Lawyer', 190000, 4);

 INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES ('Keegan', 'Bridges', 1, 5050),
       ('Lilly', 'Ann', 4, 6060),
       ('Joy', 'Peterson', 5, 7070),
       ('Jessica', 'Oliva', 6, 8080),
       ('Jennifer', 'Ellis', 7, 9090);      