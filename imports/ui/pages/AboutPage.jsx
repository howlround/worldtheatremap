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
  }

  renderEnglish() {
    return (
      <div className="page-content">
        <Helmet title="What is the World Theatre Map?" />
        <h3>What is the World Theatre Map?</h3>
        <p>
          The World Theatre Map is a user-generated directory and real time map of the global theatre community. It’s a digital <a href="https://en.wikipedia.org/wiki/Commons-based_peer_production">commons</a>, free and open to all. The World Theatre Map aims to make the field visible to itself by providing a collectively-owned, people-powered infrastructure to connect isolated theatremakers to vital information resources and knowledge.
        </p>
        <p>
          The World Theatre Map is a project of <a href="http://www.howlround.com/">HowlRound</a>, a knowledge commons by and for the theatre community. We are launching <a href="http://www.worldtheatremap.org/">The World Theatre Map</a> with the support of the Global Theater Initiative, a partnership between <a href="http://www.tcg.org/">Theatre Communications Group</a> and the <a href="https://globallab.georgetown.edu/">Laboratory for Global Performance and Politics</a>.
        </p>
        <h3>Who is it for?</h3>
        <p>
          It’s for everyone! All types of theatremakers, theatre companies, and theatre institutions around the world.
        </p>
        <h3>What can I use it for?</h3>
        <p>
          You can create a profile for yourself, or any other people or organizations you know about. This profile will immediately become a part of the searchable directory. You can add information about shows you (or others) have worked on or will be working on. Show profiles will display all of the production history of that piece, linking together disparate events into a timeline of its journey. You can search the ever-growing directory to discover and connect to organizations, people, shows, and events. You can see what theatre is happening today around the world. You can read and watch HowlRound content related to a person or organization on the World Theatre Map.
        </p>
        <p>
          Most importantly, right now, you can post comments in the user-forum about new ideas for how an online resource like the World Theatre Map can best serve urgent needs that you have.
        </p>
        <h3>Why am I only finding it now?</h3>
        <p>It’s brand new!</p>
        <p>
          We are conducting a public beta period of Version 1 of the World Theatre Map from 15 January 2017 - 30 June 2017. What we see in the public beta version one is a “first draft” based on the  field’s experience and recommendations. What we are seeking in this six-month period is to have the field react and discover how we can get even more specific and effective in addressing a challenge that theatremakers are facing in their local and global contexts. This <a href="https://worldtheatremap.useresponse.com/">feedback</a> will shape Version 2 of the World Theatre Map.
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
          We began building The World Theatre Map in January 2016. You can read more about our development process <a href="http://howlround.com/search?f%5B0%5D=field_post_tags%3A464">here</a>.
        </p>
        <h3>Development Future</h3>
        <p>
          We plan to build Version 2 of the World Theatre Map July 2017 - December 2017. The majority of Version 2’s features will be determined by <a href="https://worldtheatremap.useresponse.com/">feedback from users</a> in the Version 1 beta period. In Version 2, we hope to make the site available in more languages (such as Arabic, French, Chinese, Russian—the official working languages of United Nations), and we hope to reach full conformance with Level AA of the <a href="https://www.w3.org/TR/WCAG20/">W3C Web Content Accessibility Guidelines 2.0</a>.
        </p>
        <h3>I participated in The New Play Map. How does this project relate?</h3>
        <p>
          The World Theatre Map is an entirely new project. The New Play Map is now sunsetted. However, we have migrated all of the data that was in The New Play Map over to The World Theatre Map so you can see everything that was in The New Play Map here!
        </p>
        <h3>I run a network or service organization, or have a group of people I’d like to invite to join the World Theatre Map. How can I get the word out? </h3>
        <p>
          <a href="https://docs.google.com/document/d/1DV5EjPolQrw8H1gNnpaXon9pvQ3TyqG_gqHwcmUXkBA/edit">Download this sample email template</a>, and modify as you see fit! You can also share your profile on social media and encourage folks to join that way!
        </p>
        <h3>The site is in English and Spanish. How does the translation work?</h3>
        <p>
          New content is machine translated from English to Spanish and vice versa. Any user can edit content and make translations better, and we hope you will!
        </p>
        <h3>How can I help improve the map, or give feedback?</h3>
        <p>
          Use the <a href="https://worldtheatremap.useresponse.com/">community forum here</a> to post an idea, problem, question, or story about how the Map is impacting you.
        </p>
        <h3>I have a question you didn’t answer or want to talk to you about the World Theatre Map.</h3>
        <p>
          Email us at <a href="map@howlround.com">map@howlround.com</a>!
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
          El Mapa Mundial de Teatro es un directorio generado por el usuario y un mapa en tiempo real de la comunidad teatral en el mundo. Es un espacio común digital, libre y abierto a todos. El Mapa Mundial de Teatro intenta hacer que el campo sea visible para sí mismo ofreciendo una infraestructura de propiedad colectiva, impulsada por personas, para conectar a los teatros y artistas aislados con los vitales recursos y conocimientos de información.
        </p>
        <p>
          El Mapa Mundial de Teatro es un proyecto de <a href="http://www.howlround.com/">HowlRound</a>, un espacio de conocimiento digital por y para la comunidad de teatro. Estamos lanzando el <a href="http://www.worldtheatremap.org/es">Mapa Mundial de Teatro</a> con el apoyo de la Global Theater Initiative, una asociación entre <a href="http://www.tcg.org/">Theatre Communications Group</a> y el <a href="https://globallab.georgetown.edu/">Laboratory for Global Performance and Politics</a>.
        </p>
        <h3>¿Para quién?</h3>
        <p>
          ¡Es para todos! Todo tipo de teatristas, compañías de teatro e instituciones de teatro de todo el mundo.
        </p>
        <h3>¿Para qué puedo usarlo?</h3>
        <p>
          Puede crear un perfil para usted o cualquier otra persona u organización que conozca. Este perfil se convertirá inmediatamente en una parte del directorio para buscar. Puede agregar información acerca de las funciones en las que ha trabajado o trabajará. Los perfiles de presentaciones mostrará toda la historia de producción de esa pieza, enlazando eventos dispares en una línea de tiempo de su experiencia. Puede buscar en el directorio en expansión para descubrir y conectarse a organizaciones, personas, programas y eventos. Usted puede ver qué está sucediendo en el día de hoy en los teatros alrededor del mundo. Puede leer y ver el contenido de HowlRound relacionado con una persona u organización en el Mapa Mundial del Teatro.
        </p>
        <p>
          Más importante, ahora mismo, puede publicar comentarios en el foro de usuarios sobre nuevas ideas de cómo un recurso en línea como el Mapa Mundial de Teatro puede servir mejor las necesidades urgentes que tienes.
        </p>
        <h3>¿Por qué sólo lo encuentro ahora?</h3>
        <p>¡Es completamente nuevo!</p>
        <p>
          Estamos llevando a cabo un período beta público de la Versión 1 del Mapa Mundial de Teatro desde el 15 de enero de 2017 al 30 de junio de 2017. Lo que vemos en esta primera versión beta pública es un "primer borrador" basado en la experiencia y recomendaciones del campo. Lo que estamos buscando en este período de seis meses es hacer que el campo reaccione y descubra cómo podemos ser aún más específicos y efectivos al enfrentar el desafío que los artistas de teatro están enfrentando en contextos locales y globales. Está información dará forma a la Versión 2 del Mapa Mundial del Teatro.
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
          Empezamos a construir The World Theatre Map en enero de 2016. Aquí puede leer más sobre nuestro proceso de desarrollo.
        </p>
        <h3>Desarrollo Futuro</h3>
        <p>
          Planeamos construir la Versión 2 del Mapa Mundial de Teatro Julio 2017 - Diciembre 2017. La mayoría de las características de la Versión 2 serán determinadas por la experiencia de los usuarios en el período beta de la Versión 1. En la versión 2 esperamos que la página esté disponible en más idiomas (como árabe, francés, chino, ruso - los idiomas de trabajo oficiales de las Naciones Unidas) y esperamos alcanzar conformidad plena con el nivel AA del W3C Web Content Accessibility Directrices 2.0.
        </p>
        <h3>Participé en The New Play Map. ¿Cómo se relaciona este proyecto?</h3>
        <p>
          El Mapa Mundial de Teatro es un proyecto totalmente nuevo. The New Play Map se ha cerrado. Sin embargo, hemos migrado todos los datos que estaban en The New Play Map al Mapa Mundial de Teatro para que pueda ver todo lo que estaba en The New Play Map aquí!
        </p>
        <h3>Dirijo una red o una organización de servicio, o tengo un grupo de personas a las que me gustaría invitar a unirse al Mapa Mundial del Teatro. ¿Cómo puedo comunicarlo?</h3>
        <p>
          !<a href="https://docs.google.com/document/d/1DV5EjPolQrw8H1gNnpaXon9pvQ3TyqG_gqHwcmUXkBA/edit">Descargue esta plantilla de correo electrónico de ejemplo</a> y modifíquela como mejor le parezca! También puede compartir su perfil en las redes sociales y animar a la gente a unirse de esa manera.
        </p>
        <h3>La página está en inglés y español. ¿Cómo funciona la traducción?</h3>
        <p>
          El nuevo contenido se traduce automáticamente del inglés al español y viceversa. Cualquier usuario puede editar el contenido y hacer traducciones mejor, y esperamos que lo haga!
        </p>
        <h3>¿Cómo puedo ayudar a mejorar el mapa, o dar mi opinión?</h3>
        <p>
          Utilice el <a href="https://worldtheatremap.useresponse.com/">foro de la comunidad aquí</a> para publicar una idea, un problema, una pregunta o una historia sobre cómo el mapa le está impactando.
        </p>
        <h3>Tengo una pregunta que no se ha contestado o quisiera hablarte acerca del Mapa Mundial de Teatro.</h3>
        <p>
          ¡Envíenos un correo electrónico a <a href="map@howlround.com">map@howlround.com</a>!
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
