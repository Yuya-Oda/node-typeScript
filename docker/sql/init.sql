DROP TABLE IF EXISTS `users`;
CREATE TABLE `users` (
  `id` varchar(36) NOT NULL,
  `name` varchar(64) NOT NULL DEFAULT '',
  `email` varchar(64) NOT NULL DEFAULT '',
  `description` varchar(255) NOT NULL DEFAULT '',
  `created_at` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COMMENT='APIs';

INSERT INTO `users` (`id`, `name`, `email`, `description`) VALUES
(UUID(), '山田 太郎', 't_yamada@example.com', 'ギターが好きで、毎週ライブハウスに行く'),
(UUID(), '金沢 朋美', 't_kanazawa@example.com', '毎朝サボテンに水をやるのが日課'),
(UUID(), '川崎 敦彦', 'a_kawasaki@example.com', '誰よりも早く出社し、部長の机に花瓶と線香を立てるのが日課');


CREATE TABLE `todos` (
  `id` int NOT NULL AUTO_INCREMENT,
  `title` varchar(64) NOT NULL DEFAULT '',
  `description` varchar(255) NOT NULL DEFAULT '',
  `created_at` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COMMENT='Todos';

INSERT INTO `todos` (`title`, `description`) VALUES
('買い物に行く', '米と梅干しと麦茶を買う。'),
('米を炊く', '19:00に炊きあがるようにする。');