const CATS=[
  {id:"grp_reman",name:"Reman",color:"#3A6EA5",domaines:[
    {name:"Sites / apps REMAN",items:["Full Service","App Full Service","Reman Expert"]},
    {name:"E-commerce B2C",items:["Maloc EAD"]}
  ]},
  {id:"grp_poids_lourds",name:"Poids Lourds",color:"#E67E22",domaines:[
    {name:"Catalogues / Portails",items:["Connexion Client NF PL","Connexion Client DPAN","Connexion client adfortia"]},
    {name:"E-commerce B2B",items:["Truckissimo"]},
    {name:"Catalogues PL",items:["Ntrucks Parts"]},
    {name:"Applications internes",items:["PIM"]}
  ]},
  {id:"grp_vl",name:"VL",color:"#2C3E50",domaines:[
    {name:"Portail / Vitrine",items:["Connexion Client NF VL"]},
    {name:"E-commerce B2B",items:["Autossimo"]},
    {name:"Fidélité / Marketing",items:["My Pièce Auto"]}
  ]},
  {id:"grp_equipement",name:"Équipement",color:"#27AE60",domaines:[
    {name:"Portail B2B",items:["Connexion Client NTech"]},
    {name:"Vitrine",items:["Site Web NTech"]}
  ]},
  {id:"grp_nfs",name:"NFS (divers)",color:"#8E44AD",domaines:[
    {name:"ERP & Finance",items:["ERP Sage","ERP Formule 1","ReadSoft","Eloficash","Report One"]},
    {name:"Logistique / Production",items:["Modula WMS","GESTACT","Telia","CARL"]},
    {name:"Catalogues & Échanges",items:["Tecdoc","Golda"]},
    {name:"Sites vitrines",items:["Site Web Niort Frères","Site Web ADFortia","Site Web Mecatrans","Site Web TMM","groupeniort.fr","Niort Exploration"]},
    {name:"Apps internes",items:["Alonso","Atoosync","Oasis","Facturéo","HR Maps","Octime"]}
  ]},
  {id:"grp_externe",name:"Externe",color:"#7F8C8D",domaines:[]},
  {id:"grp_schemas",name:"Schémas de flux",color:"#1D9E75",type:"schema",domaines:[]}
];

let SCHEMAS=[];

// Canvas state (single shared instance — only one schema cat)
const SC={
  catId:'grp_schemas',
  mode:'select',
  schemaId:null,
  tx:0,ty:0,scale:1,
  arrowSrc:null,
  arrowPreview:null,
  isPanning:false,
  panStart:null,
  panMoved:false,
  selected:null,
  dragNodeId:null,
  dragOffset:{x:0,y:0},
  dragSvgEl:null,
  dragStartPos:null,
  hasDragged:false,
  snap:false,
  autoFitted:false   // évite de re-fitter après que l'utilisateur ait navigué
};
// Historique undo/redo par schéma (non persisté)
const HISTORY={};

const NODE_W=160, NODE_H=42;

const ITEMS={
  "Full Service":{cat:"Reman",gestion:"N Digital",dev:"WordPress",hebergement:"N Digital",tech:"WordPress",techColor:"#3A6EA5",desc:"Application de vente pour professionnels avec suivi factures / BL et commandes.",lien:"https://fullservice-reman.fr"},
  "App Full Service":{cat:"Reman",gestion:"EVVI",dev:"Symfony (PHP)",hebergement:"Aquaray",tech:"Symfony",techColor:"#6c757d",desc:"Application de suivi de réparation de filtre à particules.",lien:"https://app.fullservice-reman.fr/connexion"},
  "Reman Expert":{cat:"Reman",gestion:"Octevia (Julien de Sablet)",dev:"WordPress / WooCommerce",hebergement:"Webaxys",tech:"WordPress",techColor:"#3A6EA5",desc:"Site regroupant l'ensemble des applications Reman.",lien:"https://reman-expert.fr"},
  "Maloc EAD":{cat:"Reman",gestion:"EVVI",dev:"WordPress / WooCommerce",hebergement:"Webaxys",tech:"WordPress",techColor:"#3A6EA5",desc:"Site de location d'EAD pour particuliers, avec gestion d'installations.",lien:"https://maloc-ead.fr",docs:"https://docs.n-digital.fr/docs/category/maloc-ead"},
  "Connexion Client NF PL":{cat:"Poids Lourds",gestion:"InConcept",dev:"AS400",hebergement:"Groupe Niort (Rouen)",tech:"AS400",techColor:"#8E44AD",desc:"Catalogue en ligne des pièces poids lourd avec prix et descriptions produits.",lien:"https://webpl.niortfreres.fr"},
  "Connexion Client DPAN":{cat:"Poids Lourds",gestion:"InConcept",dev:"AS400",hebergement:"Groupe Niort (Rouen)",tech:"AS400",techColor:"#8E44AD",desc:"Catalogue en ligne des pièces poids lourd, achat de pièces, liste des prix et descriptions.",lien:"https://webdpan.dpan.fr"},
  "Connexion client adfortia":{cat:"Poids Lourds",gestion:"InConcept",dev:"AS400",hebergement:"Groupe Niort (Rouen)",tech:"AS400",techColor:"#8E44AD",desc:"Catalogue en ligne des pièces poids lourd, achat de pièces, liste des prix et descriptions.",lien:"https://webadfortia.adfortia.fr"},
  "Truckissimo":{cat:"Poids Lourds",gestion:"Autodistribution",dev:"From scratch",hebergement:"Autodistribution",tech:"Web",techColor:"#555",desc:"Application de vente en ligne de pièces poids lourd avec liste de prix et descriptions.",lien:"https://www3.truckissimo.fr"},
  "Ntrucks Parts":{cat:"Poids Lourds",gestion:"EVVI",dev:"Directus",hebergement:"Webaxys",tech:"Directus",techColor:"#27AE60",desc:"Catalogue en ligne des pièces poids lourd pour Ntrucks.",lien:"https://ntrucks-parts.fr"},
  "PIM":{cat:"Poids Lourds",gestion:"NDigital",dev:"NDigital",hebergement:"OVH",tech:"PHP",techColor:"#7952b3",desc:"Product Information Manager (PIM).",lien:"https://pim.4bus.fr"},
  "Connexion Client NF VL":{cat:"VL",gestion:"InConcept",dev:"WordPress / Elementor",hebergement:"Webaxys",tech:"WordPress",techColor:"#3A6EA5",desc:"Site vitrine Niort Frères avec présentation activités et formulaires de contact.",lien:"https://webnf.niortfreres.fr"},
  "Autossimo":{cat:"VL",gestion:"Autodistribution",dev:"From scratch",hebergement:"Autodistribution",tech:"Web",techColor:"#555",desc:"Site de vente pour professionnels géré par Autodistribution.",lien:"https://www3.autossimo.com"},
  "My Pièce Auto":{cat:"VL",gestion:"Autodistribution",dev:"From scratch",hebergement:"Autodistribution",tech:"Web",techColor:"#555",desc:"Programme fidélité et portail associé.",lien:"https://autodistribution.fr/carte-my-pieceauto"},
  "Connexion Client NTech":{cat:"Équipement",gestion:"InConcept",dev:"AS400",hebergement:"Groupe Niort (Rouen)",tech:"AS400",techColor:"#8E44AD",desc:"Site de vente pour professionnels NTech avec accès factures, BL et commandes.",lien:"https://webcli.ntech-equipement.fr"},
  "Site Web NTech":{cat:"Équipement",gestion:"EVVI",dev:"WordPress / Elementor",hebergement:"Webaxys",tech:"WordPress",techColor:"#3A6EA5",desc:"Site vitrine de présentation des activités NTech avec formulaires de contact.",lien:"https://ntech-equipement.fr"},
  "ERP Sage":{cat:"NFS (divers)",gestion:"Absys Ciborg / Interne",dev:"Éditeur",hebergement:"Lons",tech:"Sage",techColor:"#E67E22",desc:"ERP finance et gestion, interfacé avec Golda, Tecdoc, ReadSoft…"},
  "ERP Formule 1":{cat:"NFS (divers)",gestion:"Interne",dev:"Éditeur",hebergement:"Interne",tech:"Formule 1",techColor:"#E67E22",desc:"ERP métier pour gestion commerciale et logistique."},
  "ReadSoft":{cat:"NFS (divers)",gestion:"Absys Ciborg / Interne",dev:"Éditeur",hebergement:"N0SRVAP08",tech:"Web",techColor:"#555",desc:"Gestion des factures fournisseurs et workflow de validation."},
  "Eloficash":{cat:"NFS (divers)",gestion:"Interne",dev:"Éditeur",hebergement:"N0SRVAP0X",tech:"Web",techColor:"#555",desc:"Outil de relance paiement client."},
  "Report One":{cat:"NFS (divers)",gestion:"Tommas Servis Informatique",dev:"Éditeur",hebergement:"Interne",tech:"Client lourd / Web",techColor:"#888",desc:"Reporting et décisionnel connecté aux ERP."},
  "Modula WMS":{cat:"NFS (divers)",gestion:"Interne",dev:"Éditeur",hebergement:"SRVWMS",tech:"Client lourd",techColor:"#888",desc:"Gestion des stocks via armoires Modula, accès opérateur et superviseur."},
  "GESTACT":{cat:"NFS (divers)",gestion:"Interne",dev:"Éditeur",hebergement:"LOSRVBD01",tech:"Client lourd",techColor:"#888",desc:"Suivi de la vieille matière, postes de production et stocks."},
  "Telia":{cat:"NFS (divers)",gestion:"Interne",dev:"Éditeur",hebergement:"SaaS",tech:"Web / Mobile",techColor:"#555",desc:"Gestion des livraisons clients, interface web superviseurs et app chauffeur."},
  "CARL":{cat:"NFS (divers)",gestion:"Interne",dev:"Éditeur",hebergement:"SaaS",tech:"Web / Mobile",techColor:"#555",desc:"GMAO pour la maintenance des équipements."},
  "Tecdoc":{cat:"NFS (divers)",gestion:"Tec Alliance",dev:"Éditeur",hebergement:"Externe",tech:"Portail web",techColor:"#555",desc:"Catalogue des articles de tous les équipementiers dans le monde."},
  "Golda":{cat:"NFS (divers)",gestion:"Interne / Éditeur",dev:"Éditeur",hebergement:"Externe",tech:"Portail web",techColor:"#555",desc:"Échange de données inter-entreprises avec les ERP."},
  "Site Web Niort Frères":{cat:"NFS (divers)",gestion:"EVVI",dev:"WordPress / Elementor",hebergement:"Webaxys",tech:"WordPress",techColor:"#3A6EA5",desc:"Site vitrine Niort Frères avec présentation activités et formulaires de contact.",lien:"https://www.niortfreres.fr"},
  "Site Web ADFortia":{cat:"NFS (divers)",gestion:"EVVI",dev:"WordPress / Elementor",hebergement:"Webaxys",tech:"WordPress",techColor:"#3A6EA5",desc:"Site vitrine ADFortia avec présentation des prestations.",lien:"https://adfortia.fr"},
  "Site Web Mecatrans":{cat:"NFS (divers)",gestion:"EVVI",dev:"WordPress",hebergement:"Webaxys",tech:"WordPress",techColor:"#3A6EA5",desc:"Site vitrine pour MECATRANS.",lien:"https://mecatrans.eu"},
  "Site Web TMM":{cat:"NFS (divers)",gestion:"EVVI",dev:"WordPress / WooCommerce",hebergement:"Webaxys",tech:"WordPress",techColor:"#3A6EA5",desc:"Site vitrine pour Turbos Moteurs Migné.",lien:"https://turbos-moteurs-migne.com"},
  "groupeniort.fr":{cat:"NFS (divers)",gestion:"NDigital",dev:"WordPress / Elementor",hebergement:"OVH",tech:"WordPress",techColor:"#3A6EA5",desc:"Site WordPress pour les offres d'emploi du Groupe Niort.",lien:"https://groupeniort.fr/carrieres"},
  "Niort Exploration":{cat:"NFS (divers)",gestion:"EVVI",dev:"WordPress / Elementor",hebergement:"Webaxys",tech:"WordPress",techColor:"#3A6EA5",desc:"Site vitrine pour la collaboration Mathieu Tordeur x Groupe Niort.",lien:"https://niort-exploration.fr"},
  "Alonso":{cat:"NFS (divers)",gestion:"NDigital / EVVI",dev:"Web",hebergement:"Groupe Niort (N0SRVAPDEK)",tech:"Web",techColor:"#555",desc:"Application reliée aux armoires Modula avec mises à jour régulières."},
  "Atoosync":{cat:"NFS (divers)",gestion:"Carooline / Atoonext",dev:"Logiciel",hebergement:"Groupe Niort",tech:"Logiciel",techColor:"#888",desc:"Logiciel de synchronisation Sage ↔ Oasis."},
  "Oasis":{cat:"NFS (divers)",gestion:"Oasis Projet",dev:"Windev",hebergement:"Local",tech:"Windev",techColor:"#888",desc:"Application interne de suivi qualité FAP."},
  "Facturéo":{cat:"NFS (divers)",gestion:"NDigital / EVVI",dev:"Web",hebergement:"Groupe Niort",tech:"Web",techColor:"#555",desc:"Application de consultation des factures pour les clients du Groupe Niort.",lien:"https://factureo.gpnsi.local:3000/"},
  "HR Maps":{cat:"NFS (divers)",gestion:"Ressources Humaines",dev:"Inconnu",hebergement:"HRMAPS",tech:"Web",techColor:"#555",desc:"Application de gestion de données pour les employés (fiches de paie, actualités…)"},
  "Octime":{cat:"NFS (divers)",gestion:"RH / Oasis Projet",dev:"Web",hebergement:"Octime (SaaS)",tech:"Web",techColor:"#555",desc:"Application de gestion des horaires et congés pour employés et managers.",lien:"https://saas-niortfreres.octime.net/wd240awp/wd240awp.exe/connect/weoctime100?ini=niortfreres"}
};

