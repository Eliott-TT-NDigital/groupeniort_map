# Installation — groupeniort_map

Application web de cartographie digitale du Groupe Niort.  
Serveur Node.js pur (aucune dépendance npm), tourne sur le port 8000.

---

## Fichiers du projet

```
groupeniort_map/
├── index.html          # app principale
├── styles.css
├── app.js              # logique UI et données
├── storage.js          # persistance localStorage
├── storage_remote.js   # sync vers le serveur
├── server.js           # serveur Node.js (remplace l'ancien .py)
└── bdd.json            # état sauvegardé (créé automatiquement)
```

---

## Prérequis

- Node.js ≥ 18 installé sur la machine
- Accès sudo pour créer le service systemd

Vérifier : `node --version`

Si Node.js n'est pas installé, l'installer via nvm :

```bash
curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.7/install.sh | bash
source ~/.bashrc
nvm install 20
nvm use 20
```

---

## Installation

### 1. Déposer les fichiers

Placer le dossier `groupeniort_map/` à l'emplacement voulu, par exemple :

```bash
/home/ubuntu/groupeniort_map/
```

### 2. Tester le serveur manuellement

```bash
cd /home/ubuntu/groupeniort_map
node server.js
# → groupeniort_map server running on http://0.0.0.0:8000
```

Ouvrir http://localhost:8000 pour vérifier que l'app s'affiche correctement, puis Ctrl+C.

### 3. Créer le service systemd (démarrage automatique)

Adapter `User` et `WorkingDirectory` / `ExecStart` si le chemin ou l'utilisateur est différent.

```bash
sudo nano /etc/systemd/system/groupeniort-map.service
```

Contenu du fichier :

```ini
[Unit]
Description=groupeniort_map Node.js server
After=network.target

[Service]
Type=simple
User=ubuntu
WorkingDirectory=/home/ubuntu/groupeniort_map
ExecStart=/usr/bin/node server.js
Restart=always
RestartSec=3

[Install]
WantedBy=multi-user.target
```

> Si Node.js est installé via nvm, remplacer `/usr/bin/node` par le chemin absolu retourné par `which node`.

### 4. Activer et démarrer le service

```bash
sudo systemctl daemon-reload
sudo systemctl enable groupeniort-map
sudo systemctl start groupeniort-map
sudo systemctl status groupeniort-map
```

Le service démarre maintenant automatiquement au boot et redémarre en cas de crash.

---

## Commandes utiles

```bash
sudo systemctl status groupeniort-map    # état du service
sudo systemctl restart groupeniort-map   # redémarrer
sudo systemctl stop groupeniort-map      # arrêter
sudo journalctl -u groupeniort-map -f    # logs en temps réel
```

---

## Fonctionnement

- **Port** : 8000 (modifiable dans `server.js`, variable `PORT`)
- **Sauvegarde** : chaque modification dans l'UI fait un POST `/api/bdd` → écrit dans `bdd.json` (écriture atomique)
- **Pas de base de données**, pas de dépendances npm — Node.js seul suffit

---

## Derrière un reverse proxy (nginx)

Si le serveur est exposé via nginx, ajouter un bloc dans la config nginx :

```nginx
location /groupeniort_map/ {
    proxy_pass http://127.0.0.1:8000/;
    proxy_set_header Host $host;
}
```

Ou en accès direct sur le port 8000, ouvrir le port dans le pare-feu :

```bash
sudo ufw allow 8000/tcp
```
