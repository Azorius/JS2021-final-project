CREATE TABLE IF NOT EXISTS posts (
    `id_posts` bigint PRIMARY KEY auto_increment,
    `entry_date` datetime not null,
    `title` varchar(50) not null,
    `text` varchar(4000) not null,
    `description` varchar(280) not null,
    `image_url` varchar(255) not null,
    `owner` bigint,
    FOREIGN KEY (owner) REFERENCES users(id_users)
);
