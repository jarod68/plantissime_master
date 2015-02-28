-- phpMyAdmin SQL Dump
-- version 3.4.11.1deb2+deb7u1
-- http://www.phpmyadmin.net
--
-- Client: localhost
-- Généré le: Sam 28 Février 2015 à 14:20
-- Version du serveur: 5.5.41
-- Version de PHP: 5.4.36-0+deb7u3

SET SQL_MODE="NO_AUTO_VALUE_ON_ZERO";
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8 */;

--
-- Base de données: `plantissime`
--
CREATE DATABASE `plantissime` DEFAULT CHARACTER SET latin1 COLLATE latin1_swedish_ci;
USE `plantissime`;

-- --------------------------------------------------------

--
-- Structure de la table `Plants`
--

CREATE TABLE IF NOT EXISTS `Plants` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `creation_timestamp` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `name` varchar(64) NOT NULL,
  `specie` varchar(64) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB  DEFAULT CHARSET=latin1 AUTO_INCREMENT=6 ;

--
-- Contenu de la table `Plants`
--

INSERT INTO `Plants` (`id`, `creation_timestamp`, `name`, `specie`) VALUES
(1, '2015-02-22 23:10:20', 'My first cactus', 'Cactus'),
(2, '2015-02-22 23:10:38', 'My first cactus', 'Cactus'),
(3, '2015-02-23 22:33:35', 'Test', 'Cactus'),
(4, '2015-02-24 21:41:11', 'Just a test', 'Joke'),
(5, '2015-02-28 13:16:42', 'Matthieu''s plant', 'aromatique');

-- --------------------------------------------------------

--
-- Structure de la table `Records`
--

CREATE TABLE IF NOT EXISTS `Records` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `sensor_id` int(11) NOT NULL,
  `timestamp` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `humidity` int(11) NOT NULL,
  `temperature` float NOT NULL,
  `luminosity` float NOT NULL,
  `s0` int(11) NOT NULL,
  `s1` int(11) NOT NULL,
  `s2` int(11) NOT NULL,
  `s3` int(11) NOT NULL,
  `power` int(11) NOT NULL,
  `s0_link` int(11) NOT NULL,
  `s1_link` int(11) NOT NULL,
  `s2_link` int(11) NOT NULL,
  `s3_link` int(11) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `s0_link` (`s0_link`),
  KEY `s1_link` (`s1_link`),
  KEY `s2_link` (`s2_link`),
  KEY `s3_link` (`s3_link`),
  KEY `sensor_id` (`sensor_id`)
) ENGINE=InnoDB  DEFAULT CHARSET=latin1 AUTO_INCREMENT=19 ;

--
-- Contenu de la table `Records`
--

