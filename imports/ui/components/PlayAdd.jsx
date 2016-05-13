import React from 'react';
import ReactDOM from 'react-dom';
import { _ } from 'meteor/underscore';
import { displayError } from '../helpers/errors.js';
import { insert } from '../../api/plays/methods.js';
import { playSchema, defaultFormOptions } from '../../api/plays/plays.js';
import { Profiles } from '../../api/profiles/profiles.js';
import t from 'tcomb-form';
// import Select from 'react-select';

const Form = t.form.Form;

export default class PlayAdd extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      play: {
        author: [
          {}
        ]
      }
    };

    this.throttledAdd = _.throttle(newPlay => {
      if (newPlay) {
        const newID = insert.call({
          newPlay,
        }, displayError);

        return newID;
      }
    }, 300);

    // this.updatePlay = this.updatePlay.bind(this);
    // this.onFocus = this.onFocus.bind(this);
    // this.onBlur = this.onBlur.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.onChange = this.onChange.bind(this);
  }

  onChange(value, path) {
    // @TODO: Merge with PlayEdit.jsx
    if (path[0] == 'author' && path[2] == 'name') {
      const search = value.author[path[1]].name;
      const element = $('.form-group-author-' + path[1] + '-name').siblings('ul.play-author-edit-results');

      // Search for profiles and save to ul.play-author-edit-result
      if (search.length > 0) {
        // Clear any existing stored values
        const clearValue = value;
        clearValue.author[path[1]].id = '';
        this.setState({play: clearValue});

        const regex = new RegExp('.*' + search + '.*', 'i');
        const results = Profiles.find({name: { $regex: regex }}, {limit: 5}).fetch();

        // Clear fields
        element.html('');

        if (results.length > 0) {
          results.map(profile => {
            element.append('<li><b>' + profile.name + '</b> (' + profile._id + ')</li>').find('li:last-child').click(() => {
                const newValue = value;
                newValue.author[path[1]].name = profile.name;
                newValue.author[path[1]].id = profile._id;
                this.setState({play: newValue});

                // Clear fields
                element.html('');
            });
          });
        }
        else {
          // @TODO: Add new profile workflow
        }
      }
      else {
        $('ul.play-author-edit-results').html('');
      }
    }
  }

  handleSubmit(event) {
    event.preventDefault();
    const newPlay = this.refs.form.getValue();
    if (newPlay) {
      const newID = this.throttledAdd(newPlay);

      // Redirect
      this.context.router.push(`/plays/${ newID }`);
    }
  }

  render() {
    const formOptions = defaultFormOptions();
    // const allProfiles = Profiles.find({}).fetch();
    // const profileOptions = {};
    // allProfiles.map(profile => {
    //   profileOptions[profile._id] = profile.name;
    // });
    // console.log(profileOptions);
    // console.log(formOptions);
    // // formOptions.fields.author.factory = t.form.Select;
    // console.log(playSchema);

    return (
      <form className="play-edit-form" onSubmit={this.handleSubmit.bind(this)} autocomplete="off" >
        <Form
          ref="form"
          type={playSchema}
          options={formOptions}
          value={this.state.play}
          onChange={this.onChange}
        />

        <button
          type="submit"
          className="edit-play-save"
        >Save</button>
      </form>
    );
  }
}

// PlayAdd.propTypes = {
//   play: React.PropTypes.object,
// };

PlayAdd.contextTypes = {
  router: React.PropTypes.object,
};
