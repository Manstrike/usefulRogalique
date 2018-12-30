-- --------------------------------------------------------
-- Хост:                         127.0.0.1
-- Версия сервера:               8.0.12 - MySQL Community Server - GPL
-- Операционная система:         Win64
-- HeidiSQL Версия:              9.5.0.5196
-- --------------------------------------------------------

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET NAMES utf8 */;
/*!50503 SET NAMES utf8mb4 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;


-- Дамп структуры базы данных shedulerdb
CREATE DATABASE IF NOT EXISTS `shedulerdb` /*!40100 DEFAULT CHARACTER SET utf8 */;
USE `shedulerdb`;

-- Дамп структуры для таблица shedulerdb.backup
CREATE TABLE IF NOT EXISTS `backup` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `msg` varchar(45) NOT NULL,
  `time` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `row_id` int(11) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- Экспортируемые данные не выделены.
-- Дамп структуры для таблица shedulerdb.building
CREATE TABLE IF NOT EXISTS `building` (
  `id_building` int(11) NOT NULL AUTO_INCREMENT,
  `name_building` varchar(45) NOT NULL,
  PRIMARY KEY (`id_building`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- Экспортируемые данные не выделены.
-- Дамп структуры для таблица shedulerdb.days
CREATE TABLE IF NOT EXISTS `days` (
  `id_days` int(11) NOT NULL AUTO_INCREMENT,
  `name_days` varchar(45) DEFAULT NULL,
  PRIMARY KEY (`id_days`)
) ENGINE=InnoDB AUTO_INCREMENT=8 DEFAULT CHARSET=utf8;

-- Экспортируемые данные не выделены.
-- Дамп структуры для таблица shedulerdb.group_list
CREATE TABLE IF NOT EXISTS `group_list` (
  `id_groups` int(11) NOT NULL AUTO_INCREMENT,
  `code_groups` varchar(45) DEFAULT NULL,
  `population_groups` int(11) DEFAULT NULL,
  PRIMARY KEY (`id_groups`),
  UNIQUE KEY `code_groups_UNIQUE` (`code_groups`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8;

-- Экспортируемые данные не выделены.
-- Дамп структуры для таблица shedulerdb.lesson_type
CREATE TABLE IF NOT EXISTS `lesson_type` (
  `id_lesson_type` int(11) NOT NULL AUTO_INCREMENT,
  `type_lesson` varchar(45) DEFAULT NULL,
  PRIMARY KEY (`id_lesson_type`),
  UNIQUE KEY `type_lesson_UNIQUE` (`type_lesson`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8;

-- Экспортируемые данные не выделены.
-- Дамп структуры для таблица shedulerdb.positions
CREATE TABLE IF NOT EXISTS `positions` (
  `id_positions` int(11) NOT NULL AUTO_INCREMENT,
  `name_positions` varchar(45) DEFAULT NULL,
  PRIMARY KEY (`id_positions`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8;

-- Экспортируемые данные не выделены.
-- Дамп структуры для таблица shedulerdb.rooms
CREATE TABLE IF NOT EXISTS `rooms` (
  `id_rooms` int(11) NOT NULL AUTO_INCREMENT,
  `number_rooms` varchar(45) DEFAULT NULL,
  `building_rooms` int(11) DEFAULT NULL,
  PRIMARY KEY (`id_rooms`),
  KEY `FK1_idx` (`building_rooms`),
  CONSTRAINT `FK1room` FOREIGN KEY (`building_rooms`) REFERENCES `building` (`id_building`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=8 DEFAULT CHARSET=utf8;

-- Экспортируемые данные не выделены.
-- Дамп структуры для таблица shedulerdb.sheduler
CREATE TABLE IF NOT EXISTS `sheduler` (
  `day` int(11) DEFAULT NULL,
  `lesson_number` int(11) DEFAULT NULL,
  `week_mark` int(11) DEFAULT NULL,
  `groupID` int(11) DEFAULT NULL,
  `subject` int(11) DEFAULT NULL,
  `lesson_type` int(11) DEFAULT NULL,
  `room` int(11) DEFAULT NULL,
  `teacher` int(11) DEFAULT NULL,
  KEY `fkDAY_idx` (`day`),
  KEY `fkGROUP_idx` (`groupID`),
  KEY `fkSUB_idx` (`subject`),
  KEY `fkLESSTYPE_idx` (`lesson_type`),
  KEY `fkROOM_idx` (`room`),
  KEY `fkTEACHER_idx` (`teacher`),
  CONSTRAINT `fkDAY` FOREIGN KEY (`day`) REFERENCES `days` (`id_days`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `fkGROUP` FOREIGN KEY (`groupID`) REFERENCES `group_list` (`id_groups`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `fkLESSTYPE` FOREIGN KEY (`lesson_type`) REFERENCES `lesson_type` (`id_lesson_type`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `fkROOM` FOREIGN KEY (`room`) REFERENCES `rooms` (`id_rooms`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `fkSUB` FOREIGN KEY (`subject`) REFERENCES `subjects` (`id_subjects`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `fkTEACHER` FOREIGN KEY (`teacher`) REFERENCES `teachers` (`id_teachers`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- Экспортируемые данные не выделены.
-- Дамп структуры для таблица shedulerdb.subjects
CREATE TABLE IF NOT EXISTS `subjects` (
  `id_subjects` int(11) NOT NULL AUTO_INCREMENT,
  `name_subject` varchar(45) DEFAULT NULL,
  PRIMARY KEY (`id_subjects`)
) ENGINE=InnoDB AUTO_INCREMENT=11 DEFAULT CHARSET=utf8;

-- Экспортируемые данные не выделены.
-- Дамп структуры для таблица shedulerdb.teachers
CREATE TABLE IF NOT EXISTS `teachers` (
  `id_teachers` int(11) NOT NULL AUTO_INCREMENT,
  `firstname_teachers` varchar(45) DEFAULT NULL,
  `secondname_teachers` varchar(45) DEFAULT NULL,
  `lastname_teachers` varchar(45) DEFAULT NULL,
  `position_teachers` int(11) DEFAULT NULL,
  PRIMARY KEY (`id_teachers`),
  KEY `fk1_idx` (`position_teachers`),
  CONSTRAINT `fk1Teac` FOREIGN KEY (`position_teachers`) REFERENCES `positions` (`id_positions`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=10 DEFAULT CHARSET=utf8;

-- Экспортируемые данные не выделены.
-- Дамп структуры для таблица shedulerdb.user
CREATE TABLE IF NOT EXISTS `user` (
  `id_users` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(45) DEFAULT NULL,
  `chatID` varchar(50) DEFAULT NULL,
  `group_code` int(11) DEFAULT NULL,
  PRIMARY KEY (`id_users`),
  KEY `fk1_idx` (`group_code`),
  CONSTRAINT `fk1User` FOREIGN KEY (`group_code`) REFERENCES `group_list` (`id_groups`)
) ENGINE=InnoDB AUTO_INCREMENT=14 DEFAULT CHARSET=utf8;

-- Экспортируемые данные не выделены.
-- Дамп структуры для триггер shedulerdb.building_BEFORE_DELETE
SET @OLDTMP_SQL_MODE=@@SQL_MODE, SQL_MODE='STRICT_TRANS_TABLES,STRICT_ALL_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,INVALID_DATES,ERROR_FOR_DIVISION_BY_ZERO,TRADITIONAL,NO_ENGINE_SUBSTITUTION';
DELIMITER //
CREATE TRIGGER `building_BEFORE_DELETE` BEFORE DELETE ON `building` FOR EACH ROW BEGIN
	INSERT INTO backup SET row_id = OLD.id_building, constent = OLD.name_building, msg='deleted';
END//
DELIMITER ;
SET SQL_MODE=@OLDTMP_SQL_MODE;

/*!40101 SET SQL_MODE=IFNULL(@OLD_SQL_MODE, '') */;
/*!40014 SET FOREIGN_KEY_CHECKS=IF(@OLD_FOREIGN_KEY_CHECKS IS NULL, 1, @OLD_FOREIGN_KEY_CHECKS) */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