// Documentation par défaut — appliquée après chargement du localStorage si absent
const DEFAULT_DOCS={
  "Maloc EAD":"https://docs.n-digital.fr/docs/category/maloc-ead"
};

// Relations entre éléments : [source, cible, label optionnel]
const LINKS=[
  ["ERP Sage","Golda","échange de données"],
  ["ERP Sage","Tecdoc","catalogue articles"],
  ["ERP Sage","ReadSoft","workflow factures"],
  ["ERP Sage","Eloficash","relance paiements"],
  ["ERP Sage","Report One","reporting"],
  ["ERP Sage","Atoosync","synchronisation"],
  ["Atoosync","ERP Sage","synchronisation"],
  ["Atoosync","Oasis","synchronisation"],
  ["Oasis","Atoosync","synchronisation"],
  ["Alonso","Modula WMS","relié aux armoires"],
  ["Modula WMS","Alonso","relié aux armoires"],
  ["Golda","ERP Sage","échange de données"],
  ["Golda","ERP Formule 1","échange de données"],
  ["Report One","ERP Sage","connecté"],
  ["Report One","ERP Formule 1","connecté"],
  ["Truckissimo","Autossimo","même opérateur (Autodistribution)"],
  ["Autossimo","Truckissimo","même opérateur (Autodistribution)"],
  ["Autossimo","My Pièce Auto","même opérateur"],
  ["My Pièce Auto","Autossimo","même opérateur"],
  ["Full Service","App Full Service","application associée"],
  ["App Full Service","Full Service","site principal"],
  ["Reman Expert","Full Service","regroupé"],
  ["Reman Expert","App Full Service","regroupé"],
  ["Reman Expert","Maloc EAD","regroupé"],
  ["Connexion Client NF PL","Connexion Client DPAN","même infra AS400"],
  ["Connexion Client NF PL","Connexion client adfortia","même infra AS400"],
  ["Connexion Client DPAN","Connexion Client NF PL","même infra AS400"],
  ["Connexion Client DPAN","Connexion client adfortia","même infra AS400"],
  ["Connexion client adfortia","Connexion Client NF PL","même infra AS400"],
  ["Connexion client adfortia","Connexion Client DPAN","même infra AS400"],
  ["Connexion Client NTech","Connexion Client NF PL","même infra AS400"],
  ["HR Maps","Octime","accessible via Octime"],
  ["Octime","HR Maps","donne accès à HR Maps"],
  ["PIM","Ntrucks Parts","alimente le catalogue"],
  ["groupeniort.fr","Site Web Niort Frères","même groupe"],
  ["groupeniort.fr","Site Web ADFortia","même groupe"],
];

const LINKS_BY={};
LINKS.forEach(([src,dst,label])=>{
  if(!LINKS_BY[src])LINKS_BY[src]=[];
  LINKS_BY[src].push({target:dst,label:label||''});
});

const catById={};
CATS.forEach(c=>{catById[c.id]=c});

let activeFilter=null;
let editMode=false;

function hex2rgba(hex,a){
  const r=parseInt(hex.slice(1,3),16),g=parseInt(hex.slice(3,5),16),b=parseInt(hex.slice(5,7),16);
  return `rgba(${r},${g},${b},${a})`;
}

function buildStats(){
  const total=Object.keys(ITEMS).length;
  const techs=new Set(Object.values(ITEMS).map(d=>d.tech));
  const hosts=new Set(Object.values(ITEMS).map(d=>d.hebergement));
  const regularCats=CATS.filter(c=>!c.type);
  document.getElementById('stats').innerHTML=`
    <div class="stat"><strong>${total}</strong>entrées recensées</div>
    <div class="stat"><strong>${regularCats.length}</strong>catégories</div>
    <div class="stat"><strong>${techs.size}</strong>technologies distinctes</div>
    <div class="stat"><strong>${hosts.size}</strong>hébergements distincts</div>`;
}

function buildLegend(){
  const leg=document.getElementById('legend');
  leg.innerHTML='';
  CATS.filter(c=>!c.type).forEach(cat=>{
    const el=document.createElement('span');
    el.className='leg';
    el.style.color=cat.color;
    el.innerHTML=`<span class="leg-dot" style="background:${cat.color}"></span>${cat.name}`;
    el.onclick=()=>toggleFilter(cat.id,el);
    leg.appendChild(el);
  });
}

function toggleFilter(id,el){
  if(activeFilter===id){
    activeFilter=null;
    document.querySelectorAll('.leg').forEach(l=>l.classList.remove('active'));
    document.querySelectorAll('.cat-section').forEach(s=>s.classList.remove('hidden'));
  } else {
    activeFilter=id;
    document.querySelectorAll('.leg').forEach(l=>l.classList.remove('active'));
    el.classList.add('active');
    document.querySelectorAll('.cat-section').forEach(s=>{
      s.classList.toggle('hidden',s.dataset.cat!==id);
    });
  }
}

function buildCats(){
  const catsEl=document.getElementById('cats');
  catsEl.innerHTML='';
  const slLookup=buildSchemaLinksLookup();
  CATS.forEach(cat=>{
    const sec=document.createElement('div');
    sec.className='cat-section';
    sec.dataset.cat=cat.id;
    if(cat.type) sec.dataset.catType=cat.type;

    const header=document.createElement('div');
    header.className='cat-header';

    if(cat.type==='schema'){
      header.innerHTML=`
        <div class="cat-color-bar" style="background:${cat.color}"></div>
        <div class="cat-info">
          <div class="cat-name">${cat.name}</div>
          <div class="cat-meta">Canvas interactif</div>
        </div>
        <div class="cat-count">${SCHEMAS.length} schéma${SCHEMAS.length!==1?'s':''}</div>
        <div class="cat-toggle">▾</div>`;
    } else {
      const total=cat.domaines.reduce((s,d)=>s+d.items.length,0);
      header.innerHTML=`
        <div class="cat-color-bar" style="background:${cat.color}"></div>
        <div class="cat-info">
          <div class="cat-name">${cat.name}</div>
          <div class="cat-meta">${cat.domaines.length} domaine${cat.domaines.length>1?'s':''}</div>
        </div>
        <div class="cat-count">${total} entrée${total>1?'s':''}</div>
        <div class="cat-toggle">▾</div>`;
    }
    header.onclick=()=>toggleCat(sec,header);
    sec.appendChild(header);

    if(cat.type==='schema'){
      buildSchemaSection(cat,sec);
    } else {
      const body=document.createElement('div');
      body.className='cat-body';
      cat.domaines.forEach(dom=>{
        const col=document.createElement('div');
        col.className='domain';
        const domTitle=document.createElement('div');
        domTitle.className='dom-title';
        domTitle.textContent=dom.name;
        col.appendChild(domTitle);
        const itemsEl=document.createElement('div');
        itemsEl.className='items';
        dom.items.forEach(name=>{
          const d=ITEMS[name];
          const item=document.createElement('div');
          item.className='item';
          item.dataset.name=name.toLowerCase();
          item.dataset.tech=(d?.tech||'').toLowerCase();
          item.innerHTML=`
            <span class="item-dot" style="background:${cat.color}"></span>
            <span class="item-name" title="${name}">${name}</span>
            ${(slLookup[name]?.length)?`<span class="item-links-badge">${slLookup[name].length}</span>`:''}
            ${d?.docs?`<a class="item-docs-btn" href="${d.docs}" target="_blank" rel="noopener" onclick="event.stopPropagation()" title="Voir la documentation">Docs</a>`:''}
            <span class="item-tech" style="background:${hex2rgba(d?.techColor||'#888',.12)};color:${d?.techColor||'#888'}">${d?.tech||''}</span>`;
          item.onclick=()=>{ if(editMode) openEditForm(name); else openItem(name,cat.color) };
          itemsEl.appendChild(item);
        });
        col.appendChild(itemsEl);
        body.appendChild(col);
      });
      sec.appendChild(body);
    }
    catsEl.appendChild(sec);
  });
}

function toggleCat(sec,header){
  const body=sec.querySelector('.cat-body');
  const tog=header.querySelector('.cat-toggle');
  const collapsed=body.classList.toggle('collapsed');
  tog.style.transform=collapsed?'rotate(-90deg)':'';
}

function getCatColorForItem(name){
  for(const cat of CATS){
    if(!cat.domaines) continue;
    for(const dom of cat.domaines){
      if(dom.items.includes(name))return cat.color;
    }
  }
  return '#888';
}

