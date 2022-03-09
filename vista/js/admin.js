// ----------------------------------VARIABLES---------------------------------
//VARIABLES PARA ANIMAR EL MENU LATERAL
var click=0;
var comparechild=0;
var button=[];
var div_edit="";
var container_url="";
var container_add="";
var add_array=[]

// ----------------------------------VARIABLES---------------------------------




//--------------------------------------------FUNCIONES--------------------------------

function AppearsAndDissapear(appear,display) {
    DissapearVarious(".container","none")
    document.getElementById(appear).style.display=display;
    document.getElementById(appear).style.animationName="Opacity";
    document.getElementById(appear).style.animationDuration="0.7s";
   
}
function LabelAnimation(input,label){
        document.getElementById(input).style.borderColor=""
        document.getElementById(label).style.top = "1px";
        document.getElementById(label).style.fontSize = "15px";
       
}
function AnimationPrincipalMenu(child){
    click=click+1;
        for (let index = 0; index < 6; index++) {
            if (index==child) {
                const div=document.querySelector(".slide-menu").children[child];
                if (click>=2 && comparechild==child) {
                    div.children[1].style.transform = "rotate(0)";
                    div.children[2].style.maxHeight = "0";
                    click=0
                }
                else {
                    div.children[1].style.transform = "rotate(180deg)";
                    div.children[2].style.maxHeight = "120px";
                    
                }  
            }
            else {
                const div=document.querySelector(".slide-menu").children[index];
                div.children[1].style.transform = "rotate(0)";
                div.children[2].style.maxHeight = "0";
            }
            
        }
    comparechild=child
    
}

function OnLoad(active){
    //Tomo la url de la pagina
    const url=window.location.href;
    //Creo un Regex donde estaran los divs de los formularios cada uno con su respectivo nombre
    var x=/([(profesor+\-container)(materia\-container)(aula\-container)(carrera\-container)(lapso_academico\-container)])\w+/g;
    //Busco la coicidencias dentro del regex previamente creado
    var container=url.match(x)
    //Guardo el tipo de display que utiliza el formulario ya sea flex o grid
    var display=url.slice(-4)
    //Creo el nombre del div correspodiente
    container=container[6]+container[7];

    //Muestro el div al usuario
    container_url=container+"-"+display;
    array=container_url.split("-");
    if (array[1]=="container") {
        document.getElementById('history_back').style.display="inline";
    }
    else if (array[1]=="historial") {
        document.getElementById('register_back').style.display="inline";
    }
    if (container!="" && active!="active") {
        AppearsAndDissapear(container,display)
    }
}
function ValidateDate() {
    var date_inicio=document.getElementById('fecha_inicio').value;
    var date_final=document.getElementById('fecha_final').value;
    array_inicio=date_inicio.split("-");
    array_final=date_final.split("-");
    if (date_final<date_inicio && date_final!="") {
        document.getElementById('fecha_final').value="";
        Error("La fecha final no puede ser menor que la fecha inicial","msg_error","p_error")
    }
}
function LabelInput() {
     //--- y para los inputs
     y=0
     //--- l para los label
     l=0
     var input=document.querySelectorAll(".input-label");
     var label=document.querySelectorAll("label");
     totalinput=input.length;
     while (y<totalinput) {
         if (input[y].value!="") {
             LabelAnimation(input[y].id,label[y].id)
         }
         y=y+1
     }
}
function LabelOut(input,label){
    var inputs = document.getElementById(input).value;
    if (inputs=="") {
        document.getElementById(label).style.top = "20px";
        document.getElementById(label).style.fontSize = "18px";
        document.getElementById(input).style.borderColor= "rgb(225, 32, 109)"
    }
    else {
        document.getElementById(input).style.borderColor= "rgb(32, 190, 109)"
    }
    
}
function SelectAnimation(select){
    if (document.getElementById(select).value=="") {
        document.getElementById(select).style.borderColor="";
    }
    else {
        document.getElementById(select).style.borderColor="rgb(32, 190, 109)";
    }
    
}
function Submit(form){
   var div=document.getElementById(form).querySelector("div");
   var input=div.querySelectorAll(".input");
   var valide=true;
   for (let index = 0; index < input.length; index++) {
       if (input[index].id=="segundo_nombre" || input[index].id=="segundo_apellido") {
           
       }
       else {
            if (input[index].value=="") {
            console.log(input[index].id)
            valide=false;
            }
       }
      
       
   }
   console.log(valide);
   if (valide) {
        OnLoad("active")
        document.getElementById(form).querySelector(".input-url").value=container_url;
        document.getElementById(form).submit();
   }
}
function KeyTexto() {
    var x=new RegExp("[A-Za-z-ñ]+")
    if (x.test(event.key)) {
    }
    else {
        event.preventDefault();
    }
}
function KeyNumeros() {
    var x=new RegExp("[0-9]+")
    if (x.test(event.key)) {
    }
    else {
        event.preventDefault();
    }
}
function KeyVarchar() {
    var x=new RegExp("[A-Za-z0-9-ñ ]+")
    if (x.test(event.key)) {
    }
    else {
        event.preventDefault();
    }
}
function ValidateTexto(input){
    var inputs=document.getElementById(input)
    inputs.addEventListener("keypress", KeyTexto)
    
}
function ValidateNumeros(input){
    
    var inputs=document.getElementById(input)
    inputs.addEventListener("keypress", KeyNumeros)
}
function ValidateVarchar(input){
    var inputs=document.getElementById(input)
    inputs.addEventListener("keypress", KeyVarchar)
}

