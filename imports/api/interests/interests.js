// Meteor
import React from 'react';
import ReactSelect from 'react-select';
import { FormattedMessage } from 'react-intl';
import t from 'tcomb-form';
import Checkboxes from '../../ui/components/Checkboxes.jsx';

// export const factory = () => {
// interests options
const Interests = [
  {
    value: 'African-Diaspora',
    label: <FormattedMessage
      id="interest.African-Diaspora"
      description="Interests options: African-Diaspora"
      defaultMessage="African-Diaspora"
    />,
  },
  {
    value: 'Arab Diaspora',
    label: <FormattedMessage
      id="interest.Arab Diaspora"
      description="Interests options: Arab Diaspora"
      defaultMessage="Arab Diaspora"
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
    value: 'Burlesque / Cabaret',
    label: <FormattedMessage
      id="interest.Burlesque / Cabaret"
      description="Interests options: Burlesque / Cabaret"
      defaultMessage="Burlesque / Cabaret"
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
    value: 'Dance / Movement / Choreography',
    label: <FormattedMessage
      id="interest.Dance / Movement / Choreography"
      description="Interests options: Dance / Movement / Choreography"
      defaultMessage="Dance / Movement / Choreography"
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
    value: 'Devised / Ensemble',
    label: <FormattedMessage
      id="interest.Devised / Ensemble"
      description="Interests options: Devised / Ensemble"
      defaultMessage="Devised / Ensemble"
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
    value: 'Documentary',
    label: <FormattedMessage
      id="interest.Documentary"
      description="Interests options: Documentary"
      defaultMessage="Documentary"
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
    value: 'Experimental',
    label: <FormattedMessage
      id="interest.Experimental"
      description="Interests options: Experimental"
      defaultMessage="Experimental"
    />,
  },
  {
    value: 'Immersive',
    label: <FormattedMessage
      id="interest.Immersive"
      description="Interests options: Immersive"
      defaultMessage="Immersive"
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
    value: 'Jewish Diaspora',
    label: <FormattedMessage
      id="interest.Jewish Diaspora"
      description="Interests options: Jewish Diaspora"
      defaultMessage="Jewish Diaspora"
    />,
  },
  {
    value: 'Latino / Hispanic',
    label: <FormattedMessage
      id="interest.Latino / Hispanic"
      description="Interests options: Latino / Hispanic"
      defaultMessage="Latino / Hispanic"
    />,
  },
  {
    value: 'LGBTQIA* (refer to the actual theatre work)',
    label: <FormattedMessage
      id="interest.LGBTQIA* (refer to the actual theatre work)"
      description="Interests options: LGBTQIA* (refer to the actual theatre work)"
      defaultMessage="LGBTQIA* (refer to the actual theatre work)"
    />,
  },
  {
    value: 'Monologue / Solo Performance',
    label: <FormattedMessage
      id="interest.Monologue / Solo Performance"
      description="Interests options: Monologue / Solo Performance"
      defaultMessage="Monologue / Solo Performance"
    />,
  },
  {
    value: 'Multidisciplinary / Interdisciplinary',
    label: <FormattedMessage
      id="interest.Multidisciplinary / Interdisciplinary"
      description="Interests options: Multidisciplinary / Interdisciplinary"
      defaultMessage="Multidisciplinary / Interdisciplinary"
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
    value: 'New Technology',
    label: <FormattedMessage
      id="interest.New Technology"
      description="Interests options: New Technology"
      defaultMessage="New Technology"
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
    value: 'Physical Theatre',
    label: <FormattedMessage
      id="interest.Physical Theatre"
      description="Interests options: Physical Theatre"
      defaultMessage="Physical Theatre"
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
    value: 'Puppetry',
    label: <FormattedMessage
      id="interest.Puppetry"
      description="Interests options: Puppetry"
      defaultMessage="Puppetry"
    />,
  },
  {
    value: 'Refugee',
    label: <FormattedMessage
      id="interest.Refugee"
      description="Interests options: Refugee"
      defaultMessage="Refugee"
    />,
  },
  {
    value: 'Roma Diaspora',
    label: <FormattedMessage
      id="interest.Roma Diaspora"
      description="Interests options: Roma Diaspora"
      defaultMessage="Roma Diaspora"
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
    value: 'Site-specific',
    label: <FormattedMessage
      id="interest.Site-specific"
      description="Interests options: Site-specific"
      defaultMessage="Site-specific"
    />,
  },
  {
    value: 'Theatre for or by Women',
    label: <FormattedMessage
      id="interest.Theatre for or by Women"
      description="Interests options: Theatre for or by Women"
      defaultMessage="Theatre for or by Women"
    />,
  },
  {
    value: 'Traditional / Folk',
    label: <FormattedMessage
      id="interest.Traditional / Folk"
      description="Interests options: Traditional / Folk"
      defaultMessage="Traditional / Folk"
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
    value: 'Young People / Children / Educational',
    label: <FormattedMessage
      id="interest.Young People / Children / Educational"
      description="Interests options: Young People / Children / Educational"
      defaultMessage="Young People / Children / Educational"
    />,
  },
];

// interests template
const interestsTags = t.form.Form.templates.select.clone({
  renderSelect: (locals) => {
    return (
      <Checkboxes
        options={Interests}
        values={locals.value}
        name="interests"
        onChange={locals.onChange}
      />
    );
  },
});

const interestsCheckboxes = t.form.Form.templates.select.clone({
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

// interests factory function
class CheckboxesInterestsFactory extends t.form.Component {
  getTemplate() {
    return interestsCheckboxes;
  }
}

// interests transformer
ReactSelectInterestsFactory.transformer = t.form.List.transformer;
CheckboxesInterestsFactory.transformer = t.form.List.transformer;

// export ReactSelectInterestsFactory;
// export CheckboxesInterestsFactory;
// };
export const interestsSelectFactory = () => {
  return ReactSelectInterestsFactory;
}

export const interestsCheckboxFactory = () => {
  return CheckboxesInterestsFactory;
}
