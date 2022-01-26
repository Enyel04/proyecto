<?php 
include_once("conectar.php");
class registry extends mybsd {
    protected $cedula;
	protected $primer_nombre;
    protected $segundo_nombre;
	protected $direccion;
	protected $telefono;
	protected $primer_apellido;
    protected $segundo_apellido;
    protected $rol;
	function setDatos($cedula, $rol, $primer_nombre, $segundo_nombre, $primer_apellido, $segundo_apellido, $direccion, $telefono){
		$this->cedula=$cedula;
        $this->rol=$rol;
		$this->primer_nombre=strtoupper($primer_nombre);
        $this->segundo_nombre=strtoupper($segundo_nombre);
        $this->primer_apellido=strtoupper($primer_apellido);
        $this->segundo_apellido=strtoupper($segundo_apellido);
		$this->direccion=strtoupper($direccion);
		$this->telefono=$telefono;
	}
	function GetName($cedula)
	{
		$query="SELECT `primer_nombre`,`primer_apellido` FROM `profesor` WHERE `cedula`=$cedula";
		return $this->list($this->execute($query));
	}
	function registrarProfesor(){
		$query="INSERT INTO `profesor`(`cedula`, `rol`, `primer_nombre`, 
		`segundo_nombre`, `primer_apellido`, `segundo_apellido`, `direccion`, `telefono`)
		VALUES ('".$this->cedula."','".$this->rol."','".$this->primer_nombre."','".$this->segundo_nombre."','".$this->primer_apellido."','".$this->segundo_apellido."','".$this->direccion."','".$this->telefono."')";
		
		return $this->execute($query);
	}
	function registrarAdministrador($contraseña){
		$query="INSERT INTO `administrador`(`cedula`,`contraseña`)
		VALUES ('".$this->cedula."','$contraseña')";
		return $this->execute($query);
	}
	function createPassword($cedula, $contraseña){
		$query="UPDATE `administrador` SET `contraseña`='$contraseña' WHERE `cedula`='$cedula' ";
		return $this->execute($query);
	}
	function registrarMateria($codigo, $nombre, $tipo){
		$nombre=strtoupper($nombre);
		$query="SELECT * FROM `materia` WHERE `nombre`='$nombre'";
		
		$val=$this->CheckResult($this->execute($query));
		if ($val==1) {
			return 3;
		}
		else {
			$query="INSERT INTO `materia`(`codigo`, `nombre`, `tipo`)
		VALUES ('".$codigo."','".$nombre."','".$tipo."')";
			return $this->execute($query);
		}
	}
	function registrarAula($codigo, $nombre){
		$nombre=strtoupper($nombre);
		$query="SELECT * FROM `aula` WHERE `nombre`='$nombre'";
		
		$val=$this->CheckResult($this->execute($query));
		if ($val==1) {
			return 3;
		}
		else {
			$query="INSERT INTO `aula`(`codigo`, `nombre`)
			VALUES ('".$codigo."','".strtoupper($nombre)."')";
			return $this->execute($query);
		}
	}
	function registrarCarrera($codigo, $nombre){
		$nombre=strtoupper($nombre);
		$query="SELECT * FROM `carrera` WHERE `nombre`='$nombre'";
		
		$val=$this->CheckResult($this->execute($query));
		if ($val==1) {
			return 3;
		}
		else {
			$query="INSERT INTO `carrera`(`codigo`, `nombre`)
			VALUES ('".$codigo."','".strtoupper($nombre)."')";
			return $this->execute($query);
		}
		
	}
    function ValidateLogin($cedula){
		$query="SELECT `cedula`,`rol` FROM `profesor` WHERE `cedula`=$cedula";
		$valido=$this->list($this->execute($query));
		if ($valido[0]==$cedula && $valido[1]==0) {
			return true;
			}
		if ($valido[0]==$cedula && $valido[1]==1) {
			return 2;
		}
		else {
			return false;
			}	
	}
	function ValidateAdministrador($cedula, $contraseña){
		$query="SELECT `cedula`,`contraseña` FROM `administrador` WHERE `cedula`=$cedula";
		$valido=$this->list($this->execute($query));
		if ($valido[0]==$cedula && $valido[1]==$contraseña) {
			return true;
			}
		if ($valido[0]==$cedula && $valido[1]=="") {
			return 2;
			}
		if ($valido[0]==$cedula && $contraseña=="recovery") {
			return 2;
		}
		if ($valido[0]==$cedula && $valido[1]!=$contraseña) {
			return 3;
		}
		else {
			return false;
			}	
	}
	function FindQuery($tabla,$campo,$dato){
		$query="SELECT * FROM `$tabla` WHERE `$campo`='$dato'";
		$list=$this->list($this->execute($query));
		if (count($list)==0) {
			return 2;
		}
		else {
			return $list;
		}
	}
	function UpdateTableProfesor($cedula) {
		$query="UPDATE `profesor` SET `cedula`='$this->cedula', `rol`='$this->rol', `primer_nombre`='$this->primer_nombre', `segundo_nombre`='$this->segundo_nombre', `primer_apellido`='$this->primer_apellido', `segundo_apellido`='$this->segundo_apellido', `direccion`='$this->direccion', `telefono`='$this->telefono' WHERE `cedula`=$cedula";
		return $this->execute($query);
	}
	function UpdateTableAdmin($cedula, $origin_cedula)
	{
		$query="UPDATE `administrador` SET `cedula`='$cedula' WHERE `cedula`='$origin_cedula' ";
		return $this->execute($query);
	}
	function UpdateTableMateria($codigo,$nombre,$tipo,$original_codigo)
	{
		$nombre=strtoupper($nombre);
		$query="SELECT * FROM `materia` WHERE `nombre`='$nombre'";
		
		$val=$this->CheckResult($this->execute($query));
		
		if ($val==1) {
			return 3;
		}
		else {
			$query="UPDATE `materia` SET `codigo`='$codigo', `nombre`='$nombre', `tipo`='$tipo' WHERE `codigo`='$original_codigo'";
			return $this->execute($query);
		}
		
	}
	function UpdateTableAula($codigo,$nombre,$original_codigo)
	{
		$nombre=strtoupper($nombre);
		$query="SELECT * FROM `aula` WHERE `nombre`='$nombre'";
		
		$val=$this->CheckResult($this->execute($query));
		if ($val==1) {
			return 3;
		}
		else {
			
			$query="UPDATE `aula` SET `codigo`='$codigo', `nombre`='$nombre' WHERE `codigo`='$original_codigo'";
			return $this->execute($query);
		}
		
	}
	function UpdateTableCarrera($codigo,$nombre,$original_codigo)
	{
		$nombre=strtoupper($nombre);
		$query="SELECT * FROM `carrera` WHERE `nombre`='$nombre'";
		
		$val=$this->CheckResult($this->execute($query));
		if ($val==1) {
			return 3;
		}
		else {
			
			$query="UPDATE `carrera` SET `codigo`='$codigo', `nombre`='$nombre' WHERE `codigo`='$original_codigo'";
			return $this->execute($query);
		}
		
	}
	function DeleteTable($tabla, $campo, $dato) {
		$query="DELETE FROM `$tabla` WHERE `$campo`='$dato'";
		return $this->execute($query);
	}
}
?>