function CountInput(input) {
    input_count=div_edit.querySelectorAll(".input");
    for (let index = 0; index < input_count.length; index++) {
       if (input_count[index].id==input.id) {
            return index
       }
        
    }
}
function DissapearVarious(element,display) {
    x=0
    div=document.querySelectorAll(element)
    totaldiv=div.length;
    while (x<totaldiv) {
        div[x].style.display=display;
        x=x+1
    }
}


function Search(input,div) {
    var input, filter, span, i;
    input = document.getElementById(input);

    filter = input.value.toUpperCase();
    div = document.getElementById(div);
    span = div.querySelectorAll("span");
    for (i = 0; i < span.length; i++) {
      txtValue = span[i].textContent || span[i].innerText;
      if (txtValue.toUpperCase().indexOf(filter) > -1) {
        span[i].style.display = "";
      } else {
        span[i].style.display = "none";
      }
    }
}
function AddValueMateria(input, span) {
    span=span.textContent || span.innerText;
    document.getElementById(input).value=span;
    LabelInput();
}
function AddAndRemove(div,div_add,input,input_add, type, container) {
    //VARIABLES
    var input_add=document.getElementById(input_add)
    var input=document.getElementById(input);
    var span_add=document.createElement("span");
    var div=document.getElementById(div);
    var div_add=document.getElementById(div_add);
    var span=div.querySelectorAll("span");
    var container=document.getElementById(container);
    if (container_add!=container && container_add!="") {
        add_array=[];
        if (container.querySelector('#add').value!="") {
            add_array=container.querySelector('#add').value.split(',');
        }
        
    }
    container_add=container;
    //VARIABLES
    if (input!="") {
        for (let index = 0; index < span.length; index++) {
        if (span[index].innerText==input.value.toUpperCase()) {
            input_add.value=input.value.toUpperCase();
            span_add.innerHTML=input.value.toUpperCase();
            span_add.onclick=function () {AddValueMateria(input_add.id, this)}
            span_add.id=span[index].getAttribute('id');
            span[index].remove();
            div_add.appendChild(span_add);
            if (type=="add") {
                add_array.push(span[index].getAttribute('id'));
                
                
            }
            else if (type=="del") {
                for( var i = 0; i < add_array.length; i++){ 
    
                    if ( add_array[i] === span[index].getAttribute('id')) { 
                
                        add_array.splice(i, 1); 
                    }
                
                }
            }
            container.querySelector('#add').value="";
            for (let index = 0; index < add_array.length; index++) {
                if (container.querySelector("#add").value!="") {
                    container.querySelector("#add").value=container.querySelector("#add").value+","+add_array[index];
                }
                else {
                    container.querySelector("#add").value=add_array[index];
                }
            }
            input.value="";
            LabelInput();
            Search(input.id,div.id)
        }
        }
        
    }
    console.log(container.querySelector("#add").value)
}
function BackOption(div){
        OnLoad("active")
        array=container_url.split("-")
        container=array[0]
        if (div.id=="history_back") {
            document.getElementById(div.id).style.display="none";
            document.getElementById('register_back').style.display="inline";
            DissapearVarious('.container','none');
            window.location.href="administrador.php#"+container+"-historial-grid"
            refresh(1,container)
            
        }
        else {
            document.getElementById(div.id).style.display="none";
            document.getElementById('history_back').style.display="inline";
            window.location.href="administrador.php#"+container+"-container-grid"
            AppearsAndDissapear(container+"-container","grid")
        }
}
//--------------------------------------------FUNCIONES--------------------------------

//----------------------------------------EJECUTAR FUNCIONES------------------------------------
document.getElementById("registrarMateria").addEventListener("click", function(){
    if (div_edit!="") {
        Close()
    }
    DissapearVarious('.back-option','none');
    document.getElementById('history_back').style.display='inline';
    AppearsAndDissapear("materia-container","grid")})

document.getElementById("registrarProfesor").addEventListener("click", function(){
    if (div_edit!="") {
        Close()
    }
    DissapearVarious('.back-option','none');
    document.getElementById('history_back').style.display='inline';
    AppearsAndDissapear("profesor-container","grid")})

document.getElementById("registrarAulas").addEventListener("click", function(){
    if (div_edit!="") {
        Close()
    }
    DissapearVarious('.back-option','none');
    document.getElementById('history_back').style.display='inline';
    AppearsAndDissapear("aula-container","grid")})

