// Utilities
import { Meteor } from 'meteor/meteor';
import React from 'react';
import Helmet from 'react-helmet';
import Modal from '../components/Modal.jsx';
import { intlShape, injectIntl } from 'react-intl';
import { Link } from 'react-router';

// Pages
import TextPage from '../../ui/pages/TextPage.jsx';

class AboutPage extends React.Component {
  constructor(props) {
    super(props);

    this.switchLanguage = this.switchLanguage.bind(this);
    this.renderEnglish = this.renderEnglish.bind(this);
    this.renderSpanish = this.renderSpanish.bind(this);
    this.renderFrench = this.renderFrench.bind(this);
  }

  renderEnglish() {
    return (
      <div className="page-content">
        <Helmet title="What is the World Theatre Map?"/>
        <h3>What is the World Theatre Map?</h3>
        <p>
          The World Theatre Map is a user-generated directory and real time map of the global theatre community. It’s a digital <a href="https://en.wikipedia.org/wiki/Commons-based_peer_production" target="_blank">commons</a>, free and open to all. The World Theatre Map aims to make the field visible to itself by providing a collectively-owned, people-powered infrastructure to connect isolated theatremakers to vital information resources and knowledge.
        </p>
        <p>
          <a href="http://www.howlround.com/" target="_blank">HowlRound</a> has developed and is launching <a href="https://www.worldtheatremap.org/en" target="_blank">The World Theatre Map</a> in collaboration with the Global Theater Initiative, a partnership between <a href="http://www.tcg.org" target="_blank">Theatre Communications Group</a> and the <a href="https://globallab.georgetown.edu/" target="_blank">Laboratory for Global Performance and Politics</a>
        </p>
        <h3>Who is it for?</h3>
        <p>
          It’s for everyone! All types of theatremakers, theatre companies, and theatre institutions around the world.
        </p>
        <h3>What can I use it for?</h3>
        <p>
          You can create a profile for yourself, or any other people or organizations you know about. This profile will immediately become a part of the searchable directory. You can add information about shows and festivals that you (or others) have worked on or will be working on. Show profiles and festival profiles will display all of the production history of that piece, linking together disparate performances into a timeline of its journey. You can search the ever-growing directory to discover and connect to organizations, people, shows, and events. You can see what theatre is happening today around the world. You can read and watch HowlRound journal and video content related to a person or organization on the World Theatre Map.
        </p>
        <p>
          Most importantly, right now, you can post comments in the user-forum about new ideas for how an online resource like the World Theatre Map can best serve urgent needs that you have.
        </p>
        <h3>Why am I only finding it now?</h3>
        <p>It’s brand new!</p>
        <p>
          We are conducting a public beta period of Version 1 of the World Theatre Map from 15 January 2017 - 30 June 2018. What we see in the public beta Version 1 is a “first draft” based on the field’s experience and recommendations. What we are seeking in this eighteen-month period is to have the field react and discover how we can get even more specific and effective in addressing a challenge that theatremakers are facing in their local and global contexts. This <a href="https://worldtheatremap.useresponse.com/" target="_blank">feedback</a> will shape Version 2 of the World Theatre Map.
        </p>
        <h3>What are the goals for this public beta period?</h3>
        <p>
          We aim to:
          <ol>
            <li>Achieve a rich diversity and large quantity of information about theatre organizations, theatremakers, and events.</li>
            <li>Engage a diverse and large quantity of theatremakers who are accessing this knowledge resource.</li>
            <li>Get participation in building and evolving the website’s features and utility.</li>
          </ol>
        </p>
        <h3>Development History</h3>
        <p>
          We began building The World Theatre Map in January 2016. You can read more about our development process <a href="http://howlround.com/search?f%5B0%5D=field_post_tags%3A464" target="_blank">here</a>. </p>
        <h3>I participated in The New Play Map. How does this project relate?</h3>
        <p>
          The World Theatre Map is an entirely new project. The New Play Map is now sunsetted. However, we have migrated all of the data that was in The New Play Map over to The World Theatre Map so you can see everything that was in The New Play Map here!
        </p>
        <h3>I’d like to invite people to join the World Theatre Map. How can I get the word out?</h3>
        <p>
          <a href="https://docs.google.com/document/d/1DV5EjPolQrw8H1gNnpaXon9pvQ3TyqG_gqHwcmUXkBA/edit" target="_blank">Download this sample email template</a>, and modify as you see fit! You can also share your profile on social media and encourage folks to join that way!
        </p>
        <h3>The site is in English, Spanish, French. How does the translation work?</h3>
        <p>
          New content is machine translated from English to Spanish and French, and vice versa. Any user can edit content and make translations better, and we hope you will!
        </p>
        <h3>I want to adapt, modify, or use the World Theatre Map’s data and have access to its software codebase for free!</h3>
        <p>
          Contact <a href="mailto:map@howlround.com">map@howlround.com</a> for more information, and access the <a href="https://github.com/howlround" target="_blank">open source codebase and API on GitHub.</a>
        </p>
        <h3>How can I help improve the map, or give feedback?</h3>
        <p>
          Use the <a href="https://worldtheatremap.useresponse.com/" target="_blank">community forum here</a> to post an idea, problem, question, or story about how the Map is impacting you.
        </p>
        <h3>I have a question you didn’t answer or want to talk to you about the World Theatre Map.</h3>
        <p>
          Email us at <a href="mailto:map@howlround.com" target="_blank">map@howlround.com</a>!
        </p>
        <p>
          <a href="https://www.worldtheatremap.org/en/join">Create an account</a> in order to edit and add to the World Theatre Map.
        </p>
      </div>
    );
  }

