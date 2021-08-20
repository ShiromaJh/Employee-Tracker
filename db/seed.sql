USE employeetracker_db;


INSERT INTO department (name)
VALUES
("Engineering"),
("Financial"),
("Legal"),
("Human Resources"),
("Mangement");


INSERT INTO role (title, salary, department_id)
VALUES
("Software Developer", 85000, 1),
("Software Engineer", 95000, 2),
("Manager", 95000.00, 3),
("Tech Support Specialist", 60000, 4),
("Legal Team Member", 80000,5),
("Senior Developer", 150000, 1);


INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES
("Justin", "Hoffman", 6, 1),
("Bryan", "Acosta", 1, NULL),
("Israel", "Medina", 2, 2),
("Ruth", "Matzen", 3, NULL),
("Shannon", "Hoffman", 4, 4),
("Edward", "Hoffman", 4, NULL),
("Tyler", "Blevins", 5, 5),
("Felix", "Lengyel", 5, NULL);