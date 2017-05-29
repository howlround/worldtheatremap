import React from 'react';
import { Link } from 'react-router';
import { FormattedMessage, intlShape, injectIntl } from 'react-intl';

class Footer extends React.Component {
  render() {
    const { locale } = this.props.intl;

    let ccURL = 'http://creativecommons.org';
    switch (locale) {
      case 'es':
        ccURL = 'http://es.creativecommons.org/blog/licencias';
        break;
    }

    return (
      <section className="footer">
        <div className="footer-content">
          <div className="footer-block">
            <div className="footer-site-name">
              <FormattedMessage
                id='navigation.siteName'
                description="Site Name"
                defaultMessage="World Theatre Map"
              />
            </div>
            <div className="footer-howlround-credit">
              <FormattedMessage
                id='footer.howlroundCredit'
                description="Link to HowlRound in footer"
                defaultMessage="A project of {howlround}"
                values={{
                  howlround: <a href="http://howlround.com">HowlRound</a>,
                }}
              />
            </div>
          </div>
          <div className="footer-block">
            <ul className="footer-navigation">
              <li>
                <Link
                  to={`/${locale}/search`}
                >
                  <FormattedMessage
                    id='navigation.searchFooter'
                    description="Footer sub nav search item"
                    defaultMessage="Search the Map"
                  />
                </Link>
              </li>
              <li>
                <Link
                  to={`/${locale}/about`}
                >
                  <FormattedMessage
                    id='navigation.aboutFooter'
                    description="About link"
                    defaultMessage="About the Project"
                  />
                </Link>
              </li>
              <li>
                <Link
                  to={`/${locale}/terms-of-use`}
                >
                  <FormattedMessage
                    id='navigation.termsFooter'
                    description="Terms of use link"
                    defaultMessage="Terms of Use"
                  />
                </Link>
              </li>
            </ul>
          </div>
          <div className="footer-block creative-commons">
            <FormattedMessage
              id='navigation.creativeCommons'
              description="Creative commons copyright text"
              defaultMessage="All content is free cultural work available to you under a {creativeCommons} Attribution 4.0 International License (CC BY 4.0). Attribute the original author and {howlround} when you repost and remix!"
              values={{
                creativeCommons: <a href={ccURL}>Creative Commons</a>,
                howlround: <a href="http://howlround.com">HowlRound.com</a>,
              }}
            />
          </div>
          <div className="footer-block">
            <ul className="footer-social">
              <li>
                <a className="facebook" href="http://facebook.com/HowlRound">Facebook</a>
              </li>
              <li>
                <a className="twitter" href="http://twitter.com/HowlRound">Twitter</a>
              </li>
              <li>
                <a className="instagram" href="http://instagram.com/howlround_commons">Instagram</a>
              </li>
            </ul>
          </div>
          <div className="footer-credits">
            <ul>
              <li>
                <a className="howlround-footer-logo" href="http://howlround.com">HowlRound</a>
              </li>
              <li>
                <a className="emerson-footer-logo" href="http://emerson.edu">Emerson College</a>
              </li>
            </ul>
          </div>
          <div className="footer-credits footer-attribution">
            <FormattedMessage
              id='footer.attribution'
              description="Footer website attribution"
              defaultMessage="Created by {mosswood}"
              values={{
                mosswood: <a href="http://mosswoodcreative.com">Mosswood Creative</a>,
              }}
            />
          </div>
        </div>
      </section>
    );
  }
}

Footer.propTypes = {
  intl: intlShape.isRequired,
};

export default injectIntl(Footer);
