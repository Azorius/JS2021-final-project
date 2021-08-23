CREATE TABLE IF NOT EXISTS users (
    `id` int PRIMARY KEY auto_increment,
    `name` varchar(255) not null,
    `email` varchar(255) not null,
    `password` varchar(255) not null
);