// Meteor
import React from 'react';
import ReactSelect from 'react-select';
import t from 'tcomb-form';

export const factory = () => {
  // interests options
  const Interests = [
    { value: 'Accessibility', label: 'Accessibility' },
    { value: 'Adaptation', label: 'Adaptation' },
    { value: 'African-American', label: 'African-American' },
    { value: 'African-Diaspora', label: 'African-Diaspora' },
    { value: 'Asian American', label: 'Asian American' },
    { value: 'Asian-American', label: 'Asian-American' },
    { value: 'Asian-Diaspora', label: 'Asian-Diaspora' },
    { value: 'Black Theatre', label: 'Black Theatre' },
    { value: 'Burlesque', label: 'Burlesque' },
    { value: 'Circus', label: 'Circus' },
    { value: 'Classical', label: 'Classical' },
    { value: 'Climate Change', label: 'Climate Change' },
    { value: 'Contemporary', label: 'Contemporary' },
    { value: 'Creative Placemaking', label: 'Creative Placemaking' },
    { value: 'Criticism', label: 'Criticism' },
    { value: 'Cross-cultural Exchange', label: 'Cross-cultural Exchange' },
    { value: 'Dance', label: 'Dance' },
    { value: 'Deaf', label: 'Deaf' },
    { value: 'Design', label: 'Design' },
    { value: 'Devised', label: 'Devised' },
    { value: 'Directing', label: 'Directing' },
    { value: 'Disabilities', label: 'Disabilities' },
    { value: 'Disability', label: 'Disability' },
    { value: 'Diversity and Inclusion', label: 'Diversity and Inclusion' },
    { value: 'Documentary Theatre', label: 'Documentary Theatre' },
    { value: 'Eco Theatre', label: 'Eco Theatre' },
    { value: 'Ensemble', label: 'Ensemble' },
    { value: 'Experimental', label: 'Experimental' },
    { value: 'Gay/Lesbian', label: 'Gay/Lesbian' },
    { value: 'Geek Theatre', label: 'Geek Theatre' },
    { value: 'Gender Politics', label: 'Gender Politics' },
    { value: 'Hip Hop Theatre', label: 'Hip Hop Theatre' },
    { value: 'Immersive Theatre', label: 'Immersive Theatre' },
    { value: 'Improvisation', label: 'Improvisation' },
    { value: 'Indigenous', label: 'Indigenous' },
    { value: 'International', label: 'International' },
    { value: 'Jewish Theatre', label: 'Jewish Theatre' },
    { value: 'Latina/o Theatre Commons', label: 'Latina/o Theatre Commons' },
    { value: 'Latino-American', label: 'Latino-American' },
    { value: 'Literary Management', label: 'Literary Management' },
    { value: 'Multicultural', label: 'Multicultural' },
    { value: 'Multidisciplinary', label: 'Multidisciplinary' },
    { value: 'Music', label: 'Music' },
    { value: 'Musical Theatre', label: 'Musical Theatre' },
    { value: 'Musicals', label: 'Musicals' },
    { value: 'New Work', label: 'New Work' },
    { value: 'Object Theatre/Puppetry', label: 'Object Theatre/Puppetry' },
    { value: 'Opera', label: 'Opera' },
    { value: 'Performance Art', label: 'Performance Art' },
    { value: 'Philanthropy/Funding', label: 'Philanthropy/Funding' },
    { value: 'physical theatre', label: 'physical theatre' },
    { value: 'Playwright Residencies', label: 'Playwright Residencies' },
    { value: 'Playwriting', label: 'Playwriting' },
    { value: 'Poetry', label: 'Poetry' },
    { value: 'Political/Social', label: 'Political/Social' },
    { value: 'Process', label: 'Process' },
    { value: 'Producing', label: 'Producing' },
    { value: 'Puppetry', label: 'Puppetry' },
    { value: 'Queer Theatre', label: 'Queer Theatre' },
    { value: 'Race', label: 'Race' },
    { value: 'Religion/Spirituality', label: 'Religion/Spirituality' },
    { value: 'Rural Theatre', label: 'Rural Theatre' },
    { value: 'Senior Theatre', label: 'Senior Theatre' },
    { value: 'Shakespeare', label: 'Shakespeare' },
    { value: 'Site-specific', label: 'Site-specific' },
    { value: 'Social Justice', label: 'Social Justice' },
    { value: 'Social Media', label: 'Social Media' },
    { value: 'Sound Design', label: 'Sound Design' },
    { value: 'Sports', label: 'Sports' },
    { value: 'Stage Combat', label: 'Stage Combat' },
    { value: 'Stage Management', label: 'Stage Management' },
    { value: 'Student/Youth', label: 'Student/Youth' },
    { value: 'Technology', label: 'Technology' },
    { value: 'Theatre Education/Training', label: 'Theatre Education/Training' },
    { value: 'Theatre for Young Audiences', label: 'Theatre for Young Audiences' },
    { value: 'Theatre History', label: 'Theatre History' },
    { value: 'Touring', label: 'Touring' },
    { value: 'Transgender', label: 'Transgender' },
    { value: 'Translations/Adaptations', label: 'Translations/Adaptations' },
    { value: 'Video Games', label: 'Video Games' },
    { value: 'Women', label: 'Women' },
    { value: 'Young Audiences', label: 'Young Audiences' },
  ];

  // interests template
  const interestsTags = t.form.Form.templates.select.clone({
    renderSelect: (locals) => {
      function onChange(options) {
        const values = (options || []).map(({ value }) => value);
        locals.onChange(values);
      }
      return (
        <ReactSelect
          multi
          autoBlur
          options={Interests}
          value={locals.value}
          onChange={onChange}
          className="interests-edit"
        />
      );
    },
  });

  // interests factory function
  class ReactSelectInterestsFactory extends t.form.Component {
    getTemplate() {
      return interestsTags;
    }
  }

  // interests transformer
  ReactSelectInterestsFactory.transformer = t.form.List.transformer;

  return ReactSelectInterestsFactory;
};
