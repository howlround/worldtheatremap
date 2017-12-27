import { Accounts } from 'meteor/accounts-base';
import { Meteor } from 'meteor/meteor';

Accounts.urls.resetPassword = (token) => {
  return Meteor.absoluteUrl('reset-password/' + token);
}

Accounts.emailTemplates.siteName = 'World Theatre Map';
Accounts.emailTemplates.from = 'Map Support <map@howlround.com>';


Accounts.emailTemplates.resetPassword = {
  subject() {
    return 'Reset your password on The World Theatre Map';
  },
  text(user, url) {
    return `Hello!

Click the link below to reset your password.

${url}

If you didn't request this email, please ignore it.
`;
  },
};
