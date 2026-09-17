"use strict";
const $ = (selector) => document.querySelector(selector);
const escapeHtml = (value = "") => String(value).replace(/[&<>'"]/g, c => ({"&":"&amp;","<":"&lt;",">":"&gt;","'":"&#39;",'"':"&quot;"}[c]));
function renderSection(section){
  const classes=["card",section.wide?"wide":"",section.variant||"",section.editable?"editable":""].filter(Boolean).join(" ");
  const paragraphs=(section.paragraphs||[]).map(p=>`<p>${escapeHtml(p)}</p>`).join("");
  const items=(section.items||[]).length?`<ul>${section.items.map(x=>`<li>${escapeHtml(x)}</li>`).join("")}</ul>`:"";
  const secondary=(section.secondaryItems||[]).length?`<h4>${escapeHtml(section.subheading||"")}</h4><ul>${section.secondaryItems.map(x=>`<li>${escapeHtml(x)}</li>`).join("")}</ul>`:"";
  const subheading=section.subheading&&!section.secondaryItems?`<h4>${escapeHtml(section.subheading)}</h4>`:"";
  const after=section.after?`<p>${escapeHtml(section.after)}</p>`:"";
  return `<article class="${classes}"><h3>${escapeHtml(section.title)}</h3>${paragraphs}${subheading}${items}${secondary}${after}</article>`;
}
function renderTab(data,index,focus=false){
  const tab=data.tabs[index];
  document.querySelectorAll(".tab-button").forEach((b,i)=>{b.setAttribute("aria-selected",String(i===index));b.tabIndex=i===index?0:-1});
  $("#content").innerHTML=`<section id="panel-${escapeHtml(tab.id)}" role="tabpanel" aria-labelledby="tab-${escapeHtml(tab.id)}"><header class="page-title"><h2>${escapeHtml(tab.title)}</h2><p>${escapeHtml(tab.intro)}</p></header><div class="card-grid">${tab.sections.map(renderSection).join("")}</div></section>`;
  history.replaceState(null,"",`#${tab.id}`);
  if(focus) $("#main-content").focus();
}
async function init(){
  try{
    const response=await fetch("data/content.json");
    if(!response.ok) throw new Error(`HTTP ${response.status}`);
    const data=await response.json();
    document.title=`${data.site.title} – Erfahrungen und Workshop`;
    $("#hero-title").textContent=data.site.title; $("#hero-kicker").textContent=data.site.kicker; $("#hero-subtitle").textContent=data.site.subtitle;
    $("#topbar-text").innerHTML=data.site.topbar.map(escapeHtml).join("<br>");
    $("#footer").innerHTML=data.site.footer.map(x=>`<p>${escapeHtml(x)}</p>`).join("");
    data.tabs.forEach((tab,index)=>{const button=document.createElement("button");button.className="tab-button";button.id=`tab-${tab.id}`;button.type="button";button.role="tab";button.textContent=tab.label;button.addEventListener("click",()=>renderTab(data,index,true));button.addEventListener("keydown",e=>{if(!["ArrowLeft","ArrowRight"].includes(e.key))return;e.preventDefault();const next=(index+(e.key==="ArrowRight"?1:-1)+data.tabs.length)%data.tabs.length;document.querySelectorAll(".tab-button")[next].focus();renderTab(data,next);});$("#tabs").appendChild(button)});
    const hash=location.hash.slice(1);const start=Math.max(0,data.tabs.findIndex(t=>t.id===hash));renderTab(data,start);
  }catch(error){$("#content").innerHTML=`<p class="error"><strong>Inhalte konnten nicht geladen werden.</strong><br>Starte die Website über einen lokalen Webserver, zum Beispiel mit <code>python3 -m http.server</code>, und öffne anschließend <code>http://localhost:8000</code>.</p>`;console.error(error)}
}
init();