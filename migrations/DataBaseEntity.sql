-- --------------------------------------------------------
-- Хост:                         127.0.0.1
-- Версия сервера:               8.0.15 - MySQL Community Server - GPL
-- Операционная система:         Win64
-- HeidiSQL Версия:              10.1.0.5464
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

-- Дамп данных таблицы shedulerdb.backup: ~0 rows (приблизительно)
/*!40000 ALTER TABLE `backup` DISABLE KEYS */;
/*!40000 ALTER TABLE `backup` ENABLE KEYS */;

-- Дамп структуры для таблица shedulerdb.building
CREATE TABLE IF NOT EXISTS `building` (
  `id_building` int(11) NOT NULL AUTO_INCREMENT,
  `name_building` varchar(45) NOT NULL,
  PRIMARY KEY (`id_building`)
) ENGINE=InnoDB AUTO_INCREMENT=8 DEFAULT CHARSET=utf8;

-- Дамп данных таблицы shedulerdb.building: ~7 rows (приблизительно)
/*!40000 ALTER TABLE `building` DISABLE KEYS */;
INSERT INTO `building` (`id_building`, `name_building`) VALUES
	(1, 'ГУК'),
	(2, 'ИКС'),
	(3, 'ХИМ'),
	(4, 'ГУМ'),
	(5, 'ИЕЕ'),
	(6, 'АДМ'),
	(7, 'ФИЗ');
/*!40000 ALTER TABLE `building` ENABLE KEYS */;

-- Дамп структуры для таблица shedulerdb.days
CREATE TABLE IF NOT EXISTS `days` (
  `id_days` int(11) NOT NULL AUTO_INCREMENT,
  `name_days` varchar(45) DEFAULT NULL,
  PRIMARY KEY (`id_days`)
) ENGINE=InnoDB AUTO_INCREMENT=15 DEFAULT CHARSET=utf8;

-- Дамп данных таблицы shedulerdb.days: ~7 rows (приблизительно)
/*!40000 ALTER TABLE `days` DISABLE KEYS */;
INSERT INTO `days` (`id_days`, `name_days`) VALUES
	(8, 'Monday'),
	(9, 'Tuesday'),
	(10, 'Wednesday'),
	(11, 'Thursday'),
	(12, 'Friday'),
	(13, 'Saturday'),
	(14, 'Sunday');
/*!40000 ALTER TABLE `days` ENABLE KEYS */;

