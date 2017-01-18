// Utilities
import { Meteor } from 'meteor/meteor';
import React from 'react';
import Helmet from 'react-helmet';
import Modal from '../components/Modal.jsx';
import { intlShape, injectIntl } from 'react-intl';
import { Link } from 'react-router';

// Pages
import TextPage from '../../ui/pages/TextPage.jsx';

class TermsOfUsePage extends React.Component {
  constructor(props) {
    super(props);

    this.switchLanguage = this.switchLanguage.bind(this);
    this.renderEnglish = this.renderEnglish.bind(this);
    this.renderSpanish = this.renderSpanish.bind(this);
  }

  renderEnglish() {
    return (
      <div className="page-content">
        <Helmet title="Terms of Use" />
        <h1>Terms of Use</h1>
        <ol>
          <li>
            <h3>Philosophy</h3>
            <p>
              The World Theatre Map Website (the “World Theatre Map”), together with its companion websites, the HowlRound Website (the “HowlRound”) and HowlRound TV (the “HowlRound TV Web Site”) (collectively, the “Websites”) are operated by Emerson College (“Emerson” or the “College”) in Boston, Massachusetts. The College is a 501(c)(3) educational institution with a business address at 120 Boylston Street, Boston, Massachusetts, 02116, United States of America.
            </p>
            <p>
              The Websites exist to provide the theater community with open forums through which they may preview their works, gain exposure, encourage the growth of others, benefit from genuinely constructive criticism. Constructive feedback is a necessary element of the community's growth experience, and such input can, and should, occur in a provocative, albeit civil and mutually respectful environment conducive to enrichment. The College expects users of the Websites to govern their conduct accordingly and to refrain from engaging in any defamatory remarks or personal attacks on other artists, regardless of whether those others are users of the Websites.
            </p>
            <p>
              Users are also reminded that to the extent they own proprietary rights in the content they post to the Websites, they retain their proprietary interests when they post to the Websites. In keeping with our mission, it is important that users rest comfortable in the knowledge that by posting to the Websites, they are not relinquishing their proprietary interests in their works. We are unique in this regard, and we believe this unique characteristic furthers the end goal of encouraging artistic growth.
            </p>
            <p>
              With these principals in mind, set forth herein are the Terms of Use of the Websites. In addition, the HowlRound and HowlRound TV websites, given their unique nature, may from time to time have additional terms of use governing those sites. Please read these Terms along with any additional terms posted on the HowlRound and HowlRound TV websites carefully because they apply to your use of the Websites.
            </p>
          </li>
          <li>
            <h3>Your Agreement to the Terms.</h3>
            <p>
              <strong>YOUR ACCESS OR USE OF THE WEBSITE IN ANY WAY SIGNIFIES THAT YOU HAVE READ AND UNDERSTAND, AND THAT YOU AGREE TO BE BOUND BY, THESE TERMS.</strong> By accessing or using the Websites you also represent that you have the legal authority to accept these Terms on behalf of yourself and any party you represent or with which you are affiliated in connection with your use of the Websites. If you do not agree to these Terms, you are not authorized to use the Websites, and you should discontinue your use at this time.
            </p>
            <p>
              You may only use the Website in accordance with these Terms, any additional terms as may be applicable to World Theatre Map and HowlRound TV websites, and any Emerson College policy. You may not use the Website for any purpose that is unlawful, prohibited by these Terms, or any applicable additional Terms, contrary to any other conditions or notices that are made available on the Website, or contrary to any other College policies. A directory of College policies may be found at the College’s website  (http://www.emerson.edu/policy), and users are encouraged to review the College’s institutional policies.
            </p>
          </li>
          <li>
            <h3>Changes to the Terms.</h3>
            <p>
              From time to time, the College may change, remove, add to, or otherwise modify these Terms and reserves the right to do so in its sole discretion at any time. In that case, we will post the revised Terms, and such revised Terms will take effect at the time of their posting. Accordingly, we encourage you to periodically review the Terms because they are binding upon the date on which you access the Website after their posting. Your continued use of the Website after new and/or revised Terms are effective indicated that you have read, understood, and agreed to those Terms.
            </p>
          </li>
          <li>
            <h3>Location of the Websites and Services.</h3>
            <p>
              The Websites are controlled and offered by Emerson College through contracted facilities in the United States of America. The College makes no representations that the Websites are compliant with the laws, particularly the intellectual property laws, of any jurisdiction outside the United States. If you are accessing or using the Websites from other jurisdictions, you do so at your own risk and you are responsible for your own compliance with local law. Notwithstanding the foregoing, the Website may contain or provide links to Content (defined in Section 8, below) hosted on websites located outside of the United States of America.
            </p>
          </li>
          <li>
            <h3>User Conduct.</h3>
            <p>
              Users agree not to use the Websites to:
              <ol>
                <li>Post, use or transmit content that you do not have the right to post or use, for example, under intellectual property, confidentiality, privacy or other applicable laws or agreements;</li>
                <li>Post, use or transmit unsolicited or unauthorized content, including advertising or promotional materials, “junk mail,” “spam,” “chain letters,” “pyramid schemes,” or any other form of unsolicited or unwelcome solicitation or advertising;</li>
                <li>Post, use or transmit content that contains software viruses or any other computer code, files or programs designed to interrupt, destroy or limit the functionality of any computer software or hardware or telecommunications equipment or otherwise interfere with or disrupt the Website or servers or networks connected to the Website, or that disobeys any requirements, procedures, policies or regulations of networks connected to the Website;</li>
                <li>Post or transmit content that is harmful, abusive, invasive of privacy, defamatory, hateful or otherwise discriminatory, false or misleading, inciting of any illegal act, or which is otherwise in breach of your obligations to any person or contrary to any applicable laws and regulations;</li>
                <li>Intimidate or harass another;</li>
                <li>Use or attempt to use another’s account, service, or private information;</li>
                <li>Remove, circumvent, disable, damage or otherwise interfere with any security-related features that enforce limitations on the use of the Websites;</li>
                <li>Attempt to gain unauthorized access to the Website, other accounts, computer systems or networks connected to the Websites, through hacking password mining or any other means or interfere or attempt to interfere with the proper working of the Websites or any activities conducted through the Websites.</li>
                <li>Impersonate another person or entity, or falsely state or otherwise misrepresent your affiliation with a person or entity.</li>
                <li>Post or transmit any personally identifiable information about persons under 13 years of age.</li>
                <li>Access content through any technology or means other than through the Website itself, or through other explicitly authorized means Emerson College may designate.</li>
                <li>Launch any automated system, including without limitation, “robots,” “spiders,” or “offline readers,” that accesses the Websites in a manner that sends more request messages to the Websites’ servers in a given period of time than a human can reasonably produce in the same period by using a conventional on-line web browser. Notwithstanding the foregoing, Emerson College grants the operators of public search engines permission to use spiders to copy materials from the site for the sole purpose of and solely to the extent necessary for creating publicly available searchable indices of the materials, but not caches or archives of such materials. Emerson College reserves the right to revoke these exceptions either generally or in specific cases.</li>
                <li>Collect or harvest any personally identifiable information, including account names, from the Website for any commercial solicitation purposes.</li>
                <li>Solicit, for commercial purposes, any users of the Website with respect to their Content.</li>
              </ol>
            </p>
          </li>
          <li>
            <h3>Terms Relating to Content on the Websites.</h3>
            <p>
              <ol className="ordered-list-letters">
                <li>
                  <h4>Responsibility for Content.</h4>
                  <p>
                    You understand the College disclaims responsibility for all material, data and information, such as data files, written text, computer software, music, audio files or other sounds, photographs, videos or other images (collectively, “Content”) posted by users of the Websites. This includes statements, representations, and assertions that users may make, expressly or impliedly, about the provenance and ownership of Content that they supply, upload, list and/or link to. You acknowledge that Emerson College does not make any representations or warranties about the Content, including without limitation, about the accuracy, integrity or quality of the Content made available at the instigation of users of the Websites. You understand that by using the Website, you may be exposed to Content that some may perceive to be offensive, indecent or objectionable. Under no circumstances is Emerson College liable in any way for any Content, including, but not limited to: any infringing Content, any errors or omissions in Content, or for any loss or damage of any kind incurred as a result of the use of any Content posted, transmitted to, linked to or otherwise accessible or made available via the Websites.
                  </p>
                </li>
                <li>
                  <h4>Licenses Associated With Content on the Website.</h4>
                  <ol>
                    <li>
                      <h5>Your Content</h5>
                      <p>
                        You hereby agree that all Content you voluntarily provide to the Website is licensed under a Creative Commons Attribution 4.0 license http://creativecommons.org/licenses/by/4.0/, is not copyrightable, or is in the public domain. When you post your Content, you designate HowlRound.com and yourself as the “Attribution Party” for the purposes of the Attribution 4.0 license, as defined therein, and grant permission for the relevant Website URI to be associated with your Content for purposes of that license. If Content you provide is protected by copyright, then if it is not licensed under a Creative Commons Attribution 4.0 license, you must not provide it to the Website. For the avoidance of doubt, you may otherwise license your Content on any terms or no terms at all, but upon uploading or supplying Content protected by copyright to the Website, you are licensing such Content under a Creative Commons Attribution 4.0 license in addition to any such other license that may apply to your Content, and designating HowlRound and yourself as the Attribution Party for purposes of that license.
                      </p>
                    </li>
                    <li>
                      <h5>Emerson College Content</h5>
                      <p>
                        All Content owned by Emerson College and made available by Emerson College on the Website is licensed under the Creative Commons Attribution 3.0 Unported license http://creativecommons.org/licenses/by/4.0/, unless marked otherwise.
                      </p>
                    </li>
                    <li>
                      <h5>Third Party Content</h5>
                      <p>
                        Third Party Content and Third Party Websites (as defined in Section 7, below) that the Website links to or embeds, including but not limited to blogs, video, photo, and news feeds, are subject to the license terms accompanying such Content. For Third Party Content and Third Party Websites that Emerson College supplies, as a courtesy Emerson College will take reasonable steps to clearly mark any such Third Party Content or Third Party Websites that are not licensed under a Creative Commons Attribution 4.0 license; provided, however, that Emerson College cannot and does not make any guarantee or warranty whatsoever about the license terms of Third Party Content or Third Party Websites and provides all such information AS-IS. We encourage you to always verify the license of any such Content before use.
                      </p>
                    </li>
                  </ol>
                </li>
                <li>
                  <h5>Content You Provide</h5>
                  <p>
                    In the spirit of collaboration and community, you may submit to the Website Content you do not own or for which you do not hold a license. You must, however, in good faith provide a contact email address on the Website for the person or organization on whose behalf you are submitting content so that the Website can alert them to your submissions. No content may contain libelous, defamatory, or otherwise unlawful material. Emerson College may, but is not obligated to, review your submissions and may delete or remove (without notice) any Content, which the College, in its sole discretion,  determines violates the Terms or that may be illegal, violate the rights of others, or harm or threaten the safety of others. Emerson College does not endorse or support any Content posted by you or any other third party on or through the Website. You alone are responsible for creating backup copies and replacing any Content you post on the Website, and you authorize Emerson College to make copies of your Content as we deem necessary in connection with operation of the Websites. In agreeing to these Terms, you agree not to challenge the lawfulness of Emerson’s copying of material you post to the Websites.
                  </p>
                  <p>
                    You may request the removal of your Content from the Websites at any time, and Emerson College will take reasonable steps to promptly remove such Content from the Websites. You agree that Emerson College is only be capable of removing Content from the Websites, and that it has no authority over or ability to control the conduct of any third-party. Accordingly, the College cannot remove Content from email archives, wiki history pages and similar community forums where you may post content, or others’ computers, such as Content you may have sent to others in an email posted to a HowlRound email list. If you choose to remove Content, the Creative Commons license you granted when submitting such Content (see subparagraph (B)(1), above) will remain in full force and effect in accordance with its terms.
                  </p>
                </li>
                <li>
                  <h5>Use of Content on the Website.</h5>
                  <p>
                    As a material inducement to Emerson College to provide you access to the Websites, you represent and warrant that you will use any and all Content on our Website in accordance with any applicable license. By using the Website, you agree that you are solely responsible for your use of any and all Content made available thereon. You agree that you must evaluate and bear all risks associated with the use of any Content, including any reliance on the provenance, ownership, accuracy, completeness, or reliability of such Content. In this regard, you agree that you will not rely on any Content made available on the Websites without your own independent evaluation of that Content. Users who submit Content are solely responsible for confirming that their postings do not infringement on the legal rights, including copyrights, of others.
                  </p>
                </li>
                <li>
                  <h5>License.</h5>
                  <p>
                    By submitting Content to the Websites, you hereby grant Emerson College a worldwide, non-exclusive, royalty-free, sublicenseable, and transferable license to use, reproduce, distribute, prepare derivative works of, display, and perform the Content in connection with the Websites and Emerson College’s (and its successors’ and affiliates’) business, including, without limitation, for promoting and redistributing part or all of the Website (and derivative works thereof) in any media formats and through any media channels. You also hereby grant each user of the Websites a non-exclusive license to access your Content through the Websites, and to use, reproduce, distribute, display and perform such Content as permitted through the functionality of the Websites and under these Terms of Use.
                  </p>
                  <p>
                    The above licenses granted by you terminate within a commercially reasonable time after you remove or delete that Content from the Website. You understand and agree, however, that Emerson College may retain, but not display, distribute, or perform, server copies of your Content that have been removed or deleted.
                  </p>
                </li>
              </ol>
            </p>
          </li>
          <li>
            <h3>Third Party Websites and Content; Links.</h3>
            <p>
              The Websites may contain links to websites not controlled by Emerson College (“Third Party Websites”), as well as Content belonging to or originating from persons or organizations other than Emerson College (“Third Party Content”). You acknowledge that Emerson College is not responsible or liable for any Third Party Websites or any Third Party Content, information or products made available at any Third Party Website, regardless of whether Third Party Websites provide the option for users to apply Creative Commons licenses to Content hosted on those sites, or whether any Third Party Website or Third Party Content bears a Creative Commons license. You further acknowledge that Emerson College (a) is not responsible or liable for any Third Party Websites or any Third Party Content, information or products made available at any Third Party Website; (b) has not reviewed any Third Party Websites or Third Party Content for accuracy, appropriateness, completeness or non infringement; (c) has not sponsored or otherwise endorsed Third Party Websites or Third Party Content; and (d) makes no representations or warranties whatsoever about any Third Party Websites or Third Party Content.
            </p>
          </li>
          <li>
            <h3>Participating in Our Community: Registered Users.</h3>
            <p>
              Registration of an account on the Websites is void where prohibited. Only persons who are fully competent to enter into the terms, conditions, obligations, affirmations, representations and warranties set forth in these Terms and to abide by and comply with these Terms may register for an account and use the related Services; provided, however, that if you are under the age of majority in your jurisdiction but over 13 years of age, you may join with the express permission of your parent or legal guardian. Any registration by, use of or access to the Services provided to Registered Users (defined below) by anyone (1) under the age of 13 or (2) under the age of majority in their jurisdiction but without parental or guardian permission, is unauthorized, unlicensed and a violation of these Terms. By registering for an account on any of the Websites or using the related services, you represent and warrant that you (1) have attained the age of majority in your jurisdiction or, (2) are over the age of 13 and have the express permission of a legal guardian to become a Registered User and use services made available to Registered Users, and you further agree to abide by all of the terms and conditions of all Terms of Use governing the Websites.
            </p>
            <p>
              Services offered to Registered Users are provided subject to the Terms of Use for the Websites. Emerson College reserves the right to modify or discontinue the accounts of Registered Users and related services at any time. Emerson College disclaims any and all liability to Registered Users and third parties in the event Emerson College exercises its right to modify or discontinue user accounts or related services.
            </p>
            <p>
              You agree to (a) provide accurate, current and complete information about you, if and as may be prompted by the registration process on the Website, (b) maintain the security of your password(s) and identification, (c) maintain and promptly update your registration information and any other information you provide to Emerson College, and to keep it accurate and complete to, among other things, allow us to contact you, and (d) be fully responsible for all use of your account and for any actions that take place using your account. It is your responsibility to ensure that Emerson College has up-to-date contact information for you. You may not set up an account or membership on behalf of another individual or entity unless you are authorized to do so.
            </p>
            <p>
              Although Emerson College will not be liable for your losses caused by any unauthorized use of your account, you may be liable for the losses of Emerson College or others due to such unauthorized use.
            </p>
            <p>
              Your participation as a Registered User and use of the related services terminates automatically upon your breach of any of the Terms of Use governing the Websites. In addition, Emerson College may, at any time: (a) modify, suspend or terminate the operation of or access to your user account for any reason; (b) modify or change such Websites and any applicable Terms and policies governing your user account and related Websites and services for any reason; and (c) interrupt user accounts and related Websites and services for any reason, all as Emerson College in its sole discretion deems appropriate. Your access to your account, and use of the related Website may be terminated by you or by Emerson College at any time and for any reason whatsoever, without notice.
            </p>
            <p>
              In addition, Emerson College reserves the right to delete and purge any account and all Content associated therewith following any prolonged period of inactivity, all as may be determined by Emerson College in its sole discretion.
            </p>
          </li>
          <li>
            <h3>Digital Millennium Copyright Act.</h3>
            <p>
              <ol className="ordered-list-letters">
                <li>
                  <p>If you are a copyright owner or an agent thereof and believe that any Content infringes upon your copyrights, you may submit a notification pursuant to the Digital Millennium Copyright Act ("DMCA") by providing our Copyright Agent with the following information in writing (see 17 U.S.C § 512(c)(3)):
                  </p>
                  <ol className="ordered-list-numbers">
                    <li>
                      A physical or electronic signature of a person authorized to act on behalf of the owner of an exclusive right that is allegedly infringed;
                    </li>
                    <li>
                      Identification of the copyrighted work claimed to have been infringed, or, if multiple copyrighted works at a single online site are covered by a single notification, a representative list of such works at that site.
                    </li>
                    <li>
                      Identification of the material that is claimed to be infringing or to be the subject of infringing activity and that is to be removed or access to which is to be disabled and information reasonably sufficient to permit the service provider to locate the material;
                    </li>
                    <li>
                      Information reasonably sufficient to permit the service provider to contact you, such as an address, telephone number, and, if available, an electronic mail;
                    </li>
                    <li>
                      A statement that you have a good faith belief that use of the material in the manner complained of is not authorized by the copyright owner, its agent, or the law; and;
                    </li>
                    <li>
                      A statement that the information in the notification is accurate, and under penalty of perjury, that you are authorized to act on behalf of the owner of an exclusive right that is allegedly infringed.
                    </li>
                  </ol>
                  <p>
                    Emerson College’s designated Copyright Agent to receive notifications of claimed infringement is Robert Fleming, Executive Director, Iwasaki Library, Emerson College, 120 Boylston Street, Boston, MA 02116. Email: dmca@emerson.edu.  For clarity, only DMCA notices should go to the Copyright Agent. You acknowledge that if you fail to comply with all of the requirements of this Section 5(D), your DMCA notice may not be valid.
                  </p>
                </li>
                <li>
                  <p>
                    Counter-Notice. If you believe that your Content that was removed (or to which access was disabled) is not infringing, or that you have the authorization from the copyright owner, the copyright owner's agent, or pursuant to the law, to post and use the material in your Content, you may send a counter-notice containing the following information to the Copyright Agent:
                  </p>
                  <ol className="ordered-list-numbers">
                    <li>
                      Your physical or electronic signature;
                    </li>
                    <li>
                      Identification of the Content that has been removed or to which access has been disabled and the location at which the Content appeared before it was removed or disabled;
                    </li>
                    <li>
                      A statement that you have a good faith belief that the Content was removed or disabled as a result of mistake or a misidentification of the Content; and
                    </li>
                    <li>
                      Your name, address, telephone number, and e-mail address, a statement that you consent to the jurisdiction of the federal court in Boston, MA, and a statement that you will accept service of process from the person who provided notification of the alleged infringement.
                    </li>
                    <li>
                      If a counter-notice is received by the Copyright Agent, Emerson College may send a copy of the counter-notice to the original complaining party informing that person that it may replace the removed Content or cease disabling it in 10 business days. Unless the copyright owner files an action seeking a court order against the Content provider, member or user, the removed Content may be replaced, or access to it restored, in 10 to 14 business days or more after receipt of the counter-notice, at Emerson College’s sole discretion.
                    </li>
                  </ol>
                </li>
              </ol>
            </p>
          </li>
          <li>
            <h3>DISCLAIMER OF WARRANTIES.</h3>
            <p>
              TO THE FULLEST EXTENT PERMITTED BY APPLICABLE LAW, EMERSON COLLEGE OFFERS THE WEBSITES AS-IS AND MAKES NO REPRESENTATIONS OR WARRANTIES OF ANY KIND CONCERNING THE WEBSITES, EXPRESS, IMPLIED, STATUTORY OR OTHERWISE, INCLUDING, WITHOUT LIMITATION, WARRANTIES OF TITLE, MERCHANTIBILITY, FITNESS FOR A PARTICULAR PURPOSE, OR NONINFRINGEMENT. EMERSON COLLEGE DOES NOT WARRANT THAT THE FUNCTIONS OR CONTENT CONTAINED ON THE WEBSITE OR SERVICES WILL BE UNINTERRUPTED OR ERROR-FREE, THAT DEFECTS WILL BE CORRECTED, OR THAT SERVERS ARE FREE OF VIRUSES OR OTHER HARMFUL COMPONENTS. EMERSON COLLEGE DOES NOT WARRANT OR MAKE ANY REPRESENTATION REGARDING USE OR THE RESULT OF USE OF THE CONTENT IN TERMS OF ACCURACY, RELIABILITY, OR OTHERWISE.
            </p>
          </li>
          <li>
            <h3>LIMITATION OF LIABILITY.</h3>
            <p>
              EXCEPT TO THE EXTENT REQUIRED BY APPLICABLE LAW AND THEN ONLY TO THAT EXTENT, IN NO EVENT WILL EMERSON COLLEGE, ITS EMPLOYEES, OFFICERS, DIRECTORS, AFFILIATES OR AGENTS (“EMERSON COLLEGE PARTIES”) BE LIABLE TO YOU ON ANY LEGAL THEORY FOR ANY INCIDENTAL, DIRECT, INDIRECT, PUNITIVE, ACTUAL, CONSEQUENTIAL, SPECIAL, EXEMPLARY OR OTHER DAMAGES, INCLUDING WITHOUT LIMITATION, LOSS OF REVENUE OR INCOME, LOST PROFITS, PAIN AND SUFFERING, EMOTIONAL DISTRESS, COST OF SUBSTITUTE GOODS OR SERVICES, OR SIMILAR DAMAGES SUFFERED OR INCURRED BY YOU OR ANY THIRD PARTY THAT ARISE IN CONNECTION WITH THE WEBSITE (OR THE TERMINATION THEREOF FOR ANY REASON), EVEN IF THE EMERSON COLLEGE PARTIES HAVE BEEN ADVISED OF THE POSSIBILITY OF SUCH DAMAGES.
            </p>
            <p>
              THE EMERSON COLLEGE PARTIES SHALL NOT BE RESPONSIBLE OR LIABLE WHATSOEVER IN ANY MANNER FOR ANY CONTENT POSTED ON THE WEBSITES OR SERVICES (INCLUDING CLAIMS OF INFRINGEMENT RELATING TO CONTENT POSTED ON THE WEBSITES OR SERVICES, FOR YOUR USE OF THE WEBSITES AND SERVICES, OR FOR THE CONDUCT OF THIRD PARTIES WHETHER ON THE WEBSITES, IN CONNECTION WITH THE SERVICES OR OTHERWISE RELATING TO THE WEBSITES OR SERVICES.
            </p>
          </li>
          <li>
            <h3>Indemnification for Breach of Terms of Use.</h3>
            <p>
              You agree to indemnify and hold harmless the Emerson College Parties (defined above) from and against any and all loss, expenses, damages, and costs, including without limitation reasonable attorneys fees, resulting, whether directly or indirectly, from your violation of the Terms of Use of the Websites. You also agree to indemnify and hold harmless the Emerson College Parties from and against any and all claims brought by third parties arising out of your use of any of the Websites and the Content you make available via the Websites by any means, including without limitation through a posting, a link, reference to Content, or otherwise.
            </p>
          </li>
          <li>
            <h3>Privacy and Disclosure of Personal Information.</h3>
            <p>
              Emerson College is committed to handling responsibly the information and data we collect through the Website and agree to use your personal information in accordance with the Terms. We may share personal information in two instances. First, Emerson College may share personal information with our contractors and service providers in order to maintain, enhance, or add to the functionality of the Website. Second, we may disclose your personal information to third parties in a good faith belief that such disclosure is reasonably necessary to (a) take action regarding suspected illegal activities; (b) enforce or apply our Terms of Use, Privacy Policy, or other College policies; (c) comply with legal process, such as a search warrant, subpoena, statute, or court order; or (d) protect our rights, reputation, and property, or that of our users, affiliates, or the public.
            </p>
            <p>
              If Emerson College is required to provide a third party with your personal information (whether by subpoena or otherwise), and if you have fulfilled your obligation to register as a user as set forth above, the College will use reasonable means to notify you promptly of that event, unless prohibited by law or unless Emerson College is otherwise advised not to notify you on the advice of legal counsel.
            </p>
          </li>
          <li>
            <h3>Termination of Use.</h3>
            <p>
              The privilege of accessing and using the Websites terminates automatically upon your breach of any of Terms of Use. Emerson College may, at any time: (a) modify, suspend or terminate the operation of or access to the Website, or any portion of the Website, for any reason; (b) modify or change the Website, or any portion of the Website, and any Terms or other policies governing the use of the Websites, for any reason; (c) interrupt the operation of the Websites, or any portion of the Websites, for any reason, all as Emerson College deems appropriate in its sole discretion.
            </p>
            <p>
              Your access to, and use of, the Websites may be terminated by you or by Emerson College at any time and for any reason. Emerson College will use reasonable efforts to notify you in advance about any material modification, suspension or termination by Emerson College that is not caused by your breach of the Terms.
            </p>
            <p>
              The license grants mentioned herein shall continue in effect subject to the terms of the applicable license. Your warranties and indemnification obligations shall survive any termination of your agreement to the Terms of Use as do you your consent to jurisdiction and venue in the Courts of Massachusetts in the event of a dispute concerning the Websites and the law to be applied to any such dispute.
            </p>
          </li>
          <li>
            <h3>Miscellaneous Terms.</h3>
            <p>
              The Terms of Use of the Websites are governed by and construed pursuant to the laws of the Commonwealth of Massachusetts in the United States, exclusive of its choice of law rules. As a user of any of the Websites, you agree that any disputes or proceedings between Emerson College and you concerning the Terms of Use and/or your use of the Websites shall be brought in the United States District Court for the District of Massachusetts (federal court) sitting in Boston, Massachusetts, or the Superior Court of Suffolk County (state court), also located in Boston, Massachusetts, and you hereby consent to the personal jurisdiction and venue of either of these courts. No failure to insist on or enforce strict performance of any of the Terms shall be construed as a waiver of any provision hereof. If any term or part of the Terms is held to be invalid or unenforceable by any law or regulation or final determination of a competent court or tribunal, that provision will be deemed severable and will not affect the validity and enforceability of any remaining provisions. You agree that no joint venture, partnership, employment, or agency relationship exists between you and Emerson College as a result of the terms of use for any of the Websites or by your use of any of the Websites. These Terms and any applicable terms as provided by the World Theatre Map and HowlRound TV websites constitute the entire agreement between you and Emerson College relating to this subject matter and supersede all prior, contemporaneous and future communications (with the exception of future amendments to the Terms as made by Emerson College from time to time) between you and Emerson College. A printed version of the Terms and of any notice given in electronic form shall be admissible in any judicial or administrative proceedings based on or relating to the Terms to the same extent and subject to the same conditions as other business documents and records originally generating and maintained in printed form.
            <p>You agree that: (i) the Website shall be deemed solely based in Boston, MA; and (ii) the Website shall be deemed a passive website that does not give rise to personal jurisdiction over Emerson College, either specific or general, in jurisdictions other than Boston, MA.</p>
            <p>You and Emerson College agree that any cause of action arising out of or related to the Website must commence within one (1) year after the cause of action accrues. Otherwise, such cause of action is permanently barred.</p>
            <p><strong>These Terms of Use are Effective as of January 13, 2016.</strong></p>
            </p>
          </li>
        </ol>
      </div>
    );
  }

  renderSpanish() {
    // return (
    //   <div className="page-content">
    //     <Helmet title="Términos de Uso" />
    //     <h1>Términos de Uso</h1>
    //     <p>
    //       This is the Spanish terms of use page. This is the Spanish terms of use page. This is the Spanish terms of use page. This is the Spanish terms of use page. This is the Spanish terms of use page. This is the Spanish terms of use page. This is the Spanish terms of use page. This is the Spanish terms of use page. This is the Spanish terms of use page. This is the Spanish terms of use page. This is the Spanish terms of use page. This is the Spanish terms of use page. This is the Spanish terms of use page. This is the Spanish terms of use page. This is the Spanish terms of use page. This is the Spanish terms of use page. This is the Spanish terms of use page. This is the Spanish terms of use page. This is the Spanish terms of use page. This is the Spanish terms of use page. This is the Spanish terms of use page. This is the Spanish terms of use page.
    //     </p>
    //   </div>
    // );
  }

  switchLanguage() {
    // const { locale } = this.props.intl;

    // switch (locale) {
    //   case 'es':
    //     return this.renderSpanish();
    //     break;
    //   default:
    //     return this.renderEnglish();
    // }
    return this.renderEnglish();
  }

  render() {
    return (
      <TextPage renderFunction={this.switchLanguage} />
    );
  }
}

TermsOfUsePage.propTypes = {
  intl: intlShape.isRequired,
};

TermsOfUsePage.contextTypes = {
  router: React.PropTypes.object,
};

export default injectIntl(TermsOfUsePage);
