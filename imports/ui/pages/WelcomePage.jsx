// Utilities
import { Meteor } from 'meteor/meteor';
import React from 'react';
import Helmet from 'react-helmet';
import Modal from '../components/Modal.jsx';
import { intlShape, injectIntl } from 'react-intl';

// Pages
import TextPage from '../../ui/pages/TextPage.jsx';

class WelcomePage extends React.Component {
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
        <Helmet title="Welcome" />
        <h3>Welcome and thank you for becoming an editor of the World Theatre Map!</h3>
        <p>
          Now that you have a login, Here are some actions that you can take:
          <ul>
            <li>Improve the directory by adding and completing profiles for other people, organizations, festivals, and shows that you have knowledge about. Do research on other websites or ask your network of colleagues for information that you want to add for them. Use publicly available information, and don’t forget to add yourself, of course!
            </li>
            <li>Improve, edit, and add shows and festivals from the past as well as shows and festivals that will happen in the future. This will help create a history of past shows or festivals.</li>
            <li>Subscribe to any page to receive email updates of new edits.</li>
            <li>Share your directory search results and share profiles pages on Facebook and Twitter.</li>
            <li><a href="http://howlround.com/subscribe">Subscribe</a> to HowlRound Theatre Commons—which is the organization behind the World Theatre Map—and learn how <a href="http://howlround.com/participate">to participate</a> in producing for its other projects. Honorariums are available.</li>
          </ul>
        </p>
        <p>
          Help and feedback:
          <ul>
            <li>Read the <a href="https://www.worldtheatremap.org/en/about">About page</a>.
            </li>
            <li>Watch the World Theatre Map <a href="https://www.youtube.com/playlist?list=PLKf2gbopdbvAa9PkxNZxdGOk7w-XFRpN4">how-to videos</a>.</li>
            <li>Ask a question or report a problem in the <a href="https://worldtheatremap.useresponse.com/">user forum</a> or by email <a href="mailto:map@howlround.com">map@howlround.com</a></li>
          </ul>
        </p>
      </div>
    );
  }

  renderSpanish() {
    return (
      <div className="page-content">
        <Helmet title="Welcome" />
        <h3>¡Bienvenido y gracias por convertirse en un editor del Mapa Mundial de Teatro!</h3>
        <p>
          Ahora que tiene su cuenta, aquí están algunas de las acciones que puede tomar:
          <ul>
            <li>Mejore el directorio añadiendo y rellenando perfiles para otras personas, organizaciones, festivales y funciones que conozca. Investiga en otros sitios web o pregúntele a sus colegas por la información que le gustaría agregar. Use información que esté disponible al público, y no olvide de agregarse a usted mismo!
            </li>
            <li>Mejore, edite y agregue presentaciones y festivales del pasado como también presentaciones y festivales que ocurrirán en el futuro. Esto ayudará a crear un historial de presentaciones y festivales pasados.</li>
            <li>Suscribase a cualquier página para recibir notificaciones por email de nuevas modificaciones.</li>
            <li>Comparta los resultados de su búsqueda en el directorio y comparta las páginas de perfiles en Facebook y Twitter.</li>
            <li><a href="http://howlround.com/subscribe">Suscribase</a> a Howlround Theatre Commons—la organización detrás del Mapa Mundial de Teatro - y conozca sobre cómo <a href="http://howlround.com/participate">participar</a> en el desarrollo de sus otros proyectos. Hay honorarios disponibles.</li>
          </ul>
        </p>
        <p>
          Ayuda y comentarios:
          <ul>
            <li>Lea la página: <a href="https://www.worldtheatremap.org/es/about">¿Quienes somos?</a>.
            </li>
            <li><a href="https://www.youtube.com/playlist?list=PLKf2gbopdbvDigHv0SHFpsWaGv7ehOVIo">Vea los videos de guía del Mapa Mundial de Teatro</a>.</li>
            <li>Déjenos sus preguntas o reporte algún problema en nuestro <a href="https://worldtheatremap.useresponse.com/">foro de usuarios o por email</a> o por email <a href="mailto:map@howlround.com">map@howlround.com</a></li>
          </ul>
        </p>
      </div>
    );
  }

  renderFrench() {
    return (
      <div className="page-content">
        <Helmet title="Bienvenue" />
        <h3>Bienvenue, et merci d’être devenu membre-rédacteur de la Carte mondiale du théâtre !</h3>
        <p>
          Maintenant que vous avez un identifiant, voici certaines actions que vous pouvez faire :
          <ul>
            <li>Améliorez le répertoire en ajoutant et en complétant les profils de personnes, organisations, festivals et spectacles que vous connaissez. Faites vos recherches sur d’autres sites Web ou demandez à votre réseau de collègues les informations que vous souhaitez recueillir à leur propos. Utilisez des renseignements publics, et n’oubliez pas de vous inscrire, bien sûr !
            </li>
            <li>Améliorez, modifiez et ajoutez les spectacles et festivals passés de même que ceux à venir, afin de contribuer à créer leur historique.</li>
            <li>Abonnez-vous à n’importe quelle page pour recevoir par courriel les mises à jour des modifications.</li>
            <li>Partagez vos résultats de recherche sur le répertoire et partagez vos pages de profil sur Facebook et Twitter.</li>
            <li><a href="http://howlround.com/subscribe">Inscrivez-vous</a> à l’agora théâtrale HowlRound—l’organisation à l’origine de la Carte mondiale du théâtre—et apprenez comment <a href="http://howlround.com/participate">participer</a> à la production de ses autres projets. Des honoraires sont prévus.</li>
          </ul>
        </p>
        <p>
          Aide et rétroaction :
          <ul>
            <li>Lisez la <a href="https://www.worldtheatremap.org/fr/about">page « À propos »</a>.
            </li>
            <li>Regardez les <a href="https://www.youtube.com/playlist?list=PLKf2gbopdbvDUR6k1wZUauPoOPfm0-Hv5">vidéos didactiques</a> de la Carte mondiale du théâtre.</li>
            <li>Posez vos questions ou signalez un problème sur le forum <a href="https://worldtheatremap.useresponse.com/">des utilisateurs</a> ou par courriel <a href="mailto:map@howlround.com">map@howlround.com</a></li>
          </ul>
        </p>
      </div>
    );
  }

  switchLanguage() {
    const { locale } = this.props.intl;

    switch (locale) {
      case 'es':
        return this.renderSpanish();
        break;
      case 'fr':
        return this.renderFrench();
        break;
      default:
        return this.renderEnglish();
    }
  }

  render() {
    const { locale } = this.props.intl;

    return (
      <TextPage
        renderFunction={this.switchLanguage}
        redirect={`/${locale}`}
      />
    );
  }
}

WelcomePage.propTypes = {
  intl: intlShape.isRequired,
};

WelcomePage.contextTypes = {
  router: React.PropTypes.object,
};

export default injectIntl(WelcomePage);
