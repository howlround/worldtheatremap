import React from 'react';
import i18nES from 'tcomb-form/lib/i18n/es';
import i18nFR from 'tcomb-form/lib/i18n/fr';
import t from 'tcomb-form';
import { _ } from 'meteor/underscore';
import { displayError } from '../helpers/errors.js';
import { FormattedMessage, intlShape, injectIntl } from 'react-intl';

// API
import { update } from '../../api/shows/methods.js';
import { showSchema, defaultFormOptions } from '../../api/shows/shows.js';
import { allCountriesFactory } from '../../api/countries/countries.js';
import { interestsSelectFactory } from '../../api/interests/interests.js';

const Form = t.form.Form;

class ShowEdit extends React.Component {
  constructor(props) {
    super(props);

    const { locale } = this.props.intl;

    this.state = this.props.show;

    this.throttledUpdate = _.throttle(newShow => {
      if (newShow) {
        update.call({
          showId: this.props.show._id,
          newShow,
          source: locale,
        }, displayError);
      }
    }, 300);

    this.handleSubmit = this.handleSubmit.bind(this);
    this.onChange = this.onChange.bind(this);
  }

  onChange(value) {
    this.setState(value);
  }

  handleSubmit(event) {
    event.preventDefault();

    const { locale } = this.props.intl;

    const newShow = this.refs.form.getValue();
    if (newShow) {
      this.throttledUpdate(newShow);

      // Only change editing state if validation passed
      this.props.onEditingChange(this.props.show._id, false);
      const { router } = this.context;
      router.push(`/${locale}/shows/${this.props.show._id}`);
    }
  }

  render() {
    const { locale } = this.props.intl;
    const formOptions = defaultFormOptions();

    formOptions.fields.country.factory = allCountriesFactory(locale, true);
    formOptions.fields.interests.factory = interestsSelectFactory(locale, true);

    switch (locale) {
      case 'es':
        Form.i18n = i18nES;
        break;
      case 'fr':
        Form.i18n = i18nFR;
        break;
      default:
        // Use default tcomb settings
        break;
    }

    return (
      <form className="show-edit-form" onSubmit={this.handleSubmit} >
        <Form
          ref="form"
          type={showSchema}
          value={this.state}
          options={formOptions}
          onChange={this.onChange}
        />

        <button
          type="submit"
          className="edit-show-save"
        >
          <FormattedMessage
            id="buttons.save"
            description="Generic save button"
            defaultMessage="Save"
          />
        </button>
      </form>
    );
  }
}

ShowEdit.propTypes = {
  show: React.PropTypes.object,
  onEditingChange: React.PropTypes.func,
  intl: intlShape.isRequired,
};

ShowEdit.contextTypes = {
  router: React.PropTypes.object,
};

export default injectIntl(ShowEdit);
