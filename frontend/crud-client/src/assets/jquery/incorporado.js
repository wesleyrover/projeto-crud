$(function(){
	
	// TOPO
	/*$(".topo-alertas").hover(
		function () {
			$("#alertas").stop(true).delay(100).fadeIn(300);
		},
		function () {
			$("#alertas").stop(true).delay(100).fadeOut(300);
		}
	);*/
	
	$(".topo-chat").hover(
		function () {
			$("#chat").stop(true).delay(100).fadeIn(300);
		},
		function () {
			$("#chat").stop(true).delay(100).fadeOut(300);
		}
	);
	
	$('.topo-busca').click(function(){
		$('#busca').slideToggle(500);
		$('#filtro').slideUp(500);
	});
	
	/*$('.topo-filtro').click(function(){
		$('#filtro').slideToggle(500);
		$('#busca').slideUp(500);
	});*/

	
	// TRIAGEM
	$('#triagem .btn-success, #triagem .btn-danger').click(function(){ 
		$(this).closest('.triagem-overlay').css('opacity','0.2');
		$(this).closest('.triagem-overlay').css('margin-top','-70px');
		$(this).closest('.triagem-single').find('.triagem-overlay-icone').fadeIn(300);
		$(this).closest('.triagem-single').delay(1500).fadeOut(500);
	});
	
	$('#triagem .btn-danger').click(function(){ 
		$(this).closest('.triagem-single').find('.triagem-overlay-icone span').attr('class','fa fa-times');
		$(this).closest('.triagem-single').find('.triagem-overlay-icone').css('background','#d43f3a');
	});
	
	
	// CONFLITOS
	
	
	$('.relacao-interpessoal input[type=radio]').change(function() {
        if(this.value == "Sim") { 
			$('.relacao-partes').css('opacity', '1'); 
			$('.relacao-partes select').removeAttr('disabled'); 
		}
        else if(this.value == "Não") {
			$('.relacao-partes').css('opacity', '0.3'); 
			$('.relacao-partes select').attr('disabled','disabled'); 
		}
    });

});