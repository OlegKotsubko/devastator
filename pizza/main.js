
    (function($) {
        $(function() {

          $('ul.tabs__caption').on('click', 'li:not(.active)', function() {
            $(this)
              .addClass('active').siblings().removeClass('active')
              .closest('div.tabs').find('div.tabs__content').removeClass('active').eq($(this).index()).addClass('active');
          });

        });
    })(jQuery);
'use strict'
$(document).ready(function(){
    $('.xl').css({"background-position":"0 -60px"});
    $('.size').find('b').text("25 см");

    // функция берёт из data и вписываеи значения в спаны (цена / граммы)
    
    function getItemProp () {
        $('.size').find('li').each(function(){
            if  ($(this).hasClass("active") !== "undefined")
                var itemIndex = $(this).attr('class');
                var detect = itemIndex.slice(0,-6);
                if ( detect !== "")
                    
                    $('.img-item').find('img').each(function(){
                        var costItem = $(this).attr('data-'+detect.trim());
                        var weightItem = $(this).attr('data-w-'+detect.trim());
                        var nameItem = $(this).attr('alt');
                         $(this).parent().next().find('span').text(nameItem);
                         $(this).parent().next().next().find('span').text(weightItem+"гр.");
                         $(this).parent().next().next().find('span').next().text(costItem+"грн.").css({"color":"#ff8000"});
           
                     })
        })
    }
    // вызываем функцию, которая парсит data зашитое в img. Не самый изящьный способ, но для практики, пойдёт.
    // data нужно зашивать в inputs
getItemProp();
    function itemPropBySize () {
        
    }

    $('.dough').find('img').click(function(){
        if ($(this).hasClass('active')){
            $(this).siblings().removeClass('active');
            $('.dough').find('b').text($(this).attr('alt'));
        } else {
            $(this).addClass('active');
            $(this).siblings().removeClass('active');
            $('.dough').find('b').text($(this).attr('alt'));
        }
    
    })
    
    $('.size').find('li').click(function(){
        var getAtr = $(this).attr('class');
        var remAttr = $(this).siblings().removeAttr('style').removeClass('active');
        if (getAtr === "xxl") {
            $('.size').find('b').text("30 см");
            $(this).css({"background-position":"0 -65px"}).addClass('active').remAttr;
//       Вызываем для пересчёта веса и стоимости ингридиентов по диаметру пиццы
            getItemProp();
           
//            calcItemProp();
        } else if (getAtr === "xl"){
            $('.size').find('b').text("25 см");
            $(this).css({"background-position":"0 -60px"}).addClass('active').remAttr;
//       Вызываем для пересчёта веса и стоимости ингридиентов по диаметру пиццы
            getItemProp();
//            calcItemProp();
        }else if (getAtr === "x"){
            $('.size').find('b').text("20 см");
            $(this).css({"background-position":"0 -55px"}).addClass('active').remAttr;
//       Вызываем для пересчёта веса и стоимости ингридиентов по диаметру пиццы
            getItemProp();
//            calcItemProp();
        }
    })
//          Выбор соуса к пицце
    $('.sauce').find('li').click(function(){
        $(this).addClass('active').siblings().removeClass('active');
        var getAtr = $(this).data('name');
         $('.sauce').find('b').text(getAtr);
    })
    
    var spans =  $('.right').find('ul').children();
        spans.each(function(){
            var indexElem = spans.index(this);
            $(this).attr("data-eq", indexElem);
            $(this).children('li').attr("data-eq", indexElem);
        });
    
    $('.tabs__content').find('li').click(function(){
        
            var countTotalCost = $(this).find('.cost-item').find('span').last().text();
            var countTotalWeight = $(this).find('.cost-item').find('span').first().text();
            var a = Number(countTotalCost.slice(0,-4).trim());
            var b = Number(countTotalWeight.slice(0,-3).trim());
    
            var printTotalCost = $('#itemOrderCost').first().text();
            var printTotalWeight = $('#itemOrderWeight').text();
            var c = Number(printTotalCost.trim());
            var d = Number(printTotalWeight.trim());
        
           var positionElement = $(this).closest('div').attr('id');
           if (positionElement === 'left'){
               $(this).fadeOut(250,function(){
                   var nameLayer = $(this).find('img').attr('name');
                   if (nameLayer != undefined){
                        $('[src="img/'+nameLayer+'Layer.png"]').remove();
                   }

                   $('#itemOrderCost').first().text(c-a);
                   $('#itemOrderWeight').text(d-b);
                   $(this).appendTo($(spans.eq($(this).data('eq'))));
                   $(this).fadeIn(250);
                   $('#orderAlert').css({"display":"none"});
               }) 
           } else {
                if ( (d+b) >= 1000){
                    $(this).unbind( "click" );
                    $('#orderAlert').css({"display":"block"});
                } else {
                    $('#itemOrderCost').first().text(a+c);
                    $('#itemOrderWeight').text(d+b);
                    $(this).fadeOut(150, function(){
                        var nameLayer = $(this).find('img').attr('name');
                        if (nameLayer != undefined)
                        $('.imgPizza').append('<img src="img/'+nameLayer+'Layer.png" class="cnstr-item-photo">');
                        
                        $('#left').children('ul').append($(this));         
                        $(this).fadeIn(150);
                    
                })
                
               }
           }
           
       });    
})