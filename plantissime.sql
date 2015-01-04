-- phpMyAdmin SQL Dump
-- version 3.4.11.1deb2+deb7u1
-- http://www.phpmyadmin.net
--
-- Client: localhost
-- Généré le: Dim 04 Janvier 2015 à 20:50
-- Version du serveur: 5.5.40
-- Version de PHP: 5.4.36-0+deb7u1

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
  `species` varchar(64) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1 AUTO_INCREMENT=1 ;

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
) ENGINE=InnoDB DEFAULT CHARSET=latin1 AUTO_INCREMENT=1 ;

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
) ENGINE=InnoDB DEFAULT CHARSET=latin1 AUTO_INCREMENT=1 ;

--
-- Contraintes pour les tables exportées
--

--
-- Contraintes pour la table `Records`
--
ALTER TABLE `Records`
  ADD CONSTRAINT `Records_ibfk_5` FOREIGN KEY (`sensor_id`) REFERENCES `Sensors` (`id`),
  ADD CONSTRAINT `Records_ibfk_1` FOREIGN KEY (`s0_link`) REFERENCES `Plants` (`id`),
  ADD CONSTRAINT `Records_ibfk_2` FOREIGN KEY (`s1_link`) REFERENCES `Plants` (`id`),
  ADD CONSTRAINT `Records_ibfk_3` FOREIGN KEY (`s2_link`) REFERENCES `Plants` (`id`),
  ADD CONSTRAINT `Records_ibfk_4` FOREIGN KEY (`s3_link`) REFERENCES `Plants` (`id`);

--
-- Contraintes pour la table `Sensors`
--
ALTER TABLE `Sensors`
  ADD CONSTRAINT `Sensors_ibfk_4` FOREIGN KEY (`s3_link`) REFERENCES `Plants` (`id`),
  ADD CONSTRAINT `Sensors_ibfk_1` FOREIGN KEY (`s0_link`) REFERENCES `Plants` (`id`),
  ADD CONSTRAINT `Sensors_ibfk_2` FOREIGN KEY (`s1_link`) REFERENCES `Plants` (`id`),
  ADD CONSTRAINT `Sensors_ibfk_3` FOREIGN KEY (`s2_link`) REFERENCES `Plants` (`id`);

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
