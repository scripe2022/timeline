DROP TABLE IF EXISTS posts_demo;
CREATE TABLE IF NOT EXISTS `posts_demo`(
    `id` INT NOT NULL AUTO_INCREMENT,
    `date` INT,
    `content` VARCHAR(10000),
    `links` JSON,
    PRIMARY KEY (id)
)DEFAULT CHARACTER SET = utf8mb4;
