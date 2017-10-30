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

  renderFrench() {
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
