function Error(parrafo, msg, p){
    document.getElementById(p).innerHTML=parrafo
    document.getElementById(msg).style.display="block"
    url=window.location.href;
    link=url.slice(-9);
    document.querySelector('.hidder').style.display='block';
    console.log(link);
    if (link!="login.php" && link!="admin.php") {
        var scrolltop=document.documentElement.offsetHeight-200
        document.querySelector('.hidder').style.top=document.querySelector('.grid-container').scrollTop+"px";
    
        document.querySelector('.grid-container').addEventListener('scroll', function(){
        document.querySelector('.hidder').style.top=document.querySelector('.grid-container').scrollTop+"px";
        })
    }
    
    setTimeout(function(){
        document.getElementById(msg).style.right="30px"
    },200)
    setTimeout(function(){
        document.getElementById(msg).style.right="-500px"
    },5000)
    setTimeout(function(){
        document.getElementById(msg).style.display="none"
        document.querySelector('.hidder').style.display='none';
    },6000)
}
