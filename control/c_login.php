<?php
session_start();
include_once("../modelo/m_ejecutar.php");
$ejecutar= new registry();
$validate=$ejecutar->ValidateLogin($_POST["usuario"]);
$administrador=$ejecutar->ValidateAdministrador($_POST["usuario"],$_POST["pass"]);
    echo $administrador;
    if ($validate===true) {
        $_SESSION["usuario"]="true";
        header("Location: ../vista/profesor.php");
    }
    if ($administrador===true) {
        $_SESSION["usuario"]="true";
        $_SESSION["usuario_nombre"]="true";
        header("Location: ../vista/administrador.php");
    }
    if ($administrador===2) {
        $_SESSION["usuario"]="true";
        $_SESSION["usuario_cedula"]=$_POST["usuario"];
        header("Location: ../vista/configadmin.php");
    }
    if ($validate===false) {
        $_SESSION["error"]="usuario_no_existe";
        header("Location: ../vista/login.php");
    }
?>