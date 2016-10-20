import React from 'react';
import { Link } from 'react-router';
import { FormattedMessage } from 'react-intl';

export default class FooterAddPitch extends React.Component {
  render() {
    return (
      <section className="footer-add-pitch">
        <div className="footer-content">
          <FormattedMessage
            id='footer.addPitchText'
            description="Footer text prompting the user to add more content"
            defaultMessage="The World Theatre Map is a {directory} of the world's theatre community (makers, workers, companies, institutions) and a {hub} of its projects, events, performances, conversations, ideas."
            values={{
              directory: <strong>user-generated directory</strong>,
              hub: <strong>real-time media hub</strong>,
            }}
          />

          <Link to="/profiles/add" className="footer-add-button button">
            <FormattedMessage
              id="footer.addPitchButton"
              description="Footer text prompting the user to add more content"
              defaultMessage="Add to the Map"
            />
          </Link>
        </div>
      </section>
    );
  }
}
