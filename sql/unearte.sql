-- phpMyAdmin SQL Dump
-- version 5.0.2
-- https://www.phpmyadmin.net/
--
-- Servidor: 127.0.0.1:3306
-- Tiempo de generación: 31-01-2022 a las 23:23:11
-- Versión del servidor: 8.0.21
-- Versión de PHP: 7.3.21

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de datos: `unearte`
--
CREATE DATABASE IF NOT EXISTS `unearte` DEFAULT CHARACTER SET utf8 COLLATE utf8_spanish_ci;
USE `unearte`;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `administrador`
--

DROP TABLE IF EXISTS `administrador`;
CREATE TABLE IF NOT EXISTS `administrador` (
  `codigo` int NOT NULL AUTO_INCREMENT,
  `cedula` int NOT NULL,
  `contrasena` varchar(30) CHARACTER SET utf8 COLLATE utf8_spanish_ci NOT NULL,
  PRIMARY KEY (`codigo`),
  UNIQUE KEY `cedula` (`cedula`)
) ENGINE=MyISAM AUTO_INCREMENT=7 DEFAULT CHARSET=utf8 COLLATE=utf8_spanish_ci;

--
-- Volcado de datos para la tabla `administrador`
--

INSERT INTO `administrador` (`codigo`, `cedula`, `contrasena`) VALUES
(1, 9372683, '152560loco'),
(5, 11716900, ''),
(6, 3, '');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `aula`
--

DROP TABLE IF EXISTS `aula`;
CREATE TABLE IF NOT EXISTS `aula` (
  `codigo` int NOT NULL,
  `nombre` varchar(60) CHARACTER SET utf8 COLLATE utf8_spanish_ci NOT NULL,
  PRIMARY KEY (`codigo`)
) ENGINE=MyISAM DEFAULT CHARSET=utf8 COLLATE=utf8_spanish_ci;

--
-- Volcado de datos para la tabla `aula`
--

INSERT INTO `aula` (`codigo`, `nombre`) VALUES
(10, 'SIMON RODRIGUEZ'),
(12, 'artes plastiscas');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `carrera`
--

DROP TABLE IF EXISTS `carrera`;
CREATE TABLE IF NOT EXISTS `carrera` (
  `codigo` int NOT NULL,
  `nombre` varchar(40) COLLATE utf8_spanish_ci NOT NULL,
  PRIMARY KEY (`codigo`)
) ENGINE=MyISAM DEFAULT CHARSET=utf8 COLLATE=utf8_spanish_ci;

--
-- Volcado de datos para la tabla `carrera`
--

INSERT INTO `carrera` (`codigo`, `nombre`) VALUES
(1515, 'INGENIERIA ELECTRICA'),
(1414, 'AGRONOMIA');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `lapso_academico`
--

DROP TABLE IF EXISTS `lapso_academico`;
CREATE TABLE IF NOT EXISTS `lapso_academico` (
  `codigo` int NOT NULL,
  `trayecto` int NOT NULL,
  `lapso` int NOT NULL
) ENGINE=MyISAM DEFAULT CHARSET=utf8 COLLATE=utf8_spanish_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `lapso_carrera`
--

DROP TABLE IF EXISTS `lapso_carrera`;
CREATE TABLE IF NOT EXISTS `lapso_carrera` (
  `codigo` int NOT NULL,
  `carrera` int NOT NULL,
  `lapso_academico` int NOT NULL,
  KEY `carrera` (`carrera`),
  KEY `lapso_academico` (`lapso_academico`)
) ENGINE=MyISAM DEFAULT CHARSET=utf8 COLLATE=utf8_spanish_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `lapso_materia`
--

DROP TABLE IF EXISTS `lapso_materia`;
CREATE TABLE IF NOT EXISTS `lapso_materia` (
  `codigo` int NOT NULL,
  `materia` int NOT NULL,
  `lapso_academico` int NOT NULL,
  KEY `materia` (`materia`),
  KEY `lapso_academico` (`lapso_academico`)
) ENGINE=MyISAM DEFAULT CHARSET=utf8 COLLATE=utf8_spanish_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `materia`
--

DROP TABLE IF EXISTS `materia`;
CREATE TABLE IF NOT EXISTS `materia` (
  `codigo` int NOT NULL,
  `nombre` varchar(60) CHARACTER SET utf8 COLLATE utf8_spanish_ci NOT NULL,
  `tipo` varchar(60) CHARACTER SET utf8 COLLATE utf8_spanish_ci NOT NULL,
  PRIMARY KEY (`codigo`)
) ENGINE=MyISAM DEFAULT CHARSET=utf8 COLLATE=utf8_spanish_ci;

--
-- Volcado de datos para la tabla `materia`
--

INSERT INTO `materia` (`codigo`, `nombre`, `tipo`) VALUES
(80, 'MUSICA', '0'),
(1616, 'ARTES', '1'),
(90, 'MATEMATICA 2', '0'),
(1515, 'DEPORTE', '0'),
(1000, 'HISTORIA CONTEMPORANEA', '0');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `profesor`
--

DROP TABLE IF EXISTS `profesor`;
CREATE TABLE IF NOT EXISTS `profesor` (
  `cedula` int NOT NULL,
  `rol` varchar(1) CHARACTER SET utf8 COLLATE utf8_spanish_ci NOT NULL,
  `primer_nombre` varchar(60) CHARACTER SET utf8 COLLATE utf8_spanish_ci NOT NULL,
  `segundo_nombre` varchar(60) CHARACTER SET utf8 COLLATE utf8_spanish_ci NOT NULL,
  `primer_apellido` varchar(60) CHARACTER SET utf8 COLLATE utf8_spanish_ci NOT NULL,
  `segundo_apellido` varchar(60) CHARACTER SET utf8 COLLATE utf8_spanish_ci NOT NULL,
  `direccion` varchar(100) CHARACTER SET utf8 COLLATE utf8_spanish_ci NOT NULL,
  `telefono` char(11) CHARACTER SET utf8 COLLATE utf8_spanish_ci NOT NULL,
  PRIMARY KEY (`cedula`)
) ENGINE=MyISAM DEFAULT CHARSET=utf8 COLLATE=utf8_spanish_ci;

--
-- Volcado de datos para la tabla `profesor`
--

INSERT INTO `profesor` (`cedula`, `rol`, `primer_nombre`, `segundo_nombre`, `primer_apellido`, `segundo_apellido`, `direccion`, `telefono`) VALUES
(1, '0', 'ADSADSA', 'DSADSAD', 'DADSA', 'DSADSA', 'DADSADSA', '0000000'),
(11716900, '0', 'JOSE', 'ALEXI', 'RAMIREZ', 'RIVAS', 'TUCACA 7-27', '04141118100'),
(9372683, '1', 'NIRETCIA', 'INMACULADA', 'RAMIREZ', 'VALERO', 'CASA CON PAREDES ', '04161309806'),
(3, '0', 'ANAL', 'UFF', 'PROFESOR', 'SUCRE', 'DSADASDSADSA', '000000000'),
(12121212, '0', 'ANTONIO', '', 'HERNANDEZ', '', 'CAMBURITO CALLE 7', '04141118100');
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
