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
        description="Interests options: Accessibility"
        defaultMessage="Accessibility"
      />,
    },
    {
      value: 'Adaptation',
      label: <FormattedMessage
        id="interest.Adaptation"
        description="Interests options: Adaptation"
        defaultMessage="Adaptation"
      />,
    },
    {
      value: 'African-American',
      label: <FormattedMessage
        id="interest.African-American"
        description="Interests options: African-American"
        defaultMessage="African-American"
      />,
    },
    {
      value: 'African-Diaspora',
      label: <FormattedMessage
        id="interest.African-Diaspora"
        description="Interests options: African-Diaspora"
        defaultMessage="African-Diaspora"
      />,
    },
    {
      value: 'Asian-American',
      label: <FormattedMessage
        id="interest.Asian-American"
        description="Interests options: Asian-American"
        defaultMessage="Asian-American"
      />,
    },
    {
      value: 'Asian-Diaspora',
      label: <FormattedMessage
        id="interest.Asian-Diaspora"
        description="Interests options: Asian-Diaspora"
        defaultMessage="Asian-Diaspora"
      />,
    },
    {
      value: 'Black Theatre',
      label: <FormattedMessage
        id="interest.Black Theatre"
        description="Interests options: Black Theatre"
        defaultMessage="Black Theatre"
      />,
    },
    {
      value: 'Burlesque',
      label: <FormattedMessage
        id="interest.Burlesque"
        description="Interests options: Burlesque"
        defaultMessage="Burlesque"
      />,
    },
    {
      value: 'Circus',
      label: <FormattedMessage
        id="interest.Circus"
        description="Interests options: Circus"
        defaultMessage="Circus"
      />,
    },
    {
      value: 'Classical',
      label: <FormattedMessage
        id="interest.Classical"
        description="Interests options: Classical"
        defaultMessage="Classical"
      />,
    },
    {
      value: 'Climate Change',
      label: <FormattedMessage
        id="interest.Climate Change"
        description="Interests options: Climate Change"
        defaultMessage="Climate Change"
      />,
    },
    {
      value: 'Contemporary',
      label: <FormattedMessage
        id="interest.Contemporary"
        description="Interests options: Contemporary"
        defaultMessage="Contemporary"
      />,
    },
    {
      value: 'Creative Placemaking',
      label: <FormattedMessage
        id="interest.Creative Placemaking"
        description="Interests options: Creative Placemaking"
        defaultMessage="Creative Placemaking"
      />,
    },
    {
      value: 'Criticism',
      label: <FormattedMessage
        id="interest.Criticism"
        description="Interests options: Criticism"
        defaultMessage="Criticism"
      />,
    },
    {
      value: 'Cross-cultural Exchange',
      label: <FormattedMessage
        id="interest.Cross-cultural Exchange"
        description="Interests options: Cross-cultural Exchange"
        defaultMessage="Cross-cultural Exchange"
      />,
    },
    {
      value: 'Dance',
      label: <FormattedMessage
        id="interest.Cross-cultural Exchange"
        description="Interests options: Cross-cultural Exchange"
        defaultMessage="Cross-cultural Exchange"
      />,
    },
    {
      value: 'Deaf',
      label: <FormattedMessage
        id="interest.Deaf"
        description="Interests options: Deaf"
        defaultMessage="Deaf"
      />,
    },
    {
      value: 'Design',
      label: <FormattedMessage
        id="interest.Design"
        description="Interests options: Design"
        defaultMessage="Design"
      />,
    },
    {
      value: 'Devised',
      label: <FormattedMessage
        id="interest.Devised"
        description="Interests options: Devised"
        defaultMessage="Devised"
      />,
    },
    {
      value: 'Directing',
      label: <FormattedMessage
        id="interest.Directing"
        description="Interests options: Directing"
        defaultMessage="Directing"
      />,
    },
    {
      value: 'Disability',
      label: <FormattedMessage
        id="interest.Disability"
        description="Interests options: Disability"
        defaultMessage="Disability"
      />,
    },
    {
      value: 'Diversity and Inclusion',
      label: <FormattedMessage
        id="interest.Diversity and Inclusion"
        description="Interests options: Diversity and Inclusion"
        defaultMessage="Diversity and Inclusion"
      />,
    },
    {
      value: 'Documentary Theatre',
      label: <FormattedMessage
        id="interest.Documentary Theatre"
        description="Interests options: Documentary Theatre"
        defaultMessage="Documentary Theatre"
      />,
    },
    {
      value: 'Eco Theatre',
      label: <FormattedMessage
        id="interest.Eco Theatre"
        description="Interests options: Eco Theatre"
        defaultMessage="Eco Theatre"
      />,
    },
    {
      value: 'Ensemble',
      label: <FormattedMessage
        id="interest.Ensemble"
        description="Interests options: Ensemble"
        defaultMessage="Ensemble"
      />,
    },
    {
      value: 'Experimental',
      label: <FormattedMessage
        id="interest.Experimental"
        description="Interests options: Experimental"
        defaultMessage="Experimental"
      />,
    },
    {
      value: 'LGBTQIA*',
      label: <FormattedMessage
        id="interest.LGBTQIA*"
        description="Interests options: LGBTQIA*"
        defaultMessage="LGBTQIA*"
      />,
    },
    {
      value: 'Geek Theater',
      label: <FormattedMessage
        id="interest.Geek Theater"
        description="Interests options: Geek Theater"
        defaultMessage="Geek Theater"
      />,
    },
    {
      value: 'Gender Politics',
      label: <FormattedMessage
        id="interest.Gender Politics"
        description="Interests options: Gender Politics"
        defaultMessage="Gender Politics"
      />,
    },
    {
      value: 'Hip Hop Theatre',
      label: <FormattedMessage
        id="interest.Hip Hop Theatre"
        description="Interests options: Hip Hop Theatre"
        defaultMessage="Hip Hop Theatre"
      />,
    },
    {
      value: 'Immersive Theatre',
      label: <FormattedMessage
        id="interest.Immersive Theatre"
        description="Interests options: Immersive Theatre"
        defaultMessage="Immersive Theatre"
      />,
    },
    {
      value: 'Improvisation',
      label: <FormattedMessage
        id="interest.Improvisation"
        description="Interests options: Improvisation"
        defaultMessage="Improvisation"
      />,
    },
    {
      value: 'Indigenous',
      label: <FormattedMessage
        id="interest.Indigenous"
        description="Interests options: Indigenous"
        defaultMessage="Indigenous"
      />,
    },
    {
      value: 'International',
      label: <FormattedMessage
        id="interest.International"
        description="Interests options: International"
        defaultMessage="International"
      />,
    },
    {
      value: 'Jewish Theatre',
      label: <FormattedMessage
        id="interest.Jewish Theatre"
        description="Interests options: Jewish Theatre"
        defaultMessage="Jewish Theatre"
      />,
    },
    {
      value: 'Latina/o Theatre Commons',
      label: <FormattedMessage
        id="interest.Latina/o Theatre Commons"
        description="Interests options: Latina/o Theatre Commons"
        defaultMessage="Latina/o Theatre Commons"
      />,
    },
    {
      value: 'Latino-American',
      label: <FormattedMessage
        id="interest.Latino-American"
        description="Interests options: Latino-American"
        defaultMessage="Latino-American"
      />,
    },
    {
      value: 'Literary Management',
      label: <FormattedMessage
        id="interest.Literary Management"
        description="Interests options: Literary Management"
        defaultMessage="Literary Management"
      />,
    },
    {
      value: 'Multicultural',
      label: <FormattedMessage
        id="interest.Multicultural"
        description="Interests options: Multicultural"
        defaultMessage="Multicultural"
      />,
    },
    {
      value: 'Multidisciplinary',
      label: <FormattedMessage
        id="interest.Multidisciplinary"
        description="Interests options: Multidisciplinary"
        defaultMessage="Multidisciplinary"
      />,
    },
    {
      value: 'Music',
      label: <FormattedMessage
        id="interest.Music"
        description="Interests options: Music"
        defaultMessage="Music"
      />,
    },
    {
      value: 'Musical Theatre',
      label: <FormattedMessage
        id="interest.Musical Theatre"
        description="Interests options: Musical Theatre"
        defaultMessage="Musical Theatre"
      />,
    },
    {
      value: 'Musicals',
      label: <FormattedMessage
        id="interest.Musicals"
        description="Interests options: Musicals"
        defaultMessage="Musicals"
      />,
    },
    {
      value: 'New Work',
      label: <FormattedMessage
        id="interest.New Work"
        description="Interests options: New Work"
        defaultMessage="New Work"
      />,
    },
    {
      value: 'Object Theatre/Puppetry',
      label: <FormattedMessage
        id="interest.Object Theatre/Puppetry"
        description="Interests options: Object Theatre/Puppetry"
        defaultMessage="Object Theatre/Puppetry"
      />,
    },
    {
      value: 'Opera',
      label: <FormattedMessage
        id="interest.Opera"
        description="Interests options: Opera"
        defaultMessage="Opera"
      />,
    },
    {
      value: 'Performance Art',
      label: <FormattedMessage
        id="interest.Performance Art"
        description="Interests options: Performance Art"
        defaultMessage="Performance Art"
      />,
    },
    {
      value: 'Philanthropy/Funding',
      label: <FormattedMessage
        id="interest.Philanthropy/Funding"
        description="Interests options: Philanthropy/Funding"
        defaultMessage="Philanthropy/Funding"
      />,
    },
    {
      value: 'Physical Theatre',
      label: <FormattedMessage
        id="interest.Physical Theatre"
        description="Interests options: Physical Theatre"
        defaultMessage="Physical Theatre"
      />,
    },
    {
      value: 'Playwright Residencies',
      label: <FormattedMessage
        id="interest.Playwright Residencies"
        description="Interests options: Playwright Residencies"
        defaultMessage="Playwright Residencies"
      />,
    },
    {
      value: 'Playwriting',
      label: <FormattedMessage
        id="interest.Playwriting"
        description="Interests options: Playwriting"
        defaultMessage="Playwriting"
      />,
    },
    {
      value: 'Poetry',
      label: <FormattedMessage
        id="interest.Poetry"
        description="Interests options: Poetry"
        defaultMessage="Poetry"
      />,
    },
    {
      value: 'Political/Social',
      label: <FormattedMessage
        id="interest.Political/Social"
        description="Interests options: Political/Social"
        defaultMessage="Political/Social"
      />,
    },
    {
      value: 'Process',
      label: <FormattedMessage
        id="interest.Process"
        description="Interests options: Process"
        defaultMessage="Process"
      />,
    },
    {
      value: 'Producing',
      label: <FormattedMessage
        id="interest.Producing"
        description="Interests options: Producing"
        defaultMessage="Producing"
      />,
    },
    {
      value: 'Puppetry',
      label: <FormattedMessage
        id="interest.Puppetry"
        description="Interests options: Puppetry"
        defaultMessage="Puppetry"
      />,
    },
    {
      value: 'Queer Theatre',
      label: <FormattedMessage
        id="interest.Queer Theatre"
        description="Interests options: Queer Theatre"
        defaultMessage="Queer Theatre"
      />,
    },
    {
      value: 'Race',
      label: <FormattedMessage
        id="interest.Race"
        description="Interests options: Race"
        defaultMessage="Race"
      />,
    },
    {
      value: 'Religion/Spirituality',
      label: <FormattedMessage
        id="interest.Religion/Spirituality"
        description="Interests options: Religion/Spirituality"
        defaultMessage="Religion/Spirituality"
      />,
    },
    {
      value: 'Rural Theatre',
      label: <FormattedMessage
        id="interest.Rural Theatre"
        description="Interests options: Rural Theatre"
        defaultMessage="Rural Theatre"
      />,
    },
    {
      value: 'Senior Theatre',
      label: <FormattedMessage
        id="interest.Senior Theatre"
        description="Interests options: Senior Theatre"
        defaultMessage="Senior Theatre"
      />,
    },
    {
      value: 'Shakespeare',
      label: <FormattedMessage
        id="interest.Shakespeare"
        description="Interests options: Shakespeare"
        defaultMessage="Shakespeare"
      />,
    },
    {
      value: 'Site-specific',
      label: <FormattedMessage
        id="interest.Site-specific"
        description="Interests options: Site-specific"
        defaultMessage="Site-specific"
      />,
    },
    {
      value: 'Social Justice',
      label: <FormattedMessage
        id="interest.Social Justice"
        description="Interests options: Social Justice"
        defaultMessage="Social Justice"
      />,
    },
    {
      value: 'Social Media',
      label: <FormattedMessage
        id="interest.Social Media"
        description="Interests options: Social Media"
        defaultMessage="Social Media"
      />,
    },
    {
      value: 'Sound Design',
      label: <FormattedMessage
        id="interest.Sound Design"
        description="Interests options: Sound Design"
        defaultMessage="Sound Design"
      />,
    },
    {
      value: 'Sports',
      label: <FormattedMessage
        id="interest.Sports"
        description="Interests options: Sports"
        defaultMessage="Sports"
      />,
    },
    {
      value: 'Stage Combat',
      label: <FormattedMessage
        id="interest.Stage Combat"
        description="Interests options: Stage Combat"
        defaultMessage="Stage Combat"
      />,
    },
    {
      value: 'Stage Management',
      label: <FormattedMessage
        id="interest.Stage Management"
        description="Interests options: Stage Management"
        defaultMessage="Stage Management"
      />,
    },
    {
      value: 'Student/Youth',
      label: <FormattedMessage
        id="interest.Student/Youth"
        description="Interests options: Student/Youth"
        defaultMessage="Student/Youth"
      />,
    },
    {
      value: 'Technology',
      label: <FormattedMessage
        id="interest.Technology"
        description="Interests options: Technology"
        defaultMessage="Technology"
      />,
    },
    {
      value: 'Theatre Education/Training',
      label: <FormattedMessage
        id="interest.Theatre Education/Training"
        description="Interests options: Theatre Education/Training"
        defaultMessage="Theatre Education/Training"
      />,
    },
    {
      value: 'Theatre for Young Audiences',
      label: <FormattedMessage
        id="interest.Theatre for Young Audiences"
        description="Interests options: Theatre for Young Audiences"
        defaultMessage="Theatre for Young Audiences"
      />,
    },
    {
      value: 'Theatre History',
      label: <FormattedMessage
        id="interest.Theatre History"
        description="Interests options: Theatre History"
        defaultMessage="Theatre History"
      />,
    },
    {
      value: 'Touring',
      label: <FormattedMessage
        id="interest.Touring"
        description="Interests options: Touring"
        defaultMessage="Touring"
      />,
    },
    {
      value: 'Transgender',
      label: <FormattedMessage
        id="interest.Transgender"
        description="Interests options: Transgender"
        defaultMessage="Transgender"
      />,
    },
    {
      value: 'Translations/Adaptations',
      label: <FormattedMessage
        id="interest.Translations/Adaptations"
        description="Interests options: Translations/Adaptations"
        defaultMessage="Translations/Adaptations"
      />,
    },
    {
      value: 'Video Games',
      label: <FormattedMessage
        id="interest.Video Games"
        description="Interests options: Video Games"
        defaultMessage="Video Games"
      />,
    },
    {
      value: 'Women',
      label: <FormattedMessage
        id="interest.Women"
        description="Interests options: Women"
        defaultMessage="Women"
      />,
    },
    {
      value: 'Young Audiences',
      label: <FormattedMessage
        id="interest.Young Audiences"
        description="Interests options: Young Audiences"
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