function openItem(name,catColor){
  const d=ITEMS[name];
  if(!d)return;
  document.getElementById('m-bar').style.background=catColor||'#888';
  document.getElementById('m-title').textContent=name;
  document.getElementById('m-cat').textContent=d.cat||'';
  let html='';
  if(d.desc) html+=field('Description',d.desc);
  if(d.tech) html+=`<div class="field"><div class="field-label">Technologie</div><span class="tech-badge" style="background:${hex2rgba(d.techColor,.15)};color:${d.techColor}">${d.tech}</span></div>`;
  if(d.gestion) html+=field('Gestion / Interlocuteur',d.gestion);
  if(d.dev) html+=field('Développement',d.dev);
  if(d.hebergement) html+=field('Hébergement',d.hebergement);
  if(d.lien){
    const shortUrl=d.lien.replace(/^https?:\/\//,'').replace(/\/$/,'');
    html+=`<div class="field">
      <div class="field-label">Lien</div>
      <div class="link-preview">
        <div class="link-preview-bar">
          <span class="link-preview-url">${shortUrl}</span>
          <a class="link-open-btn" href="${d.lien}" target="_blank">Ouvrir</a>
        </div>
        <div class="link-iframe-wrap">
          <iframe src="${d.lien}" sandbox="allow-scripts allow-same-origin" loading="lazy" title="${name}"></iframe>
        </div>
      </div>
    </div>`;
  }
  const schLinks=getSchemaLinksForItem(name);
  if(schLinks.length){
    const rhtml=schLinks.map(lk=>{
      const other=lk.other;
      const rc=other.type==='item'?getCatColorForItem(other.name):(other.color||'#888');
      const dirLabel=lk.dir==='from'?'Vers':lk.dir==='to'?'Depuis':'↔';
      const isClickable=other.type==='item';
      const clickAttr=isClickable?`onclick="openItem('${other.name.replace(/'/g,"\\'")}','${rc}')" style="cursor:pointer"`:'';
      return `<div class="related-chip" ${clickAttr}>
        <span class="related-chip-dot" style="background:${rc}"></span>
        <span class="related-chip-name">
          <span class="related-link-dir">${dirLabel}</span>
          ${other.name}
        </span>
        ${lk.label?`<span class="related-chip-label">${lk.label}</span>`:''}
        <span class="related-chip-cat">${lk.schema}</span>
        ${isClickable?'<span class="related-chip-arrow">›</span>':''}
      </div>`;
    }).join('');
    html+=`<div class="field"><div class="field-label">Flux (${schLinks.length} connexion${schLinks.length>1?'s':''})</div><div class="related-list">${rhtml}</div></div>`;
  }
  document.getElementById('m-body').innerHTML=html;
  document.getElementById('overlay').classList.add('open');
}

function field(label,value){
  return `<div class="field"><div class="field-label">${label}</div><div class="field-value">${value}</div></div>`;
}

function closeModal(){document.getElementById('overlay').classList.remove('open')}

document.addEventListener('keydown',e=>{if(e.key==='Escape')closeModal()});

function doSearch(q){
  q=q.toLowerCase().trim();
  document.querySelectorAll('.cat-section').forEach(sec=>{
    if(sec.dataset.catType==='schema'){ sec.style.display=''; return; }
    let anyVisible=false;
    sec.querySelectorAll('.item').forEach(item=>{
      const match=!q||item.dataset.name.includes(q)||item.dataset.tech.includes(q);
      item.style.display=match?'':'none';
      if(match)anyVisible=true;
    });
    sec.style.display=anyVisible?'':'none';
    if(q&&anyVisible){
      const body=sec.querySelector('.cat-body');
      body.classList.remove('collapsed');
      sec.querySelector('.cat-toggle').style.transform='';
    }
  });
}

let lastKnownSavedAt = null;

function saveState(){
  const data = {CATS, ITEMS, LINKS, schemas: SCHEMAS, _savedAt: Date.now()};
  lastKnownSavedAt = data._savedAt;
  return window.StorageAPI.save(data);
}

function applyDocDefaults(){
  Object.entries(DEFAULT_DOCS).forEach(([name,url])=>{
    if(ITEMS[name] && ITEMS[name].docs===undefined) ITEMS[name].docs=url;
  });
}

function rebuildLinksBy(){
  Object.keys(LINKS_BY).forEach(k=>delete LINKS_BY[k]);
  LINKS.forEach(([src,dst,label])=>{
    if(!LINKS_BY[src])LINKS_BY[src]=[];
    LINKS_BY[src].push({target:dst,label:label||''});
  });
}

function pruneEmptyDomains(){
  CATS.forEach(c=>{ if(c.domaines) c.domaines=c.domaines.filter(d=>d.items.length>0); });
}

function ensureSchemasCat(){
  if(!CATS.find(c=>c.id==='grp_schemas')){
    CATS.push({id:"grp_schemas",name:"Schémas de flux",color:"#1D9E75",type:"schema",domaines:[]});
  }
}

function ensureExterneCat(){
  if(!CATS.find(c=>c.id==='grp_externe')){
    // Insérer avant grp_schemas
    const schIdx=CATS.findIndex(c=>c.id==='grp_schemas');
    const entry={id:"grp_externe",name:"Externe",color:"#7F8C8D",domaines:[]};
    if(schIdx>=0) CATS.splice(schIdx,0,entry);
    else CATS.push(entry);
  }
}

function loadState(){
  const state = window.StorageAPI.load();
  if(!state) return false;
  if(state.CATS) { CATS.length=0; state.CATS.forEach(c=>CATS.push(c)); }
  if(state.ITEMS) { Object.keys(ITEMS).forEach(k=>delete ITEMS[k]); Object.assign(ITEMS,state.ITEMS); }
  if(state.LINKS) { LINKS.length=0; state.LINKS.forEach(l=>LINKS.push(l)); }
  if(state.schemas) { SCHEMAS.length=0; state.schemas.forEach(s=>SCHEMAS.push(s)); }
  Object.keys(LINKS_BY).forEach(k=>delete LINKS_BY[k]);
  LINKS.forEach(([src,dst,label])=>{ if(!LINKS_BY[src])LINKS_BY[src]=[]; LINKS_BY[src].push({target:dst,label:label||''}) });
  ensureSchemasCat(); ensureExterneCat();
  applyDocDefaults();
  return true;
}

function exportStateToFile(){ window.StorageAPI.exportFile('groupeniort_map_data.json', {CATS,ITEMS,LINKS,schemas:SCHEMAS}); }

function importStateFromFile(file){
  window.StorageAPI.importFile(file).then(state=>{
    if(state.CATS) { CATS.length=0; state.CATS.forEach(c=>CATS.push(c)); }
    if(state.ITEMS) { Object.keys(ITEMS).forEach(k=>delete ITEMS[k]); Object.assign(ITEMS,state.ITEMS); }
    if(state.LINKS) { LINKS.length=0; state.LINKS.forEach(l=>LINKS.push(l)); }
    if(state.schemas) { SCHEMAS.length=0; state.schemas.forEach(s=>SCHEMAS.push(s)); }
    Object.keys(LINKS_BY).forEach(k=>delete LINKS_BY[k]);
    LINKS.forEach(([src,dst,label])=>{ if(!LINKS_BY[src])LINKS_BY[src]=[]; LINKS_BY[src].push({target:dst,label:label||''}) });
    ensureSchemasCat(); ensureExterneCat();
    applyDocDefaults();
    buildStats(); buildLegend(); buildCats();
  }).catch(()=>alert('JSON invalide'));
}

// Edit/Add UI
function populateCatOptions(){
  const sel=document.getElementById('field-cat');
  sel.innerHTML='';
  CATS.filter(c=>!c.type).forEach(c=>{ const o=document.createElement('option'); o.value=c.id; o.textContent=c.name; sel.appendChild(o)});
}

function populateDomainOptions(catId, selected){
  const dl=document.getElementById('field-domain-list');
  const inp=document.getElementById('field-domain');
  if(!dl||!inp) return;
  dl.innerHTML='';
  const cat=CATS.find(c=>c.id===catId);
  if(!cat) return;
  cat.domaines.forEach(d=>{ const o=document.createElement('option'); o.value=d.name; dl.appendChild(o); });
  inp.value = selected !== undefined ? selected : (cat.domaines[0]?.name || '');
}

function openAddForm(){
  populateCatOptions();
  const catSel=document.getElementById('field-cat');
  populateDomainOptions(catSel.value);
  document.getElementById('original-name').value='';
  document.getElementById('field-name').value='';
  document.getElementById('field-tech').value='';
  document.getElementById('field-techcolor').value='';
  document.getElementById('field-gestion').value='';
  document.getElementById('field-dev').value='';
  document.getElementById('field-hebergement').value='';
  document.getElementById('field-desc').value='';
  document.getElementById('field-lien').value='';
  document.getElementById('field-docs').value='';
  document.getElementById('delete-item').style.display='none';
  document.getElementById('edit-sub').textContent='Nouvel élément';
  document.getElementById('edit-overlay').classList.add('open');
}

function openEditForm(name){
  const d=ITEMS[name];
  if(!d) return;
  populateCatOptions();
  let catId=null, domainName=null;
  for(const c of CATS){
    if(!c.domaines) continue;
    for(const dom of c.domaines){
      if(dom.items.includes(name)){ catId=c.id; domainName=dom.name; break; }
    }
    if(catId) break;
  }
  if(!catId) catId=CATS.find(c=>!c.type)?.id;
  document.getElementById('original-name').value=name;
  document.getElementById('field-name').value=name;
  document.getElementById('field-tech').value=d.tech||'';
  document.getElementById('field-techcolor').value=d.techColor||'';
  document.getElementById('field-gestion').value=d.gestion||'';
  document.getElementById('field-dev').value=d.dev||'';
  document.getElementById('field-hebergement').value=d.hebergement||'';
  document.getElementById('field-desc').value=d.desc||'';
  document.getElementById('field-lien').value=d.lien||'';
  document.getElementById('field-docs').value=d.docs||'';
  document.getElementById('field-cat').value=catId;
  populateDomainOptions(catId, domainName);
  document.getElementById('delete-item').style.display='inline-block';
  document.getElementById('edit-sub').textContent=`Modifier : ${name}`;
  document.getElementById('edit-overlay').classList.add('open');
}

function closeEditForm(){ document.getElementById('edit-overlay').classList.remove('open') }

function submitEditForm(e){
  e.preventDefault();
  const original=document.getElementById('original-name').value;
  const name=document.getElementById('field-name').value.trim();
  if(!name) return alert('Le nom est requis');
  if(name!==original && ITEMS[name]) return alert(`"${name}" existe déjà dans la cartographie.`);
  const catId=document.getElementById('field-cat').value;
  const domainVal=document.getElementById('field-domain').value.trim();
  const catForDomain=CATS.find(c=>c.id===catId);
  const domain=domainVal || catForDomain?.domaines[0]?.name || 'Autres';
  const payload={
    cat: CATS.find(c=>c.id===catId)?.name || '',
    gestion: document.getElementById('field-gestion').value.trim(),
    dev: document.getElementById('field-dev').value.trim(),
    hebergement: document.getElementById('field-hebergement').value.trim(),
    tech: document.getElementById('field-tech').value.trim(),
    techColor: document.getElementById('field-techcolor').value.trim() || '#888',
    desc: document.getElementById('field-desc').value.trim(),
    lien: document.getElementById('field-lien').value.trim(),
    docs: document.getElementById('field-docs').value.trim()
  };
  CATS.forEach(c=>{ if(c.domaines) c.domaines.forEach(d=>{ d.items=d.items.filter(i=>i!==original && i!==name); }) });
  if(original && original!==name){
    delete ITEMS[original];
    LINKS.forEach(link=>{ if(link[0]===original) link[0]=name; if(link[1]===original) link[1]=name; });
  }
  ITEMS[name]=payload;
  const cat=CATS.find(c=>c.id===catId);
  if(cat){
    let dom=cat.domaines.find(d=>d.name===domain);
    if(!dom){ dom={name:domain,items:[]}; cat.domaines.push(dom); }
    dom.items.push(name);
  }
  pruneEmptyDomains();
  rebuildLinksBy();
  saveState();
  buildStats(); buildLegend(); buildCats();
  closeEditForm();
}

function deleteCurrentItem(){
  const original=document.getElementById('original-name').value;
  if(!original) return;
  if(!confirm(`Supprimer "${original}" ?`)) return;
  delete ITEMS[original];
  CATS.forEach(c=>{ if(c.domaines) c.domaines.forEach(d=>{ d.items=d.items.filter(i=>i!==original) }) });
  const remaining=LINKS.filter(([src,dst])=>src!==original && dst!==original);
  LINKS.length=0;
  remaining.forEach(l=>LINKS.push(l));
  pruneEmptyDomains();
  rebuildLinksBy();
  saveState();
  buildStats(); buildLegend(); buildCats();
  closeEditForm();
}

// Wire up form controls
document.getElementById('field-cat').addEventListener('change',e=>populateDomainOptions(e.target.value));
document.getElementById('edit-form').addEventListener('submit',submitEditForm);
document.getElementById('cancel-edit').addEventListener('click',closeEditForm);
document.getElementById('delete-item').addEventListener('click',deleteCurrentItem);

// Mobile menu wiring (burger)
const burgerBtn = document.getElementById('burger-btn');
const mobileMenu = document.getElementById('mobile-menu');
if(burgerBtn && mobileMenu){
  const backdrop = document.getElementById('sidebar-backdrop');
  function isMobile(){ return window.innerWidth <= 880; }
  function openSidebar(){
    mobileMenu.classList.add('open');
    mobileMenu.setAttribute('aria-hidden','false');
    if(backdrop){ backdrop.classList.add('open'); backdrop.setAttribute('aria-hidden','false'); }
    document.body.classList.add('sidebar-open');
  }
  function closeSidebar(){
    mobileMenu.classList.remove('open');
    mobileMenu.setAttribute('aria-hidden','true');
    if(backdrop){ backdrop.classList.remove('open'); backdrop.setAttribute('aria-hidden','true'); }
    document.body.classList.remove('sidebar-open');
  }
  burgerBtn.addEventListener('click',()=>{ if(mobileMenu.classList.contains('open')) closeSidebar(); else openSidebar(); });
  const mAdd = document.getElementById('m-add-btn');
  if(mAdd) mAdd.addEventListener('click',()=>{ openAddForm(); if(isMobile()) closeSidebar(); });
  const mEdit = document.getElementById('m-edit-mode');
  if(mEdit) mEdit.addEventListener('change',e=>{ editMode=e.target.checked; document.getElementById('search').focus(); if(isMobile()) closeSidebar(); });
  const mExport = document.getElementById('m-export-btn');
  if(mExport) mExport.addEventListener('click',()=>{ exportStateToFile(); if(isMobile()) closeSidebar(); });
  const mImportBtn = document.getElementById('m-import-btn');
  const mImportFile = document.getElementById('m-import-file');
  if(mImportBtn && mImportFile){
    mImportBtn.addEventListener('click',()=>{ mImportFile.click(); });
    mImportFile.addEventListener('change',e=>{ if(e.target.files && e.target.files[0]){ importStateFromFile(e.target.files[0]); if(isMobile()) closeSidebar(); } });
  }
  if(backdrop) backdrop.addEventListener('click', closeSidebar);
  const closeBtn = document.getElementById('sidebar-close');
  if(closeBtn) closeBtn.addEventListener('click', closeSidebar);
  document.addEventListener('click', (ev)=>{
    const path = ev.composedPath ? ev.composedPath() : [];
    const clickedInsideSidebar = path.some(el => el instanceof Element && el.matches('.mobile-menu'));
    const clickedBurger = path.some(el => el instanceof Element && el.matches('#burger-btn'));
    const clickedBackdrop = path.some(el => el instanceof Element && el.matches('#sidebar-backdrop'));
    if(!clickedInsideSidebar && !clickedBurger && !clickedBackdrop){ closeSidebar(); }
  });
}

function applyStateData(state){
  if(state.CATS){ CATS.length=0; state.CATS.forEach(c=>CATS.push(c)); }
  if(state.ITEMS){ Object.keys(ITEMS).forEach(k=>delete ITEMS[k]); Object.assign(ITEMS,state.ITEMS); }
  if(state.LINKS){ LINKS.length=0; state.LINKS.forEach(l=>LINKS.push(l)); }
  if(state.schemas){ SCHEMAS.length=0; state.schemas.forEach(s=>SCHEMAS.push(s)); }
  ensureSchemasCat(); ensureExterneCat();
  rebuildLinksBy();
}

async function fetchServerState(){
  const res = await fetch('bdd.json?_=' + Date.now());
  const state = await res.json();
  if(!state || state.test) return null;
  return state;
}

async function pollForUpdates(){
  if(document.getElementById('edit-overlay').classList.contains('open')) return;
  try {
    const state = await fetchServerState();
    if(!state) return;
    if(state._savedAt && state._savedAt !== lastKnownSavedAt){
      lastKnownSavedAt = state._savedAt;
      applyStateData(state);
      applyDocDefaults();
      buildStats(); buildLegend(); buildCats();
    }
  } catch(e){}
}
setInterval(pollForUpdates, 5000);

async function init(){
  try {
    const serverState = await fetchServerState();
    if(serverState){
      lastKnownSavedAt = serverState._savedAt || null;
      applyStateData(serverState);
    } else {
      const hadLocalData = loadState();
      if(hadLocalData) saveState();
    }
  } catch(e){ loadState(); }
  applyDocDefaults();
  buildStats(); buildLegend(); buildCats();
  // Double requestAnimationFrame : garantit que le DOM est peint et que
  // le SVG a ses vraies dimensions avant d'ajuster la vue
  requestAnimationFrame(()=>requestAnimationFrame(()=>{
    const s=getActiveSchema();
    if(s&&s.nodes.length) fitToScreen(SC.catId);
  }));
}
init();

// ═══════════════════════════════════════════════════════
// SCHÉMAS DE FLUX — canvas interactif
// ═══════════════════════════════════════════════════════

function getActiveSchema(){
  return SCHEMAS.find(s=>s.id===SC.schemaId)||null;
}

function buildSchemaSection(cat, sec){
  SC.catId = cat.id;
  const catId = cat.id;

  const body = document.createElement('div');
  body.className = 'cat-body schema-body';

  // Toolbar (sans modes — interactions contextuelles)
  const toolbar = document.createElement('div');
  toolbar.className = 'schema-toolbar';

  function mkBtn(label, cls, handler){
    const b=document.createElement('button');
    b.className='btn '+(cls||''); b.textContent=label;
    b.addEventListener('click',handler); return b;
  }

  const extBtn=mkBtn('+ Nœud externe','schema-btn-sec',()=>{
    const s=getActiveSchema(); if(!s){ alert('Créez d\'abord un schéma.'); return; }
    const name=prompt('Nom du nœud externe :');
    if(!name||!name.trim()) return;
    pushHistory();
    const svgEl=document.getElementById(`schema-svg-${catId}`);
    const rect=svgEl?svgEl.getBoundingClientRect():{width:500,height:500};
    const cx=(rect.width/2-SC.tx)/SC.scale;
    const cy=(rect.height/2-SC.ty)/SC.scale;
    const off=s.nodes.length*24;
    const node={id:'n'+Date.now(),type:'external',name:name.trim(),color:'#888',x:cx-NODE_W/2+(off%140),y:cy-NODE_H/2+(off%90)};
    s.nodes.push(node);
    SC.selected={type:'node',id:node.id};
    SC.mode='select';
    renderCanvas(catId); showNodeProps(node,catId); saveState();
  });

  const schDelBtn=mkBtn('Supprimer','btn danger',()=>{ deleteSelected(catId); });
  schDelBtn.id=`schema-del-sel-${catId}`;

  const undoBtn=mkBtn('Annuler','schema-btn-sec',()=>undoSchema(catId));
  undoBtn.title='Ctrl+Z';
  const redoBtn=mkBtn('Rétablir','schema-btn-sec',()=>redoSchema(catId));
  redoBtn.title='Ctrl+Y';

  const fitBtn=mkBtn('Ajuster vue','schema-btn-sec',()=>fitToScreen(catId));
  fitBtn.title='Centrer et zoomer sur tous les nœuds';

  const snapBtn=mkBtn('Grille','schema-btn-sec schema-snap-btn',()=>{
    SC.snap=!SC.snap;
    snapBtn.classList.toggle('schema-snap-active',SC.snap);
    snapBtn.title=SC.snap?'Grille magnétique activée (20px)':'Activer la grille magnétique';
  });
  snapBtn.id=`schema-snap-btn-${catId}`;

  const exportBtn=mkBtn('Export SVG','schema-btn-sec',()=>exportSchemaSVG(catId));
  exportBtn.title='Télécharger le schéma en SVG';

  const linksBtn=mkBtn('Importer liens','schema-btn-sec',()=>generateFromLinks(catId));
  linksBtn.title='Créer automatiquement les flèches depuis les relations LINKS existantes';

  const hintSpan=document.createElement('span');
  hintSpan.id=`schema-hint-${catId}`;
  hintSpan.className='schema-hint';
  hintSpan.style.display='none';

  [extBtn,schDelBtn,undoBtn,redoBtn,fitBtn,snapBtn,exportBtn,linksBtn,hintSpan].forEach(el=>toolbar.appendChild(el));

  // Schema selector row
  const selRow = document.createElement('div');
  selRow.className = 'schema-sel-row';

  const schemaSel = document.createElement('select');
  schemaSel.id = `schema-sel-${catId}`;
  populateSchemaSel(schemaSel);
  if(SCHEMAS.length){
    if(!SC.schemaId || !SCHEMAS.find(s=>s.id===SC.schemaId)) SC.schemaId = SCHEMAS[0].id;
    schemaSel.value = SC.schemaId;
  }

  const newBtn = document.createElement('button');
  newBtn.className = 'btn'; newBtn.textContent = 'Nouveau schéma';

  const renameBtn = document.createElement('button');
  renameBtn.className = 'btn'; renameBtn.style.background='#555'; renameBtn.textContent = 'Renommer';

  const delSchemaBtn = document.createElement('button');
  delSchemaBtn.className = 'btn danger'; delSchemaBtn.textContent = 'Supprimer';

  selRow.appendChild(schemaSel);
  selRow.appendChild(newBtn);
  selRow.appendChild(renameBtn);
  selRow.appendChild(delSchemaBtn);

  schemaSel.addEventListener('change',()=>{
    SC.schemaId = schemaSel.value||null;
    SC.selected = null;
    SC.arrowSrc = null;
    SC.arrowPreview = null;
    SC.tx=0; SC.ty=0; SC.scale=1; // reset viewport pour le nouveau schéma
    resetPropsPanel(catId);
    renderCanvas(catId);
    setTimeout(()=>{ const s=getActiveSchema(); if(s&&s.nodes.length) fitToScreen(catId); },80);
  });

  newBtn.addEventListener('click',()=>{
    const name = prompt('Nom du schéma :');
    if(!name||!name.trim()) return;
    const s = {id:'schema_'+Date.now(), name:name.trim(), nodes:[], arrows:[]};
    SCHEMAS.push(s);
    SC.schemaId = s.id;
    populateSchemaSel(schemaSel);
    schemaSel.value = s.id;
    renderCanvas(catId);
    saveState();
  });

  renameBtn.addEventListener('click',()=>{
    const s = getActiveSchema(); if(!s) return;
    const name = prompt('Nouveau nom :', s.name);
    if(!name||!name.trim()) return;
    s.name = name.trim();
    populateSchemaSel(schemaSel);
    schemaSel.value = s.id;
    saveState();
  });

  delSchemaBtn.addEventListener('click',()=>{
    const s = getActiveSchema(); if(!s) return;
    if(!confirm(`Supprimer le schéma "${s.name}" ?`)) return;
    SCHEMAS.splice(SCHEMAS.indexOf(s),1);
    SC.schemaId = SCHEMAS[0]?.id||null;
    populateSchemaSel(schemaSel);
    schemaSel.value = SC.schemaId||'';
    SC.selected = null;
    resetPropsPanel(catId);
    renderCanvas(catId);
    saveState();
  });

  // Canvas wrap
  const canvasWrap = document.createElement('div');
  canvasWrap.className = 'schema-canvas-wrap';

  // Items sidebar
  const itemsSidebar = document.createElement('div');
  itemsSidebar.className = 'schema-items-sidebar';
  buildItemsSidebar(itemsSidebar, catId);

  // SVG wrap
  const svgWrap = document.createElement('div');
  svgWrap.className = 'schema-svg-wrap';

  const svgEl = document.createElementNS('http://www.w3.org/2000/svg','svg');
  svgEl.setAttribute('class','schema-svg');
  svgEl.setAttribute('id',`schema-svg-${catId}`);
  svgEl.innerHTML = `<defs>
    <marker id="arr-s"      markerWidth="9" markerHeight="7" refX="8" refY="3.5" orient="auto">              <path d="M0,0.5 L0,6.5 L8,3.5 z" fill="#888"/></marker>
    <marker id="arr-s-hl"   markerWidth="9" markerHeight="7" refX="8" refY="3.5" orient="auto">              <path d="M0,0.5 L0,6.5 L8,3.5 z" fill="#1D9E75"/></marker>
    <marker id="arr-d"      markerWidth="9" markerHeight="7" refX="8" refY="3.5" orient="auto">              <path d="M0,0.5 L0,6.5 L8,3.5 z" fill="#bbb"/></marker>
    <marker id="arr-rev"    markerWidth="9" markerHeight="7" refX="8" refY="3.5" orient="auto-start-reverse"><path d="M0,0.5 L0,6.5 L8,3.5 z" fill="#888"/></marker>
    <marker id="arr-rev-hl" markerWidth="9" markerHeight="7" refX="8" refY="3.5" orient="auto-start-reverse"><path d="M0,0.5 L0,6.5 L8,3.5 z" fill="#1D9E75"/></marker>
    <marker id="arr-rev-d"  markerWidth="9" markerHeight="7" refX="8" refY="3.5" orient="auto-start-reverse"><path d="M0,0.5 L0,6.5 L8,3.5 z" fill="#bbb"/></marker>
  </defs>
  <g class="canvas-vp" id="canvas-vp-${catId}"></g>`;

  svgWrap.appendChild(svgEl);
  canvasWrap.appendChild(itemsSidebar);
  canvasWrap.appendChild(svgWrap);

  // Properties panel
  const propsPanel = document.createElement('div');
  propsPanel.className = 'schema-props';
  propsPanel.id = `schema-props-${catId}`;
  propsPanel.innerHTML = `<span style="color:#bbb;font-size:12px">Cliquer sur un nœud ou une flèche pour voir ses propriétés</span>`;

  body.appendChild(toolbar);
  body.appendChild(selRow);
  body.appendChild(canvasWrap);
  body.appendChild(propsPanel);
  sec.appendChild(body);

  initCanvasEvents(catId, svgEl, svgWrap, propsPanel);
  renderCanvas(catId);
}

function buildItemsSidebar(el, catId){
  el.innerHTML='';
  CATS.forEach(cat=>{
    if(cat.type==='schema'||!cat.domaines) return;
    const items = cat.domaines.flatMap(d=>d.items);
    if(!items.length) return;
    const grp = document.createElement('div');
    const title = document.createElement('div');
    title.className = 'scat-group-title';
    title.style.color = cat.color;
    title.textContent = cat.name;
    grp.appendChild(title);
    items.forEach(name=>{
      const row = document.createElement('div');
      row.className = 'scat-item';
      const dot = document.createElement('span');
      dot.className = 'scat-item-dot';
      dot.style.background = cat.color;
      const lbl = document.createElement('span');
      lbl.textContent = name;
      row.appendChild(dot); row.appendChild(lbl);
      row.addEventListener('click',()=>{ addNodeFromSidebar(name, cat.color, catId); });
      grp.appendChild(row);
    });
    el.appendChild(grp);
  });
}

function populateSchemaSel(sel){
  const cur = sel.value;
  sel.innerHTML='';
  if(!SCHEMAS.length){ sel.innerHTML='<option value="">— Aucun schéma —</option>'; return; }
  SCHEMAS.forEach(s=>{ const o=document.createElement('option'); o.value=s.id; o.textContent=s.name; sel.appendChild(o); });
  if(cur && SCHEMAS.find(s=>s.id===cur)) sel.value = cur;
}

function addNodeFromSidebar(itemName, catColor, catId){
  const s = getActiveSchema(); if(!s) return;
  // Empêcher les doublons : si l'item est déjà sur le canvas, sélectionner l'existant
  const existing = s.nodes.find(n=>n.type==='item'&&n.name===itemName);
  if(existing){
    SC.selected={type:'node',id:existing.id};
    renderCanvas(catId);
    showNodeProps(existing,catId);
    updateHint(catId,`"${itemName}" est déjà sur ce schéma.`);
    setTimeout(()=>updateHint(catId,''),3000);
    return;
  }
  const svgEl = document.getElementById(`schema-svg-${catId}`);
  const rect = svgEl ? svgEl.getBoundingClientRect() : {width:500,height:500};
  const cx = (rect.width/2 - SC.tx) / SC.scale;
  const cy = (rect.height/2 - SC.ty) / SC.scale;
  const offset = s.nodes.length * 20;
  const node = {id:'n'+Date.now(), type:'item', name:itemName, color:catColor,
    x:cx - NODE_W/2 + (offset%100), y:cy - NODE_H/2 + (offset%60)};
  s.nodes.push(node);
  SC.selected = {type:'node', id:node.id};
  renderCanvas(catId);
  showNodeProps(node, catId);
  saveState();
}

function getNodeCenter(node){
  return {x: node.x + NODE_W/2, y: node.y + NODE_H/2};
}

// Groupe les flèches par paire de nœuds pour calculer l'offset latéral
function buildArrowGroups(schema){
  const g={};
  schema.arrows.forEach(arr=>{
    const k=[arr.from,arr.to].sort().join('~');
    if(!g[k]) g[k]=[];
    g[k].push(arr.id);
  });
  return g;
}

// Calcule le chemin SVG d'une flèche avec offset latéral (flèches parallèles)
function getArrowPath(arr, fn, tn, arrGroups){
  const fc=getNodeCenter(fn), tc=getNodeCenter(tn);
  const key=[arr.from,arr.to].sort().join('~');
  const group=arrGroups[key]||[arr.id];
  const idx=group.indexOf(arr.id);
  const count=group.length;
  const STEP=20;
  const offsetAmt=(idx-(count-1)/2)*STEP;

  // Direction canonique : toujours du premier ID trié vers le second.
  // Cela garantit que le vecteur perpendiculaire est identique pour A→B et B→A,
  // donc les deux flèches se décalent dans des sens opposés et ne se superposent pas.
  const sortedIds=[arr.from,arr.to].sort();
  const canonFn=sortedIds[0]===arr.from?fn:tn;
  const canonTn=sortedIds[0]===arr.from?tn:fn;
  const cFc=getNodeCenter(canonFn), cTc=getNodeCenter(canonTn);
  const ddx=cTc.x-cFc.x, ddy=cTc.y-cFc.y;
  const len=Math.sqrt(ddx*ddx+ddy*ddy)||1;
  const px=-ddy/len, py=ddx/len; // perpendiculaire unitaire canonique

  // Bords réels de la flèche + offset
  const sp0=getEdgePoint(fn,tc.x,tc.y), ep0=getEdgePoint(tn,fc.x,fc.y);
  const sp={x:sp0.x+px*offsetAmt, y:sp0.y+py*offsetAmt};
  const ep={x:ep0.x+px*offsetAmt, y:ep0.y+py*offsetAmt};

  // Position par défaut du label (distribuée le long du chemin)
  const labelT=(idx+1)/(count+1);
  const lx=sp.x+(ep.x-sp.x)*labelT;
  const ly=sp.y+(ep.y-sp.y)*labelT;

  // Position effective du label (avec offset utilisateur)
  const labelX=lx+(arr.labelDx||0), labelY=ly+(arr.labelDy||0);

  // Points de contrôle naturels (direction dominante) — garantissent
  // que la flèche arrive sur ep dans le bon sens (tête toujours visible)
  const totalDx=ep.x-sp.x, totalDy=ep.y-sp.y;
  let c1x,c1y,c2x,c2y;
  if(Math.abs(totalDx)>=Math.abs(totalDy)){
    c1x=sp.x+totalDx*0.5; c1y=sp.y;
    c2x=ep.x-totalDx*0.5; c2y=ep.y;
  } else {
    c1x=sp.x; c1y=sp.y+totalDy*0.5;
    c2x=ep.x; c2y=ep.y-totalDy*0.5;
  }

  if(arr.labelDx||arr.labelDy){
    // c2 reste fixe (approche correcte sur ep → tête de flèche toujours visible)
    // c1 est recalculé pour que B(0.5) = label :
    //   B(0.5) = (sp + 3·c1 + 3·c2 + ep) / 8  →  c1 = (8·label − sp − 3·c2 − ep) / 3
    c1x=(8*labelX-sp.x-3*c2x-ep.x)/3;
    c1y=(8*labelY-sp.y-3*c2y-ep.y)/3;
  }

  return {
    d:`M${sp.x},${sp.y} C${c1x},${c1y} ${c2x},${c2y} ${ep.x},${ep.y}`,
    lx, ly, sp, ep,
    c2x, c2y  // exposé pour le drag du label
  };
}

function renderCanvas(catId){
  const vp = document.getElementById(`canvas-vp-${catId}`);
  if(!vp) return;
  vp.innerHTML='';
  applyVpTransform(catId);

  const s = getActiveSchema();
  if(!s){
    const txt = document.createElementNS('http://www.w3.org/2000/svg','text');
    txt.setAttribute('x','50%'); txt.setAttribute('y','50%');
    txt.setAttribute('text-anchor','middle'); txt.setAttribute('dominant-baseline','middle');
    txt.setAttribute('font-size','13'); txt.setAttribute('fill','#bbb');
    txt.setAttribute('font-family','-apple-system,BlinkMacSystemFont,Segoe UI,sans-serif');
    txt.textContent='Créer ou sélectionner un schéma';
    vp.appendChild(txt);
    return;
  }

  // Arrows — avec offset latéral pour flèches parallèles entre mêmes nœuds
  const arrGroups = buildArrowGroups(s);
  s.arrows.forEach(arr=>{
    const fn = s.nodes.find(n=>n.id===arr.from);
    const tn = s.nodes.find(n=>n.id===arr.to);
    if(!fn||!tn) return;
    const {d, lx, ly, sp, ep, c2x, c2y} = getArrowPath(arr, fn, tn, arrGroups);
    const isSelected = SC.selected?.type==='arrow' && SC.selected?.id===arr.id;
    const dashed = arr.style==='dashed';
    const baseColor = arr.color || (dashed ? '#bbb' : '#888');
    const strokeColor = isSelected ? '#1D9E75' : baseColor;
    const markerEnd = isSelected ? 'url(#arr-s-hl)' : dashed ? 'url(#arr-d)' : 'url(#arr-s)';
    const markerStart = arr.dir==='<->' ? (isSelected ? 'url(#arr-rev-hl)' : dashed ? 'url(#arr-rev-d)' : 'url(#arr-rev)') : 'none';

    const g = document.createElementNS('http://www.w3.org/2000/svg','g');
    g.dataset.arrowId = arr.id;

    const hit = document.createElementNS('http://www.w3.org/2000/svg','path');
    hit.setAttribute('d',d); hit.setAttribute('stroke','transparent');
    hit.setAttribute('stroke-width','14'); hit.setAttribute('fill','none');
    hit.style.cursor='pointer';

    const path = document.createElementNS('http://www.w3.org/2000/svg','path');
    path.setAttribute('d',d); path.setAttribute('fill','none');
    path.setAttribute('stroke',strokeColor);
    path.setAttribute('stroke-width', isSelected?'2.5':'1.5');
    if(dashed) path.setAttribute('stroke-dasharray','6,4');
    path.setAttribute('marker-end',markerEnd);
    if(markerStart!=='none') path.setAttribute('marker-start',markerStart);

    g.appendChild(hit); g.appendChild(path);

    if(arr.label){
      const lw=Math.min(arr.label.length*6+14,130);
      const labelX=lx+(arr.labelDx||0), labelY=ly+(arr.labelDy||0);

      const rect=document.createElementNS('http://www.w3.org/2000/svg','rect');
      rect.setAttribute('x',labelX-lw/2); rect.setAttribute('y',labelY-9);
      rect.setAttribute('width',lw); rect.setAttribute('height',18);
      rect.setAttribute('rx','4'); rect.setAttribute('fill','#fff');
      rect.setAttribute('stroke','#e0dfd8'); rect.setAttribute('stroke-width','1');
      rect.style.cursor='move';

      const ltxt=document.createElementNS('http://www.w3.org/2000/svg','text');
      ltxt.setAttribute('x',labelX); ltxt.setAttribute('y',labelY);
      ltxt.setAttribute('text-anchor','middle'); ltxt.setAttribute('dominant-baseline','middle');
      ltxt.setAttribute('font-size','10'); ltxt.setAttribute('fill','#888');
      ltxt.setAttribute('font-family','-apple-system,BlinkMacSystemFont,Segoe UI,sans-serif');
      ltxt.style.cursor='move';
      ltxt.textContent=arr.label.length>18?arr.label.slice(0,17)+'…':arr.label;

      // Drag du label → la flèche suit (recalcul des points de contrôle)
      const onLabelDown=ev=>{
        ev.stopPropagation();
        const svgD=document.getElementById(`schema-svg-${catId}`); if(!svgD) return;
        let didDrag=false;
        const sx=ev.clientX, sy=ev.clientY;
        const sdx=arr.labelDx||0, sdy=arr.labelDy||0;
        svgD.setPointerCapture(ev.pointerId);
        function onLM(e){
          const dist=Math.abs(e.clientX-sx)+Math.abs(e.clientY-sy);
          if(dist>3) didDrag=true;
          if(!didDrag) return;
          arr.labelDx=sdx+(e.clientX-sx)/SC.scale;
          arr.labelDy=sdy+(e.clientY-sy)/SC.scale;
          const nlx=lx+arr.labelDx, nly=ly+arr.labelDy;
          // Badge
          rect.setAttribute('x',nlx-lw/2); rect.setAttribute('y',nly-9);
          ltxt.setAttribute('x',nlx); ltxt.setAttribute('y',nly);
          // c2 reste fixe → tête de flèche toujours visible
          // c1 recalculé pour B(0.5) = label
          const nc1x=(8*nlx-sp.x-3*c2x-ep.x)/3;
          const nc1y=(8*nly-sp.y-3*c2y-ep.y)/3;
          const nd=`M${sp.x},${sp.y} C${nc1x},${nc1y} ${c2x},${c2y} ${ep.x},${ep.y}`;
          g.querySelectorAll('path').forEach(p=>p.setAttribute('d',nd));
        }
        function onLU(){
          svgD.removeEventListener('pointermove',onLM);
          svgD.removeEventListener('pointerup',onLU);
          if(didDrag){ renderCanvas(catId); saveState(); return; }
          onArrowClick(arr.id,catId);
        }
        svgD.addEventListener('pointermove',onLM);
        svgD.addEventListener('pointerup',onLU);
      };
      // Double-clic → remettre le label au centre
      const onLabelDbl=ev=>{ ev.stopPropagation(); arr.labelDx=0; arr.labelDy=0; renderCanvas(catId); saveState(); };
      rect.addEventListener('pointerdown',onLabelDown); rect.addEventListener('dblclick',onLabelDbl);
      ltxt.addEventListener('pointerdown',onLabelDown); ltxt.addEventListener('dblclick',onLabelDbl);
      g.appendChild(rect); g.appendChild(ltxt);
    }

    g.addEventListener('click',e=>{ e.stopPropagation(); onArrowClick(arr.id, catId); });
    vp.appendChild(g);
  });

  // Arrow preview rubber-band
  if(SC.arrowPreview && SC.mode==='arrow'){
    const prev=document.createElementNS('http://www.w3.org/2000/svg','line');
    prev.setAttribute('x1',SC.arrowPreview.x1); prev.setAttribute('y1',SC.arrowPreview.y1);
    prev.setAttribute('x2',SC.arrowPreview.x2); prev.setAttribute('y2',SC.arrowPreview.y2);
    prev.setAttribute('stroke','#1D9E75'); prev.setAttribute('stroke-width','1.5');
    prev.setAttribute('stroke-dasharray','5,4'); prev.setAttribute('pointer-events','none');
    vp.appendChild(prev);
  }

  // Nodes
  s.nodes.forEach(node=>{
    const isSelected = SC.selected?.type==='node' && SC.selected?.id===node.id;
    const isArrowSrc = SC.arrowSrc===node.id;
    const fo=document.createElementNS('http://www.w3.org/2000/svg','foreignObject');
    fo.setAttribute('x',node.x); fo.setAttribute('y',node.y);
    fo.setAttribute('width',NODE_W); fo.setAttribute('height',NODE_H);
    fo.setAttribute('overflow','visible');
    fo.dataset.nodeId=node.id;

    const div=document.createElementNS('http://www.w3.org/1999/xhtml','div');
    div.className='snode'+(isSelected||isArrowSrc?' selected':'');
    if(isArrowSrc) div.style.borderColor='#1D9E75';

    const dot=document.createElementNS('http://www.w3.org/1999/xhtml','span');
    dot.className='snode-dot'; dot.style.background=node.color||'#888';
    const nameEl=document.createElementNS('http://www.w3.org/1999/xhtml','span');
    nameEl.title=node.name; nameEl.textContent=node.name;
    if(node.type==='item'){
      nameEl.className='snode-name snode-link';
      nameEl.style.color=node.color||'#888';
      nameEl.addEventListener('click',ev=>{ ev.stopPropagation(); openItem(node.name,node.color); });
      // Avertissement si l'item est en double sur ce schéma
      const isDuplicate=s.nodes.filter(n=>n.type==='item'&&n.name===node.name).length>1;
      if(isDuplicate){
        const warn=document.createElementNS('http://www.w3.org/1999/xhtml','span');
        warn.textContent='!'; warn.title='Cet élément est présent en double sur ce schéma';
        warn.style.cssText='background:#e74c3c;color:#fff;border-radius:50%;width:14px;height:14px;display:inline-flex;align-items:center;justify-content:center;font-size:9px;font-weight:700;margin-left:4px;flex-shrink:0';
        div.appendChild(dot); div.appendChild(nameEl); div.appendChild(warn);
      } else {
        div.appendChild(dot); div.appendChild(nameEl);
      }
    } else {
      nameEl.className='snode-name';
      div.appendChild(dot); div.appendChild(nameEl);
    }

    div.addEventListener('pointerdown',e=>{ e.stopPropagation(); onNodePointerDown(e, node.id, catId, div); });
    div.addEventListener('dblclick',ev=>{
      ev.stopPropagation();
      if(node.type==='item'){ openItem(node.name,node.color); return; }
      const name=prompt('Renommer le nœud :',node.name);
      if(name?.trim()&&name.trim()!==node.name){ pushHistory(); node.name=name.trim(); renderCanvas(catId); saveState(); }
    });

    fo.appendChild(div);
    vp.appendChild(fo);
  });
}

function applyVpTransform(catId){
  const vp=document.getElementById(`canvas-vp-${catId}`);
  if(vp) vp.setAttribute('transform',`translate(${SC.tx},${SC.ty}) scale(${SC.scale})`);
}

function initCanvasEvents(catId, svgEl, svgWrap, propsPanel){
  // Zoom
  svgEl.addEventListener('wheel', e=>{
    e.preventDefault();
    const rect=svgEl.getBoundingClientRect();
    const mx=e.clientX-rect.left, my=e.clientY-rect.top;
    const factor=e.deltaY<0?1.12:0.893;
    const ns=Math.max(0.15,Math.min(5, SC.scale*factor));
    SC.tx=mx-(mx-SC.tx)*(ns/SC.scale);
    SC.ty=my-(my-SC.ty)*(ns/SC.scale);
    SC.scale=ns;
    applyVpTransform(catId);
  },{passive:false});

  // Arrow preview on mousemove
  svgEl.addEventListener('pointermove', e=>{
    if(SC.mode==='arrow' && SC.arrowSrc){
      const s=getActiveSchema(); if(!s) return;
      const src=s.nodes.find(n=>n.id===SC.arrowSrc); if(!src) return;
      const rect=svgEl.getBoundingClientRect();
      const lx=(e.clientX-rect.left-SC.tx)/SC.scale;
      const ly=(e.clientY-rect.top-SC.ty)/SC.scale;
      const startPt=getEdgePoint(src,lx,ly);
      SC.arrowPreview={x1:startPt.x,y1:startPt.y,x2:lx,y2:ly};
      renderCanvas(catId);
    }
  });

  // Pan on background
  svgEl.addEventListener('pointerdown', e=>{
    // Ignore clicks on foreignObject children (handled by node pointerdown)
    if(e.target.closest && e.target.closest('foreignObject')) return;
    // Ignore arrow group clicks (handled by arrow click)
    if(e.target.closest && e.target.closest('[data-arrow-id]')) return;

    // Annuler flèche en cours sur clic fond
    if(SC.mode==='arrow' && SC.arrowSrc){
      SC.mode='select'; SC.arrowSrc=null; SC.arrowPreview=null;
      updateHint(catId,'');
      renderCanvas(catId);
    } else {
      SC.selected=null;
      resetPropsPanel(catId);
      renderCanvas(catId);
    }

    // Start pan
    SC.isPanning=true;
    SC.panMoved=false;
    SC.panStart={x:e.clientX,y:e.clientY,tx:SC.tx,ty:SC.ty};
    svgEl.setPointerCapture(e.pointerId);

    function onPanMove(ev){
      if(!SC.isPanning) return;
      SC.tx=SC.panStart.tx+(ev.clientX-SC.panStart.x);
      SC.ty=SC.panStart.ty+(ev.clientY-SC.panStart.y);
      SC.panMoved=true;
      applyVpTransform(catId);
    }
    function onPanEnd(){
      SC.isPanning=false;
      svgEl.removeEventListener('pointermove',onPanMove);
      svgEl.removeEventListener('pointerup',onPanEnd);
    }
    svgEl.addEventListener('pointermove',onPanMove);
    svgEl.addEventListener('pointerup',onPanEnd);
  });
}

function onNodePointerDown(e, nodeId, catId, divEl){
  // Mode flèche en cours : click nœud cible → créer la flèche
  if(SC.mode==='arrow' && SC.arrowSrc){
    if(SC.arrowSrc!==nodeId){
      const s=getActiveSchema(); if(!s) return;
      const fromNode=s.nodes.find(n=>n.id===SC.arrowSrc);
      const toNode=s.nodes.find(n=>n.id===nodeId);
      let autoLabel='';
      if(fromNode?.type==='item' && toNode?.type==='item'){
        const lk=LINKS.find(([src,dst])=>src===fromNode.name&&dst===toNode.name);
        if(lk&&lk[2]) autoLabel=lk[2];
      }
      pushHistory();
      const arr={id:'a'+Date.now(),from:SC.arrowSrc,to:nodeId,label:autoLabel,style:'solid',dir:'->'};
      s.arrows.push(arr);
      SC.arrowPreview=null;
      SC.selected={type:'arrow',id:arr.id};
      renderCanvas(catId);
      showArrowProps(arr,catId);
      updateHint(catId,`Flèche créée · Cliquez un autre nœud pour continuer depuis « ${fromNode?.name||''} » · Clic sur fond pour terminer`);
      saveState();
    }
    return;
  }

  // Select mode — drag
  // Capture sur le SVG (pas le div) pour éviter de perdre le capture lors du re-render
  const svgEl = document.getElementById(`schema-svg-${catId}`);
  if(!svgEl) return;

  const s = getActiveSchema();
  const node = s?.nodes.find(n=>n.id===nodeId);
  if(!node) return;

  SC.hasDragged = false;
  const startPos = {x:e.clientX, y:e.clientY};
  const svgRect = svgEl.getBoundingClientRect();
  const dragOx = (e.clientX-svgRect.left-SC.tx)/SC.scale - node.x;
  const dragOy = (e.clientY-svgRect.top-SC.ty)/SC.scale - node.y;
  const snapBefore = JSON.parse(JSON.stringify(node)); // pour pushHistory au premier vrai drag

  svgEl.setPointerCapture(e.pointerId);

  let histPushed=false;
  function onNodeMove(ev){
    const d2 = Math.abs(ev.clientX-startPos.x)+Math.abs(ev.clientY-startPos.y);
    if(!SC.hasDragged && d2>3){ SC.hasDragged=true; pushHistory(); histPushed=true; }
    if(!SC.hasDragged) return;

    const r = svgEl.getBoundingClientRect();
    let nx = (ev.clientX-r.left-SC.tx)/SC.scale - dragOx;
    let ny = (ev.clientY-r.top-SC.ty)/SC.scale - dragOy;
    if(SC.snap){ const G=20; nx=Math.round(nx/G)*G; ny=Math.round(ny/G)*G; }
    node.x=nx; node.y=ny;

    // Mise à jour directe du foreignObject (sans re-render complet)
    const fo = svgEl.querySelector(`#canvas-vp-${catId} foreignObject[data-node-id="${nodeId}"]`);
    if(fo){ fo.setAttribute('x',nx); fo.setAttribute('y',ny); }

    // Re-dessine uniquement les flèches connectées au nœud déplacé
    const ag2=buildArrowGroups(s);
    s.arrows.forEach(arr=>{
      if(arr.from!==nodeId && arr.to!==nodeId) return;
      const fn2=s.nodes.find(n=>n.id===arr.from), tn2=s.nodes.find(n=>n.id===arr.to);
      if(!fn2||!tn2) return;
      const {d:pd, lx:lx2, ly:ly2}=getArrowPath(arr,fn2,tn2,ag2);
      const ag=svgEl.querySelector(`#canvas-vp-${catId} g[data-arrow-id="${arr.id}"]`);
      if(ag){
        ag.querySelectorAll('path').forEach(p=>p.setAttribute('d',pd));
        const lr=ag.querySelector('rect'); const lt=ag.querySelector('text');
        const nlx2=lx2+(arr.labelDx||0), nly2=ly2+(arr.labelDy||0);
        if(lr){ const lw=parseFloat(lr.getAttribute('width')); lr.setAttribute('x',nlx2-lw/2); lr.setAttribute('y',nly2-9); }
        if(lt){ lt.setAttribute('x',nlx2); lt.setAttribute('y',nly2); }
      }
    });
  }

  function onNodeUp(){
    svgEl.removeEventListener('pointermove',onNodeMove);
    svgEl.removeEventListener('pointerup',onNodeUp);
    if(SC.hasDragged){
      SC.hasDragged=false;
      renderCanvas(catId);
      saveState();
      return;
    }
    SC.hasDragged=false;
    // Click → select
    SC.selected={type:'node',id:nodeId};
    renderCanvas(catId);
    showNodeProps(node, catId);
  }

  svgEl.addEventListener('pointermove',onNodeMove);
  svgEl.addEventListener('pointerup',onNodeUp);
}

function onArrowClick(arrowId, catId){
  const s=getActiveSchema();
  const arr=s?.arrows.find(a=>a.id===arrowId);
  if(!arr) return;
  SC.selected={type:'arrow',id:arrowId};
  SC.mode='select';
  renderCanvas(catId);
  showArrowProps(arr,catId);
}

function showNodeProps(node, catId){
  const panel=document.getElementById(`schema-props-${catId}`);
  if(!panel) return;
  const isExt=node.type==='external';
  let html=`<div class="prop-row">
    <span class="prop-label">Type</span>
    <span style="font-size:12px;color:#555">${isExt?'Nœud externe':'Application (cartographie)'}</span>
  </div>`;
  if(isExt){
    html+=`<div class="prop-row">
      <span class="prop-label">Nom</span>
      <input class="prop-input" id="pnn-${catId}" value="${node.name.replace(/"/g,'&quot;')}">
    </div>
    <div class="prop-row">
      <span class="prop-label">Couleur</span>
      <input type="color" id="pnc-${catId}" value="${node.color||'#888888'}" style="width:40px;height:28px;border:1px solid #e0dfd8;border-radius:5px;cursor:pointer;padding:2px">
    </div>`;
  } else {
    html+=`<div class="prop-row">
      <span class="prop-label">Nom</span>
      <span style="font-size:12px;color:#1a1a18">${node.name}</span>
    </div>
    <div class="prop-row">
      <span class="prop-label">Fiche</span>
      <button class="btn" id="pno-${catId}" style="font-size:11px;padding:4px 10px">Ouvrir la fiche</button>
    </div>`;
  }
  html+=`<div class="prop-row" style="margin-top:6px;padding-top:8px;border-top:1px solid #f0efe9">
    <button class="btn" id="pnl-${catId}" style="font-size:11px;padding:4px 10px;background:#1D9E75">Relier à un autre nœud</button>
  </div>`;
  panel.innerHTML=html;
  if(isExt){
    const ni=panel.querySelector(`#pnn-${catId}`);
    const ci=panel.querySelector(`#pnc-${catId}`);
    function save(){ node.name=ni.value.trim()||node.name; node.color=ci.value; renderCanvas(catId); saveState(); }
    ni.addEventListener('change',save);
    ci.addEventListener('change',save);
  } else {
    panel.querySelector(`#pno-${catId}`)?.addEventListener('click',()=>openItem(node.name,node.color));
  }
  panel.querySelector(`#pnl-${catId}`)?.addEventListener('click',()=>{
    SC.mode='arrow';
    SC.arrowSrc=node.id;
    SC.arrowPreview=null;
    renderCanvas(catId);
    updateHint(catId,'Cliquez sur le nœud destination  ·  Échap pour annuler');
  });
}

function showArrowProps(arr, catId){
  const panel=document.getElementById(`schema-props-${catId}`);
  if(!panel) return;
  const s=getActiveSchema();
  const fn=s?.nodes.find(n=>n.id===arr.from);
  const tn=s?.nodes.find(n=>n.id===arr.to);
  function nodeLink(node){
    if(!node) return '<span style="color:#bbb">?</span>';
    if(node.type==='item')
      return `<span class="prop-node-link" data-name="${node.name}" data-color="${node.color||'#888'}" style="color:${node.color||'#888'};cursor:pointer;text-decoration:underline;font-weight:500">${node.name}</span>`;
    return `<span style="color:#555">${node.name}</span>`;
  }
  panel.innerHTML=`
    <div class="prop-row">
      <span class="prop-label">Connexion</span>
      <span style="font-size:12px;display:flex;align-items:center;gap:4px;flex-wrap:wrap">
        ${nodeLink(fn)}<span style="color:#bbb">→</span>${nodeLink(tn)}
      </span>
    </div>
    <div class="prop-row">
      <span class="prop-label">Label</span>
      <input class="prop-input" id="pal-${catId}" value="${(arr.label||'').replace(/"/g,'&quot;')}" placeholder="ex : données articles">
    </div>
    <div class="prop-row">
      <span class="prop-label">Style</span>
      <select class="prop-select" id="pas-${catId}">
        <option value="solid" ${arr.style==='solid'?'selected':''}>Plein</option>
        <option value="dashed" ${arr.style==='dashed'?'selected':''}>Pointillé</option>
      </select>
    </div>
    <div class="prop-row">
      <span class="prop-label">Direction</span>
      <select class="prop-select" id="pad-${catId}">
        <option value="->" ${arr.dir==='->'?'selected':''}>→ (A vers B)</option>
        <option value="<->" ${arr.dir==='<->'?'selected':''}>↔ (bidirectionnel)</option>
      </select>
    </div>
    <div class="prop-row">
      <span class="prop-label">Couleur</span>
      <input type="color" id="pac-${catId}" value="${arr.color||'#888888'}" style="width:40px;height:28px;border:1px solid #e0dfd8;border-radius:5px;cursor:pointer;padding:2px">
    </div>
    <div class="prop-row" style="margin-top:6px;padding-top:8px;border-top:1px solid #f0efe9">
      <button class="btn" id="parr-src-${catId}" style="font-size:11px;padding:4px 10px;background:#1D9E75">Relier depuis ${fn?.name||'ce nœud'}</button>
    </div>`;
  function save(){
    pushHistory();
    arr.label=panel.querySelector(`#pal-${catId}`).value.trim();
    arr.style=panel.querySelector(`#pas-${catId}`).value;
    arr.dir=panel.querySelector(`#pad-${catId}`).value;
    arr.color=panel.querySelector(`#pac-${catId}`).value;
    renderCanvas(catId); saveState();
  }
  panel.querySelector(`#pal-${catId}`).addEventListener('change',save);
  panel.querySelector(`#pas-${catId}`).addEventListener('change',save);
  panel.querySelector(`#pad-${catId}`).addEventListener('change',save);
  panel.querySelector(`#pac-${catId}`).addEventListener('change',save);
  // Liens cliquables vers les fiches
  panel.querySelectorAll('.prop-node-link').forEach(el=>{
    el.addEventListener('click',()=>openItem(el.dataset.name,el.dataset.color));
  });
  // Bouton pour relier depuis la source de la flèche
  panel.querySelector(`#parr-src-${catId}`)?.addEventListener('click',()=>{
    if(!fn) return;
    SC.mode='arrow'; SC.arrowSrc=fn.id; SC.arrowPreview=null;
    renderCanvas(catId);
    updateHint(catId,`Cliquez le nœud destination depuis « ${fn.name} » · Échap pour annuler`);
  });
}

function resetPropsPanel(catId){
  const panel=document.getElementById(`schema-props-${catId}`);
  if(panel) panel.innerHTML='<span style="color:#bbb;font-size:12px">Cliquer sur un nœud ou une flèche pour voir ses propriétés</span>';
}

// Retourne le point sur le bord du nœud dans la direction de (towardX, towardY)
function getEdgePoint(node, towardX, towardY){
  const cx=node.x+NODE_W/2, cy=node.y+NODE_H/2;
  const dx=towardX-cx, dy=towardY-cy;
  if(Math.abs(dx)<0.01 && Math.abs(dy)<0.01) return {x:cx,y:cy};
  const hw=NODE_W/2+3, hh=NODE_H/2+3;
  const tx=Math.abs(dx)>0.01?hw/Math.abs(dx):Infinity;
  const ty=Math.abs(dy)>0.01?hh/Math.abs(dy):Infinity;
  const t=Math.min(tx,ty);
  return {x:cx+dx*t, y:cy+dy*t};
}

function deleteSelected(catId){
  if(!SC.selected) return;
  const s=getActiveSchema(); if(!s) return;
  pushHistory();
  if(SC.selected.type==='node'){
    s.nodes=s.nodes.filter(n=>n.id!==SC.selected.id);
    s.arrows=s.arrows.filter(a=>a.from!==SC.selected.id&&a.to!==SC.selected.id);
  } else {
    s.arrows=s.arrows.filter(a=>a.id!==SC.selected.id);
  }
  SC.selected=null;
  SC.mode='select';
  renderCanvas(catId);
  resetPropsPanel(catId);
  saveState();
}

function updateHint(catId, text){
  const h=document.getElementById(`schema-hint-${catId}`);
  if(h){ h.textContent=text; h.style.display=text?'':'none'; }
}

// Raccourcis clavier canvas
document.addEventListener('keydown', e=>{
  if(e.key==='Escape' && SC.mode==='arrow'){
    SC.mode='select'; SC.arrowSrc=null; SC.arrowPreview=null;
    updateHint(SC.catId,'');
    renderCanvas(SC.catId);
    return;
  }
  const tag=document.activeElement?.tagName;
  const inInput=tag==='INPUT'||tag==='TEXTAREA'||tag==='SELECT';
  if((e.key==='Delete'||e.key==='Backspace') && SC.selected && !inInput){
    deleteSelected(SC.catId); return;
  }
  if((e.ctrlKey||e.metaKey) && e.key==='z' && !e.shiftKey){ e.preventDefault(); undoSchema(SC.catId); return; }
  if((e.ctrlKey||e.metaKey) && (e.key==='y'||(e.key==='z'&&e.shiftKey))){ e.preventDefault(); redoSchema(SC.catId); return; }
});

// ─── Undo / Redo ────────────────────────────────────────────────────────────
function pushHistory(){
  const s=getActiveSchema(); if(!s) return;
  if(!HISTORY[s.id]) HISTORY[s.id]={undo:[],redo:[]};
  const h=HISTORY[s.id];
  h.undo.push(JSON.parse(JSON.stringify({nodes:s.nodes,arrows:s.arrows})));
  if(h.undo.length>60) h.undo.shift();
  h.redo=[];
}

function undoSchema(catId){
  const s=getActiveSchema(); if(!s) return;
  const h=HISTORY[s.id]; if(!h||!h.undo.length) return;
  h.redo.push(JSON.parse(JSON.stringify({nodes:s.nodes,arrows:s.arrows})));
  const prev=h.undo.pop();
  s.nodes=prev.nodes; s.arrows=prev.arrows;
  SC.selected=null;
  renderCanvas(catId); resetPropsPanel(catId); saveState();
}

function redoSchema(catId){
  const s=getActiveSchema(); if(!s) return;
  const h=HISTORY[s.id]; if(!h||!h.redo.length) return;
  h.undo.push(JSON.parse(JSON.stringify({nodes:s.nodes,arrows:s.arrows})));
  const next=h.redo.pop();
  s.nodes=next.nodes; s.arrows=next.arrows;
  SC.selected=null;
  renderCanvas(catId); resetPropsPanel(catId); saveState();
}

// ─── Ajuster la vue ─────────────────────────────────────────────────────────
function fitToScreen(catId){
  const s=getActiveSchema(); if(!s||!s.nodes.length) return;
  const svgEl=document.getElementById(`schema-svg-${catId}`); if(!svgEl) return;
  // Priorité : getBoundingClientRect, puis offsetWidth/Height, puis constante
  const rect=svgEl.getBoundingClientRect();
  const svgW=rect.width  || svgEl.offsetWidth  || svgEl.parentElement?.offsetWidth  || 800;
  const svgH=rect.height || svgEl.offsetHeight || 500;
  if(!svgW||!svgH) return;
  const PAD=50;
  let x0=Infinity,y0=Infinity,x1=-Infinity,y1=-Infinity;
  s.nodes.forEach(n=>{ x0=Math.min(x0,n.x); y0=Math.min(y0,n.y); x1=Math.max(x1,n.x+NODE_W); y1=Math.max(y1,n.y+NODE_H); });
  const w=x1-x0+PAD*2, h=y1-y0+PAD*2;
  SC.scale=Math.min(svgW/w, svgH/h, 2);
  SC.tx=(svgW-(x0+x1)*SC.scale)/2;
  SC.ty=(svgH-(y0+y1)*SC.scale)/2;
  renderCanvas(catId); // re-render complet avec le bon viewport
}

// ─── Export SVG ─────────────────────────────────────────────────────────────
function exportSchemaSVG(catId){
  const s=getActiveSchema(); if(!s) return;
  const PAD=50;
  let x0=Infinity,y0=Infinity,x1=-Infinity,y1=-Infinity;
  s.nodes.forEach(n=>{ x0=Math.min(x0,n.x); y0=Math.min(y0,n.y); x1=Math.max(x1,n.x+NODE_W); y1=Math.max(y1,n.y+NODE_H); });
  if(!s.nodes.length){ x0=0;y0=0;x1=600;y1=400; }
  const ox=x0-PAD, oy=y0-PAD, vw=x1-x0+PAD*2, vh=y1-y0+PAD*2;
  const ag=buildArrowGroups(s);
  let arrows='', nodes='';
  s.arrows.forEach(arr=>{
    const fn=s.nodes.find(n=>n.id===arr.from), tn=s.nodes.find(n=>n.id===arr.to);
    if(!fn||!tn) return;
    const {d,lx,ly}=getArrowPath(arr,fn,tn,ag);
    const col=arr.color||(arr.style==='dashed'?'#bbb':'#888');
    const labelX=lx+(arr.labelDx||0), labelY=ly+(arr.labelDy||0);
    // Attributs construits directement — pas de .replace() pour éviter les doublons
    const mStart=arr.dir==='<->'?' marker-start="url(#ea-rev)"':'';
    arrows+=`<path d="${d}" fill="none" stroke="${col}" stroke-width="1.5"${arr.style==='dashed'?' stroke-dasharray="6,4"':''}${mStart} marker-end="url(#ea)"/>`;
    if(arr.label){
      const lw=Math.min(arr.label.length*6+14,130);
      arrows+=`<rect x="${labelX-lw/2}" y="${labelY-9}" width="${lw}" height="18" rx="4" fill="#fff" stroke="#e0dfd8"/>`;
      arrows+=`<text x="${labelX}" y="${labelY}" text-anchor="middle" dominant-baseline="middle" font-size="10" fill="#888" font-family="sans-serif">${arr.label.replace(/&/g,'&amp;').replace(/</g,'&lt;')}</text>`;
    }
  });
  s.nodes.forEach(n=>{
    const col=n.color||'#888';
    nodes+=`<rect x="${n.x}" y="${n.y}" width="${NODE_W}" height="${NODE_H}" rx="8" fill="#fff" stroke="#e0dfd8" stroke-width="1.5"/>`;
    nodes+=`<circle cx="${n.x+12}" cy="${n.y+NODE_H/2}" r="4" fill="${col}"/>`;
    const label=n.name.length>22?n.name.slice(0,21)+'…':n.name;
    nodes+=`<text x="${n.x+24}" y="${n.y+NODE_H/2}" dominant-baseline="middle" font-size="12" fill="${n.type==='item'?col:'#1a1a18'}" font-family="sans-serif" text-decoration="${n.type==='item'?'underline':'none'}">${label.replace(/&/g,'&amp;').replace(/</g,'&lt;')}</text>`;
  });
  // Orientation A4 selon les proportions du schéma
  const landscape = vw > vh;
  const a4W = landscape ? 297 : 210;
  const a4H = landscape ? 210 : 297;
  const svg=`<?xml version="1.0" encoding="UTF-8"?>
<svg xmlns="http://www.w3.org/2000/svg"
     width="${a4W}mm" height="${a4H}mm"
     viewBox="0 0 ${vw} ${vh}"
     preserveAspectRatio="xMidYMid meet">
<defs>
  <style>
    @page { size: ${landscape?'A4 landscape':'A4 portrait'}; margin:8mm; }
    svg { display:block; }
  </style>
  <marker id="ea" markerWidth="9" markerHeight="7" refX="8" refY="3.5" orient="auto"><path d="M0,.5L0,6.5L8,3.5z" fill="#888"/></marker>
  <marker id="ea-rev" markerWidth="9" markerHeight="7" refX="8" refY="3.5" orient="auto-start-reverse"><path d="M0,.5L0,6.5L8,3.5z" fill="#888"/></marker>
</defs>
<rect width="${vw}" height="${vh}" fill="#faf9f7"/>
<g transform="translate(${-ox},${-oy})">${arrows}${nodes}</g>
</svg>`;
  const a=document.createElement('a');
  a.href=URL.createObjectURL(new Blob([svg],{type:'image/svg+xml'}));
  a.download=`${(s.name||'schema').replace(/[^a-z0-9]/gi,'_')}.svg`;
  document.body.appendChild(a); a.click(); a.remove();
}

// ─── Liens schéma ────────────────────────────────────────────────────────────
// Construit un index {itemName → [{dir, other, label, schema}]} depuis tous les schémas
function buildSchemaLinksLookup(){
  const lookup={};
  SCHEMAS.forEach(schema=>{
    schema.arrows.forEach(arr=>{
      const fn=schema.nodes.find(n=>n.id===arr.from);
      const tn=schema.nodes.find(n=>n.id===arr.to);
      if(!fn||!tn) return;
      const bidir=arr.dir==='<->';
      if(fn.type==='item'){
        // Filtrer les auto-connexions (même item en double sur le canvas)
        if(!(tn.type==='item' && tn.name===fn.name)){
          if(!lookup[fn.name]) lookup[fn.name]=[];
          lookup[fn.name].push({dir:bidir?'both':'from',other:tn,label:arr.label||'',schema:schema.name});
        }
      }
      if(tn.type==='item'){
        if(!(fn.type==='item' && fn.name===tn.name)){
          if(!lookup[tn.name]) lookup[tn.name]=[];
          lookup[tn.name].push({dir:bidir?'both':'to',other:fn,label:arr.label||'',schema:schema.name});
        }
      }
    });
  });
  return lookup;
}

// Retourne les liens schéma pour un item donné
function getSchemaLinksForItem(itemName){
  return buildSchemaLinksLookup()[itemName]||[];
}

// ─── Générer depuis LINKS ────────────────────────────────────────────────────
function generateFromLinks(catId){
  const s=getActiveSchema(); if(!s) return;
  const itemNodes=s.nodes.filter(n=>n.type==='item');
  if(!itemNodes.length){ alert('Ajoutez d\'abord des nœuds de type cartographie via la sidebar.'); return; }
  pushHistory();
  let added=0;
  itemNodes.forEach(from=>{
    itemNodes.forEach(to=>{
      if(from.id===to.id) return;
      const lk=LINKS.find(([src,dst])=>src===from.name&&dst===to.name);
      if(!lk) return;
      const exists=s.arrows.find(a=>a.from===from.id&&a.to===to.id);
      if(exists) return;
      s.arrows.push({id:'a'+Date.now()+Math.random(),from:from.id,to:to.id,label:lk[2]||'',style:'solid',dir:'->'});
      added++;
    });
  });
  renderCanvas(catId); saveState();
  if(added) updateHint(catId,`${added} lien${added>1?'s':''} importé${added>1?'s':''} depuis LINKS`);
  else updateHint(catId,'Aucun lien supplémentaire trouvé entre ces nœuds');
  setTimeout(()=>updateHint(catId,''),4000);
}
