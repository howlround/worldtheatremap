// Meteor
import React from 'react';
import ReactSelect from 'react-select';
import { FormattedMessage } from 'react-intl';
import t from 'tcomb-form';

export const factory = () => {
  // interests options
  const Interests = [
    {
      value: 'Accessibility',
      label: <FormattedMessage
        id="interest.Accessibility"
        description="Intersts options: Accessibility"
        defaultMessage="Accessibility"
      />,
    },
    {
      value: 'Adaptation',
      label: <FormattedMessage
        id="interest.Adaptation"
        description="Intersts options: Adaptation"
        defaultMessage="Adaptation"
      />,
    },
    {
      value: 'African-American',
      label: <FormattedMessage
        id="interest.African-American"
        description="Intersts options: African-American"
        defaultMessage="African-American"
      />,
    },
    {
      value: 'African-Diaspora',
      label: <FormattedMessage
        id="interest.African-Diaspora"
        description="Intersts options: African-Diaspora"
        defaultMessage="African-Diaspora"
      />,
    },
    {
      value: 'Asian-American',
      label: <FormattedMessage
        id="interest.Asian-American"
        description="Intersts options: Asian-American"
        defaultMessage="Asian-American"
      />,
    },
    {
      value: 'Asian-Diaspora',
      label: <FormattedMessage
        id="interest.Asian-Diaspora"
        description="Intersts options: Asian-Diaspora"
        defaultMessage="Asian-Diaspora"
      />,
    },
    {
      value: 'Black Theatre',
      label: <FormattedMessage
        id="interest.Black Theatre"
        description="Intersts options: Black Theatre"
        defaultMessage="Black Theatre"
      />,
    },
    {
      value: 'Burlesque',
      label: <FormattedMessage
        id="interest.Burlesque"
        description="Intersts options: Burlesque"
        defaultMessage="Burlesque"
      />,
    },
    {
      value: 'Circus',
      label: <FormattedMessage
        id="interest.Circus"
        description="Intersts options: Circus"
        defaultMessage="Circus"
      />,
    },
    {
      value: 'Classical',
      label: <FormattedMessage
        id="interest.Classical"
        description="Intersts options: Classical"
        defaultMessage="Classical"
      />,
    },
    {
      value: 'Climate Change',
      label: <FormattedMessage
        id="interest.Climate Change"
        description="Intersts options: Climate Change"
        defaultMessage="Climate Change"
      />,
    },
    {
      value: 'Contemporary',
      label: <FormattedMessage
        id="interest.Contemporary"
        description="Intersts options: Contemporary"
        defaultMessage="Contemporary"
      />,
    },
    {
      value: 'Creative Placemaking',
      label: <FormattedMessage
        id="interest.Creative Placemaking"
        description="Intersts options: Creative Placemaking"
        defaultMessage="Creative Placemaking"
      />,
    },
    {
      value: 'Criticism',
      label: <FormattedMessage
        id="interest.Criticism"
        description="Intersts options: Criticism"
        defaultMessage="Criticism"
      />,
    },
    {
      value: 'Cross-cultural Exchange',
      label: <FormattedMessage
        id="interest.Cross-cultural Exchange"
        description="Intersts options: Cross-cultural Exchange"
        defaultMessage="Cross-cultural Exchange"
      />,
    },
    {
      value: 'Dance',
      label: <FormattedMessage
        id="interest.Cross-cultural Exchange"
        description="Intersts options: Cross-cultural Exchange"
        defaultMessage="Cross-cultural Exchange"
      />,
    },
    {
      value: 'Deaf',
      label: <FormattedMessage
        id="interest.Deaf"
        description="Intersts options: Deaf"
        defaultMessage="Deaf"
      />,
    },
    {
      value: 'Design',
      label: <FormattedMessage
        id="interest.Design"
        description="Intersts options: Design"
        defaultMessage="Design"
      />,
    },
    {
      value: 'Devised',
      label: <FormattedMessage
        id="interest.Devised"
        description="Intersts options: Devised"
        defaultMessage="Devised"
      />,
    },
    {
      value: 'Directing',
      label: <FormattedMessage
        id="interest.Directing"
        description="Intersts options: Directing"
        defaultMessage="Directing"
      />,
    },
    {
      value: 'Disability',
      label: <FormattedMessage
        id="interest.Disability"
        description="Intersts options: Disability"
        defaultMessage="Disability"
      />,
    },
    {
      value: 'Diversity and Inclusion',
      label: <FormattedMessage
        id="interest.Diversity and Inclusion"
        description="Intersts options: Diversity and Inclusion"
        defaultMessage="Diversity and Inclusion"
      />,
    },
    {
      value: 'Documentary Theatre',
      label: <FormattedMessage
        id="interest.Documentary Theatre"
        description="Intersts options: Documentary Theatre"
        defaultMessage="Documentary Theatre"
      />,
    },
    {
      value: 'Eco Theatre',
      label: <FormattedMessage
        id="interest.Eco Theatre"
        description="Intersts options: Eco Theatre"
        defaultMessage="Eco Theatre"
      />,
    },
    {
      value: 'Ensemble',
      label: <FormattedMessage
        id="interest.Ensemble"
        description="Intersts options: Ensemble"
        defaultMessage="Ensemble"
      />,
    },
    {
      value: 'Experimental',
      label: <FormattedMessage
        id="interest.Experimental"
        description="Intersts options: Experimental"
        defaultMessage="Experimental"
      />,
    },
    {
      value: 'LGBTQIA*',
      label: <FormattedMessage
        id="interest.LGBTQIA*"
        description="Intersts options: LGBTQIA*"
        defaultMessage="LGBTQIA*"
      />,
    },
    {
      value: 'Geek Theater',
      label: <FormattedMessage
        id="interest.Geek Theater"
        description="Intersts options: Geek Theater"
        defaultMessage="Geek Theater"
      />,
    },
    {
      value: 'Gender Politics',
      label: <FormattedMessage
        id="interest.Gender Politics"
        description="Intersts options: Gender Politics"
        defaultMessage="Gender Politics"
      />,
    },
    {
      value: 'Hip Hop Theatre',
      label: <FormattedMessage
        id="interest.Hip Hop Theatre"
        description="Intersts options: Hip Hop Theatre"
        defaultMessage="Hip Hop Theatre"
      />,
    },
    {
      value: 'Immersive Theatre',
      label: <FormattedMessage
        id="interest.Immersive Theatre"
        description="Intersts options: Immersive Theatre"
        defaultMessage="Immersive Theatre"
      />,
    },
    {
      value: 'Improvisation',
      label: <FormattedMessage
        id="interest.Improvisation"
        description="Intersts options: Improvisation"
        defaultMessage="Improvisation"
      />,
    },
    {
      value: 'Indigenous',
      label: <FormattedMessage
        id="interest.Indigenous"
        description="Intersts options: Indigenous"
        defaultMessage="Indigenous"
      />,
    },
    {
      value: 'International',
      label: <FormattedMessage
        id="interest.International"
        description="Intersts options: International"
        defaultMessage="International"
      />,
    },
    {
      value: 'Jewish Theatre',
      label: <FormattedMessage
        id="interest.Jewish Theatre"
        description="Intersts options: Jewish Theatre"
        defaultMessage="Jewish Theatre"
      />,
    },
    {
      value: 'Latina/o Theatre Commons',
      label: <FormattedMessage
        id="interest.Latina/o Theatre Commons"
        description="Intersts options: Latina/o Theatre Commons"
        defaultMessage="Latina/o Theatre Commons"
      />,
    },
    {
      value: 'Latino-American',
      label: <FormattedMessage
        id="interest.Latino-American"
        description="Intersts options: Latino-American"
        defaultMessage="Latino-American"
      />,
    },
    {
      value: 'Literary Management',
      label: <FormattedMessage
        id="interest.Literary Management"
        description="Intersts options: Literary Management"
        defaultMessage="Literary Management"
      />,
    },
    {
      value: 'Multicultural',
      label: <FormattedMessage
        id="interest.Multicultural"
        description="Intersts options: Multicultural"
        defaultMessage="Multicultural"
      />,
    },
    {
      value: 'Multidisciplinary',
      label: <FormattedMessage
        id="interest.Multidisciplinary"
        description="Intersts options: Multidisciplinary"
        defaultMessage="Multidisciplinary"
      />,
    },
    {
      value: 'Music',
      label: <FormattedMessage
        id="interest.Music"
        description="Intersts options: Music"
        defaultMessage="Music"
      />,
    },
    {
      value: 'Musical Theatre',
      label: <FormattedMessage
        id="interest.Musical Theatre"
        description="Intersts options: Musical Theatre"
        defaultMessage="Musical Theatre"
      />,
    },
    {
      value: 'Musicals',
      label: <FormattedMessage
        id="interest.Musicals"
        description="Intersts options: Musicals"
        defaultMessage="Musicals"
      />,
    },
    {
      value: 'New Work',
      label: <FormattedMessage
        id="interest.New Work"
        description="Intersts options: New Work"
        defaultMessage="New Work"
      />,
    },
    {
      value: 'Object Theatre/Puppetry',
      label: <FormattedMessage
        id="interest.Object Theatre/Puppetry"
        description="Intersts options: Object Theatre/Puppetry"
        defaultMessage="Object Theatre/Puppetry"
      />,
    },
    {
      value: 'Opera',
      label: <FormattedMessage
        id="interest.Opera"
        description="Intersts options: Opera"
        defaultMessage="Opera"
      />,
    },
    {
      value: 'Performance Art',
      label: <FormattedMessage
        id="interest.Performance Art"
        description="Intersts options: Performance Art"
        defaultMessage="Performance Art"
      />,
    },
    {
      value: 'Philanthropy/Funding',
      label: <FormattedMessage
        id="interest.Philanthropy/Funding"
        description="Intersts options: Philanthropy/Funding"
        defaultMessage="Philanthropy/Funding"
      />,
    },
    {
      value: 'Physical Theatre',
      label: <FormattedMessage
        id="interest.Physical Theatre"
        description="Intersts options: Physical Theatre"
        defaultMessage="Physical Theatre"
      />,
    },
    {
      value: 'Playwright Residencies',
      label: <FormattedMessage
        id="interest.Playwright Residencies"
        description="Intersts options: Playwright Residencies"
        defaultMessage="Playwright Residencies"
      />,
    },
    {
      value: 'Playwriting',
      label: <FormattedMessage
        id="interest.Playwriting"
        description="Intersts options: Playwriting"
        defaultMessage="Playwriting"
      />,
    },
    {
      value: 'Poetry',
      label: <FormattedMessage
        id="interest.Poetry"
        description="Intersts options: Poetry"
        defaultMessage="Poetry"
      />,
    },
    {
      value: 'Political/Social',
      label: <FormattedMessage
        id="interest.Political/Social"
        description="Intersts options: Political/Social"
        defaultMessage="Political/Social"
      />,
    },
    {
      value: 'Process',
      label: <FormattedMessage
        id="interest.Process"
        description="Intersts options: Process"
        defaultMessage="Process"
      />,
    },
    {
      value: 'Producing',
      label: <FormattedMessage
        id="interest.Producing"
        description="Intersts options: Producing"
        defaultMessage="Producing"
      />,
    },
    {
      value: 'Puppetry',
      label: <FormattedMessage
        id="interest.Puppetry"
        description="Intersts options: Puppetry"
        defaultMessage="Puppetry"
      />,
    },
    {
      value: 'Queer Theatre',
      label: <FormattedMessage
        id="interest.Queer Theatre"
        description="Intersts options: Queer Theatre"
        defaultMessage="Queer Theatre"
      />,
    },
    {
      value: 'Race',
      label: <FormattedMessage
        id="interest.Race"
        description="Intersts options: Race"
        defaultMessage="Race"
      />,
    },
    {
      value: 'Religion/Spirituality',
      label: <FormattedMessage
        id="interest.Religion/Spirituality"
        description="Intersts options: Religion/Spirituality"
        defaultMessage="Religion/Spirituality"
      />,
    },
    {
      value: 'Rural Theatre',
      label: <FormattedMessage
        id="interest.Rural Theatre"
        description="Intersts options: Rural Theatre"
        defaultMessage="Rural Theatre"
      />,
    },
    {
      value: 'Senior Theatre',
      label: <FormattedMessage
        id="interest.Senior Theatre"
        description="Intersts options: Senior Theatre"
        defaultMessage="Senior Theatre"
      />,
    },
    {
      value: 'Shakespeare',
      label: <FormattedMessage
        id="interest.Shakespeare"
        description="Intersts options: Shakespeare"
        defaultMessage="Shakespeare"
      />,
    },
    {
      value: 'Site-specific',
      label: <FormattedMessage
        id="interest.Site-specific"
        description="Intersts options: Site-specific"
        defaultMessage="Site-specific"
      />,
    },
    {
      value: 'Social Justice',
      label: <FormattedMessage
        id="interest.Social Justice"
        description="Intersts options: Social Justice"
        defaultMessage="Social Justice"
      />,
    },
    {
      value: 'Social Media',
      label: <FormattedMessage
        id="interest.Social Media"
        description="Intersts options: Social Media"
        defaultMessage="Social Media"
      />,
    },
    {
      value: 'Sound Design',
      label: <FormattedMessage
        id="interest.Sound Design"
        description="Intersts options: Sound Design"
        defaultMessage="Sound Design"
      />,
    },
    {
      value: 'Sports',
      label: <FormattedMessage
        id="interest.Sports"
        description="Intersts options: Sports"
        defaultMessage="Sports"
      />,
    },
    {
      value: 'Stage Combat',
      label: <FormattedMessage
        id="interest.Stage Combat"
        description="Intersts options: Stage Combat"
        defaultMessage="Stage Combat"
      />,
    },
    {
      value: 'Stage Management',
      label: <FormattedMessage
        id="interest.Stage Management"
        description="Intersts options: Stage Management"
        defaultMessage="Stage Management"
      />,
    },
    {
      value: 'Student/Youth',
      label: <FormattedMessage
        id="interest.Student/Youth"
        description="Intersts options: Student/Youth"
        defaultMessage="Student/Youth"
      />,
    },
    {
      value: 'Technology',
      label: <FormattedMessage
        id="interest.Technology"
        description="Intersts options: Technology"
        defaultMessage="Technology"
      />,
    },
    {
      value: 'Theatre Education/Training',
      label: <FormattedMessage
        id="interest.Theatre Education/Training"
        description="Intersts options: Theatre Education/Training"
        defaultMessage="Theatre Education/Training"
      />,
    },
    {
      value: 'Theatre for Young Audiences',
      label: <FormattedMessage
        id="interest.Theatre for Young Audiences"
        description="Intersts options: Theatre for Young Audiences"
        defaultMessage="Theatre for Young Audiences"
      />,
    },
    {
      value: 'Theatre History',
      label: <FormattedMessage
        id="interest.Theatre History"
        description="Intersts options: Theatre History"
        defaultMessage="Theatre History"
      />,
    },
    {
      value: 'Touring',
      label: <FormattedMessage
        id="interest.Touring"
        description="Intersts options: Touring"
        defaultMessage="Touring"
      />,
    },
    {
      value: 'Transgender',
      label: <FormattedMessage
        id="interest.Transgender"
        description="Intersts options: Transgender"
        defaultMessage="Transgender"
      />,
    },
    {
      value: 'Translations/Adaptations',
      label: <FormattedMessage
        id="interest.Translations/Adaptations"
        description="Intersts options: Translations/Adaptations"
        defaultMessage="Translations/Adaptations"
      />,
    },
    {
      value: 'Video Games',
      label: <FormattedMessage
        id="interest.Video Games"
        description="Intersts options: Video Games"
        defaultMessage="Video Games"
      />,
    },
    {
      value: 'Women',
      label: <FormattedMessage
        id="interest.Women"
        description="Intersts options: Women"
        defaultMessage="Women"
      />,
    },
    {
      value: 'Young Audiences',
      label: <FormattedMessage
        id="interest.Young Audiences"
        description="Intersts options: Young Audiences"
        defaultMessage="Young Audiences"
      />,
    },
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
