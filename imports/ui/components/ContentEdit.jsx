import React from 'react';
import { _ } from 'meteor/underscore';
import { displayError } from '../helpers/errors.js';
import { FormattedMessage, intlShape, injectIntl } from 'react-intl';

import { update } from '../../api/content/methods.js';
import { contentSchema, defaultFormOptions } from '../../api/content/content.js';
import t from 'tcomb-form';

const Form = t.form.Form;

class ContentEdit extends React.Component {
  constructor(props) {
    super(props);

    this.state = this.props.content;
    const { locale } = this.props.intl;

    this.throttledUpdate = _.throttle(newContent => {
      if (newContent) {
        return update.call({
          contentId: this.props.content._id,
          newContent,
          locale,
        }, displayError);
      }
    }, 300);

    this.handleSubmit = this.handleSubmit.bind(this);
    this.onChange = this.onChange.bind(this);
  }

  handleSubmit(event) {
    event.preventDefault();

    const newContent = this.refs.form.getValue();
    if (newContent) {
      const success = this.throttledUpdate(newContent);
      const { router } = this.context;

      if (success) {
        router.push('/');
      }
    }
  }

  onChange(value) {
    this.setState(value);
  }

  render() {
    const formOptions = defaultFormOptions();

    return (
      <form className="content-edit-form" onSubmit={this.handleSubmit}>
        <Form
          ref="form"
          type={contentSchema}
          options={formOptions}
          value={this.props.content}
        />

        <button
          type="submit"
          className="edit-content-save"
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

ContentEdit.propTypes = {
  content: React.PropTypes.object,
  intl: intlShape.isRequired,
};

ContentEdit.contextTypes = {
  router: React.PropTypes.object,
};

export default injectIntl(ContentEdit);