document.getElementById("registrarCarreras").addEventListener("click", function(){
    if (div_edit!="") {
        Close()
    }
    DissapearVarious('.back-option','none');
    document.getElementById('history_back').style.display='inline';
    AppearsAndDissapear("carrera-container","grid")})

document.getElementById("crearLapso").addEventListener("click", function(){
    if (div_edit!="") {
           Close()
    }
    DissapearVarious('.back-option','none');
    document.getElementById('history_back').style.display='inline';
    AppearsAndDissapear("lapso_academico-container","grid")})
 document.getElementById("crearOferta").addEventListener("click", function(){
    if (div_edit!="") {
            Close()
    }
    DissapearVarious('.back-option','none');
    document.getElementById('history_back').style.display='inline';
    AppearsAndDissapear("oferta-container","grid")})
document.getElementById("crearPensum").addEventListener("click", function(){
    if (div_edit!="") {
            Close()
    }
    DissapearVarious('.back-option','none');
    document.getElementById('history_back').style.display='inline';
    AppearsAndDissapear("pensum-container","grid")})
document.getElementById("historialProfesor").addEventListener("click", function(){
if (div_edit!="") {
     Close()
    }
    DissapearVarious('.container','none');
    refresh(1,'profesor')
    DissapearVarious('.back-option','none');
    document.getElementById('register_back').style.display='inline';
    
})
document.getElementById("historialMateria").addEventListener("click", function(){
    if (div_edit!="") {
         Close()
        }
    DissapearVarious('.container','none');
    refresh(1,'materia')
    DissapearVarious('.back-option','none');
    document.getElementById('register_back').style.display='inline';
})
document.getElementById("historialCarreras").addEventListener("click", function(){
    if (div_edit!="") {
         Close()
        }
    DissapearVarious('.container','none');
    refresh(1,'carrera')
    DissapearVarious('.back-option','none');
    document.getElementById('register_back').style.display='inline';

})
document.getElementById("historialAulas").addEventListener("click", function(){
    if (div_edit!="") {
         Close()
        }
    DissapearVarious('.container','none');
    refresh(1,'aula')
    DissapearVarious('.back-option','none');
    document.getElementById('register_back').style.display='inline';
})


document.getElementById("materias").addEventListener("click", function(){
    document.querySelector("#materias_drop").style.display="flex"})

document.getElementById("materias_add").addEventListener("click", function(){
    
    document.querySelector("#materias_add_drop").style.display="flex"})

document.getElementById("carreras").addEventListener("click", function(){
    document.querySelector("#carreras_drop").style.display="flex"})

document.getElementById("carrera_oferta").addEventListener("click", function(){
    document.querySelector("#carreras_oferta_drop").style.display="flex"})

document.getElementById("carreras_add").addEventListener("click", function(){
    document.querySelector("#carreras_add_drop").style.display="flex"})
document.getElementById("lapso").addEventListener("click", function(){
        document.querySelector("#lapso_drop").style.display="flex"})

document.addEventListener('mouseup', function(e) {
    var input = document.getElementById('materias');
    var input2= document.getElementById('materias_add');
    var input3= document.getElementById('carreras');
    var input4= document.getElementById('carreras_add');
    var input5= document.getElementById('carrera_oferta');
    var input6= document.getElementById('lapso');
    if (!input.contains(e.target)) {
        document.getElementById("materias_drop").style.display = 'none';
        input.style.border=""
    }
    if (!input2.contains(e.target)) {
        document.getElementById("materias_add_drop").style.display = 'none';
        input2.style.border=""
    }
    if (!input3.contains(e.target)) {
        document.getElementById("carreras_drop").style.display = 'none';
        input3.style.border=""
    }
    
    if (!input4.contains(e.target)) {
        document.getElementById("carreras_add_drop").style.display = 'none';
        input4.style.border=""
    }
    if (!input5.contains(e.target)) {
        document.getElementById("carreras_oferta_drop").style.display = 'none';
        input4.style.border=""
    }
    if (!input6.contains(e.target)) {
        document.getElementById("lapso_drop").style.display = 'none';
        input4.style.border=""
    }
    
});
ValidateTexto('primer_nombre');
ValidateTexto('segundo_nombre');
ValidateTexto('primer_apellido');
ValidateTexto('segundo_apellido');
ValidateTexto('tipo_materia');
ValidateVarchar('nombre_aula');
ValidateVarchar('nombre_carrera');
ValidateNumeros('cedula');
ValidateNumeros('telefono');
ValidateVarchar('codigo_carrera');
ValidateVarchar('codigo_materia');
ValidateVarchar('codigo_aula');
ValidateVarchar('trayecto');
ValidateVarchar('buscar_pensum');
OnLoad();
//----------------------------------------EJECUTAR FUNCIONES------------------------------------
