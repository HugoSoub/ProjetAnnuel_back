-- phpMyAdmin SQL Dump
-- version 5.0.2
-- https://www.phpmyadmin.net/
--
-- Hôte : 127.0.0.1:3306
-- Généré le : ven. 02 juil. 2021 à 07:31
-- Version du serveur :  5.7.31
-- Version de PHP : 7.3.21

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de données : `projet_annuel`
--

-- --------------------------------------------------------

--
-- Structure de la table `certification`
--

DROP TABLE IF EXISTS `certification`;
CREATE TABLE IF NOT EXISTS `certification` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(30) NOT NULL,
  `description` text NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=latin1;

--
-- Déchargement des données de la table `certification`
--

INSERT INTO `certification` (`id`, `name`, `description`) VALUES
(1, 'Certification Javascript', 'Cette certification est vraiment compliquée'),
(2, 'Certification Java', 'Le Java c est plutôt sympa même si c est pas simple a écrire'),
(3, 'Certification Python', 'Plutôt sympa ce langage honnêtement'),
(4, 'Certification PHP', 'Si vous êtes un adepte du dollars, il faut y aller'),
(5, 'Certification C', 'Eheh la question sur les pointeurs est compliqué');

-- --------------------------------------------------------

--
-- Structure de la table `formation`
--

