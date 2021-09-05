jQuery( document ).ready(function( $ ) {


	"use strict";

        // Page loading animation

        $("#preloader").animate({
            'opacity': '0'
        }, 600, function(){
            setTimeout(function(){
                $("#preloader").css("visibility", "hidden").fadeOut();
            }, 300);
        });
        

        $(window).scroll(function() {
          var scroll = $(window).scrollTop();
          var box = $('.header-text').height();
          var header = $('header').height();

          if (scroll >= box - header) {
            $("header").addClass("background-header");
          } else {
            $("header").removeClass("background-header");
          }
        });
        
        if ($('.owl-clients').length) {
            $('.owl-clients').owlCarousel({
                loop: true,
                nav: false,
                dots: true,
                items: 1,
                margin: 30,
                autoplay: false,
                smartSpeed: 700,
                autoplayTimeout: 6000,
                responsive: {
                    0: {
                        items: 1,
                        margin: 0
                    },
                    460: {
                        items: 1,
                        margin: 0
                    },
                    576: {
                        items: 2,
                        margin: 20
                    },
                    992: {
                        items: 3,
                        margin: 30
                    }
                }
            });
        }

        if ($('.owl-banner').length) {
            $('.owl-banner').owlCarousel({
                loop: true,
                nav: false,
                dots: true,
                items: 1,
                margin: 0,
                autoplay: false,
                smartSpeed: 700,
                autoplayTimeout: 6000,
                responsive: {
                    0: {
                        items: 1,
                        margin: 0
                    },
                    460: {
                        items: 1,
                        margin: 0
                    },
                    576: {
                        items: 1,
                        margin: 20
                    },
                    992: {
                        items: 1,
                        margin: 30
                    }
                }
            });
        }
});



////////////////////////////////////////////////////////////



$(document).ready(function(){
	// $("#loadMore").on('click',function(){
	// 	var _currentProducts=$(".product-box").length;
	// 	var _limit=$(this).attr('data-limit');
	// 	var _total=$(this).attr('data-total');
	// 	// Start Ajax
	// 	$.ajax({
	// 		url:'/load-more-data',
	// 		data:{
	// 			limit:_limit,
	// 			offset:_currentProducts
	// 		},
	// 		dataType:'json',
	// 		beforeSend:function(){
	// 			$("#loadMore").attr('disabled',true);
	// 			$(".load-more-icon").addClass('fa-spin');
	// 		},
	// 		success:function(res){
	// 			$("#filteredProducts").append(res.data);
	// 			$("#loadMore").attr('disabled',false);
	// 			$(".load-more-icon").removeClass('fa-spin');

	// 			var _totalShowing=$(".product-box").length;
	// 			if(_totalShowing==_total){
	// 				$("#loadMore").remove();
	// 			}
	// 		}
	// 	});
	// 	// End
	// });

	// // Product Variation
	// $(".choose-size").hide();

	// // Show size according to selected color
	// $(".choose-color").on('click',function(){
	// 	$(".choose-size").removeClass('active');
	// 	$(".choose-color").removeClass('focused');
	// 	$(this).addClass('focused');

	// 	var _color=$(this).attr('data-color');

	// 	$(".choose-size").hide();
	// 	$(".color"+_color).show();
	// 	$(".color"+_color).first().addClass('active');

	// 	var _price=$(".color"+_color).first().attr('data-price');
	// 	$(".product-price").text(_price);

	// });
	// // End

	// // Show the price according to selected size
	// $(".choose-size").on('click',function(){
	// 	$(".choose-size").removeClass('active');
	// 	$(this).addClass('active');

	// 	var _price=$(this).attr('data-price');
	// 	$(".product-price").text(_price);
	// })
	// // End

	// // Show the first selected color
	// $(".choose-color").first().addClass('focused');
	// var _color=$(".choose-color").first().attr('data-color');
	// var _price=$(".choose-size").first().attr('data-price');

	// $(".color"+_color).show();
	// $(".color"+_color).first().addClass('active');
	// $(".product-price").text(_price);


// Add to cart
$(document).on('click',".add-to-cart-btn",function(){
    var _vm=$(this);
    var _index=_vm.attr('data-index');
    var _qty=$(".product-qty-"+_index).val();
    var _productId=$(".product-id-"+_index).val();
    var _productImage=$(".product-image-"+_index).val();
    var _productTitle=$(".product-title-"+_index).val();
    var _productDiscountPrice=$(".product-discountprice-"+_index).val();
    var _productActualPrice=$(".product-actualprice-"+_index).val();
    // var _productTitle=$(".product-title").val();
    // var _productImage=$(".product-image").val();
    // var _productId=$(".product-id").val();
    // var _qty=$("#productQty").val();
    // var _productDiscountPrice=$(".product-discountprice").val();
    // var _productActualPrice=$(".product-actualprice").val();
    console.log(_qty,_productId,_productTitle ,_productDiscountPrice)
    // Ajax
    $.ajax({
        url:'/add-to-cart',
        data:{
            'id':_productId,
            'image':_productImage,
            'qty':_qty,
            'title':_productTitle,
            'discountprice':_productDiscountPrice,
            'actualprice':_productActualPrice,
            
        },
        dataType:'json',
        beforeSend:function(){
            _vm.attr('disabled',true);
        },
        success:function(res){
            $(".cart-list").text(res.totalitems);
            _vm.attr('disabled',false);
        }
    });
    // End
});
// End

// Delete item from cart
$(document).on('click','.delete-item',function(){
    var _pId=$(this).attr('data-item');
    var _vm=$(this);
    // Ajax
    $.ajax({
        url:'/delete-from-cart',
        data:{
            'id':_pId,
        },
        dataType:'json',
        beforeSend:function(){
            _vm.attr('disabled',true);
        },
        success:function(res){
            $(".cart-list").text(res.totalitems);
            _vm.attr('disabled',false);
            $("#cartList").html(res.data);
        }
    });
    // End
});

// Update item from cart
$(document).on('click','.update-item',function(){
    var _pId=$(this).attr('data-item');
    var _pQty=$(".product-qty-"+_pId).text();
    var _vm=$(this);
    // Ajax
    $.ajax({
        url:'/update-cart',
        data:{
            'id':_pId,
            'qty':_pQty
        },
        dataType:'json',
        beforeSend:function(){
            _vm.attr('disabled',true);
        },
        success:function(res){
            // $(".cart-list").text(res.totalitems);
            _vm.attr('disabled',false);
            $("#cartList").html(res.data);
        }
    });
    // End
});

// Add wishlist
$(document).on('click',".add-wishlist",function(){
    var _pid=$(this).attr('data-product');
    var _vm=$(this);
    // Ajax
    $.ajax({
        url:"/add-wishlist",
        data:{
            product:_pid
        },
        dataType:'json',
        success:function(res){
            if(res.bool==true){
                _vm.addClass('disabled').removeClass('add-wishlist');
            }
        }
    });
    // EndAjax
});
// End

// // Activate selected address
// $(document).on('click','.activate-address',function(){
//     var _aId=$(this).attr('data-address');
//     var _vm=$(this);
//     // Ajax
//     $.ajax({
//         url:'/activate-address',
//         data:{
//             'id':_aId,
//         },
//         dataType:'json',
//         success:function(res){
//             if(res.bool==true){
//                 $(".address").removeClass('shadow border-secondary');
//                 $(".address"+_aId).addClass('shadow border-secondary');

//                 $(".check").hide();
//                 $(".actbtn").show();
                
//                 $(".check"+_aId).show();
//                 $(".btn"+_aId).hide();
//             }
//         }
//     });
//     // End
// });

});
// End Document.Ready

