CREATE TABLE IF NOT EXISTS users (
    `id_users` bigint PRIMARY KEY auto_increment,
    `name` varchar(30) not null,
    `email` varchar(255) not null,
    `password` varchar(255) not null,
    `token` varchar(255) default null
);