-- Дамп структуры для таблица shedulerdb.group_list
CREATE TABLE IF NOT EXISTS `group_list` (
  `id_groups` int(11) NOT NULL AUTO_INCREMENT,
  `code_groups` varchar(45) DEFAULT NULL,
  `population_groups` int(11) DEFAULT NULL,
  PRIMARY KEY (`id_groups`),
  UNIQUE KEY `code_groups_UNIQUE` (`code_groups`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8;

-- Дамп данных таблицы shedulerdb.group_list: ~1 rows (приблизительно)
/*!40000 ALTER TABLE `group_list` DISABLE KEYS */;
INSERT INTO `group_list` (`id_groups`, `code_groups`, `population_groups`) VALUES
	(4, 'АВ151', 12);
/*!40000 ALTER TABLE `group_list` ENABLE KEYS */;

-- Дамп структуры для таблица shedulerdb.lesson_type
CREATE TABLE IF NOT EXISTS `lesson_type` (
  `id_lesson_type` int(11) NOT NULL AUTO_INCREMENT,
  `type_lesson` varchar(45) DEFAULT NULL,
  PRIMARY KEY (`id_lesson_type`),
  UNIQUE KEY `type_lesson_UNIQUE` (`type_lesson`)
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=utf8;

-- Дамп данных таблицы shedulerdb.lesson_type: ~3 rows (приблизительно)
/*!40000 ALTER TABLE `lesson_type` DISABLE KEYS */;
INSERT INTO `lesson_type` (`id_lesson_type`, `type_lesson`) VALUES
	(6, 'лабараторная'),
	(4, 'лекция'),
	(5, 'практика');
/*!40000 ALTER TABLE `lesson_type` ENABLE KEYS */;

-- Дамп структуры для таблица shedulerdb.positions
CREATE TABLE IF NOT EXISTS `positions` (
  `id_positions` int(11) NOT NULL AUTO_INCREMENT,
  `name_positions` varchar(45) DEFAULT NULL,
  PRIMARY KEY (`id_positions`)
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=utf8;

-- Дамп данных таблицы shedulerdb.positions: ~3 rows (приблизительно)
/*!40000 ALTER TABLE `positions` DISABLE KEYS */;
INSERT INTO `positions` (`id_positions`, `name_positions`) VALUES
	(4, 'доцент'),
	(5, 'ст. преподаватель'),
	(6, 'профессор');
/*!40000 ALTER TABLE `positions` ENABLE KEYS */;

-- Дамп структуры для таблица shedulerdb.rooms
CREATE TABLE IF NOT EXISTS `rooms` (
  `id_rooms` int(11) NOT NULL AUTO_INCREMENT,
  `number_rooms` varchar(45) DEFAULT NULL,
  `building_rooms` int(11) DEFAULT NULL,
  PRIMARY KEY (`id_rooms`),
  KEY `FK1_idx` (`building_rooms`),
  CONSTRAINT `FK1room` FOREIGN KEY (`building_rooms`) REFERENCES `building` (`id_building`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=16 DEFAULT CHARSET=utf8;

-- Дамп данных таблицы shedulerdb.rooms: ~8 rows (приблизительно)
/*!40000 ALTER TABLE `rooms` DISABLE KEYS */;
INSERT INTO `rooms` (`id_rooms`, `number_rooms`, `building_rooms`) VALUES
	(8, '337', 1),
	(9, '429г', 1),
	(10, '302', 1),
	(11, '27', 7),
	(12, '28', 7),
	(13, '315', 1),
	(14, '423', 1),
	(15, '322', 1);
/*!40000 ALTER TABLE `rooms` ENABLE KEYS */;

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

-- Дамп данных таблицы shedulerdb.sheduler: ~19 rows (приблизительно)
/*!40000 ALTER TABLE `sheduler` DISABLE KEYS */;
INSERT INTO `sheduler` (`day`, `lesson_number`, `week_mark`, `groupID`, `subject`, `lesson_type`, `room`, `teacher`) VALUES
	(8, 1, 10, 4, 11, 4, 8, 10),
	(8, 2, 1, 4, 12, 5, 9, 11),
	(8, 2, 0, 4, 11, 4, 9, 10),
	(8, 3, 10, 4, 12, 4, 9, 11),
	(9, 1, 0, 4, 11, 6, 8, 10),
	(9, 2, 10, 4, 13, 4, 10, 12),
	(9, 3, 1, 4, 13, 5, 15, 12),
	(10, 1, 10, 4, 14, 4, 15, 13),
	(10, 2, 10, 4, 14, 6, 15, 13),
	(10, 3, 10, 4, 11, 6, 8, 10),
	(10, 4, 0, 4, 15, 6, 12, 14),
	(11, 1, NULL, NULL, NULL, NULL, NULL, NULL),
	(11, 2, 10, 4, 16, 4, 10, 15),
	(11, 3, 10, 4, 17, 6, 8, 16),
	(11, 4, 1, 4, 15, 4, 11, 14),
	(11, 4, 0, 4, 17, 6, 8, 16),
	(12, 1, 10, 4, 16, 4, 8, 15),
	(12, 2, 10, 4, 16, 6, 8, 15),
	(12, 3, 10, 4, 17, 4, 15, 16);
/*!40000 ALTER TABLE `sheduler` ENABLE KEYS */;

-- Дамп структуры для таблица shedulerdb.subjects
CREATE TABLE IF NOT EXISTS `subjects` (
  `id_subjects` int(11) NOT NULL AUTO_INCREMENT,
  `name_subject` varchar(45) DEFAULT NULL,
  PRIMARY KEY (`id_subjects`)
) ENGINE=InnoDB AUTO_INCREMENT=18 DEFAULT CHARSET=utf8;

-- Дамп данных таблицы shedulerdb.subjects: ~7 rows (приблизительно)
/*!40000 ALTER TABLE `subjects` DISABLE KEYS */;
INSERT INTO `subjects` (`id_subjects`, `name_subject`) VALUES
	(11, 'Вычисл. геометрия и графика'),
	(12, 'Мат. экономика'),
	(13, 'Нелинейная алгебра'),
	(14, 'Теория игр'),
	(15, 'Охрана труда'),
	(16, 'Искус. интеллект'),
	(17, 'Спец. языки программирования');
/*!40000 ALTER TABLE `subjects` ENABLE KEYS */;

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
) ENGINE=InnoDB AUTO_INCREMENT=17 DEFAULT CHARSET=utf8;

-- Дамп данных таблицы shedulerdb.teachers: ~7 rows (приблизительно)
/*!40000 ALTER TABLE `teachers` DISABLE KEYS */;
INSERT INTO `teachers` (`id_teachers`, `firstname_teachers`, `secondname_teachers`, `lastname_teachers`, `position_teachers`) VALUES
	(10, 'Марина', 'Вячеславовна', 'Полякова', 6),
	(11, 'Виктор', 'Алексеевич', 'Диленко', 6),
	(12, 'Георгий', 'Николаевич', 'Востров', 4),
	(13, 'Наталья', 'Павловна', 'Волкова', 5),
	(14, 'Андрей', 'Петрович', 'Бочковский', 4),
	(15, 'Виктор', 'Николаевич', 'Крылов', 6),
	(16, 'Татьяна', 'Александровна', 'Денисенко', 4);
/*!40000 ALTER TABLE `teachers` ENABLE KEYS */;

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

-- Дамп данных таблицы shedulerdb.user: ~0 rows (приблизительно)
/*!40000 ALTER TABLE `user` DISABLE KEYS */;
/*!40000 ALTER TABLE `user` ENABLE KEYS */;

/*!40101 SET SQL_MODE=IFNULL(@OLD_SQL_MODE, '') */;
/*!40014 SET FOREIGN_KEY_CHECKS=IF(@OLD_FOREIGN_KEY_CHECKS IS NULL, 1, @OLD_FOREIGN_KEY_CHECKS) */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
