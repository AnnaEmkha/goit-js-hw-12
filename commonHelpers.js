import{a as f,S as h,i}from"./assets/vendor-b11e2a50.js";(function(){const o=document.createElement("link").relList;if(o&&o.supports&&o.supports("modulepreload"))return;for(const e of document.querySelectorAll('link[rel="modulepreload"]'))s(e);new MutationObserver(e=>{for(const n of e)if(n.type==="childList")for(const a of n.addedNodes)a.tagName==="LINK"&&a.rel==="modulepreload"&&s(a)}).observe(document,{childList:!0,subtree:!0});function r(e){const n={};return e.integrity&&(n.integrity=e.integrity),e.referrerPolicy&&(n.referrerPolicy=e.referrerPolicy),e.crossOrigin==="use-credentials"?n.credentials="include":e.crossOrigin==="anonymous"?n.credentials="omit":n.credentials="same-origin",n}function s(e){if(e.ep)return;e.ep=!0;const n=r(e);fetch(e.href,n)}})();const g="44094007-67477d06fc63ea0136e02e71a",L="https://pixabay.com/api/";async function c(t,o){try{return(await f.get(L,{params:{key:g,q:t,image_type:"photo",orientation:"horizontal",safesearch:!0,page:o,per_page:"15"}})).data}catch(r){throw console.error("Error fetching images:",r),r}}function S(t){const o=document.querySelector(".galleriesBox"),r=t.map(e=>`
      <a class="gallery-item" href="${e.largeImageURL}">
        <img class="gallery-image" src="${e.webformatURL}" alt="${e.tags}" />
        <div class="info">
          <p class="info-item"><span>Likes:</span> ${e.likes}</p>
          <p class="info-item"><span>Views:</span> ${e.views}</p>
          <p class="info-item"><span>Comments:</span> ${e.comments}</p>
          <p class="info-item"><span>Downloads:</span> ${e.downloads}</p>
        </div>
      </a>`).join("");o.innerHTML=r,new h(".gallery-item").refresh()}function q(){const t=document.querySelector(".galleriesBox");t.innerHTML=""}const b=document.querySelector(".search-form"),w=document.querySelector(".search-data"),B=document.querySelector(".galleriesBox");let l=1;const u=15;let d="";b.addEventListener("submit",v);function v(t){t.preventDefault();const o=w.value.trim();if(!o){i.error({title:"Error",message:"Please, enter a search query"});return}q(),l=1,d=o,E(),c(o).then(r=>{r.hits.length===0?i.error({position:"topRight",message:"Sorry, there are no images matching your search query. Please try again."}):(S(r.hits),r.hits.length<u?y():P(),m())}).catch(r=>{i.error({position:"topRight",message:"Error"})}).finally(()=>{p()})}function E(){document.querySelector(".loader").style.display="block"}function p(){document.querySelector(".loader").style.display="none"}function m(){const t=document.querySelector(".gallery-item").getBoundingClientRect().height;window.scrollBy({top:t*2,behavior:"smooth"})}document.querySelector(".galleryBtn").addEventListener("click",()=>{x()});function P(){document.querySelector(".galleryBtn").style.display==="none"&&(document.querySelector(".galleryBtn").style.display="block")}function y(){document.querySelector(".galleryBtn").style.display="none"}function R(t){const o=document.createDocumentFragment();t.forEach(r=>{const s=document.createElement("img");s.src=r.webformatURL,s.alt=r.tags,o.appendChild(s)}),B.appendChild(o)}function x(){c(d,l).then(t=>{t.hits.length===0||l>=t.totalHits/u?(y(),i.error({position:"topRight",message:"We're sorry, but you've reached the end of search results."})):(R(t.hits),l++,m())}).catch(t=>{i.error({position:"topRight",message:"Error"})}).finally(()=>{p()})}
//# sourceMappingURL=commonHelpers.js.map