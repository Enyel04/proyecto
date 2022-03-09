var valores=[];
var span_array=[];
function ActiveModificar(fila,container) {
    if (container=="pensum-container" || container=="oferta-container") {
        filas=document.querySelectorAll(fila);
        lista=[];
        lista.push(filas[1].innerText)
        span=filas[2].querySelectorAll("span");
        for (let index = 0; index < span.length; index++) {
            lista.push(span[index].id)
            lista.push(span[index].innerText)
        }
        ModificarPensum(lista, container);
    }
    else {
        valores=[];
        filas=document.querySelectorAll(fila);
        for (let index = 0; index < filas.length; index++) {
            if (filas[index].innerText=="PROFESOR" || filas[index].innerText=="DICIPLINARIA") {
                valores.push('0');
            }
            else if (filas[index].innerText=="ADMINISTRADOR" || filas[index].innerText=="MULTIDICIPLINARIA") {
                valores.push('1');
            }
            else {
                valores.push(filas[index].innerText);
            }
        
        }
        if (container!="") {
            Modificar(container,"grid",valores);
            LabelInput();
        }
    }
    
   
}
function ClearSpan() {
    drop_add=div_edit.querySelector(".drop_add");
    drop=div_edit.querySelector(".drop");
    span_materias=drop.querySelectorAll("span");
    span_add_materias=drop_add.querySelectorAll("span");
    for (let index = 0; index < span_materias.length; index++) {
        span_materias[index].remove();
    }
    
    for (let index = 0; index < span_array.length; index++) {
        span=document.createElement("span");
        span.innerHTML=span_array[index].innerHTML;
        span.onclick=span_array[index].onclick;
        span.id=span_array[index].id;
        drop.appendChild(span);
        
    }
    if (span_add_materias[0]!="") {
        for (let index = 0; index < span_add_materias.length; index++) {
            span_add_materias[index].remove();
        }
    }
}
function ModificarPensum(lista, container){
    add_array=[];
    valores=[];
    div=document.getElementById(container)
    drop=div.querySelector(".drop");
    drop_add=div.querySelector(".drop_add");
    input_add=div.querySelector('.input_add');
    input_added=div.querySelector('.input_added');
    principal_input=div.querySelector('.principal_input');
    div_edit=document.getElementById(container);
    if (span_array=="") {
        span_array=drop.querySelectorAll("span");
    }
    ClearSpan();
    valores.push(lista[0])
    for (let index = 1; index < lista.length; index++) {
        if (isNaN(lista[index])) {
            span_add=document.createElement("span");
            span_add.innerHTML=lista[index];
            span_add.onclick=function () {AddValueMateria(input_add.id, this)}
            span_add.id=lista[index-1];
            add_array.push(lista[index-1]);
            valores.push(lista[index-1]);
            drop_add.appendChild(span_add);
        }
       
    }
    for (let index = 0, i=1; index < span_array.length; index++) {
        
        if (span_array[index].id==lista[i]) {
            $('#'+span_array[index].id).remove();
            index=-1;
            i=i+2;
        }  
    }
    div_edit.querySelector("#add").value="";
    
    for (let index = 0; index < add_array.length; index++) {
        if (div_edit.querySelector("#add").value!="") {
                div_edit.querySelector("#add").value=div_edit.querySelector("#add").value+","+add_array[index];
        }
        else {
            div_edit.querySelector("#add").value=add_array[index];
            }
    }
    console.log(div_edit.querySelector("#add").value);   
    div_edit.querySelector(".close-icon").style.display="block";
    button=div_edit.querySelectorAll("button");
    button[0].style.display="none";
    button[1].style.display="none";
    button[2].style.display="block";
    button[3].style.display="block";
    div.querySelector('.principal_input').value=lista[0];
    AppearsAndDissapear(container,"grid");
    var checkbox=div_edit.querySelectorAll(".checkbox-edit");
   for (let index = 0; index < checkbox.length; index++) {
        checkbox[index].style.display="block";
        checkbox[index].checked=true;
   }
    principal_input.disabled=true;
    input_added.disabled=true;
    input_add.disabled=true;
    LabelInput();
}

function refresh(page,tabla,campo,dato) {
    setTimeout(() => {
        OnLoad('active');
        container=container_url.split("-");
        if (container[1]=="historial") {
            if (page=='') {
                page=localStorage.getItem('pagina');
            }
            if (tabla=='') {
                tabla=localStorage.getItem('tabla');
            }
            if (campo=='') {
                campo=localStorage.getItem('campo');
                console.log(campo);
            }
            if (dato=='') {
                dato=localStorage.getItem('dato');
                
            }
            else {
                localStorage.setItem('pagina',page);
                localStorage.setItem('tabla',tabla);
                localStorage.setItem('campo',campo);
                localStorage.setItem('dato',dato);
            }
            $('#refresh').load('listar.php?page='+page+'&tabla='+tabla+'&campo='+campo+'&dato='+dato);
            setTimeout(() => {
                SelectValidation();
            }, 100);
            setTimeout(() => {
                document.querySelector(".listar-container").style.display="grid";
            }, 300);
        }
    }, 200);
    
  
}
function SelectValidation() {
    var campo=document.getElementById('campo').value;
    var input=document.getElementById('buscar_historial');
    if (campo=='CEDULA' || campo=='TELEFONO') {
        input.removeEventListener("keypress",KeyNumeros)
        input.removeEventListener("keypress",KeyTexto)
        input.removeEventListener("keypress",KeyVarchar)
        ValidateNumeros('buscar_historial');
        
    }
    else if (campo=='PRIMER_NOMBRE' || campo=='SEGUNDO_NOMBRE' || campo=='PRIMER_APELLIDO' || campo=='SEGUNDO_APELIDO'
            || campo=='ROL' || campo=='TIPO') {
        input.removeEventListener("keypress",KeyNumeros)
        input.removeEventListener("keypress",KeyTexto)
        input.removeEventListener("keypress",KeyVarchar)
        ValidateTexto('buscar_historial');
        
    }
    else {
        input.removeEventListener("keypress",KeyNumeros)
        input.removeEventListener("keypress",KeyTexto)
        input.removeEventListener("keypress",KeyVarchar)
        ValidateVarchar('buscar_historial');
        
    }
    input.value=""
}
function findHistorial() {
    var dato=document.getElementById('buscar_historial').value.toUpperCase() ;
    var campo=document.getElementById('campo').value;
    if (dato!="") {

        if (dato=="PROFESOR" && campo=="ROL") {
            refresh(1,'',"0",campo);
        }
        else if (dato=="ADMINISTRADOR" && campo=="ROL") {
            refresh(1,'',"1",campo);
        }
        else if (dato=="MULTIDICIPLINARIA" && campo=='TIPO') {
            refresh(1,'',"1",campo);
        }
        else if (dato=="DICIPLINARIA" && campo=='TIPO'){
            refresh(1,'',"0",campo);
        }
        else {
            refresh(1,'',dato,campo);
        }
        
    }
  
}
refresh('','','','');