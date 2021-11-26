let cookie = document.cookie
let csrfToken = cookie.substring(cookie.indexOf('=') + 1)
const deleteList = document.querySelectorAll('.del');
deleteList.forEach((btn) => {
    btn.addEventListener('click', () => {
        btn.parentNode.parentNode.removeChild(btn.parentElement);
        //localStorage.setItem('items',ul.innerHTML);
        const inp=btn.parentNode.querySelector('.counter');
        const currentValue=inp.textContent;
        const curprice=btn.parentNode.querySelector('.price').textContent;
        sum=parseInt(sum)-parseInt(curprice)*(parseInt(currentValue));
        if(sum===0){
            clear();
            document.querySelector('.buy').style.display="none";
        }
        document.querySelector('.value').textContent=sum+' руб.';
        //localStorage.setItem('cost',sum) ;
        //var new_list = JSON.parse(localStorage.getItem("basket"));
        var obj={'name':btn.parentNode.querySelector('.name').textContent,'img':btn.parentNode.querySelector('.img').getAttribute('src'),'price':btn.parentNode.querySelector('.price').textContent,'count':btn.parentNode.querySelector('.counter').textContent};
        console.log(obj);
        //localStorage.setItem('basket',JSON.stringify(new_list));
        //localStorage.setItem('repeats',JSON.stringify(array));
        $.ajax({
        url:'http://127.0.0.1:8000/Basket' ,
        type: "POST",
        headers: {
            'X-CSRFToken': csrfToken
        },
        data: {
            'del_item': JSON.stringify(obj),
        },
        success: function (data) {
           console.log('OK');
        },
        error: function (data) {

        },
        dataType: "json",
    });
    });
});
var btns= document.querySelectorAll(".plus");
var minus=document.querySelectorAll('.remove');
btns.forEach(btn=>{
  btn.addEventListener('click',function(){
      const inp=this.parentElement.parentElement.querySelector('.counter');
      const currentValue=inp.textContent;
      const curprice=this.parentElement.parentElement.parentElement.querySelector('.price').textContent;
      let newValue;
      if(parseInt(currentValue)<5)
      {
        newValue=parseInt(currentValue)+1;
        inp.textContent=newValue;
        sum=parseInt(sum)+parseInt(curprice)*(parseInt(newValue)-parseInt(currentValue));
        document.querySelector('.value').textContent=sum+' руб.';
        //localStorage.setItem('cost',sum) ;
        //localStorage.setItem('items',ul.innerHTML);
        var obj={'name':btn.parentNode.parentNode.parentNode.querySelector('.name').textContent,'img':btn.parentNode.parentNode.parentNode.querySelector('.img').getAttribute('src'),'price':btn.parentNode.parentNode.parentNode.querySelector('.price').textContent,'count':btn.parentNode.parentNode.parentNode.querySelector('.counter').textContent};
        $.ajax({
        url:'http://127.0.0.1:8000/Basket' ,
        type: "POST",
        headers:{
            'X-CSRFToken': csrfToken
        },
        data: {
            'count_plus': JSON.stringify(obj),
        },
        success: function (data) {
           console.log('OK');
        },
        error: function (data) {

        },
        dataType: "json",
        });
      }




  })
})

minus.forEach(btn=>{
  btn.addEventListener('click',function(){
      const inp=this.parentElement.parentElement.querySelector('.counter');
      const currentValue=inp.textContent;
      const curprice=this.parentElement.parentElement.parentElement.querySelector('.price').textContent;
      let newValue;
      if(parseInt(currentValue)>1)
      {
        newValue=parseInt(currentValue)-1;
        inp.textContent=newValue;
        sum=parseInt(sum)-parseInt(curprice)*(parseInt(currentValue)-parseInt(newValue));
        document.querySelector('.value').textContent=sum+' руб.';
        //localStorage.setItem('cost',sum) ;
        //localStorage.setItem('items',ul.innerHTML);
        var obj={'name':btn.parentNode.parentNode.parentNode.querySelector('.name').textContent,'img':btn.parentNode.parentNode.parentNode.querySelector('.img').getAttribute('src'),'price':btn.parentNode.parentNode.parentNode.querySelector('.price').textContent,'count':btn.parentNode.parentNode.parentNode.querySelector('.counter').textContent};
        $.ajax({
        url:'http://127.0.0.1:8000/Basket' ,
        type: "POST",
        headers:{
            'X-CSRFToken': csrfToken
        },
        data: {
            'count_plus': JSON.stringify(obj),
        },
        success: function (data) {
           console.log('OK');
        },
        error: function (data) {

        },
        dataType: "json",
        });
      }



  })
})
var cost=document.querySelector('.value')
var counts=document.querySelectorAll('.counter')
var prices=document.querySelectorAll('.price')
var sum=0;
window.onload=function(){
    for(let i=0;i<counts.length;i++){
        sum=sum+parseInt(counts[i].textContent)* parseInt(prices[i].textContent);
    }
    cost.textContent=sum+' руб.';
    if(sum!=0){
        document.querySelector('.buy').style.display="block";
    }
    if(sum==0){
        document.querySelector('.buy').style.display="none";
    }
}
var clearbtn=document.querySelector('.clear')
clearbtn.addEventListener('click',clear);
function clear(){
     //localStorage.clear();
    delete_cookie("event");
     delete_cookie("repeats");
     delete_cookie("basket");
     delete_cookie("cost");
     delete_cookie("items");
    $('.order').hide();
    document.querySelector('.value').textContent='0 руб.';
    document.querySelector('.buy').style.display='none';
}
function bake_cookie(name, value) {
  var cookie = [name, '=', JSON.stringify(value), '; domain=.', window.location.host.toString(), '; path=/;','max-age=259200;'].join('');
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
