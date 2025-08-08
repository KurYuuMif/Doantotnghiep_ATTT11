CREATE TABLE `ckeys` (
  `key_id` INT NOT NULL AUTO_INCREMENT,
  `user_id` INT NOT NULL,
  `key_name` VARCHAR(100) DEFAULT NULL,
  `key_value` VARCHAR(100) DEFAULT NULL,
  `created_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`key_id`),
  KEY `user_id` (`user_id`)
);

CREATE TABLE `files` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `key_id` INT NOT NULL,
  `user_id` INT DEFAULT NULL,
  `filename` VARCHAR(255) NOT NULL,
  `path` VARCHAR(100) DEFAULT NULL,
  `uploaded_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  KEY `user_id` (`user_id`)
);