  renderSpanish() {
    return (
      <div className="page-content">
        <Helmet title="¿Qué es el Mapa Mundial del Teatro?" />
        <h3>¿Qué es el Mapa Mundial del Teatro?</h3>
        <p>
          El Mapa Mundial de Teatro es un directorio y un mapa creado por los usuarios que ubica, en tiempo real, a la comunidad de teatro a nivel mundial. Es un espacio <a href="https://es.wikipedia.org/wiki/Creative_Commons#Licencias" target="_blank">común</a> digital, libre y abierto a todos. El Mapa Mundial de Teatro intenta hacer que el campo sea visible para sí mismo ofreciendo una infraestructura de propiedad colectiva, impulsada por personas para conectar a los teatros y artistas aislados con los vitales recursos y conocimientos de información.
        </p>
        <p>
          <a href="http://www.howlround.com/" target="_blank">HowlRound</a> ha desarrolló y lanzó el <a href="http://www.worldtheatremap.org/es" target="_blank">Mapa Mundial de Teatro</a> en colaboración con el Global Theatre Initiative, una asociación entre el <a href="http://www.tcg.org/" target="_blank">Theatre Communications Group</a> y el <a href="https://globallab.georgetown.edu/" target="_blank">Laboratory for Global Performance and Politics</a>.
        </p>
        <h3>¿Para quién?</h3>
        <p>
          ¡Es para todos! Todo tipo de teatristas, compañías de teatro e instituciones de teatro de todo el mundo.
        </p>
        <h3>¿Para qué puedo usarlo?</h3>
        <p>
          Puede crear un perfil para usted o cualquier otra persona u organización que conozca. Este perfil se convertirá inmediatamente parte del directorio de búsqueda. Puede agregar información acerca de las funciones en las que usted (u otras personas) han trabajado o trabajarán. Los perfiles de las presentaciones mostrarán todo el historial de producción de esa pieza, enlazando eventos dispares en una sola línea de tiempo de su trayecto. Puede buscar en nuestro directorio que siempre está creciendo para descubrir y conectar con organizaciones, personas, presentaciones y eventos. Puede ver qué está sucediendo en el mundo de teatro el día de hoy en cualquier parte del mundo. Puede leer y ver contenidos de HowlRound relacionados con una persona u organización en el Mapa Mundial de Teatro.
        </p>
        <p>
          Más importante, ahora mismo, puede publicar comentarios en el foro de usuarios sobre nuevas ideas de cómo un recurso en línea como el Mapa Mundial de Teatro puede servir mejor las necesidades urgentes que tiene usted.
        </p>
        <h3>¿Por qué sólo lo encuentro ahora?</h3>
        <p>¡Es completamente nuevo!</p>
        <p>
          Estamos dirigiendo un período beta público de la Versión 1 del Mapa Mundial de Teatro desde el 15 de enero del 2017 hasta el 30 de junio del 2018. Lo que vemos en esta primera versión beta pública es el “primer borrador” que se basa en la experiencia y recomendaciones del campo profesional. Lo que estamos buscando en este período de dieciocho meses es hacer que el campo profesional reaccione y descubra cómo podemos ser aún más específicos y efectivos al enfrentar un desafío que los artistas de teatro están enfrentando en contextos locales y globales. Está información dará forma a la Versión 2 del Mapa Mundial de Teatro.
        </p>
        <h3>¿Cuáles son los objetivos de este período beta público?</h3>
        <p>
          Apuntamos a:
          <ol>
            <li>Lograr una gran diversidad y gran cantidad de información sobre organizaciones de teatro, teatros y eventos.</li>
            <li>Involucrar una cantidad diversa y grande de teatros que están accediendo a este recurso de conocimiento.</li>
            <li>Obtener participación en la construcción y evolución de las características y la utilidad de la página web.</li>
          </ol>
        </p>
        <h3>Historia del desarrollo</h3>
        <p>
          Empezamos a construir el Mapa Mundial de Teatro en enero del 2016. Puede leer más sobre nuestro proceso de desarrollo.
        </p>
        <h3>Participé en The New Play Map. ¿Cómo se relaciona este proyecto?</h3>
        <p>
          El Mapa Mundial de Teatro es un proyecto totalmente nuevo. The New Play Map se ha cerrado. Sin embargo, hemos migrado todos los datos que estaban en The New Play Map al Mapa Mundial de Teatro para que pueda ver todo lo que estaba en The New Play Map aquí!
        </p>
        <h3>Me gustaría invitar personas a unirse al Mapa Mundial de Teatro. ¿Cómo puedo comunicarlo?</h3>
        <p>
          !<a href="https://docs.google.com/document/d/1DV5EjPolQrw8H1gNnpaXon9pvQ3TyqG_gqHwcmUXkBA/edit" target="_blank">Descargue esta plantilla de correo electrónico de ejemplo</a> y modifíquela como mejor le parezca! También puede compartir su perfil en las redes sociales y animar a la gente a unirse de esa manera.
        </p>
        <h3>La página está en inglés, español, francés. ¿Cómo funciona la traducción?</h3>
        <p>
          El nuevo contenido es traducido automáticamente del inglés al español y francés, y viceversa. Cualquier usuario puede editar el contenido y mejorar las traducciones, ¡y esperamos que usted lo haga!
        </p>
        <h3>¡Quiero adaptar, modificar o usar la data del Mapa Mundial de Teatro y tener acceso al código de base del software sin costo!</h3>
        <p>
          Contacte a <a href="mailto:map@howlround.com" target="_blank">map@howlround.com</a> para más información, y acceda al <a href="https://github.com/howlround" target="_blank">código de base y el API en GitHub</a>.
          </p>
        <h3>¿Cómo puedo ayudar a mejorar el mapa, o dar mi opinión?</h3>
        <p>
          Utilice el <a href="https://worldtheatremap.useresponse.com/" target="_blank">foro de la comunidad aquí</a> para publicar una idea, un problema, una pregunta o una historia sobre cómo el mapa le está impactando.
        </p>
        <h3>Tengo una pregunta que no se ha contestado o quisiera hablarte acerca del Mapa Mundial de Teatro.</h3>
        <p>
          ¡Envíenos un correo electrónico a <a href="mailto:map@howlround.com">map@howlround.com</a>!
        </p>
        <p>
          <a href="https://www.worldtheatremap.org/en/join">Crea una cuenta</a> para poder editar y agregar al Mapa Mundial de Teatro.
        </p>
      </div>
    );
  }