// Product Review Save
$("#reviewForm").submit(function(e){
$.ajax({
    data:$(this).serialize(),
    method:$(this).attr('method'),
    url:$(this).attr('action'),
    dataType:'json',
    success:function(res){
        if(res.bool==true){
            $(".ajaxRes").html('Data has been added.');
            $("#reset").trigger('click');
            // Hide Button
            $(".reviewBtn").hide();
            // End

            // create data for review
            
            // var _html='<blockquote class="blockquote text-right">';
            // _html+='<small>'+res.data.review_text+'</small>';
            // _html+='<footer class="blockquote-footer">'+res.data.user;
            // _html+='<cite title="Source Title">';
            // for(var i=1; i<=res.data.review_rating; i++){
            //     _html+='<i class="fa fa-star text-warning"></i>';
            // }
            // _html+='</cite>';
            // _html+='</footer>';
            // _html+='</blockquote>';
            // _html+='</hr>';


            var _html='<ul class="reviews ">';
            _html+='<li>';
            _html+='<div class="review-heading">';
            _html+='<h5 class="name">'+res.data.user+'</h5>';
            _html+='<div class="review-rating">';
            
            for(var i=1; i<=res.data.review_rating; i++){
                _html+='<i class="fa fa-star"></i>';                
            }
            for(var i=1; i<=5-res.data.review_rating; i++){
                _html+='<i class="fa fa-star-o empty"></i>';                
            }
            _html+='</div>';
            _html+='</div>';
            _html+='<div class="review-body">';
            _html+='<p>'+res.data.review_text+'</p>';
            _html+='</div>';
            _html+='</li>';
            

            $(".no-data").hide();

            // Prepend Data
            $(".review-list").prepend(_html);

            // Hide Modal
            // $("#productReview").modal('hide');
            $("#productReview").hide();

            // AVg Rating
            $(".avg-rating").text(res.avg_reviews.avg_rating.toFixed(1))
        }
    }
});
e.preventDefault();
});
// End

