var SITE=window.SITE||{};var MODE=window.__MODE||'file';
var HREF={"home": "index.html", "about": "about.html", "services": "services.html", "pricing": "pricing.html", "contact": "contact.html"};
var ICONS={"car": "<svg viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"1.8\"><path d=\"M5 13l1.5-4.5A2 2 0 018.4 7h7.2a2 2 0 011.9 1.3L19 13\"/><path d=\"M3 13h18v4H3z\"/><circle cx=\"7\" cy=\"17.5\" r=\"1.3\"/><circle cx=\"17\" cy=\"17.5\" r=\"1.3\"/></svg>", "seat": "<svg viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"1.8\"><path d=\"M6 19v-7a3 3 0 013-3h2a3 3 0 013 3v1h2a2 2 0 012 2v4\"/><path d=\"M6 19H4M18 19h2\"/></svg>", "drop": "<svg viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"1.8\"><path d=\"M12 3s6 6.5 6 11a6 6 0 01-12 0c0-4.5 6-11 6-11z\"/></svg>", "spark": "<svg viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"1.8\"><path d=\"M12 3l1.8 4.6L18 9.4l-4.2 1.8L12 16l-1.8-4.8L6 9.4l4.2-1.8z\"/><path d=\"M19 15l.8 2 2 .8-2 .8-.8 2-.8-2-2-.8 2-.8z\"/></svg>", "check": "<svg viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"2.6\"><path d=\"M20 6L9 17l-5-5\"/></svg>", "ccheck": "<svg viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"2\"><circle cx=\"12\" cy=\"12\" r=\"9\"/><path d=\"M8.5 12.5l2.5 2.5 4.5-5\"/></svg>"};

function nav(k){return MODE==='spa'?('data-nav="'+k+'"'):('href="'+HREF[k]+'"');}
function waLink(){var m=encodeURIComponent(SITE.whatsappMsg||'');return 'https://wa.me/'+(SITE.whatsapp||'').replace(/[^0-9]/g,'')+(m?('?text='+m):'');}
function bind(){
  document.querySelectorAll('[data-bind]').forEach(function(el){
    var k=el.getAttribute('data-bind');
    if(k==='phone'){var t=el.querySelector('span:last-child')||el;t.textContent=SITE.phone||'';if(el.tagName==='A')el.href='tel:'+(SITE.phone||'').replace(/[^0-9+]/g,'');}
    else if(k==='email'){var t=el.querySelector('span:last-child')||el;t.textContent=SITE.email||'';if(el.tagName==='A')el.href='mailto:'+(SITE.email||'');}
    else if(k==='address'){el.textContent=SITE.address||'';}
    else if(k==='tagline'){el.textContent=SITE.tagline||'';}
    else if(k==='hoursExt'){el.textContent=SITE.hoursExt||'';}
    else if(k==='hoursInt'){el.textContent=SITE.hoursInt||'';}
    else if(k==='copyright'){el.textContent='© '+(new Date().getFullYear())+' '+(SITE.brand||'')+'. All rights reserved.';}
  });
  document.querySelectorAll('[data-wa]').forEach(function(el){el.href=waLink();el.target='_blank';el.rel='noopener';});
  document.querySelectorAll('[data-social]').forEach(function(el){var k=el.getAttribute('data-social');el.href=(SITE.social&&SITE.social[k])||'#';if(el.href!=='#'){el.target='_blank';el.rel='noopener';}});
}
function renderServices(){
  document.querySelectorAll('[data-render="services"]').forEach(function(c){
    var list=(SITE.services||[]).slice();
    var sl=c.getAttribute('data-slice');if(sl){var a=sl.split(',');list=list.slice(+a[0],+a[1]);}
    var variant=c.getAttribute('data-variant')||'cards';var h='';
    if(variant==='cards'){list.slice(0,3).forEach(function(s,i){
      h+='<div class="icard reveal'+(i?(' d'+i):'')+'"><div class="ic">'+(ICONS[s.icon]||'')+'</div><h3>'+s.name+'</h3><p>'+s.desc+'</p></div>';});
    } else {
      var bg=['bg-suv','bg-foam','bg-classic','bg-rear'];
      list.forEach(function(s,i){
        var feats='<ul class="minichecks">'+s.features.map(function(f){return '<li>'+ICONS.check+f+'</li>';}).join('')+'</ul>';
        h+='<div class="svc-row '+(i%2?'rev':'')+' reveal"><div class="svc-row-media '+bg[i%4]+'"></div>'+
           '<div><div class="top"><span class="ic">'+(ICONS[s.icon]||'')+'</span><h3 class="display">'+s.name+'</h3></div>'+
           '<div class="price">'+s.price+'</div><p>'+s.desc+'</p>'+feats+'<a class="btn btn-outline" '+nav('contact')+'>Book this</a></div></div>';});
    }
    c.innerHTML=h;
  });
}
function renderPackages(){
  document.querySelectorAll('[data-render="packages"]').forEach(function(c){
    var h='';(SITE.packages||[]).forEach(function(p,i){
      var feats=p.features.map(function(f){return '<li>'+ICONS.ccheck+f+'</li>';}).join('');
      h+='<div class="pcard g'+((i%4)+1)+(p.popular?' pop':'')+' reveal'+(i?(' d'+(i>3?3:i)):'')+'">'+
        '<div class="phead"><div class="ptop"><span class="pname">'+p.name+'</span>'+(p.popular?'<span class="badge">Popular</span>':'')+'</div>'+
        '<div class="pprice">'+p.price+'<small>'+(p.cents||'')+'</small></div><div class="per">'+p.per+'</div>'+
        '<p class="pdesc">'+(p.desc||'')+'</p><a class="psub" '+nav('contact')+'>Subscribe</a></div>'+
        '<ul class="pfeat">'+feats+'</ul></div>';});
    c.innerHTML=h;
  });
}
function renderMarquee(){
  document.querySelectorAll('[data-render="marquee"]').forEach(function(c){
    var terms=['Hand Wash','Interior Detailing','Ceramic Coating','Polish & Wax','Unlimited Club','Spotless Shine','Hand Washed'];
    var one=terms.map(function(t){return '<span class="mq-item">'+t+'<span class="dot">\u2726</span></span>';}).join('');
    c.innerHTML=one+one;
  });
}
function renderTestimonials(){
  document.querySelectorAll('[data-render="testimonials"]').forEach(function(c){
    var h='';(SITE.testimonials||[]).forEach(function(t,i){
      h+='<div class="tst-slide'+(i===0?' on':'')+'"><span class="stars">\u2605\u2605\u2605\u2605\u2605</span><p>\u201c'+t.text+'\u201d</p><div class="tst-who"><b>'+t.name+'</b><span>'+t.role+'</span></div></div>';});
    c.innerHTML=h;
  });
}
var reduce=matchMedia('(prefers-reduced-motion: reduce)').matches;
function countUp(el){var t=parseFloat(el.getAttribute('data-count')),d=parseInt(el.getAttribute('data-dec')||'0',10);
  if(reduce){el.textContent=d?t.toFixed(d):t.toLocaleString();return;}var s=null;
  function step(ts){if(!s)s=ts;var p=Math.min((ts-s)/1400,1),e=1-Math.pow(1-p,3),v=t*e;el.textContent=d?v.toFixed(d):Math.round(v).toLocaleString();if(p<1)requestAnimationFrame(step);else el.textContent=d?t.toFixed(d):t.toLocaleString();}requestAnimationFrame(step);}
