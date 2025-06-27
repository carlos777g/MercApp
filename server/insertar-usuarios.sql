INSERT INTO Usuarios (Correo, Contraseña, Nombre, Apellido, rol)
VALUES
('ana@example.com', 'clave123', 'Ana', 'López', 'Cliente'),
('juan@example.com', 'pass456', 'Juan', 'Pérez', 'Cliente'),
('admin@example.com', 'adminpass', 'Admin', NULL, 'Admin'),
('gerente@example.com', 'gerentepass', 'Luisa', 'Ramírez', 'Gerente')
-- RETURNING Id_usuario, Correo;
