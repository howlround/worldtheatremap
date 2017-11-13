// Utilities
import { Meteor } from 'meteor/meteor';
import React from 'react';
import Helmet from 'react-helmet';
import Modal from '../components/Modal.jsx';
import { intlShape, injectIntl } from 'react-intl';
import { Link } from 'react-router';

// Pages
import TextPage from '../../ui/pages/TextPage.jsx';

class AmbassadorPage extends React.Component {
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
        <Helmet title="World Theatre Map Ambassadors" />
        <h3>World Theatre Map Ambassadors</h3>
        <p>
          The World Theatre Map beta project has engaged a first cohort of twenty-eight World Theatre Map Ambassadors from twenty-four countries to direct outreach, community organizing, and feedback gathering. In May 2017, this cohort answered an open-call to help us during this initial beta phase.</p>
        <p>
          This current beta period started in January and will continue through June 2018. The following list is our development goals at the moment:
        </p>
          <ul>
            <li>Achieve a rich diversity and large quantity of information about theatre organizations, theatremakers, and performance events.</li>
            <li>Engage a diverse and large quantity of theatremakers who are accessing this knowledge resource.</li>
            <li>Get participation in building and evolving the website’s features and utility.</li>
          </ul>
        <p>
          In addition to this group, we are calling on all theatremakers and organizations to join us in building this resource to help all of us to connect to the world-wide theatre community.
        </p>
        <p>
          Guided by the principles of the <a href="https://en.wikipedia.org/wiki/Commons-based_peer_production" target="_blank">commons</a>, this project is a work-in-progress. Future versions of the website will be shaped and managed by the feedback of participants and organizations who are using it.
        </p>
        <p>
          As we've been working with this cohort of Ambassadors, they have helped us to refine, iterate, and specify the mission of the World Theatre Map project to align and express itself even closer to HowlRound's mission and values:
        </p>
        <p><em>
          Make the global theatre community visible to each other by facilitating cross-border conversation, idea sharing, and movement building.</em>
        </p>
        <p>
          And without further ado, please welcome the first cohort of World Theatre Map Ambassadors:
        </p>
          <ul>
            <li><a href="https://www.worldtheatremap.org/es/profiles/DMHzGyZXSXSCfajWP" target="_blank" rel="nofollow">Cristina Idiarte</a>, Argentina</li>
            <li><a href="https://www.worldtheatremap.org/es/profiles/3yMYL6gofYdpdA2d9" target="_blank" rel="nofollow">Maximiliano Altieri</a>, Argentina</li>
            <li><a href="https://www.worldtheatremap.org/en/profiles/nGPbRzRrRoSzDTnXn" target="_blank" rel="nofollow">Goldele Rayment</a>, Australia</li>
            <li><a href="https://www.worldtheatremap.org/en/profiles/6kLBzAEeZzDrus42w" target="_blank" rel="nofollow">Paola Pilnik</a>, Brazil, United States</li>
            <li><a href="https://www.worldtheatremap.org/es/profiles/c7Es8wAkibAtR7Je3" target="_blank" rel="nofollow">Raoni Moreira</a>, Brazil, Chile</li>
            <li>Milena Demireva, Bulgaria</li>
            <li><a href="https://www.worldtheatremap.org/en/profiles/DSkwK5Et8t6Ad4QJx" target="_blank" rel="nofollow">Leanna Brodie</a>, Canada</li>
            <li><a href="https://www.worldtheatremap.org/es/profiles/pLnft8fjyvAjKyoQi" target="_blank" rel="nofollow">Camila Le-Bert</a>, Chile</li>
            <li><a href="https://www.worldtheatremap.org/es/profiles/GasGsdK7n2tRh8cdJ" target="_blank" rel="nofollow">Nancy Franco</a>, Colombia</li>
            <li><a href="https://www.worldtheatremap.org/en/profiles/NMmhtKpsJdNY8prPE" target="_blank" rel="nofollow">Simón Adinia Hanukai</a>, France</li>
            <li><a href="https://www.worldtheatremap.org/en/profiles/ZYhTfmRrnhE9Exr7B" target="_blank" rel="nofollow">Lara Chahal</a>, Germany</li>
            <li><a href="https://www.worldtheatremap.org/en/profiles/AbBtpz6KqF5ug3cad" target="_blank" rel="nofollow">Natália Kovács</a>, Hungary</li>
            <li><a href="https://www.worldtheatremap.org/en/profiles/3kJ2Z9gz8fLwEt6Ys" target="_blank" rel="nofollow">Abhishek Iyengar</a>, India</li>
            <li><a href="https://www.worldtheatremap.org/en/profiles/X47wXkmfMQWtAQdyL" target="_blank" rel="nofollow">Pamela McQueen</a>, Ireland</li>
            <li><a href="https://www.worldtheatremap.org/en/profiles/Di66zwwn8Wr43H2WD" target="_blank" rel="nofollow">Mona Merhi</a>, Lebanon</li>
            <li><a href="https://www.worldtheatremap.org/en/profiles/cKbu2hYfRnznXyCTa" target="_blank" rel="nofollow">Misheck Rumbani Mzumara</a>, Malawi</li>
            <li><a href="https://www.worldtheatremap.org/es/profiles/n2fFdbjXfsB8DAA9m" target="_blank" rel="nofollow">Mariela Lopez Flores</a>, Mexico</li>
            <li><a href="https://www.worldtheatremap.org/en/profiles/PvWohoTPBAoRYAxqe" target="_blank" rel="nofollow">Mohamed El Kajjouny</a>, Morocco</li>
            <li><a href="https://www.worldtheatremap.org/en/profiles/B7DTwQShNLGHDxQg7" target="_blank" rel="nofollow">Brendan McCall</a>, Norway</li>
            <li><a href="https://www.worldtheatremap.org/es/profiles/qC9YRAHrFZ8mjgz7G" target="_blank" rel="nofollow">Frances Marcell Sierra Rodríguez</a>, Peru</li>
            <li><a href="https://www.worldtheatremap.org/en/profiles/dd7ag7rs2yoQqF6Kq" target="_blank" rel="nofollow">Andrei Nikolai Pamintuan</a>, Philippines</li>
            <li>Zenkő Bogdán, Romania</li>
            <li><a href="http://www.worldtheatremap.org/en/profiles/7Qq6v3je5LQtNFXnp" target="_blank" rel="nofollow">Roberto Ramos de León</a>, Spain</li>
            <li><a href="https://www.worldtheatremap.org/es/profiles/ox6tuNTWGRiunkS6n" target="_blank" rel="nofollow">Alonso Lobato</a>, Spain</li>
            <li><a href="https://www.worldtheatremap.org/en/profiles/sQXZ2iEWtb8A3mPJ9" target="_blank" rel="nofollow">Judha Su</a>, Thailand</li>
            <li><a href="https://www.worldtheatremap.org/en/profiles/5877b3a917334f313edb4567" target="_blank" rel="nofollow">Amy Clare Tasker</a>, United Kingdom</li>
            <li><a href="https://www.worldtheatremap.org/en/profiles/TqgHNLQ497YCTEqSB" target="_blank" rel="nofollow">Tory E. Davidson</a>, United States</li>
            <li><a href="https://www.worldtheatremap.org/en/profiles/5877b70617334f313edb4dea" target="_blank" rel="nofollow">Adriana Gaviria</a>, United States</li>
            <li><a href="https://www.worldtheatremap.org/es/profiles/DuJ5M2coJp8Bd9Es2" target="_blank" rel="nofollow">Erika Phoenix</a>, United States, Italy</li>
          </ul>
      </div>
    );
  }

  renderSpanish() {
    return (
      <div className="page-content">
        <Helmet title="Embajadores del Mapa Mundial de Teatro"/>
        <h3>Embajadores del Mapa Mundial de Teatro</h3>
        <p>
          El proyecto beta del Mapa Mundial de Teatro ha involucrado una primera cohorte de veintiocho Embajadores de veinticuatro países para gestionar la divulgación, organizar la comunidad y recibir comentarios. En mayo del 2017, este grupo respondió a una convocatoria abierta de ayuda para nosotros durante esta fase beta inicial.</p>
        <p>
          Este actual periodo beta comenzó en enero y continuará hasta junio 2018. La siguiente lista son nuestros objetivos de desarrollo en este momento:
        </p>
          <ul>
            <li>Lograr una diversidad enriquecedora y una gran cantidad de información sobre organizaciones teatrales, creadores de teatro, y eventos de presentaciones.</li>
            <li>Involucrar a una cantidad diversa y grande de creadores de teatro que están accediendo este recurso de conocimiento.</li>
            <li>Recibir participación en el desarrollo y evolución de las funciones y utilidades de la página web.</li>
          </ul>
        <p>
          Además de este grupo, le pedimos a todos los teatristas y las organizaciones a unirse a nosotros en el desarrollo de este recurso para ayudarnos a todos a conectarnos con la comunidad global de teatro.
        </p>
        <p>
          Guiado por los principios de los bienes comunes, este proyecto es un trabajo en proceso. Las versiones futuras de esta página web serán formadas y administradas por las reacciones de los participantes y las organizaciones que la están usando.
        </p>
        <p>
          Mientras hemos estado trabajando con este grupo de Embajadores, ellos nos han ayudado a refinar, iterar y especificar la misión del proyecto Mapa Mundial de Teatro para alinearlo y expresarlo aún más con la misión y los valores de Howlround:
        </p>
        <p><em>
          Hacer visible a la comunidad global de teatro a si misma facilitando la conversación transfronteriza, el intercambio de ideas y creación de movimiento.</em>
        </p>
        <p>
          Y sin más demora, por favor démosle la bienvenida a la primera cohorte de Embajadores del Mapa Mundial de Teatro:
        </p>
          <ul>
            <li><a href="https://www.worldtheatremap.org/es/profiles/DMHzGyZXSXSCfajWP" target="_blank" rel="nofollow">Cristina Idiarte</a>, Argentina</li>
            <li><a href="https://www.worldtheatremap.org/es/profiles/3yMYL6gofYdpdA2d9" target="_blank" rel="nofollow">Maximiliano Altieri</a>, Argentina</li>
            <li><a href="https://www.worldtheatremap.org/es/profiles/nGPbRzRrRoSzDTnXn" target="_blank" rel="nofollow">Goldele Rayment</a>, Australia</li>
            <li><a href="https://www.worldtheatremap.org/es/profiles/6kLBzAEeZzDrus42w" target="_blank" rel="nofollow">Paola Pilnik</a>, Brasil, Estados Unidos</li>
            <li><a href="https://www.worldtheatremap.org/es/profiles/c7Es8wAkibAtR7Je3" target="_blank" rel="nofollow">Raoni Moreira</a>, Brasil, Chile</li>
            <li>Milena Demireva, Bulgaria</li>
            <li><a href="https://www.worldtheatremap.org/es/profiles/DSkwK5Et8t6Ad4QJx" target="_blank" rel="nofollow">Leanna Brodie</a>, Canadá</li>
            <li><a href="https://www.worldtheatremap.org/es/profiles/pLnft8fjyvAjKyoQi" target="_blank" rel="nofollow">Camila Le-Bert</a>, Chile</li>
            <li><a href="https://www.worldtheatremap.org/es/profiles/GasGsdK7n2tRh8cdJ" target="_blank" rel="nofollow">Nancy Franco</a>, Colombia</li>
            <li><a href="https://www.worldtheatremap.org/es/profiles/NMmhtKpsJdNY8prPE" target="_blank" rel="nofollow">Simón Adinia Hanukai</a>, Francia</li>
            <li><a href="https://www.worldtheatremap.org/es/profiles/ZYhTfmRrnhE9Exr7B" target="_blank" rel="nofollow">Lara Chahal</a>, Alemania</li>
            <li><a href="https://www.worldtheatremap.org/es/profiles/AbBtpz6KqF5ug3cad" target="_blank" rel="nofollow">Natália Kovács</a>, Hungría</li>
            <li><a href="https://www.worldtheatremap.org/es/profiles/3kJ2Z9gz8fLwEt6Ys" target="_blank" rel="nofollow">Abhishek Iyengar</a>, India</li>
            <li><a href="https://www.worldtheatremap.org/es/profiles/X47wXkmfMQWtAQdyL" target="_blank" rel="nofollow">Pamela McQueen</a>, Irlanda</li>
            <li><a href="https://www.worldtheatremap.org/es/profiles/Di66zwwn8Wr43H2WD" target="_blank" rel="nofollow">Mona Merhi</a>, Líbano</li>
            <li><a href="https://www.worldtheatremap.org/es/profiles/cKbu2hYfRnznXyCTa" target="_blank" rel="nofollow">Misheck Rumbani Mzumara</a>, Malawi</li>
            <li><a href="https://www.worldtheatremap.org/es/profiles/n2fFdbjXfsB8DAA9m" target="_blank" rel="nofollow">Mariela Lopez Flores</a>, México</li>
            <li><a href="https://www.worldtheatremap.org/es/profiles/PvWohoTPBAoRYAxqe" target="_blank" rel="nofollow">Mohamed El Kajjouny</a>, Marruecos</li>
            <li><a href="https://www.worldtheatremap.org/es/profiles/B7DTwQShNLGHDxQg7" target="_blank" rel="nofollow">Brendan McCall</a>, Noruega</li>
            <li><a href="https://www.worldtheatremap.org/es/profiles/qC9YRAHrFZ8mjgz7G" target="_blank" rel="nofollow">Frances Marcell Sierra Rodríguez</a>, Perú</li>
            <li><a href="https://www.worldtheatremap.org/es/profiles/dd7ag7rs2yoQqF6Kq" target="_blank" rel="nofollow">Andrei Nikolai Pamintuan</a>, Filipinas</li>
            <li>Zenkő Bogdán, Rumania</li>
            <li><a href="http://www.worldtheatremap.org/es/profiles/7Qq6v3je5LQtNFXnp" target="_blank" rel="nofollow">Roberto Ramos de León</a>, España</li>
            <li><a href="https://www.worldtheatremap.org/es/profiles/ox6tuNTWGRiunkS6n" target="_blank" rel="nofollow">Alonso Lobato</a>, España</li>
            <li><a href="https://www.worldtheatremap.org/es/profiles/sQXZ2iEWtb8A3mPJ9" target="_blank" rel="nofollow">Judha Su</a>, Tailandia</li>
            <li><a href="https://www.worldtheatremap.org/es/profiles/5877b3a917334f313edb4567" target="_blank" rel="nofollow">Amy Clare Tasker</a>, Reino Unido</li>
            <li><a href="https://www.worldtheatremap.org/es/profiles/TqgHNLQ497YCTEqSB" target="_blank" rel="nofollow">Tory E. Davidson</a>, Estados Unidos</li>
            <li><a href="https://www.worldtheatremap.org/es/profiles/5877b70617334f313edb4dea" target="_blank" rel="nofollow">Adriana Gaviria</a>, Estados Unidos</li>
            <li><a href="https://www.worldtheatremap.org/es/profiles/DuJ5M2coJp8Bd9Es2" target="_blank" rel="nofollow">Erika Phoenix</a>, Estados Unidos, Italia</li>
          </ul>
      </div>
    );
  }

  renderFrench() {
    return (
      <div className="page-content">
        <Helmet title="Ambassadeurs de la Carte mondiale du théâtre"/>
        <h3>Ambassadeurs de la Carte mondiale du théâtre</h3>
        <p>
          Pour le projet bêta de la Carte mondiale du théâtre, nous avons recruté une première cohorte de vingt-huit ambassadeurs de la Carte mondiale du théâtre provenant de vingt-quatre pays différents afin de gérer la diffusion, l’organisation de la communauté et la collecte des commentaires. Cette cohorte a répondu à un appel à tous lancé en mai 2017 pour nous aider durant cette phase initiale.</p>
        <p>
          Cette période bêta a débuté en janvier et se poursuivra jusqu’en juin 2018. Voici la liste de nos objectifs de développement à ce jour :
        </p>
          <ul>
            <li>Atteindre une riche diversité et une grande quantité d’informations sur les organisations de théâtre, les créateurs de théâtre, les spectacles et les festivals ;</li>
            <li>Encourager l’implication d’un nombre important et diversifié d’artistes ayant accès à cette ressource d’information ;</li>
            <li>Susciter la participation à la construction et à l’évolution des fonctions et de l’utilité du site Web.</li>
          </ul>
        <p>
          En plus de ce groupe, nous invitons tous/tes les créateurs/trices de théâtre et toutes les organisations à se joindre à nous pour construire cette ressource qui nous aidera à nous connecter à la communauté théâtrale dans le monde.
        </p>
        <p>
          Cette création évolutive s’appuie sur les principes de productions <a href="https://fr.wikipedia.org/wiki/Communs" target="_blank">communes</a>. Les versions futures du site Web seront donc formées et organisées en fonction de la rétroaction fournie par ses utilisateurs, participants individuels ou organisations.
        </p>
        <p>
          Grâce au travail effectué avec cette cohorte d’ambassadeurs, nous avons déjà pu améliorer, approfondir, et préciser la mission du projet de la Carte mondiale du théâtre en la rapprochant de celle de HowlRound, à savoir :
        </p>
        <p><em>
          Offrir une vitrine pour la communauté théâtrale internationale en facilitant le partage d’idées, les conversations sans frontière et la création d’un mouvement.</em>
        </p>
        <p>
          Sans plus tarder, souhaitons la bienvenue à la première cohorte d’ambassadeurs de la Carte mondiale du théâtre:
        </p>
        <ul>
          <li><a href="https://www.worldtheatremap.org/fr/profiles/DMHzGyZXSXSCfajWP" target="_blank" rel="nofollow">Cristina Idiarte</a>, Argentine</li>
          <li><a href="https://www.worldtheatremap.org/fr/profiles/3yMYL6gofYdpdA2d9" target="_blank" rel="nofollow">Maximiliano Altieri</a>, Argentine</li>
          <li><a href="https://www.worldtheatremap.org/fr/profiles/nGPbRzRrRoSzDTnXn" target="_blank" rel="nofollow">Goldele Rayment</a>, Australie</li>
          <li><a href="https://www.worldtheatremap.org/fr/profiles/6kLBzAEeZzDrus42w" target="_blank" rel="nofollow">Paola Pilnik</a>, Brésil, États-Unis</li>
          <li><a href="https://www.worldtheatremap.org/fr/profiles/c7Es8wAkibAtR7Je3" target="_blank" rel="nofollow">Raoni Moreira</a>, Brésil, Chili</li>
          <li>Milena Demireva, Bulgarie</li>
          <li><a href="https://www.worldtheatremap.org/fr/profiles/DSkwK5Et8t6Ad4QJx" target="_blank" rel="nofollow">Leanna Brodie</a>, Canada</li>
          <li><a href="https://www.worldtheatremap.org/fr/profiles/pLnft8fjyvAjKyoQi" target="_blank" rel="nofollow">Camila Le-Bert</a>, Chili</li>
          <li><a href="https://www.worldtheatremap.org/fr/profiles/GasGsdK7n2tRh8cdJ" target="_blank" rel="nofollow">Nancy Franco</a>, Colombie</li>
          <li><a href="https://www.worldtheatremap.org/fr/profiles/NMmhtKpsJdNY8prPE" target="_blank" rel="nofollow">Simón Adinia Hanukai</a>, France</li>
          <li><a href="https://www.worldtheatremap.org/fr/profiles/ZYhTfmRrnhE9Exr7B" target="_blank" rel="nofollow">Lara Chahal</a>, Allemagne</li>
          <li><a href="https://www.worldtheatremap.org/fr/profiles/AbBtpz6KqF5ug3cad" target="_blank" rel="nofollow">Natália Kovács</a>, Hongrie</li>
          <li><a href="https://www.worldtheatremap.org/fr/profiles/3kJ2Z9gz8fLwEt6Ys" target="_blank" rel="nofollow">Abhishek Iyengar</a>, Inde</li>
          <li><a href="https://www.worldtheatremap.org/fr/profiles/X47wXkmfMQWtAQdyL" target="_blank" rel="nofollow">Pamela McQueen</a>, Irlande</li>
          <li><a href="https://www.worldtheatremap.org/fr/profiles/Di66zwwn8Wr43H2WD" target="_blank" rel="nofollow">Mona Merhi</a>, Liban</li>
          <li><a href="https://www.worldtheatremap.org/fr/profiles/cKbu2hYfRnznXyCTa" target="_blank" rel="nofollow">Misheck Rumbani Mzumara</a>, Malawi</li>
          <li><a href="https://www.worldtheatremap.org/fr/profiles/n2fFdbjXfsB8DAA9m" target="_blank" rel="nofollow">Mariela Lopez Flores</a>, Mexique</li>
          <li><a href="https://www.worldtheatremap.org/fr/profiles/PvWohoTPBAoRYAxqe" target="_blank" rel="nofollow">Mohamed El Kajjouny</a>, Maroc</li>
          <li><a href="https://www.worldtheatremap.org/fr/profiles/B7DTwQShNLGHDxQg7" target="_blank" rel="nofollow">Brendan McCall</a>, Norvège</li>
          <li><a href="https://www.worldtheatremap.org/fr/profiles/qC9YRAHrFZ8mjgz7G" target="_blank" rel="nofollow">Frances Marcell Sierra Rodríguez</a>, Pérou</li>
          <li><a href="https://www.worldtheatremap.org/fr/profiles/dd7ag7rs2yoQqF6Kq" target="_blank" rel="nofollow">Andrei Nikolai Pamintuan</a>, Phillippines</li>
          <li>Zenkő Bogdán, Roumanie</li>
          <li><a href="http://www.worldtheatremap.org/fr/profiles/7Qq6v3je5LQtNFXnp" target="_blank" rel="nofollow">Roberto Ramos de León</a>, Espagne</li>
          <li><a href="https://www.worldtheatremap.org/fr/profiles/ox6tuNTWGRiunkS6n" target="_blank" rel="nofollow">Alonso Lobato</a>, Espagne</li>
          <li><a href="https://www.worldtheatremap.org/fr/profiles/sQXZ2iEWtb8A3mPJ9" target="_blank" rel="nofollow">Judha Su</a>, Thaïlande</li>
          <li><a href="https://www.worldtheatremap.org/fr/profiles/5877b3a917334f313edb4567" target="_blank" rel="nofollow">Amy Clare Tasker</a>, Royaume-Uni</li>
          <li><a href="https://www.worldtheatremap.org/fr/profiles/TqgHNLQ497YCTEqSB" target="_blank" rel="nofollow">Tory E. Davidson</a>, États-Unis</li>
          <li><a href="https://www.worldtheatremap.org/fr/profiles/5877b70617334f313edb4dea" target="_blank" rel="nofollow">Adriana Gaviria</a>, États-Unis, Italie</li>
        </ul>
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

AmbassadorPage.propTypes = {
  intl: intlShape.isRequired,
};

AmbassadorPage.contextTypes = {
  router: React.PropTypes.object,
};

export default injectIntl(AmbassadorPage);
