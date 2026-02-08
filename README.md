# 🧠 Node Graph

**Node Graph** est une librairie front-end légère basée sur **Web Components** permettant de créer facilement des graphes interactifs et stylisables.

Elle a été pensée pour être :

✅ Ultra simple à utiliser
✅ Sans dépendances
✅ Facilement personnalisable
✅ Performante
✅ Réutilisable dans n’importe quel projet

---

# 🚀 Installation

Télécharge simplement le fichier :

```
node-graph.js
```

Puis ajoute-le à ta page :

```html
<script src="node-graph.js"></script>
```

👉 Aucun build
👉 Aucun npm
👉 Aucun framework
👉 Plug & play

---

# ⚡ Quick Start (30 secondes)

## 1️⃣ Ajouter le canvas

```html
<node-canvas></node-canvas>
```

Le `node-canvas` est la surface où seront dessinés :

* les nodes
* les connexions

---

## 2️⃣ Ajouter des nodes

```html
<node-canvas>

    <node-item id="A">Start</node-item>
    <node-item id="B">Dashboard</node-item>

</node-canvas>
```

⚠️ **Chaque node doit avoir un `id` unique.**

---

## 3️⃣ Connecter les nodes

Utilise l’attribut :

```
to="idDuNode"
```

### Exemple :

```html
<node-item id="A" to="B">
    Register
</node-item>
```

Résultat :

```
A --------> B
```

---

## 🔗 Connecter plusieurs nodes

Sépare simplement les ids avec une virgule :

```html
<node-item id="B" to="C,D,E"></node-item>
```

---

# 📍 Positionner les nodes

Les nodes utilisent un **positionnement absolu**.

```html
<node-item
    id="A"
    style="left:100px; top:150px;">
</node-item>
```

👉 Tu es totalement libre du layout.

---

# 🖱 Drag & Drop

Les nodes sont :

✅ Déplaçables
✅ Fluides
✅ Sauvegardés automatiquement

La position est stockée dans :

```
localStorage
```

Donc un refresh **ne casse pas ton layout.**

---

# 🎨 Personnalisation

Node Graph repose sur des **CSS variables**.

👉 Tu peux modifier le style sans toucher au JavaScript.

---

## 🎨 Styliser le canvas

```css
node-canvas{

    --node-bg:#0f172a;
    --line-color:#38bdf8;
    --line-width:3;

    height:80vh;
}
```

---

## 🎨 Styliser les nodes

```css
node-item{

    --node-bg:white;
    --node-border:2px solid #38bdf8;
    --radius:12px;

}
```

---

# 🧪 Exemple complet

```html
<!DOCTYPE html>
<html>
<head>
<meta charset="UTF-8">

<script src="node-graph.js"></script>

<style>

node-canvas{
    height:80vh;
    --line-color:#2563eb;
}

node-item{
    --node-border:2px solid #2563eb;
}

</style>
</head>

<body>

<node-canvas>

    <node-item id="start" to="dashboard"
        style="left:100px;top:200px;">
        Register
    </node-item>

    <node-item id="dashboard"
        to="shop,leave"
        style="left:400px;top:200px;">
        Dashboard
    </node-item>

    <node-item id="shop"
        style="left:750px;top:80px;">
        Shop
    </node-item>

    <node-item id="leave"
        style="left:750px;top:350px;">
        Exit
    </node-item>

</node-canvas>

</body>
</html>
```

---

# 🧠 Bonnes pratiques

## ✅ Toujours utiliser des ids uniques

❌ Mauvais :

```
id="node"
id="node"
```

✅ Bon :

```
id="node-register"
```

---

## ✅ Éviter les graphes gigantesques

Cette librairie est idéale pour :

* User flows
* Architecture d’application
* Mind maps
* Workflows
* Graphes de dépendances

👉 **Recommandé : 10 → 80 nodes**

---

## ✅ Styliser via CSS — jamais via le JS

Garde toujours la librairie :

👉 légère
👉 générique
👉 maintenable

---

# 📁 Structure de projet recommandée

```
project/

node-graph.js
index.html
style.css
```

---

# ⚠️ Limitations actuelles

Core volontairement minimal.

Pas encore :

❌ Zoom / Pan
❌ Auto layout
❌ Minimap
❌ Labels sur les liens
❌ Connexions bidirectionnelles

*(Faciles à ajouter si besoin.)*

---

# 🐛 Troubleshooting

## Rien ne s’affiche

👉 Vérifie que le script est bien chargé.

---

## Les lignes sont décalées

⚠️ N’applique pas de `transform` CSS sur :

```
node-canvas
```

Exemples problématiques :

* scale
* rotate
* translate

---

## Les nodes se déplacent mal

Vérifie que leur position est bien :

```
position:absolute
```

---

# 🔥 Roadmap (idées d’évolution)

* ⭐ Auto layout intelligent
* ⭐ Zoom infini
* ⭐ Pan
* ⭐ Connecteurs visuels
* ⭐ Labels sur les edges
* ⭐ Mode readonly
* ⭐ Export / Import JSON
* ⭐ Animations de liens

---

# 💡 Philosophie

Node Graph suit une règle simple :

> **Core minimal — puissance maximale.**

Ne transforme pas la librairie en usine.

Les meilleurs outils sont souvent :

👉 petits
👉 rapides
👉 prévisibles

---

# 📜 Licence

Libre d’utilisation pour projets personnels et commerciaux.

*(Ajoute ici la licence de ton choix : MIT recommandé.)*