function bindTst(){var sl=document.querySelectorAll('#tstTrack .tst-slide');if(!sl.length)return;var i=0;
  function sh(n){i=(n+sl.length)%sl.length;sl.forEach(function(s,k){s.classList.toggle('on',k===i);});}
  var pv=document.getElementById('tstPrev'),nx=document.getElementById('tstNext');
  if(pv)pv.onclick=function(){sh(i-1);};if(nx)nx.onclick=function(){sh(i+1);};setInterval(function(){sh(i+1);},6000);}
function bindFaq(){document.querySelectorAll('.faq-q').forEach(function(q){q.addEventListener('click',function(){var it=q.parentElement,a=it.querySelector('.faq-a'),o=it.classList.toggle('open');a.style.maxHeight=o?a.scrollHeight+'px':0;});});}
function bindForm(){var b=document.getElementById('formBtn');if(!b)return;b.addEventListener('click',function(){var n=document.getElementById('f-name');if(!n.value.trim()){n.focus();return;}document.getElementById('formOk').style.display='block';b.textContent='Request sent \u2713';document.getElementById('formOk').scrollIntoView({behavior:'smooth',block:'center'});});}
function makeBubbles(){var bc=document.getElementById('bubbles');if(!bc||reduce||bc.childElementCount)return;for(var i=0;i<16;i++){var b=document.createElement('span');b.className='bubble';var s=6+Math.random()*26;b.style.width=b.style.height=s+'px';b.style.borderRadius='50%';b.style.left=(Math.random()*100)+'%';b.style.animationDuration=(7+Math.random()*9)+'s';b.style.animationDelay=(Math.random()*9)+'s';bc.appendChild(b);}}
var nav_=document.getElementById('nav');
function onScroll(){nav_.classList.toggle('scrolled',window.scrollY>14);}
window.addEventListener('scroll',onScroll,{passive:true});
function renderAll(){renderMarquee();renderServices();renderPackages();renderTestimonials();bind();}

renderAll();onScroll();
var ham=document.getElementById('hamburger');if(ham)ham.addEventListener('click',function(){nav_.classList.toggle('menu-open');});
var io=('IntersectionObserver'in window)?new IntersectionObserver(function(en){en.forEach(function(x){if(x.isIntersecting){x.target.classList.add('in');io.unobserve(x.target);}});},{threshold:.12}):null;
document.querySelectorAll('.reveal').forEach(function(r){io?io.observe(r):r.classList.add('in');});
var io2=('IntersectionObserver'in window)?new IntersectionObserver(function(en){en.forEach(function(x){if(x.isIntersecting){countUp(x.target);io2.unobserve(x.target);}});},{threshold:.6}):null;
document.querySelectorAll('[data-count]').forEach(function(n){io2?io2.observe(n):countUp(n);});
bindTst();bindFaq();bindForm();makeBubbles();
