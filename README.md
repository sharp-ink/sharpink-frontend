# SharpInk
## Site communautaire d'écriture amateur

--------------

### Description

**Remarque préalable :** le site *SharpInk* est **totalement GRATUIT**

Ce site permet, entre autres choses :
1. De publier des textes amateurs (romans, nouvelles, poèmes, etc)
2. De lire les textes publiés par les autres membres
3. De discuter avec d'autres passionnés via un forum et un chat

### Détails techniques sur le projet

Ce site est séparé en deux parties :
* Un front-end en Angular 8
* Un back-end en Java (API REST)
#### Technologies et frameworks utilisés :
* Front-end :
  * Angular 8
  * RxJS
  * CSS 5 + Bootstrap 4
  * Icônes : Font Awesome (https://fontawesome.com/)
* Back-end :
  * Spring Boot : mise à disposition d'une API REST pour exposer les différents services nécessaires au front-end
    * Format entrée/sortie : JSON
    * Parser JSON : Jackson
    * Serveur d'application embarqué : Tomcat
  * Base de données : MySQL
