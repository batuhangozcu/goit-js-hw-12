import{a as g,i as p,S as y}from"./assets/vendor-BbkJ2wRy.js";(function(){const s=document.createElement("link").relList;if(s&&s.supports&&s.supports("modulepreload"))return;for(const e of document.querySelectorAll('link[rel="modulepreload"]'))t(e);new MutationObserver(e=>{for(const a of e)if(a.type==="childList")for(const o of a.addedNodes)o.tagName==="LINK"&&o.rel==="modulepreload"&&t(o)}).observe(document,{childList:!0,subtree:!0});function d(e){const a={};return e.integrity&&(a.integrity=e.integrity),e.referrerPolicy&&(a.referrerPolicy=e.referrerPolicy),e.crossOrigin==="use-credentials"?a.credentials="include":e.crossOrigin==="anonymous"?a.credentials="omit":a.credentials="same-origin",a}function t(e){if(e.ep)return;e.ep=!0;const a=d(e);fetch(e.href,a)}})();window.global||(window.global=window);const h=document.querySelector(".searchBar"),L=document.getElementById("input"),c=document.querySelector(".lists"),n=document.getElementById("loadMore"),u=document.querySelector(".loaderDiv"),l=new URLSearchParams({key:"48294638-370103394c700755fbc6c4620",image_type:"photo",orientation:"horizontal",safesearch:"true",per_page:"40"});let i=1;n.style.display="none";h.addEventListener("submit",async r=>{u.innerHTML='<span class="loader"></span>',c.innerHTML="",r.preventDefault(),l.set("q",L.value);try{const s=await m();f(s)}catch(s){alert(s)}});async function m(){return(await g.get(`https://pixabay.com/api/?${l}`)).data}function f(r){r.total==0&&p.error({position:"topRight",message:"Sorry, there are no images matching your search query. Please try again!"});const s=r.hits.map(t=>`<li class="list">
       <div class="cards">
       <a class="link" href= "${t.largeImageURL}">
       <img
        class="image"
        src="${t.webformatURL}"
        data-source="${t.largeImageURL}"
        alt="${t.tags}"
      />
       </a>
       <div class="info">
       <p>Likes <span>${t.likes}</span></p>
       <p>Views <span>${t.views}</span></p>
       <p>Comments <span>${t.comments}</span></p>
       <p>Downloads <span>${t.downloads}</span></p>
       </div>
       </div>
       </li>`).join("");u.innerHTML="",c.insertAdjacentHTML("beforeend",s),r.total!==0&&(n.style.display="flex"),c.addEventListener("click",t=>{t.preventDefault(),t.target.tagName}),new y(".cards a",{captionsData:"alt",captionDelay:250}).refresh()}n.addEventListener("click",async()=>{try{i+=1,l.set("page",i);const r=await m();f(r),r.totalHits<i*40&&(n.style.display="none",p.info({position:"topRight",message:"We're sorry, but you've reached the end of search results."}));const s=document.querySelector(".cards").getBoundingClientRect();window.scrollBy({behavior:"smooth",top:s.height*3})}catch(r){alert(r)}});
//# sourceMappingURL=index.js.map
