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
  ]}
];

const ITEMS={
  "Full Service":{cat:"Reman",gestion:"N Digital",dev:"WordPress",hebergement:"N Digital",tech:"WordPress",techColor:"#3A6EA5",desc:"Application de vente pour professionnels avec suivi factures / BL et commandes.",lien:"https://fullservice-reman.fr"},
  "App Full Service":{cat:"Reman",gestion:"EVVI",dev:"Symfony (PHP)",hebergement:"Aquaray",tech:"Symfony",techColor:"#6c757d",desc:"Application de suivi de réparation de filtre à particules.",lien:"https://app.fullservice-reman.fr/connexion"},
  "Reman Expert":{cat:"Reman",gestion:"Octevia (Julien de Sablet)",dev:"WordPress / WooCommerce",hebergement:"Webaxys",tech:"WordPress",techColor:"#3A6EA5",desc:"Site regroupant l'ensemble des applications Reman.",lien:"https://reman-expert.fr"},
  "Maloc EAD":{cat:"Reman",gestion:"EVVI",dev:"WordPress / WooCommerce",hebergement:"Webaxys",tech:"WordPress",techColor:"#3A6EA5",desc:"Site de location d'EAD pour particuliers, avec gestion d'installations.",lien:"https://maloc-ead.fr"},
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
  document.getElementById('stats').innerHTML=`
    <div class="stat"><strong>${total}</strong>entrées recensées</div>
    <div class="stat"><strong>${CATS.length}</strong>catégories</div>
    <div class="stat"><strong>${techs.size}</strong>technologies distinctes</div>
    <div class="stat"><strong>${hosts.size}</strong>hébergements distincts</div>`;
}

