
(function() { 

//  typed texts
  var typed_config = {
    typeSpeed: 80,
    backSpeed: 50,
    startDelay: 1500,
    loop: false,
    shuffle: false,
    loopCount: Infinity
  }
    //get all cards seperate to evens and odds 
    var odds  = $(".card:odd");//2 4 6 
    var evens = $(".card:even");//1 3 5 

   //get all typed and typed-strings dom 
   var typeds = new Array();
   var typed_strings = new Array();
   var typed_objs = new Array();
   for( i = 0 ; i < evens.length ;i++){
      var ii = i + 1 ;
      typed_config['stringsElement'] = '#typed-strings-'+ ii;
      var typed = new Typed('#typed-text-' + ii,  typed_config);
      typed.stop();
      typed_objs.push( typed );
   }
    
    //pair cards
    var pair_map = $.map( evens , function(node, i ){
        $(node).data('idx' , i);
        $(( odds ).get(i)).data('idx' , i);
        return {'even':node, 'odd':( odds ).get(i)  };
    });
    
    console.log(pair_map.length);

    function doEnter(){
            var _this = this;
            var idx = $(this).data('idx');
            var bro = evens.get( idx );
            
           animateCSS( bro , 'zoomIn',function(){               
              $(_this).addClass('d-none')
              $(bro).removeClass('d-none')
               
           });
           animateCSS( this  , 'zoomOut',function(){                
                $(_this).addClass('d-none')
                $(bro).removeClass('d-none')
           }); 
            var typed = typed_objs[idx];         
            typed.start(); 
    }

    function doLeave(){
            var _this = this;
            var idx = $(this).data('idx');
            var bro = odds.get( idx );
           animateCSS( bro , "zoomIn",function(){
                $(_this).addClass('d-none')
                $(bro).removeClass('d-none')
                  
           });
           animateCSS( this  , "zoomOut",function(){
                $(_this ).addClass('d-none')
                $(bro).removeClass('d-none')
             
           });
            var typed = typed_objs[idx];
                   typed.stop();
                   typed.reset();
    }

    // even cards add mouseenter event listener
    for(var i in pair_map){
        var even = pair_map[i].even;
        var odd = pair_map[i].odd; 
       
       $(odd).on('mouseenter' , doEnter );
      
       
       $(even).on('mouseleave', doLeave );  
       $(even).on('touchmove', doLeave );    
    }

    //defined animate  
  function animateCSS(element, animationName, callback) {
    $(element).addClass('animated')
    $(element).addClass( animationName );

    function handleAnimationEnd() {
        $(element).removeClass('animated') 
        $(element).removeClass(animationName )
        $(element).off('webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend',  handleAnimationEnd)
        if (typeof callback === 'function') callback()
    }

     $(element).on('webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend', handleAnimationEnd );
  };
})();




