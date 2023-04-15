select * from usuario2;

Alter table Usuario add rol smallint;
Alter table Usuario add usuario varchar(15);
Alter table Usuario add email varchar(50);
Alter table Usuario add password varchar(150);
Alter table Usuario add nombreCompleto varchar(50);
alter table Usuario drop column idUsuario;


create table usuario2(	
    idUsuario integer AUTO_INCREMENT PRIMARY KEY,
    usuario varchar(20) not null,
    nombre varchar(25) not null,
    apellido varchar(25) not null,
    email varchar(50) not null,
    password varchar(100) not null,
    estado smallint not null default 1,
    rol smallint not null
);
-- 0: Administrador
-- 1: Repartidor
-- 2: Usuario
-- 3: Empresa
   
insert into usuario2 (usuario,nombre,apellido,email,password,estado,rol)
 values('admin','Usuario','Administrador','admin@prueba.com','202cb962ac59075b964b07152d234b70',1,0);
insert into usuario2 (usuario,nombre,apellido,email,password,estado,rol)
 values('repartidor','Usuario','Repartidor','repartidor@prueba.com','202cb962ac59075b964b07152d234b70',1,1);
insert into usuario2 (usuario,nombre,apellido,email,password,estado,rol)
 values('usuario','Usuario','Usuario','usuario@prueba.com','202cb962ac59075b964b07152d234b70',1,2);
insert into usuario2 (usuario,nombre,apellido,email,password,estado,rol)
 values('empresa','Usuario','Empresa','empresa@prueba.com','202cb962ac59075b964b07152d234b70',1,3);
 
 

