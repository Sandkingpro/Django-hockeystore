var btns= document.querySelectorAll(".plus");
let cookie = document.cookie
let csrfToken = cookie.substring(cookie.indexOf('=') + 1)
console.log(btns);
var minus=document.querySelectorAll('.remove');
var list=[];
//if(JSON.parse(localStorage.getItem('basket')!==null)){
  //list=JSON.parse(localStorage.getItem('basket'));
//}
//if(read_cookie("basket")!==null){
 // list=read_cookie("basket");
//}
btns.forEach(btn=>{
  btn.addEventListener('click',function(){
      
      const inp=this.parentElement.parentElement.querySelector('.counter');
      const currentValue=inp.textContent;
      let newValue;
      if(parseInt(currentValue)<5)
      {
        newValue=parseInt(currentValue)+1;
        inp.textContent=newValue;
      }
      
  })
})
minus.forEach(btn=>{
  btn.addEventListener('click',function(){
     
      const inp=this.parentElement.parentElement.querySelector('.counter');
      const currentValue=inp.textContent;
      let newValue;
      if(parseInt(currentValue)>1)
      {
        newValue=parseInt(currentValue)-1;
      inp.textContent=newValue;
      }
       
  })
})
var basketbtn=document.querySelectorAll('.BasketAdd');
basketbtn.forEach(btn=>{
  btn.addEventListener('click',function(e){
    let _count=this.parentElement.parentElement.querySelector('.counter').textContent;
    let _img=this.parentElement.parentElement.querySelector('.item-img').getAttribute('src');
    let _name=this.parentElement.parentElement.querySelector('.item-name').textContent;
    let _price=this.parentElement.parentElement.querySelector('.item-price').textContent;
    var data = {'name':_name,'img':_img,'price':_price,'count':_count};
    localStorage.setItem("item",JSON.stringify(data));
    //localStorage.setItem("event",e.target.id);
    bake_cookie("event",e.target.id);
    if(list===null){
      list.push(data);
    }
    else{
      let i=list.findIndex(el=>el.name===data.name);
      if(i < 0) {
        list.push(data);
      }   
    }
    
    
    console.log(list);
    console.log(_name);
     //localStorage.setItem('basket',JSON.stringify(list));
     bake_cookie("basket",list);
     //var basket=read_cookie("basket");
     json_response = JSON.stringify(list);
     console.log(document.cookie)
     $.ajax({
        url:'http://127.0.0.1:8000/Коньки' ,
        type: "POST",
        headers:{
            'X-CSRFToken': csrfToken
        },
        data: {
            'basket': JSON.stringify(list),
        },
        success: function (data) {
           console.log('OK');
        },
        error: function (data) {

        },
        dataType: "json",
    });
    });

 
})
var price_btn=document.querySelector('.price_btn');
var close_btn=document.querySelector('.close_arrow');
var firms=document.querySelector('.firm_filter');
 var drop_content=document.querySelector('.price_down');
 var firm_btn=document.querySelector('.firm_btn');
var close_btn_firm=document.querySelector('.close_arrow_firm');
var firm_down=document.querySelector('.firm_down');
window.onload=function(){
    price_btn.style.display='none';
    firm_btn.style.display='none';
    
}
price_btn.addEventListener('click',function(){
 
  console.log(drop_content.style.display);
  drop_content.setAttribute('style','display:block');
  price_btn.style.display='none';
  close_btn.style.display='block';
  firms.setAttribute('style','margin-top:50px');
  
  
})
close_btn.addEventListener('click',function(){
  drop_content.setAttribute('style','display:none');
  price_btn.style.display='block';
  close_btn.style.display='none';
  firms.setAttribute('style','margin-top:0');
})
firm_btn.addEventListener('click',function(){
  firm_down.setAttribute('style','display:block');
  firm_btn.style.display='none';
  close_btn_firm.style.display='block';
})
close_btn_firm.addEventListener('click',function(){
  firm_down.setAttribute('style','display:none');
  firm_btn.style.display='block';
  close_btn_firm.style.display='none';
})
const sliders = document.querySelectorAll('input[type="range"]');
const sprice=document.querySelector('.start_price');
const eprice=document.querySelector('.end_price');
sliders[0].addEventListener('input', (e) => {
 if(+sliders[0].value > +sliders[1].value){
    sliders[1].value = +sliders[0].value;
  }
  sprice.innerHTML=sliders[0].value;
});

sliders[1].addEventListener('input', (e) => {
 if(+sliders[1].value < +sliders[0].value){
    sliders[0].value = +sliders[1].value;
  }
  eprice.innerHTML=sliders[1].value;
});
function bake_cookie(name, value) {
  var cookie = [name, '=', JSON.stringify(value), '; domain=127.0.0.1:8000', window.location.host.toString(), '; path=/;','max-age=259200;'].join('');
  document.cookie = cookie;
}
function read_cookie(name) {
 var result = document.cookie.match(new RegExp(name + '=([^;]+)'));
 result && (result = JSON.parse(result[1]));
 return result;
}
function delete_cookie(name) {
  document.cookie = [name, '=; expires=Thu, 01-Jan-1970 00:00:01 GMT; path=/; domain=.', window.location.host.toString()].join('');
}
var range_max=document.querySelector('.range_max')
range_max.addEventListener('change',function(e){
    var filterItems=document.querySelectorAll('.item_catalog')
    filterItems.forEach(item => {
        if(parseInt(item.querySelector('.item-price').textContent)>=parseInt(range_max.value)){
            item.style.display='none'
        }
        else{
            item.style.display='block'
        }
    })
})
var range_min=document.querySelector('.range_min')
range_min.addEventListener('change',function(e){
    var filterItems=document.querySelectorAll('.item_catalog')
    filterItems.forEach(item => {
        if(parseInt(item.querySelector('.item-price').textContent)<=parseInt(range_min.value)){
            item.style.display='none'
        }
        else{
            item.style.display='block'
        }
    })
})