function buildLegend(){
  const leg=document.getElementById('legend');
  CATS.forEach(cat=>{
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
  CATS.forEach(cat=>{
    const total=cat.domaines.reduce((s,d)=>s+d.items.length,0);
    const sec=document.createElement('div');
    sec.className='cat-section';
    sec.dataset.cat=cat.id;

    const header=document.createElement('div');
    header.className='cat-header';
    header.innerHTML=`
      <div class="cat-color-bar" style="background:${cat.color}"></div>
      <div class="cat-info">
        <div class="cat-name">${cat.name}</div>
        <div class="cat-meta">${cat.domaines.length} domaine${cat.domaines.length>1?'s':''}</div>
      </div>
      <div class="cat-count">${total} entrée${total>1?'s':''}</div>
      <div class="cat-toggle">▾</div>`;
    header.onclick=()=>toggleCat(sec,header);

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
          ${LINKS_BY[name]?`<span class="item-links-badge">${LINKS_BY[name].length}</span>`:''}
          <span class="item-tech" style="background:${hex2rgba(d?.techColor||'#888',.12)};color:${d?.techColor||'#888'}">${d?.tech||''}</span>`;
        item.onclick=()=>{ if(editMode) openEditForm(name); else openItem(name,cat.color) };
        itemsEl.appendChild(item);
      });
      col.appendChild(itemsEl);
      body.appendChild(col);
    });

    sec.appendChild(header);
    sec.appendChild(body);
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
  const rels=LINKS_BY[name]||[];
  if(rels.length){
    let rhtml=rels.map(r=>{
      const rd=ITEMS[r.target];
      const rc=getCatColorForItem(r.target);
      return `<div class="related-chip" onclick="openItem('${r.target.replace(/'/g,"\\'")}','${rc}')">
        <span class="related-chip-dot" style="background:${rc}"></span>
        <span class="related-chip-name">${r.target}</span>
        ${r.label?`<span class="related-chip-label">${r.label}</span>`:''}
        <span class="related-chip-cat">${rd?.cat||''}</span>
        <span class="related-chip-arrow">›</span>
      </div>`;
    }).join('');
    html+=`<div class="field"><div class="field-label">Éléments liés (${rels.length})</div><div class="related-list">${rhtml}</div></div>`;
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

buildStats();
buildLegend();
buildCats();

// Persistence via StorageAPI (storage.js)
function saveState(){ return window.StorageAPI.save({CATS,ITEMS,LINKS}); }

function loadState(){
  const state = window.StorageAPI.load();
  if(!state) return false;
  if(state.CATS) { CATS.length=0; state.CATS.forEach(c=>CATS.push(c)); }
  if(state.ITEMS) { Object.keys(ITEMS).forEach(k=>delete ITEMS[k]); Object.assign(ITEMS,state.ITEMS); }
  if(state.LINKS) { LINKS.length=0; state.LINKS.forEach(l=>LINKS.push(l)); }
  Object.keys(LINKS_BY).forEach(k=>delete LINKS_BY[k]);
  LINKS.forEach(([src,dst,label])=>{ if(!LINKS_BY[src])LINKS_BY[src]=[]; LINKS_BY[src].push({target:dst,label:label||''}) });
  return true;
}

function exportStateToFile(){ window.StorageAPI.exportFile('groupeniort_map_data.json', {CATS,ITEMS,LINKS}); }

function importStateFromFile(file){
  window.StorageAPI.importFile(file).then(state=>{
    if(state.CATS) { CATS.length=0; state.CATS.forEach(c=>CATS.push(c)); }
    if(state.ITEMS) { Object.keys(ITEMS).forEach(k=>delete ITEMS[k]); Object.assign(ITEMS,state.ITEMS); }
    if(state.LINKS) { LINKS.length=0; state.LINKS.forEach(l=>LINKS.push(l)); }
    Object.keys(LINKS_BY).forEach(k=>delete LINKS_BY[k]);
    LINKS.forEach(([src,dst,label])=>{ if(!LINKS_BY[src])LINKS_BY[src]=[]; LINKS_BY[src].push({target:dst,label:label||''}) });
    buildStats(); buildLegend(); buildCats();
  }).catch(()=>alert('JSON invalide'));
}

// Edit/Add UI
function populateCatOptions(){
  const sel=document.getElementById('field-cat');
  sel.innerHTML='';
  CATS.forEach(c=>{ const o=document.createElement('option'); o.value=c.id; o.textContent=c.name; sel.appendChild(o)});
}

function populateDomainOptions(catId, selected){
  const sel=document.getElementById('field-domain');
  sel.innerHTML='';
  const cat=CATS.find(c=>c.id===catId);
  if(!cat) return;
  cat.domaines.forEach(d=>{ const o=document.createElement('option'); o.value=d.name; o.textContent=d.name; sel.appendChild(o)});
  if(selected) sel.value=selected;
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
  document.getElementById('delete-item').style.display='none';
  document.getElementById('edit-sub').textContent='Nouvel élément';
  document.getElementById('edit-overlay').classList.add('open');
}

function openEditForm(name){
  const d=ITEMS[name];
  if(!d) return;
  populateCatOptions();
  // find cat/domain containing this name
  let catId=null, domainName=null;
  for(const c of CATS){
    for(const dom of c.domaines){
      if(dom.items.includes(name)){ catId=c.id; domainName=dom.name; break; }
    }
    if(catId) break;
  }
  if(!catId) catId=CATS[0]?.id;
  document.getElementById('original-name').value=name;
  document.getElementById('field-name').value=name;
  document.getElementById('field-tech').value=d.tech||'';
  document.getElementById('field-techcolor').value=d.techColor||'';
  document.getElementById('field-gestion').value=d.gestion||'';
  document.getElementById('field-dev').value=d.dev||'';
  document.getElementById('field-hebergement').value=d.hebergement||'';
  document.getElementById('field-desc').value=d.desc||'';
  document.getElementById('field-lien').value=d.lien||'';
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
  const catId=document.getElementById('field-cat').value;
  const domain=document.getElementById('field-domain').value || 'Autres';
  const payload={
    cat: CATS.find(c=>c.id===catId)?.name || '',
    gestion: document.getElementById('field-gestion').value.trim(),
    dev: document.getElementById('field-dev').value.trim(),
    hebergement: document.getElementById('field-hebergement').value.trim(),
    tech: document.getElementById('field-tech').value.trim(),
    techColor: document.getElementById('field-techcolor').value.trim() || '#888',
    desc: document.getElementById('field-desc').value.trim(),
    lien: document.getElementById('field-lien').value.trim()
  };
  // if rename
  if(original && original!==name){
    // remove original from ITEMS and from CATS domain
    delete ITEMS[original];
    CATS.forEach(c=>c.domaines.forEach(d=>{ d.items=d.items.filter(i=>i!==original) }));
  }
  // add or update item
  ITEMS[name]=payload;
  // ensure domain exists and contains name
  const cat=CATS.find(c=>c.id===catId);
  if(cat){
    let dom=cat.domaines.find(d=>d.name===domain);
    if(!dom){ dom={name:domain,items:[]}; cat.domaines.push(dom); }
    if(!dom.items.includes(name)) dom.items.push(name);
  }
  saveState();
  // rebuild UI
  buildStats(); buildLegend(); buildCats();
  closeEditForm();
}

function deleteCurrentItem(){
  const original=document.getElementById('original-name').value;
  if(!original) return;
  if(!confirm(`Supprimer "${original}" ?`)) return;
  delete ITEMS[original];
  CATS.forEach(c=>c.domaines.forEach(d=>{ d.items=d.items.filter(i=>i!==original) }));
  saveState();
  buildStats(); buildLegend(); buildCats();
  closeEditForm();
}

// Wire up form and sidebar controls
const editModeToggle = document.getElementById('m-edit-mode');
if(editModeToggle) editModeToggle.addEventListener('change',e=>{ editMode=e.target.checked; document.getElementById('search').focus(); });
document.getElementById('field-cat').addEventListener('change',e=>populateDomainOptions(e.target.value));
document.getElementById('edit-form').addEventListener('submit',submitEditForm);
document.getElementById('cancel-edit').addEventListener('click',closeEditForm);
document.getElementById('delete-item').addEventListener('click',deleteCurrentItem);

// Sidebar export/import wiring
const mExport = document.getElementById('m-export-btn');
if(mExport) mExport.addEventListener('click',()=>exportStateToFile());
const mImportBtn = document.getElementById('m-import-btn');
const mImportFile = document.getElementById('m-import-file');
if(mImportBtn && mImportFile){
  mImportBtn.addEventListener('click',()=>mImportFile.click());
  mImportFile.addEventListener('change',e=>{ if(e.target.files && e.target.files[0]){ importStateFromFile(e.target.files[0]); } });
}

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
  // wire mobile controls to main handlers (only close sidebar automatically on mobile)
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
  // close sidebar when clicking on backdrop
  if(backdrop) backdrop.addEventListener('click', closeSidebar);
  // close sidebar with the close button
  const closeBtn = document.getElementById('sidebar-close');
  if(closeBtn) closeBtn.addEventListener('click', closeSidebar);
  // close when clicking outside the sidebar (safety)
  document.addEventListener('click', (ev)=>{
    const path = ev.composedPath ? ev.composedPath() : [];
    const clickedInsideSidebar = path.some(el => el instanceof Element && el.matches('.mobile-menu'));
    const clickedBurger = path.some(el => el instanceof Element && el.matches('#burger-btn'));
    const clickedBackdrop = path.some(el => el instanceof Element && el.matches('#sidebar-backdrop'));
    if(!clickedInsideSidebar && !clickedBurger && !clickedBackdrop){
      closeSidebar();
    }
  });

  // Do not auto-open on desktop; leave closed by default.
}

// Initialize: load from localStorage and build UI
loadState();
buildStats(); buildLegend(); buildCats();