  renderFrench() {
    return (
      <div className="page-content">
        <Helmet title="Qu’est-ce que la Carte mondiale du théâtre ?" />
        <h3>Qu’est-ce que la Carte mondiale du théâtre ?</h3>
        <p>
          La Carte mondiale du théâtre est à la fois un répertoire et une carte géographique en temps réel générés par leurs utilisatrices et utilisateurs de la communauté théâtrale internationale. C’est une <a href="https://fr.wikipedia.org/wiki/Creative_Commons" target="_blank">agora</a> numérique, gratuite et ouverte à tous. La Carte mondiale du théâtre vise à créer une vitrine pour la sphère théâtrale en fournissant une infrastructure de propriété collective, alimentée par ses intervenants, afin de rompre l’isolement des artistes en les mettant en contact avec des connaissances et des ressources d’informations vitales.
        </p>
        <p>
          <a href="http://www.howlround.com/" target="_blank">HowlRound</a> a développé et lancé la <a href="http://www.worldtheatremap.org/fr" target="_blank">Carte mondiale du théâtre</a> en collaboration avec le Global Theater Initiative, un partenariat entre le <a href="http://www.tcg.org/" target="_blank">Theatre Communications Group</a> et le <a href="https://globallab.georgetown.edu/" target="_blank">Laboratory for Global Performance and Politics</a>.
        </p>
        <h3>À qui ça s’adresse ?</h3>
        <p>
          C’est pour tout le monde ! Pour les créateurs de théâtre, les compagnies et les établissements d’enseignement en tout genre sur la planète.
        </p>
        <h3>À quelles fins puis-je l’utiliser ?</h3>
        <p>
          Vous pouvez créer un profil, pour vous-même ou pour toute autre personne et organisation de votre connaissance. Ce profil sera immédiatement intégré au répertoire de recherche. Vous pouvez ajouter de l’information à propos de spectacles et de festivals sur lesquels vous (ou d’autres personnes) avez travaillé. Les profils de spectacles et de festivals afficheront l’historique complet de l’événement, reliant les différentes représentations dans une chronologie de son parcours. Vous pourrez chercher dans le répertoire en expansion constante pour découvrir des organisations, des personnes, des spectacles et des événements ou pour vous connecter à leur profil. Vous pouvez voir les actualités internationales de la journée au théâtre. Vous pouvez lire le contenu journalistique et vidéo de HowlRound relié à une personne ou à une organisation, directement sur la Carte mondiale du théâtre.
        </p>
        <p>
          Mais avant tout, vous pouvez dès maintenant publier vos nouvelles idées dans le forum des utilisateurs, afin qu’une ressource en ligne comme la Carte mondiale du théâtre puisse mieux répondre à vos besoins immédiats.
        </p>
        <h3>Pourquoi est-ce que je le découvre seulement aujourd’hui?</h3>
        <p>C’est tout nouveau !</p>
        <p>
          Nous réalisons une période bêta publique de la version 1 de la Carte mondiale du théâtre, entre le 15 janvier 2017 et le 30 juin 2018. Nous considérons cette première version bêta publique comme une « ébauche » élaborée à partir d’expériences et de recommandations du milieu. Au cours de cette période de dix-huit mois, nous cherchons les réactions et la collaboration de la communauté pour nous aider à trouver une meilleure efficacité et une plus grande pertinence dans notre réponse aux difficultés rencontrées par les créateurs de théâtre, tant sur la scène locale qu’internationale. Cette rétroaction façonnera la deuxième version de la Carte mondiale du théâtre.
        </p>
        <h3>Quels sont les objectifs de cette période bêta publique ?</h3>
        <p>
          Nous visons à :
          <ol>
            <li>Atteindre une riche diversité et une grande quantité d’informations sur les organisations de théâtre, les créateurs de théâtre, les spectacles et les festivals ;</li>
            <li>Encourager l’implication d’un nombre important et diversifié d’artistes ayant accès à cette ressource d’information ;</li>
            <li>Susciter la participation à la construction et à l’évolution des fonctions et de l’utilité du site Web.</li>
          </ol>
        </p>
        <h3>Historique de réalisation</h3>
        <p>
          Nous avons commencé à mettre sur pied la Carte mondiale du théâtre en janvier 2016. Vous pouvez lire davantage d’informations sur notre <a href="http://howlround.com/search?f%5B0%5D=field_post_tags%3A464" target="_blank">processus de réalisation ici</a>.
        </p>
        <h3>J’ai participé à « The New Play Map ». En quoi ce projet-ci y est-il relié ?</h3>
        <p>
          La Carte mondiale du théâtre est un tout nouveau projet. Bien que « The New Play Map » soit maintenant fermé, nous avons transféré toutes les informations qui y étaient enregistrées afin de les rendre accessibles dans la Carte mondiale du théâtre.
        </p>
        <h3>J’aimerais inviter des gens à s’inscrire à la Carte mondiale du théâtre. Comment puis-je communiquer l’information ?</h3>
        <p>
          !<a href="https://docs.google.com/document/d/1DV5EjPolQrw8H1gNnpaXon9pvQ3TyqG_gqHwcmUXkBA/edit" target="_blank">Téléchargez ce modèle de courriel</a> et modifiez-le comme bon vous semble ! Vous pouvez également partager votre profil sur les médias sociaux pour encourager vos amis à s’inscrire !
        </p>
        <h3>Le site est en anglais, en espagnol et en français. Comment fonctionne la traduction ?</h3>
        <p>
          Le nouveau contenu est traduit de l’anglais vers l’espagnol ou le français (et vice versa) par un outil informatisé. Toutes les utilisatrices et tous les utilisateurs peuvent modifier le contenu et améliorer les traductions. Nous souhaitons que vous le fassiez !
        </p>
        <h3>Je souhaite adapter, modifier ou utiliser les données de la Carte mondiale du théâtre et accéder gratuitement au code source du logiciel !</h3>
        <p>
          Contactez <a href="mailto:map@howlround.com">map@howlround.com</a> pour plus d’informations et pour avoir accès au <a href="https://github.com/howlround" target="_blank">code source ouvert et aux API ouvertes sur GitHub</a>.
          </p>
        <h3>Comment puis-je contribuer à améliorer la Carte, ou donner mon avis ?</h3>
        <p>
          Utilisez le <a href="https://worldtheatremap.useresponse.com/" target="_blank">forum de la communauté ici</a> pour publier une idée, signaler un problème, poser une question ou partager votre expérience de la Carte mondiale du théâtre.
        </p>
        <h3>Si j’ai une question à laquelle vous n’avez pas répondu, ou si je veux discuter avec vous de la Carte mondiale du théâtre ?</h3>
        <p>
          Écrivez-nous à <a href="mailto:map@howlround.com">map@howlround.com</a>!
        </p>
        <p>
          <a href="https://www.worldtheatremap.org/fr/join" target="_blank">Créez un compte</a> pour modifier et ajouter des éléments sur la Carte mondiale du théâtre.
        </p>
      </div>
    );
  }

  switchLanguage() {
    const { locale } = this.props.intl;

    switch (locale) {
      case 'fr':
        return this.renderFrench();
        break;
      case 'es':
        return this.renderSpanish();
        break;
      default:
        return this.renderEnglish();
    }
  }

  render() {
    return (
      <TextPage renderFunction={this.switchLanguage} />
    );
  }
}

AboutPage.propTypes = {
  intl: intlShape.isRequired,
};

AboutPage.contextTypes = {
  router: React.PropTypes.object,
};

export default injectIntl(AboutPage);
