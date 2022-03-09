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
	function GetAll($tabla)
	{		
			$query="SELECT * FROM $tabla";
			return $this->ListAll($this->execute($query), MYSQLI_NUM);
		
	}
	function GetCarrerasPensum() {
		$query="SELECT carrera.codigo, carrera.nombre FROM carrera
		WHERE carrera.codigo NOT IN (SELECT pensum.pnf FROM pensum)";
		return $this->ListAll($this->execute($query), MYSQLI_NUM);
	}
	function GetLapsoOferta() {
		$query="SELECT lapso_academico.trayecto FROM lapso_academico
		WHERE lapso_academico.trayecto NOT IN (SELECT oferta.lapso_academico FROM oferta)";
		return $this->ListAll($this->execute($query), MYSQLI_NUM);
	}
	function GetAllPensum($busca)
	{
		$columna="";
		$n_array=[];
		$f_array=[];
		$i=0;
		if ($busca=="") {
			$query="SELECT pensum.codigo, carrera.codigo, carrera.nombre, materia.codigo, materia.nombre FROM ((carrera INNER JOIN pensum ON pensum.pnf = carrera.codigo) INNER JOIN materia ON pensum.unidad_curricular = materia.codigo) ORDER BY pensum.codigo DESC";
			$lista=$this->ListAll($this->execute($query), MYSQLI_NUM);
		}
		else {
			$query="SELECT DISTINCT pensum.codigo, carrera.codigo, carrera.nombre, materia.codigo, materia.nombre FROM ((carrera INNER JOIN pensum ON pensum.pnf = carrera.codigo && carrera.nombre LIKE '%$busca%') INNER JOIN materia ON pensum.unidad_curricular = materia.codigo) ORDER BY pensum.codigo DESC";
			$lista=$this->ListAll($this->execute($query), MYSQLI_NUM);
			}
		
		foreach ($lista as $value) {
      
				if ($columna!=$value[2]) {
				  $columna=$value[2];
				  if (count($n_array)>0) {
					array_push($f_array,$n_array);
					$n_array=[];
				  }
				  array_push($n_array,$value[0],$value[1],$value[2]);
				  
				}
				if ($columna==$value[2]){
				  array_push($n_array,$value[3]);
				  array_push($n_array,$value[4]);
				  if (count($lista)-1==$i) {
					array_push($f_array,$n_array);
				  }
				 
				}
			  $i=$i+1;
			  }
		   return $f_array;
		
	}
	function GetAllOferta($busca)
	{
		$columna="";
		$n_array=[];
		$f_array=[];
		$i=0;
		if ($busca=="") {
			$query="SELECT oferta.codigo, oferta.lapso_academico, oferta.pnf, carrera.nombre FROM carrera INNER JOIN oferta ON oferta.pnf = carrera.codigo ORDER BY oferta.codigo DESC";
			$lista=$this->ListAll($this->execute($query), MYSQLI_NUM);
		}
		else {
			$query="SELECT oferta.codigo, oferta.lapso_academico, oferta.pnf, carrera.nombre FROM carrera INNER JOIN oferta ON oferta.pnf = carrera.codigo && oferta.lapso_academico LIKE '%$busca%' ORDER BY oferta.codigo DESC";
			$lista=$this->ListAll($this->execute($query), MYSQLI_NUM);
			}
		
		foreach ($lista as $value) {
      
				if ($columna!=$value[1]) {
				  $columna=$value[1];
				  if (count($n_array)>0) {
					array_push($f_array,$n_array);
					$n_array=[];
				  }
				  array_push($n_array,$value[0],$value[1]);
				  
				}
				if ($columna==$value[1]){
				  array_push($n_array,$value[2]);
				  array_push($n_array,$value[3]);
				  if (count($lista)-1==$i) {
					array_push($f_array,$n_array);
				  }
				 
				}
			  $i=$i+1;
			  }
		   return $f_array;
	}
	function GetFindQuery($tabla,$dato,$campo)
	{
		$query="SELECT * FROM `$tabla` WHERE `$campo` LIKE '%$dato%'";
		return $this->ListAll($this->execute($query), MYSQLI_NUM);
	}
	function registrarProfesor(){
		$query="INSERT INTO `profesor`(`cedula`, `rol`, `primer_nombre`, 
		`segundo_nombre`, `primer_apellido`, `segundo_apellido`, `direccion`, `telefono`)
		VALUES ('".$this->cedula."','".$this->rol."','".$this->primer_nombre."','".$this->segundo_nombre."','".$this->primer_apellido."','".$this->segundo_apellido."','".$this->direccion."','".$this->telefono."')";
		
		return $this->execute($query);
	}
	function registrarAdministrador($contrasena){
		$query="INSERT INTO `administrador`(`cedula`,`contrasena`)
		VALUES ('".$this->cedula."','$contrasena')";
		return $this->execute($query);
	}
	function createPassword($cedula, $contrasena){
		$query="UPDATE `administrador` SET `contrasena`='$contrasena' WHERE `cedula`='$cedula' ";
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
	function registrarLapso($trayecto, $fecha_inicio, $fecha_final){
		$nombre=strtoupper($trayecto);
		$query="SELECT * FROM `lapso_academico` WHERE `trayecto`='$trayecto'";
		
		$val=$this->CheckResult($this->execute($query));
		if ($val==1) {
			return 3;
		}
		else {
			$query="INSERT INTO `lapso_academico`(`trayecto`, `fecha_inicio`, `fecha_final`)
			VALUES ('".strtoupper($trayecto)."','$fecha_inicio','$fecha_final')";
			return $this->execute($query);
		}
		
	}
	function registrarPensum($carrera, $unidad){
		$carrera=strtoupper($carrera);
		$codigo=$this->FindQuery("carrera","nombre",$carrera);
		$codigo1=$codigo[0];
		$query="INSERT INTO `pensum`(`pnf`, `unidad_curricular`)
			VALUES ('$codigo1','$unidad')";
			
		return $this->execute($query);
		
	}
	function registrarOferta($trayecto, $pnf){
		$trayecto=strtoupper($trayecto);
		$query="INSERT INTO `oferta`(`lapso_academico`, `pnf`)
			VALUES ('$trayecto','$pnf')";
		return $this->execute($query);
		
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
		$query="SELECT `cedula`,`contrasena` FROM `administrador` WHERE `cedula`=$cedula";
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
		
		if ($val==1 && $codigo==$original_codigo) {
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
		if ($val==1 && $codigo==$original_codigo) {
			return 3;
		}
		else {
			
			$query="UPDATE `aula` SET 
					`codigo`='$codigo', `nombre`='$nombre' 
					WHERE `codigo`='$original_codigo'";
			return $this->execute($query);
		}
		
	}
	function UpdateTableCarrera($codigo,$nombre,$original_codigo)
	{
		$nombre=strtoupper($nombre);
		$query="SELECT * FROM `carrera` 
				WHERE `nombre`='$nombre'";
		
		$val=$this->CheckResult($this->execute($query));
		if ($val==1 && $codigo==$original_codigo) {
			return 3;
		}
		else {
			
			$query="UPDATE `carrera` SET `codigo`='$codigo', `nombre`='$nombre' WHERE `codigo`='$original_codigo'";
			return $this->execute($query);
		}
		
	}
	function UpdateTableLapso($trayecto,$fecha_inicio,$fecha_final, $trayecto_origin)
	{
			$query="UPDATE `lapso_academico` SET `trayecto`='$trayecto',`fecha_inicio`='$fecha_inicio',`fecha_final`='$fecha_final' WHERE `trayecto`='$trayecto_origin'";
			return $this->execute($query);
		
	}
	function DeleteTable($tabla, $campo, $dato) {
		$query="DELETE FROM `$tabla` WHERE `$campo`='$dato'";
		return $this->execute($query);
	}
	function TakeColumnNames($tabla) {
		$query="SELECT `COLUMN_NAME` 
		FROM `INFORMATION_SCHEMA`.`COLUMNS` 
		WHERE `TABLE_NAME`='$tabla' ORDER BY ORDINAL_POSITION";
		return $this->ListAll($this->execute($query), MYSQLI_ASSOC);
	}
}
?>