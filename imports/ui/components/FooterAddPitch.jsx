import React from 'react';
import { Link } from 'react-router';
import { FormattedMessage, intlShape, injectIntl } from 'react-intl';

class FooterAddPitch extends React.Component {
  render() {
    const { locale } = this.props.intl;

    return (
      <section className="footer-add-pitch">
        <div className="footer-content">
          <FormattedMessage
            id='footer.addPitchText'
            description="Footer text prompting the user to add more content"
            defaultMessage="The World Theatre Map is a {directory} and {hub} of the global theatre community."
            values={{
              directory: <strong>
                <FormattedMessage
                  id="footer.addPitchDirectoryText"
                  description="Emphisized directory text in add pitch"
                  defaultMessage="user-generated directory"
                />
              </strong>,
              hub: <strong>
                <FormattedMessage
                  id="footer.addPitchHubText"
                  description="Emphisized hub text in add pitch"
                  defaultMessage="real time map"
                />
              </strong>
            }}
          />
        </div>
      </section>
    );
  }
}

FooterAddPitch.propTypes = {
  intl: intlShape.isRequired,
};

export default injectIntl(FooterAddPitch);