DROP TABLE IF EXISTS `formation`;
CREATE TABLE IF NOT EXISTS `formation` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(30) NOT NULL,
  `date` date DEFAULT NULL,
  `id_certification` int(11) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `id_certification` (`id_certification`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=latin1;

--
-- Déchargement des données de la table `formation`
--

INSERT INTO `formation` (`id`, `name`, `date`, `id_certification`) VALUES
(1, 'Formation Python', NULL, 3),
(2, 'Formation PHP', NULL, 4),
(3, 'Formation JAVA', NULL, 2);

-- --------------------------------------------------------

--
-- Structure de la table `groupe`
--

DROP TABLE IF EXISTS `groupe`;
CREATE TABLE IF NOT EXISTS `groupe` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `date` date NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Structure de la table `participation`
--

DROP TABLE IF EXISTS `participation`;
CREATE TABLE IF NOT EXISTS `participation` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `id_user` int(11) NOT NULL,
  `id_session_formation` int(11) NOT NULL,
  `participate` tinyint(1) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `id_user` (`id_user`),
  KEY `id_session_formation` (`id_session_formation`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Structure de la table `payment`
--

DROP TABLE IF EXISTS `payment`;
CREATE TABLE IF NOT EXISTS `payment` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `date` date NOT NULL,
  `approve` varchar(30) NOT NULL,
  `id_user` int(11) NOT NULL,
  `id_session` int(11) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `id_user` (`id_user`),
  KEY `id_session` (`id_session`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Structure de la table `session`
--

DROP TABLE IF EXISTS `session`;
CREATE TABLE IF NOT EXISTS `session` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(30) DEFAULT NULL,
  `status` varchar(30) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=latin1;

--
-- Déchargement des données de la table `session`
--

INSERT INTO `session` (`id`, `name`, `status`) VALUES
(1, 'Session 1 PHP', 'En cours'),
(2, 'Session 1 Python', 'En cours'),
(3, 'Session 1 Java', 'En cours'),
(4, 'Session 2 PHP', 'En cours');

-- --------------------------------------------------------

--
-- Structure de la table `session_formation`
--

DROP TABLE IF EXISTS `session_formation`;
CREATE TABLE IF NOT EXISTS `session_formation` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `date` date DEFAULT NULL,
  `id_formation` int(11) NOT NULL,
  `id_session` int(11) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `id_session` (`id_session`),
  KEY `id_formation` (`id_formation`)
) ENGINE=InnoDB AUTO_INCREMENT=13 DEFAULT CHARSET=latin1;

--
-- Déchargement des données de la table `session_formation`
--

INSERT INTO `session_formation` (`id`, `date`, `id_formation`, `id_session`) VALUES
(1, '2021-07-05', 2, 1),
(2, '2021-07-06', 2, 1),
(3, '2021-07-08', 2, 1),
(4, '2021-07-06', 1, 2),
(5, '2021-07-09', 1, 2),
(6, '2021-07-13', 1, 2),
(7, '2021-07-15', 3, 3),
(8, NULL, 3, 3),
(9, NULL, 3, 3),
(10, NULL, 2, 4),
(11, NULL, 2, 4),
(12, NULL, 2, 4);

-- --------------------------------------------------------

--
-- Structure de la table `user`
--

DROP TABLE IF EXISTS `user`;
CREATE TABLE IF NOT EXISTS `user` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(30) NOT NULL,
  `firstname` varchar(30) NOT NULL,
  `email` varchar(30) NOT NULL,
  `roles` varchar(30) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=11 DEFAULT CHARSET=latin1;

--
-- Déchargement des données de la table `user`
--

INSERT INTO `user` (`id`, `name`, `firstname`, `email`, `roles`) VALUES
(1, 'MOUSE', 'Maurice', 'maurice.mouse@dev.gt', '[\"Responsable\"]'),
(2, 'Sous baie Rat', 'Hugo', 'h.sb@dev.gt', '[\"Expert\"]'),
(3, 'Anne', 'Paul', 'p.an@dev.gt', '[\"Candidat\",\"Expert\"]'),
(4, 'Marre quest-ce', 'Thomas', 't.mq@dev.gt', '[\"Expert\"]'),
(5, 'Bernardi', 'Gwendal', 'g.bd@dev.gt', '[\"Expert\"]'),
(6, 'mug', 'Marc', 'm.mg@dev.gt', '[\"Coach\"]'),
(7, 'Koala', 'Julie', 'j.kk@dev.gt', '[\"Coach\"]'),
(8, 'DuJardin', 'mireille', 'm.dj@dev.gt', '[\"Candidat\"]'),
(9, 'LoupeSonTir', 'Kylian', 'c.dommage@dev.gt', '[\"Candidat\"]'),
(10, 'Poutre', 'gerard', 'g.pt@dev.gt', '[\"Candidat\"]');

-- --------------------------------------------------------

--
-- Structure de la table `user_certification`
--

DROP TABLE IF EXISTS `user_certification`;
CREATE TABLE IF NOT EXISTS `user_certification` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `id_user` int(11) NOT NULL,
  `id_certification` int(11) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `id_certification` (`id_certification`),
  KEY `id_user` (`id_user`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Structure de la table `user_group`
--

DROP TABLE IF EXISTS `user_group`;
CREATE TABLE IF NOT EXISTS `user_group` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `id_user` int(11) NOT NULL,
  `id_group` int(11) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `id_group` (`id_group`),
  KEY `id_user` (`id_user`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Structure de la table `user_session`
--

DROP TABLE IF EXISTS `user_session`;
CREATE TABLE IF NOT EXISTS `user_session` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `id_user` int(11) NOT NULL,
  `id_session` int(11) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `id_session` (`id_session`),
  KEY `id_user` (`id_user`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=latin1;

--
-- Déchargement des données de la table `user_session`
--

INSERT INTO `user_session` (`id`, `id_user`, `id_session`) VALUES
(1, 8, 1),
(2, 9, 2),
(3, 10, 2);

--
-- Contraintes pour les tables déchargées
--

--
-- Contraintes pour la table `formation`
--
ALTER TABLE `formation`
  ADD CONSTRAINT `formation_ibfk_1` FOREIGN KEY (`id_certification`) REFERENCES `certification` (`id`);

--
-- Contraintes pour la table `participation`
--
ALTER TABLE `participation`
  ADD CONSTRAINT `participation_ibfk_1` FOREIGN KEY (`id_user`) REFERENCES `user` (`id`),
  ADD CONSTRAINT `participation_ibfk_2` FOREIGN KEY (`id_session_formation`) REFERENCES `session_formation` (`id`);

--
-- Contraintes pour la table `payment`
--
ALTER TABLE `payment`
  ADD CONSTRAINT `payment_ibfk_1` FOREIGN KEY (`id_user`) REFERENCES `user` (`id`),
  ADD CONSTRAINT `payment_ibfk_2` FOREIGN KEY (`id_session`) REFERENCES `session` (`id`);

--
-- Contraintes pour la table `session_formation`
--
ALTER TABLE `session_formation`
  ADD CONSTRAINT `session_formation_ibfk_1` FOREIGN KEY (`id_session`) REFERENCES `session` (`id`),
  ADD CONSTRAINT `session_formation_ibfk_2` FOREIGN KEY (`id_formation`) REFERENCES `formation` (`id`);

--
-- Contraintes pour la table `user_certification`
--
ALTER TABLE `user_certification`
  ADD CONSTRAINT `user_certification_ibfk_1` FOREIGN KEY (`id_certification`) REFERENCES `certification` (`id`),
  ADD CONSTRAINT `user_certification_ibfk_2` FOREIGN KEY (`id_user`) REFERENCES `user` (`id`);

--
-- Contraintes pour la table `user_group`
--
ALTER TABLE `user_group`
  ADD CONSTRAINT `user_group_ibfk_1` FOREIGN KEY (`id_group`) REFERENCES `groupe` (`id`),
  ADD CONSTRAINT `user_group_ibfk_2` FOREIGN KEY (`id_user`) REFERENCES `user` (`id`);

--
-- Contraintes pour la table `user_session`
--
ALTER TABLE `user_session`
  ADD CONSTRAINT `user_session_ibfk_1` FOREIGN KEY (`id_session`) REFERENCES `session` (`id`),
  ADD CONSTRAINT `user_session_ibfk_2` FOREIGN KEY (`id_user`) REFERENCES `user` (`id`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
