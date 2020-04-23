
$('body').scrollspy({ target: '#navbar' });

(function() {
    var preScrlTop;
    // Main
    addListeners();

    function addListeners() {
        if(document.addEventListener ){
            window.addEventListener('click', click);
            window.addEventListener('touch', click);
            window.addEventListener('scroll', scrollCheck , true);   
       }
    }
    
     // Event handling
    function click(evt) {
        let target = evt.target;
        let nodeName= target.parentNode.nodeName;
       if(nodeName === 'LI' || nodeName ===  'li' ){
            let splitfy = target.href.split('/');
            if(splitfy[splitfy.length-1] != '#home' )
                 $("#navbar").hide();
       }
        
        if( $("#navbarText").hasClass('show') )
           $("#navbarText").removeClass('show');
    }

  

    function scrollCheck(evt) {
        let scrollTop = getScrollTop();
        if(scrollTop > 40 && scrollTop < getBtnHeight() ){
            $("#navbar").addClass("bg-light").find('.nav-link').css('color','#333');
            $("#navbar").addClass("navbar-light").removeClass("navbar-dark");
            $("#navbar").show();
       
        }else if(scrollTop <= 40 && $("#navbar").hasClass('bg-light') ){
            $("#navbar").removeClass ("bg-light").find('.nav-link').css('color','rgba(255, 255, 255, .75)');
             $("#navbar").addClass("navbar-dark").removeClass("navbar-light");
             $("#navbar").show();
  
        } else if( scrollTop > getBtnHeight() &&  preScrlTop > scrollTop ) { // wheel up
            $("#navbar").addClass("bg-light").find('.nav-link').css('color','#333');
             $("#navbar").addClass("navbar-light").removeClass("navbar-dark"); 
            $("#navbar").show();
        } else if( scrollTop > getBtnHeight() &&  preScrlTop < scrollTop ) { //wheel down   
                $("#navbar").hide();
        }
           preScrlTop = scrollTop;      
    }

    // Util 
    //get scroll top
    function getScrollTop() {
        return window.pageYOffset || document.documentElement.offsetTop ||
        document.body.offsetTop;
    }
    // when viewport lessthen <576px Extra small screen
    function getBtnHeight(){
        let btnVh = $("#navbar").find('button').outerHeight();
        return window.screen.width < 576  ? btnVh * 6 : (btnVh * 8);
    }

 })();