INSERT INTO `Records` (`id`, `sensor_id`, `timestamp`, `humidity`, `temperature`, `luminosity`, `s0`, `s1`, `s2`, `s3`, `power`, `s0_link`, `s1_link`, `s2_link`, `s3_link`) VALUES
(1, 1, '2015-02-23 22:50:55', 37, 21, 14, 453, 503, -1, 682, 3242, 3, 2, 1, 1),
(2, 1, '2015-02-23 22:51:28', 37, 21, 14, 453, 503, -1, 682, 3242, 3, 2, 1, 1),
(3, 1, '2015-02-23 22:59:55', 37, 21, 14, 453, 503, -1, 682, 3242, 3, 2, 1, 1),
(4, 1, '2015-02-23 23:13:49', 37, 21, 14, 453, 503, -1, 682, 3242, 3, 2, 1, 1),
(5, 1, '2015-02-23 23:15:23', 37, 21, 14, 453, 503, -1, 682, 3242, 3, 2, 1, 1),
(6, 1, '2015-02-23 23:16:19', 37, 21, 14, 453, 503, -1, 682, 3242, 3, 2, 1, 1),
(7, 1, '2015-02-24 22:20:16', 37, 21, 16, 453, 503, -1, 682, 3242, 3, 2, 1, 1),
(8, 1, '2015-02-24 22:56:15', 37, 21, 16, 453, 503, -1, 682, 3242, 3, 2, 1, 1),
(9, 1, '2015-02-24 22:56:16', 37, 21, 16, 453, 503, -1, 682, 3242, 3, 2, 1, 1),
(10, 1, '2015-02-24 22:56:17', 37, 21, 16, 453, 503, -1, 682, 3242, 3, 2, 1, 1),
(11, 1, '2015-02-24 22:56:17', 37, 21, 16, 453, 503, -1, 682, 3242, 3, 2, 1, 1),
(12, 1, '2015-02-24 22:56:17', 37, 21, 16, 453, 503, -1, 682, 3242, 3, 2, 1, 1),
(13, 1, '2015-02-24 22:56:18', 37, 21, 16, 453, 503, -1, 682, 3242, 3, 2, 1, 1),
(14, 1, '2015-02-24 22:56:18', 37, 21, 16, 453, 503, -1, 682, 3242, 3, 2, 1, 1),
(15, 1, '2015-02-24 22:56:18', 37, 21, 16, 453, 503, -1, 682, 3242, 3, 2, 1, 1),
(16, 1, '2015-02-24 22:56:19', 37, 21, 16, 453, 503, -1, 682, 3242, 3, 2, 1, 1),
(17, 1, '2015-02-24 22:56:19', 37, 21, 16, 453, 503, -1, 682, 3242, 3, 2, 1, 1),
(18, 1, '2015-02-24 22:56:19', 37, 21, 16, 453, 503, -1, 682, 3242, 3, 2, 1, 1);

-- --------------------------------------------------------

--
-- Structure de la table `Sensors`
--

CREATE TABLE IF NOT EXISTS `Sensors` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `creation_timestamp` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `serial_number` varchar(32) NOT NULL,
  `node_identifier` varchar(32) NOT NULL,
  `s0_link` int(11) NOT NULL,
  `s1_link` int(11) NOT NULL,
  `s2_link` int(11) NOT NULL,
  `s3_link` int(11) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `s0_link` (`s0_link`),
  KEY `s1_link` (`s1_link`),
  KEY `s2_link` (`s2_link`),
  KEY `s3_link` (`s3_link`)
) ENGINE=InnoDB  DEFAULT CHARSET=latin1 AUTO_INCREMENT=2 ;

--
-- Contenu de la table `Sensors`
--

INSERT INTO `Sensors` (`id`, `creation_timestamp`, `serial_number`, `node_identifier`, `s0_link`, `s1_link`, `s2_link`, `s3_link`) VALUES
(1, '2015-02-23 22:33:46', '13A20040A75DCE', 'plant1', 3, 2, 1, 1);

--
-- Contraintes pour les tables exportées
--

--
-- Contraintes pour la table `Records`
--
ALTER TABLE `Records`
  ADD CONSTRAINT `Records_ibfk_1` FOREIGN KEY (`s0_link`) REFERENCES `Plants` (`id`),
  ADD CONSTRAINT `Records_ibfk_2` FOREIGN KEY (`s1_link`) REFERENCES `Plants` (`id`),
  ADD CONSTRAINT `Records_ibfk_3` FOREIGN KEY (`s2_link`) REFERENCES `Plants` (`id`),
  ADD CONSTRAINT `Records_ibfk_4` FOREIGN KEY (`s3_link`) REFERENCES `Plants` (`id`),
  ADD CONSTRAINT `Records_ibfk_5` FOREIGN KEY (`sensor_id`) REFERENCES `Sensors` (`id`);

--
-- Contraintes pour la table `Sensors`
--
ALTER TABLE `Sensors`
  ADD CONSTRAINT `Sensors_ibfk_1` FOREIGN KEY (`s0_link`) REFERENCES `Plants` (`id`),
  ADD CONSTRAINT `Sensors_ibfk_2` FOREIGN KEY (`s1_link`) REFERENCES `Plants` (`id`),
  ADD CONSTRAINT `Sensors_ibfk_3` FOREIGN KEY (`s2_link`) REFERENCES `Plants` (`id`),
  ADD CONSTRAINT `Sensors_ibfk_4` FOREIGN KEY (`s3_link`) REFERENCES `Plants` (`id`);

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
